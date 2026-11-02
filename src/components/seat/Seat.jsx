import React, { useEffect, useState } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { MdOutlineChair } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { useBooking } from "../../context/BookingContext";
import { useLanguage } from "../../context/LanguageContext";
import { publicRequest } from "../../utils/api";

const SeatItem = ({ seatNumber, isSelected, isBooked, disabled, onClick }) => {
  const getSeatColor = () => {
    if (isBooked) return "text-red-500";
    if (isSelected) return "text-violet-600";
    return "text-neutral-600";
  };

  return (
    <button
      type="button"
      aria-label={`Seat ${seatNumber}${isBooked ? ", booked" : ""}`}
      disabled={disabled || isBooked}
      title={`Seat ${seatNumber}`}
      className={`p-0 text-3xl ${
        disabled || isBooked
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:text-violet-400"
      } ${getSeatColor()}`}
      onClick={onClick}>
      <MdOutlineChair className="-rotate-90" />
    </button>
  );
};

const Seat = () => {
  const { booking, toggleSeat } = useBooking();
  const { t } = useLanguage();
  const selectedSeats = booking.selectedSeats;
  const totalSeats = Number(booking.busDetails?.passengers) || 0;
  const [bookedSeats, setBookedSeats] = useState([]);
  const [availabilityState, setAvailabilityState] = useState("incomplete");
  const [availabilityError, setAvailabilityError] = useState("");

  useEffect(() => {
    if (
      !booking.busId ||
      !booking.from ||
      !booking.to ||
      !booking.travelDate ||
      !booking.departTime
    ) {
      setAvailabilityState("incomplete");
      setBookedSeats([]);
      return;
    }

    let active = true;
    setAvailabilityState("loading");
    setAvailabilityError("");
    const query = new URLSearchParams({
      busId: String(booking.busId),
      from: booking.from,
      to: booking.to,
      travelDate: booking.travelDate,
      departTime: booking.departTime,
    });
    publicRequest(`/availability?${query}`)
      .then(({ seats }) => {
        if (!active) return;
        const reserved = seats.map(Number);
        setBookedSeats(reserved);
        setAvailabilityState("ready");
      })
      .catch((error) => {
        if (!active) return;
        setAvailabilityError(error.message);
        setAvailabilityState("error");
      });
    return () => {
      active = false;
    };
  }, [
    booking.busId,
    booking.from,
    booking.to,
    booking.travelDate,
    booking.departTime,
  ]);

  const handleSeatClick = (seatNumber) => {
    toggleSeat(seatNumber);
  };

  const seatPrice = Number(booking.busPrice) || 0;
  const canChooseSeat = availabilityState === "ready" && seatPrice > 0;

  return (
    <div className="space-y-5">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
        {t("Choose a Seat")}
      </h2>

      {/* Bus */}
      <div className="w-full flex gap-x-5">
        <div className="w-10 border-r-2 border-dashed border-neutral-300 dark:border-neutral-800">
          <GiSteeringWheel className="text-3xl mt-6 text-violet-600 -rotate-90" />
        </div>

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: totalSeats }, (_, index) => {
            const seatNumber = index + 1;
            return (
              <SeatItem
                key={seatNumber}
                seatNumber={seatNumber}
                isSelected={selectedSeats.includes(seatNumber)}
                isBooked={bookedSeats.includes(seatNumber)}
                disabled={!canChooseSeat}
                onClick={() => handleSeatClick(seatNumber)}
              />
            );
          })}
        </div>
      </div>

      {availabilityState === "incomplete" && (
        <p className="text-sm text-neutral-500">
          Choose a route, travel date, and departure time to see available seats.
        </p>
      )}
      {availabilityState === "loading" && (
        <p role="status" className="text-sm text-neutral-500">
          Checking live seat availability...
        </p>
      )}
      {availabilityState === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Could not check seat availability: {availabilityError}
        </p>
      )}
      {availabilityState === "ready" && (
        <p className="text-sm text-green-700">
          {Math.max(0, totalSeats - bookedSeats.length)} seats available
        </p>
      )}

      {/* Legend */}
      <div className="space-y-3 w-28">
        <div className="flex items-center gap-x-2">
          <MdOutlineChair className="text-lg text-neutral-600 -rotate-90" />
          <p className="text-sm">{t("Available")}</p>
        </div>

        <div className="flex items-center gap-x-2">
          <MdOutlineChair className="text-lg text-red-500 -rotate-90" />
          <p className="text-sm">{t("Booked")}</p>
        </div>

        <div className="flex items-center gap-x-2">
          <MdOutlineChair className="text-lg text-violet-600 -rotate-90" />
          <p className="text-sm">{t("Selected")}</p>
        </div>

        <div className="flex items-center gap-x-2">
          <FaMoneyBillWave className="text-lg text-neutral-600" />
          <p className="text-sm">RWF {seatPrice.toLocaleString()}</p>
        </div>
      </div>

      {/* Selected seats */}
      {selectedSeats.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold">{t("Selected Seats:")}</h3>
          <div className="flex flex-wrap">
            {selectedSeats.map((seat) => (
              <div
                key={seat}
                className="w-10 h-10 rounded-md m-1.5 text-lg font-medium bg-violet-600/30 flex items-center justify-center">
                {seat}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total price */}
      {selectedSeats.length > 0 && (
        <div className="mt-5 flex items-center gap-x-4">
          <h3 className="text-lg font-bold">{t("Total Price:")}</h3>
          <p className="text-lg font-medium">
            RWF {(selectedSeats.length * seatPrice).toLocaleString()}
          </p>
          <span className="text-sm text-neutral-400">(Including taxes)</span>
        </div>
      )}
    </div>
  );
};

export default Seat;