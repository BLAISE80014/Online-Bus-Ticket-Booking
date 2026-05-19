import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

function Search() {
  const navigate = useNavigate();
  const { setFrom, setTo, setTravelDate, setTravelTime } = useBooking();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seat: "",
  });

  const locations = [
    "Kigali",
    "Musanze",
    "Rubavu",
    "Nyagatare",
    "Huye",
    "Muhanga",
    "Rusizi",
    "Kayonza",
    "Rwamagana",
    "Bugesera",
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Update context
    if (id === "from") setFrom(value);
    if (id === "to") setTo(value);
    if (id === "date") setTravelDate(value);
    if (id === "time") setTravelTime(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!formData.from || !formData.to) {
      alert("Please select both departure and arrival locations");
      return;
    }

    navigate("/bus");
  };

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 my-[8ch]">
      <div className="w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md p-8">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 items-end">
            <div>
              <label htmlFor="from" className="block mb-2 font-semibold">
                From
              </label>
              <select
                id="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
                required>
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="to" className="block mb-2 font-semibold">
                To
              </label>
              <select
                id="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
                required>
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block mb-2 font-semibold">
                Travel Date
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
              />
            </div>

            <div>
              <label htmlFor="time" className="block mb-2 font-semibold">
                Travel Time
              </label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 h-12 bg-violet-600 text-neutral-50 text-base font-normal rounded-md hover:bg-violet-700 transition-colors">
                Search Buses
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
