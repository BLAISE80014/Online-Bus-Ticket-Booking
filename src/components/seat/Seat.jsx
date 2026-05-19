import React from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { MdOutlineChair } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useBooking } from "../../context/BookingContext";

const SeatItem = ({ seatNumber, isSelected, isBooked, onClick }) => {
  const getSeatColor = () => {
    if (isBooked) return "text-red-500";
    if (isSelected) return "text-violet-600";
    return "text-neutral-600";
  };

  return (
    <MdOutlineChair
      className={`text-3xl -rotate-90 cursor-pointer ${getSeatColor()} ${
        isBooked ? "cursor-not-allowed opacity-50" : "hover:text-violet-400"
      }`}
      onClick={!isBooked ? onClick : undefined}
    />
  );
};

const totalSeats = 41;
// Simulating booked seats (in real app, these would come from API)
const bookedSeats = [5, 12, 18, 25, 33, 40];

const Seat = () => {
  const { booking, toggleSeat } = useBooking();
  const selectedSeats = booking.selectedSeats;

  const handleSeatClick = (seatNumber) => {
    toggleSeat(seatNumber);
  };

  const renderSeats = () => {
    let seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <SeatItem
          key={i}
          seatNumber={i}
          isSelected={selectedSeats.includes(i)}
          isBooked={bookedSeats.includes(i)}
          onClick={() => handleSeatClick(i)}
        />
      );
    }
    return seats;
  };

  const seatPrice = 750;

  return (
    <div className="space-y-5">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
        Choose a Seat
      </h2>

      {/* Bus */}
      <div className="w-full flex gap-x-5">
        <div className="w-10 border-r-2 border-dashed border-neutral-300 dark:border-neutral-800">
          <GiSteeringWheel className="text-3xl mt-6 text-violet-600 -rotate-90" />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="grid grid-cols-10 gap-x-3">
            {renderSeats().slice(0, 10)}
          </div>

          <div className="grid grid-cols-10 gap-x-3">
            {renderSeats().slice(10, 20)}
          </div>

          <div className="grid grid-cols-10 gap-x-3">
            <div className="col-span-9"></div>
            {renderSeats().slice(20, 21)}
          </div>

          <div className="grid grid-cols-10 gap-x-3">
            {renderSeats().slice(21, 31)}
          </div>

          <div className="grid grid-cols-10 gap-x-3">
            {renderSeats().slice(31, 41)}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3 w-28">
        <div className="flex items-center gap-x-2">
          <MdOutlineChair className="text-lg text-neutral-600 -rotate-90" />
          <p className="text-sm">Available</p>
        </div>

        <div className="flex items-center gap-x-2">
          <MdOutlineChair className="text-lg text-red-500 -rotate-90" />
          <p className="text-sm">Booked</p>
        </div>

        <div className="flex items-center gap-x-2">
          <MdOutlineChair className="text-lg text-violet-600 -rotate-90" />
          <p className="text-sm">Selected</p>
        </div>

        <div className="flex items-center gap-x-2">
          <RiMoneyRupeeCircleLine className="text-lg text-neutral-600" />
          <p className="text-sm">Rs. {seatPrice}</p>
        </div>
      </div>

      {/* Selected seats */}
      {selectedSeats.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold">Selected Seats:</h3>
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
          <h3 className="text-lg font-bold">Total Price:</h3>
          <p className="text-lg font-medium">
            Rs. {selectedSeats.length * seatPrice}
          </p>
          <span className="text-sm text-neutral-400">(Including taxes)</span>
        </div>
      )}
    </div>
  );
};

export default Seat;