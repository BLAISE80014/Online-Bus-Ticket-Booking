import React from "react";
import { useBooking } from "../../context/BookingContext";

function Destination() {
  const { booking, setFrom, setTo } = useBooking();

  // Rwanda Locations
  const locations = [
    // Kigali
    "Kigali - Nyarugenge",
    "Kigali - Gasabo",
    "Kigali - Kicukiro",

    // Northern Province
    "Musanze",
    "Burera",
    "Gicumbi",
    "Rulindo",
    "Gakenke",

    // Southern Province
    "Huye",
    "Nyanza",
    "Nyamagabe",
    "Ruhango",
    "Muhanga",
    "Kamonyi",
    "Gisagara",

    // Western Province
    "Rubavu",
    "Rusizi",
    "Nyamasheke",
    "Karongi",
    "Rutsiro",
    "Ngororero",
    "Nyabihu",

    // Eastern Province
    "Nyagatare",
    "Gatsibo",
    "Kayonza",
    "Rwamagana",
    "Kirehe",
    "Ngoma",
    "Bugesera",
  ].sort();

  return (
    <div className="w-full space-y-5">
      {/* TITLE */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          Choose Destination
        </h2>

        <p className="text-sm text-neutral-500 mt-1">
          Select your departure and arrival locations
        </p>
      </div>

      {/* SELECTS */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* FROM */}
        <div>
          <label
            htmlFor="from"
            className="block mb-2 font-semibold text-neutral-700 dark:text-neutral-200">
            From
          </label>

          <select
            id="from"
            name="from"
            value={booking.from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 px-4 h-12 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="">Select Departure Location</option>

            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* TO */}
        <div>
          <label
            htmlFor="to"
            className="block mb-2 font-semibold text-neutral-700 dark:text-neutral-200">
            To
          </label>

          <select
            id="to"
            name="to"
            value={booking.to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 px-4 h-12 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="">Select Arrival Location</option>

            {locations
              .filter((loc) => loc !== booking.from)
              .map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* SELECTED ROUTE */}
      {(booking.from || booking.to) && (
        <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900 rounded-xl p-4 flex flex-wrap items-center gap-3">
          {booking.from && (
            <div className="flex items-center gap-2">
              <span className="text-xl">🚌</span>

              <div>
                <p className="text-xs text-neutral-500">Departure</p>

                <p className="font-semibold text-violet-700 dark:text-violet-300">
                  {booking.from}
                </p>
              </div>
            </div>
          )}

          {booking.from && booking.to && (
            <div className="text-2xl text-violet-500 font-bold">→</div>
          )}

          {booking.to && (
            <div className="flex items-center gap-2">
              <span className="text-xl">📍</span>

              <div>
                <p className="text-xs text-neutral-500">Arrival</p>

                <p className="font-semibold text-violet-700 dark:text-violet-300">
                  {booking.to}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* LOCATION COUNT */}
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <span>📍</span>

        <span>{locations.length} locations available across Rwanda</span>
      </div>
    </div>
  );
}

export default Destination;
