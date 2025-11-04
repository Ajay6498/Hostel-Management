# Login & Registration

## Login
- Open `/login`
- Default accounts:
  - Owner: `owner@example.com` / `owner123`
  - Admin: `admin@example.com` / `admin123`
  - Manager: `manager@example.com` / `manager123`
  - User: `user@example.com` / `user123`

## Registration
- Open `/register`
- Choose role:
  - User: Full detailed form (User ID, Addresses, DOB, Mobile, Aadhaar, Qualification, Parent details, Gender, Marital status, Profession, Email, Password)
  - Manager: Basic form (Name, Email, Password)
- On smaller screens, the User form is multi-step with Next/Back and progress bar.
- After successful registration, you are auto-signed-in and redirected to the dashboard.

## Where data is stored
- Auth and users are stored in localStorage under keys:
  - `hostel_auth_user` (current session)
  - `hostel_auth_users` (registered users)

## Passwords
- Stored in localStorage for demo purposes only. Replace with real backend auth for production.

