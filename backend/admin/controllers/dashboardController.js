const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Guest = require('../models/Guest');
const Deal = require('../models/Deal');
const dayjs = require('dayjs');

exports.getOverview = async (req, res) => {
  try {
    // Today's date range
    const todayStart = dayjs().startOf('day').toDate();
    const todayEnd = dayjs().endOf('day').toDate();

    // Today's Check-in: Bookings with checkIn today
    const todaysCheckIn = await Booking.countDocuments({ checkIn: { $gte: todayStart, $lte: todayEnd } });
    // Today's Check-out: Bookings with checkOut today
    const todaysCheckOut = await Booking.countDocuments({ checkOut: { $gte: todayStart, $lte: todayEnd } });
    // Total in hotel: Bookings where today is between checkIn and checkOut (inclusive)
    const inHotel = await Booking.countDocuments({ checkIn: { $lte: todayEnd }, checkOut: { $gte: todayStart } });
    // Available rooms: Rooms with status 'Available'
    const availableRoom = await Room.countDocuments({ status: 'Available' });
    // Occupied rooms: Rooms with status 'Booked' only
    const occupiedRoom = await Room.countDocuments({ status: 'Booked' });
    // Reserved rooms: Rooms with status 'Reserved'
    const reservedRoom = await Room.countDocuments({ status: 'Reserved' });

    res.json({
      todaysCheckIn,
      todaysCheckOut,
      inHotel,
      availableRoom,
      occupiedRoom,
      reservedRoom
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch dashboard overview' });
  }
};

// New: Get room summary for dashboard
exports.getRoomSummary = async (req, res) => {
  try {
    // 1. Group rooms by type, get min price and min capacity for each type
    const roomAgg = await Room.aggregate([
      {
        $group: {
          _id: '$type',
          total: { $sum: 1 },
          available: { $sum: { $cond: [{ $eq: ['$status', 'Available'] }, 1, 0] } },
          minPrice: { $min: '$price' },
          minCapacity: { $min: '$capacity' }
        }
      }
    ]);
    // 2. Count deals per room type
    const deals = await Deal.find({ status: { $in: ['Ongoing', 'New'] } });
    const dealsByType = {};
    deals.forEach(deal => {
      (deal.roomType.split(',').map(t => t.trim().toLowerCase())).forEach(type => {
        dealsByType[type] = (dealsByType[type] || 0) + 1;
      });
    });
    // 3. Standard room types and display names
    const standardTypes = [
      { key: 'single', label: 'Single sharing' },
      { key: 'double', label: 'Double sharing' },
      { key: 'triple', label: 'Triple sharing' },
      { key: 'vip', label: 'VIP Suit' },
      { key: 'suite', label: 'Suite Suit' }
    ];
    // 4. Map aggregation to standard types
    const aggMap = {};
    roomAgg.forEach(r => { aggMap[r._id] = r; });
    const result = standardTypes.map(t => {
      const r = aggMap[t.key] || {};
      return {
        type: t.label,
        deals: dealsByType[t.key] || 0,
        count: r.total !== undefined ? `${r.available}/${r.total}` : '0/0',
        price: r.minPrice !== undefined ? r.minPrice : 0,
        capacity: r.minCapacity !== undefined ? r.minCapacity : 0
      };
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch room summary' });
  }
}; 