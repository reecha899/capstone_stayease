const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const mongoose = require('mongoose');

// @desc    Get all bookings
// @access  Private (Admin/Staff)
exports.getAllBookings = async (req, res) => {
    if (!['admin', 'staff'].includes(req.user.role)) {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    try {
        const bookings = await Booking.find()
            .populate({
                path: 'user',
                select: 'name', // Select only the name field
                options: { lean: true } // Return plain JavaScript objects
            })
            .populate('room', 'roomNumber type')
            .sort({ checkIn: -1 });

        // Map the results to rename the user field to GuestName
        const formattedBookings = bookings.map(booking => {
            const bookingObj = booking.toObject(); // Convert Mongoose document to plain object
            if (bookingObj.user) {
                bookingObj.User = bookingObj.user.name; // Set User to guest's name
            }
            delete bookingObj.user; // Remove the original user field
            return bookingObj;
        });

        // Temporary log to test finding a guest
        if (formattedBookings.length > 0 && formattedBookings[0].User) {
            // We can remove this log now as we are trying a different populate approach
            // const guestTest = await mongoose.model('Guest').findById(formattedBookings[0].user._id);
            // console.log('Guest test result:', guestTest);
        }

        res.json(formattedBookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get user's bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('room', 'roomNumber type')
            .sort({ checkIn: -1 });
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a booking
// @access  Private
exports.createBooking = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Explicitly check if user ID is provided in body or available from authenticated user
    if (!req.body.user && !req.user.id) {
        return res.status(400).json({ msg: 'User ID is required for booking' });
    }

    try {
        const { room, checkIn, checkOut, guests, specialRequests } = req.body;

        // Check if room exists and is available
        const roomDoc = await Room.findById(room);
        if (!roomDoc) {
            return res.status(404).json({ msg: 'Room not found' });
        }

        // Allow booking if status is 'Available'
        if (roomDoc.status !== 'Available') {
            return res.status(400).json({ msg: 'Room is not available' });
        }

        // Check for overlapping bookings
        const overlappingBooking = await Booking.findOne({
            room,
            $or: [
                {
                    checkIn: { $lte: new Date(checkOut) },
                    checkOut: { $gte: new Date(checkIn) }
                }
            ],
            // Exclude cancelled bookings from overlap check
            status: { $nin: ['cancelled'] }
        });

        if (overlappingBooking) {
            return res.status(400).json({ msg: 'Room is already booked for these dates' });
        }

        // Calculate total price
        const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
        const totalPrice = roomDoc.price * days;

        const newBooking = new Booking({
            user: req.body.user || req.user.id, // Prefer guest _id from body, fallback to logged-in user
            room,
            checkIn,
            checkOut,
            totalPrice,
            guests,
            specialRequests,
            status: 'confirmed' // Set initial booking status to confirmed
        });

        const booking = await newBooking.save();

        // Update room status to Reserved
        roomDoc.status = 'Reserved';
        await roomDoc.save();

        res.json(booking);
    } catch (err) {
        console.error('Error in createBooking:', err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update booking status
// @access  Private (Admin/Staff)
exports.updateBookingStatus = async (req, res) => {
    if (!['admin', 'staff'].includes(req.user.role)) {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        const { status } = req.body;
        booking.status = status;

        // Update room status based on booking status
        const room = await Room.findById(booking.room);
        if (room) {
            if (status === 'checked-out' || status === 'cancelled') {
                console.log("available")
                room.status = 'Available';
            } else if (status === 'checked-in') {
                console.log("booked")
                room.status = 'Booked';
            }
            await room.save();
        }

        await booking.save();
        res.json(booking);
    } catch (err) {
        console.error('Error in updateBookingStatus:', err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Booking not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Update a booking (more general update)
// @access  Private (Admin/Staff)
exports.updateBooking = async (req, res) => {
  if (!['admin', 'staff'].includes(req.user.role)) {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  const { room, checkIn, checkOut, guests, specialRequests, registrationNumber, discount, status } = req.body;

  // Build update object
  const updateFields = {};
  if (room) updateFields.room = room;
  if (checkIn) updateFields.checkIn = checkIn;
  if (checkOut) updateFields.checkOut = checkOut;
  if (guests) updateFields.guests = guests; // Assuming guests is an object { adults, children }
  if (specialRequests) updateFields.specialRequests = specialRequests;
  if (registrationNumber !== undefined) updateFields.registrationNumber = registrationNumber; // Allow setting to null/empty
  if (discount !== undefined) updateFields.discount = discount; // Allow setting to 0
  if (status) updateFields.status = status;

  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    // Handle room status update if room or status is changed
    if (status && booking.status !== status) {
        const roomDoc = await Room.findById(booking.room);
         if (roomDoc) {
            if (status === 'checked-out' || status === 'cancelled') {
                roomDoc.status = 'Available';
            } else if (status === 'checked-in') {
                roomDoc.status = 'Booked';
             } else if (status === 'Booked' || status === 'Reserved') {
                 roomDoc.status = 'Booked';
             } else if (status === 'pending' && roomDoc.status === 'Booked') { // If booking goes to pending, room should be available IF it was previously booked
                 roomDoc.status = 'Available';
             }
            await roomDoc.save();
         }
    } else if (room && booking.room.toString() !== room) {
         // If room is changed, update status of old and new rooms
         const oldRoom = await Room.findById(booking.room);
         if(oldRoom) { oldRoom.status = 'Available'; await oldRoom.save(); }

         const newRoom = await Room.findById(room);
         if(newRoom) { newRoom.status = 'Booked'; await newRoom.save(); }
    }

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    ).populate('user', 'name email')
     .populate('room', 'roomNumber type'); // Populate after update

    res.json(booking);
  } catch (err) {
    console.error('Error in updateBooking:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a booking
// @access  Private (Admin/Staff)
exports.deleteBooking = async (req, res) => {
    if (!['admin', 'staff'].includes(req.user.role)) {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        // Update room status to Available before deleting the booking
        const room = await Room.findById(booking.room);
        if (room) {
            room.status = 'Available';
            await room.save();
        }

        await Booking.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Booking removed' });
    } catch (err) {
        console.error('Error in deleteBooking:', err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Booking not found' });
        }
        res.status(500).send('Server Error');
    }
}; 