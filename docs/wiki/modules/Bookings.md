# Bookings

Path: `/bookings`

- Users can create a new booking via the form (guest name, room, check-in, nights). The selected room is automatically reserved.
- Users see only their own bookings; owner/admin/manager see all bookings.
- Non-user roles can cancel a booking.

Data sources:
- `src/data/rooms.js` – `getAvailableRooms()`, `reserveRoom()`
- `src/data/bookings.js` – `getBookings()`, `addBooking()`, `cancelBooking()`

