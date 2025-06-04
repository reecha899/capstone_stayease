const Guest = require('../models/Guest');

// @desc    Get all guests
// @route   GET /api/guests
// @access  Private (Admin/Staff)
exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json(guests);
  } catch (err) {
    console.error('Error in getAllGuests:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get guest by ID
// @route   GET /api/guests/:id
// @access  Private (Admin/Staff)
exports.getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id).select('-__v');
    if (!guest) {
      return res.status(404).json({ msg: 'Guest not found' });
    }
    res.json(guest);
  } catch (err) {
    console.error('Error in getGuestById:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guest not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Create a guest
// @route   POST /api/guests
// @access  Private (Admin/Staff)
exports.createGuest = async (req, res) => {
  try {
    // Check if guest with same passport or email already exists
    const existingGuest = await Guest.findOne({
      $or: [
        { passport: req.body.passport },
        { email: req.body.email.toLowerCase() }
      ]
    });

    if (existingGuest) {
      return res.status(400).json({
        msg: 'Guest with this passport number or email already exists'
      });
    }

    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json(guest);
  } catch (err) {
    console.error('Error in createGuest:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        msg: 'Invalid data',
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Update a guest
// @route   PUT /api/guests/:id
// @access  Private (Admin/Staff)
exports.updateGuest = async (req, res) => {
  try {
    // Check if updating passport or email would create a duplicate
    if (req.body.passport || req.body.email) {
      const existingGuest = await Guest.findOne({
        $and: [
          { _id: { $ne: req.params.id } },
          {
            $or: [
              { passport: req.body.passport },
              { email: req.body.email?.toLowerCase() }
            ]
          }
        ]
      });

      if (existingGuest) {
        return res.status(400).json({
          msg: 'Guest with this passport number or email already exists'
        });
      }
    }

    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!guest) {
      return res.status(404).json({ msg: 'Guest not found' });
    }

    res.json(guest);
  } catch (err) {
    console.error('Error in updateGuest:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        msg: 'Invalid data',
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guest not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Delete a guest
// @route   DELETE /api/guests/:id
// @access  Private (Admin/Staff)
exports.deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest) {
      return res.status(404).json({ msg: 'Guest not found' });
    }
    res.json({ msg: 'Guest deleted successfully' });
  } catch (err) {
    console.error('Error in deleteGuest:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guest not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
}; 