import React, { useState } from "react";
import doctorService from "../../services/doctorService";
import "../../App.css"; // Import your global styles
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../gohome";

const AddTimeSlots = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  const handleAddTimeSlot = async () => {
    try {
      const existingTimeSlots = await doctorService.getTimeSlots();

      const isTimeSlotExist = existingTimeSlots.some(
        (slot) =>
          slot.date === date &&
          slot.startTime === startTime &&
          slot.endTime === endTime
      );

      if (isTimeSlotExist) {
        setMessage("Time slot already added");
      } else {
        const response = await doctorService.addTimeSlots({
          availableTimeSlots: [{ date, startTime, endTime }],
        });

        if (response && response.status === "success") {
          setMessage("Time slots added successfully");
        } else {
          setMessage("Error adding time slots");
        }
      }
    } catch (error) {
      console.error(
        "Error checking time slots or adding time slots:",
        error.message
      );
      setMessage("Error adding time slots");
    }
  };

  return (
    <div className="App">
      <Home />
      <header className="App-header">
      <h2>Add Available Time Slots</h2>
      <form>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            placeholder="mm/dd/yyyy"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="form-control"
          />
        </div>

        <button
          type="button"
          onClick={handleAddTimeSlot}
          className="btn btn-primary"
        >
          Add Time Slot
        </button>

        {message && <p>{message}</p>}
      </form>
      </header>
    </div>
  );
};

export default AddTimeSlots;
