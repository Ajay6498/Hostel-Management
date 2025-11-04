# Roles & Permissions

Roles control what pages and actions are available.

| Role | Overview | Bookings | Guests | Rooms | Staff | Reports | Settings |
|------|----------|----------|--------|-------|-------|---------|----------|
| owner | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| admin | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| manager | Yes | Yes | Yes | Yes | Yes | Yes | No |
| user | Limited (Available rooms + Book) | Yes (own only) | Yes | No | No | No | No |

- Navigation only shows links you can access.
- Route guards enforce access with `ProtectedRoute` and `RoleRoute`.

