# StayEase Admin Backend

This is the **Admin Backend** for the StayEase Hotel Management System. It provides RESTful APIs for managing rooms, bookings, guests, deals, rates, and dashboard analytics for hotel administrators.

---

## Features
- User authentication (JWT-based)
- Room management (CRUD)
- Booking management (CRUD)
- Guest management
- Deals and rates management
- Dashboard analytics (real-time overview, room summary)
- Role-based access (admin only)
- CORS and security middleware

---

## Tech Stack
- **Node.js** (Express.js)
- **MongoDB** (Mongoose ODM)
- **JWT** for authentication
- **Day.js** for date handling

---

## Getting Started

### 1. Clone the Repository
```bash
cd backend/admin
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in this folder with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/stayease
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server (Development)
```bash
npm run dev
```

The server will start on `http://localhost:5000` by default.

---

## API Endpoints (Overview)

- **Auth:** `/api/auth/login`, `/api/auth/register`
- **Rooms:** `/api/rooms` (GET, POST, PUT, DELETE)
- **Bookings:** `/api/bookings` (GET, POST, PUT, DELETE)
- **Guests:** `/api/guests` (GET, POST, PUT, DELETE)
- **Deals:** `/api/deals` (GET, POST, PUT, DELETE)
- **Rates:** `/api/rates` (GET, POST, PUT, DELETE)
- **Dashboard:**
  - `/api/dashboard/overview` (GET)
  - `/api/dashboard/rooms-summary` (GET)

All endpoints (except login/register) require a valid JWT token in the `Authorization` header.

---

## Folder Structure
```
admin/
  controllers/   # Route logic
  models/        # Mongoose schemas
  routes/        # Express routes
  middleware/    # Auth, error, etc.
  server.js      # Entry point
  ...
```

---

## Troubleshooting
- **MongoDB not running?**
  - Make sure MongoDB is installed and running on your machine.
- **CORS issues?**
  - The backend allows CORS for local frontend development. Adjust in `server.js` if needed.
- **JWT errors?**
  - Check your `JWT_SECRET` and token expiration.

---

## License
This project is for educational/demo purposes. 