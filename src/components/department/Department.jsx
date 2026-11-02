import React, { useEffect, useState } from "react";
import { useBooking } from "../../context/BookingContext";

function Department() {
  const { booking, setDepartTime } = useBooking();
  const [departBus, setDepartBus] = useState(booking.departTime || "");
  const departures = booking.busDetails?.routeInfo?.departures || [];

  useEffect(() => {
    if (departBus && !departures.includes(departBus)) {
      setDepartBus("");
      setDepartTime("");
    }
  }, [departures, departBus, setDepartTime]);

  const handleDepartBusChange = (e) => {
    const value = e.target.value;
    setDepartBus(value);
    setDepartTime(value);
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
        Choose Departure Time
      </h2>
      <div className="w-full">
        <label htmlFor="departbus" className="block mb-2 font-semibold">
          Depart Time
        </label>
        <select
          id="departbus"
          name="departbus"
          value={departBus}
          onChange={handleDepartBusChange}
          className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-11 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900">
          <option value="">Select a Time</option>
          {departures.map((departure) => (
            <option key={departure} value={departure}>
              {departure}
            </option>
          ))}
        </select>
      </div>

      {departBus && (
        <div className="w-full text-sm text-neutral-700 dark:text-neutral-200">
          ⏰ Bus departs at: <span className="font-medium">{departBus}</span>
        </div>
      )}
    </div>
  );
}

export default Department;
