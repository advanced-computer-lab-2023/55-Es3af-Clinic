import React, { useState } from 'react';
import doctorService from '../../services/doctorService';

const AddTimeSlots = () => {
  // const doctorId = "6525afac114367999aba79df";
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const handleAddTimeSlot = async () => {
    try {
      const existingTimeSlots = await doctorService.getTimeSlots();
  
      const isTimeSlotExist = existingTimeSlots.some(
        (slot) => slot.date === date && slot.startTime === startTime && slot.endTime === endTime
      );
  
      if (isTimeSlotExist) {
        setMessage('Time slot already added');
      } else {
        const response = await doctorService.addTimeSlots({
          availableTimeSlots: [{ date, startTime, endTime }],
        });
  
        if (response && response.status === 'success') {
          setMessage('Time slots added successfully');
        } else {
          setMessage('Error adding time slots');
        }
      }
    } catch (error) {
      console.error('Error checking time slots or adding time slots:', error.message);
      setMessage('Error adding time slots');
    }
  };
  

  return (
    <div>
      <h2>Add Available Time Slots</h2>
      <form>
        <label>Date:</label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Start Time:</label>
        <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

        <label>End Time:</label>
        <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

        <button type="button" onClick={handleAddTimeSlot}>
          Add Time Slot
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AddTimeSlots;
