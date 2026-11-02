
# Online Bus Ticket Booking System (starter template)

This is just a starter template containing Navbar, Footer, and Theme Switcher Section. And also installed the required resources like react icons, framer motion, and other basic requirements.



## Installation

Install with npm

Clone the project

```bash
  git clone https://github.com/gtech-official08/bus-ticket-booking-setup.git
```

Remove `.git` an `README.md` if you want to push this repo on your github.com.

Go to the project directory

```bash
  cd my-project
```

Install dependencies

``` bash
npm install
```
OR 

```bash
npm i
```

## MongoDB backend setup

When the API connects, it creates these collections in the
`online-ticket-booking` database if they do not already exist:

- `users` — passenger and admin accounts; passwords are stored as hashes.
- `buses`, `routes`, `bookings`, and `payments`.
- `seatReservations` — reserved seats by bus, route, date, and departure time.
- `notifications`, `loginHistory`, `staff`, and `systemUsers`.
- `companySettings`, `paymentSettings`, `notificationSettings`, and
  `systemPreferences`.

The API also creates the email and record-ID indexes it needs. In MongoDB
Compass, connect with the same MongoDB URI, refresh the database list, and
expand `online-ticket-booking` to see the collections. The collections may be
empty until the system receives data.

The API seeds the eight listed Kigali routes with no assumed fares. Set each
route's fare in the admin dashboard before passengers can book it. Passengers
see only the administrator-configured price in RWF; seat availability is
checked and reserved in MongoDB for each bus, route, date, and departure.

1. Copy `server/.env.example` to `server/.env`.
2. Set `MONGODB_URI` to your MongoDB connection string and keep
   `MONGODB_DATABASE=online-ticket-booking`.
3. Set a long, unique `JWT_SECRET`, plus a strong `ADMIN_EMAIL` and
   `ADMIN_PASSWORD`. The first API start creates that admin account.
4. In one terminal, start the API:

   ```bash
   npm run server
   ```

5. In another terminal, start the website:

   ```bash
   npm run dev
   ```

The API is available at `http://localhost:5000`; its health check is
`http://localhost:5000/api/health`. Optionally copy `.env.example` to `.env` to
change `VITE_API_URL`. Never commit either `.env` file. For deployment, use
HTTPS and set `CLIENT_ORIGIN` to the deployed website's origin.

Existing browser-stored buses, routes, bookings, payments, notifications, and
settings are copied to MongoDB the first time an admin opens the dashboard with
an empty database. Existing browser-only passenger accounts must register again
because their passwords were stored locally and are not migrated.

Payment choices in checkout are demonstrations only. No payment provider is
connected, no money is charged, and passengers should never enter a payment
PIN, card details, or bank credentials. Bookings are saved with payment
pending until a real payment integration is configured.

If you want to see live project on your mobile or other local machine with same wifi connection.

```bash
npm run dev -- --host
```


## Usages

Don't forgot to insert this code on `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
}
```

To Enable `Dark & Light Mode` in the system.


## Features

- Light/dark mode toggle
- Live Seat booking
- Live Price Calculate
- Animation (framer motion)


## Tech Stack

**Client:** ReactJs, ViteJs, TailwindCSS


## Screenshots

![Screenshot_12-6-2024_113311_localhost](https://github.com/gtech-official08/bus-ticket-booking-setup/assets/127587520/b16296ca-cdf0-4ee0-860b-5db4ab440c72)


![Screenshot_12-6-2024_113619_localhost](https://github.com/gtech-official08/bus-ticket-booking-setup/assets/127587520/69afb87e-6b6d-4734-b1fb-06c70af0deb7)


![Screenshot_12-6-2024_113547_localhost](https://github.com/gtech-official08/bus-ticket-booking-setup/assets/127587520/abebeab0-11a1-41b3-a984-4c67a07195af)


![Screenshot_12-6-2024_113415_localhost](https://github.com/gtech-official08/bus-ticket-booking-setup/assets/127587520/b999fbc4-60dd-4cc5-8c3f-936548533c75)


![Screenshot_12-6-2024_113520_localhost](https://github.com/gtech-official08/bus-ticket-booking-setup/assets/127587520/6c45cfa5-55cb-4d8d-8dc8-f44772fd17b4)


![Screenshot_12-6-2024_113430_localhost](https://github.com/gtech-official08/bus-ticket-booking-setup/assets/127587520/d42269bf-2611-4995-9879-3b5954a89e25)



## See Demo

Live Demo:- 


### Full Video Tutorial
Video Link:- https://www.youtube.com/watch?v=1Guddi2MbOM 


## Author

- [@gtechofficial08](https://github.com/gtech-official08)


## Acknowledgements

 - [Awesome Readme Templates Generator](https://readme.so/)


## Support

For support, email gtech.official08@gmail.com or DM us on Instagram.


## Appendix

Don't Forgot to Subscribe, Like, Comment, & Share.
