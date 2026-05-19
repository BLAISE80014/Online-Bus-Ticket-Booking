import React, { createContext, useContext, useMemo, useReducer } from "react";

const BookingContext = createContext(null);

const initialState = {
  from: "",
  to: "",
  travelDate: "",
  travelTime: "",
  departTime: "",
  selectedSeats: [],
  busType: "",
  busId: "",
  passengerInfo: {
    fullname: "",
    email: "",
    phone: "",
    altPhone: "",
  },
};

function bookingReducer(state, action) {
  switch (action.type) {
    case "SET_FROM":
      return { ...state, from: action.payload };
    case "SET_TO":
      return { ...state, to: action.payload };
    case "SET_TRAVEL_DATE":
      return { ...state, travelDate: action.payload };
    case "SET_TRAVEL_TIME":
      return { ...state, travelTime: action.payload };
    case "SET_DEPART_TIME":
      return { ...state, departTime: action.payload };
    case "SET_SELECTED_SEATS":
      return { ...state, selectedSeats: action.payload };
    case "TOGGLE_SEAT": {
      const seatNumber = action.payload;
      const exists = state.selectedSeats.includes(seatNumber);
      if (exists) {
        return {
          ...state,
          selectedSeats: state.selectedSeats.filter((s) => s !== seatNumber),
        };
      }
      if (state.selectedSeats.length >= 10) {
        alert("You can only select a maximum of 10 seats.");
        return state;
      }
      return { ...state, selectedSeats: [...state.selectedSeats, seatNumber] };
    }
    case "SET_BUS":
      return {
        ...state,
        busType: action.payload.busType ?? "",
        busId: action.payload.busId ?? "",
      };
    case "SET_PASSENGER_INFO":
      return {
        ...state,
        passengerInfo: { ...state.passengerInfo, ...action.payload },
      };
    case "RESET_BOOKING":
      return initialState;
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const value = useMemo(() => {
    return {
      booking: state,
      setFrom: (from) => dispatch({ type: "SET_FROM", payload: from }),
      setTo: (to) => dispatch({ type: "SET_TO", payload: to }),
      setTravelDate: (travelDate) =>
        dispatch({ type: "SET_TRAVEL_DATE", payload: travelDate }),
      setTravelTime: (travelTime) =>
        dispatch({ type: "SET_TRAVEL_TIME", payload: travelTime }),
      setDepartTime: (departTime) =>
        dispatch({ type: "SET_DEPART_TIME", payload: departTime }),
      toggleSeat: (seatNumber) =>
        dispatch({ type: "TOGGLE_SEAT", payload: seatNumber }),
      setSelectedSeats: (selectedSeats) =>
        dispatch({ type: "SET_SELECTED_SEATS", payload: selectedSeats }),
      setBus: (busType, busId) =>
        dispatch({ type: "SET_BUS", payload: { busType, busId } }),
      setPassengerInfo: (info) =>
        dispatch({ type: "SET_PASSENGER_INFO", payload: info }),
      resetBooking: () => dispatch({ type: "RESET_BOOKING" }),
    };
  }, [state]);

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
