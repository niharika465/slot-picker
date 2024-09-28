import React, { useEffect, useState } from 'react';

import './app.scss';

import CustomButton from './components/custom-button/custom-button';
import Slider from './slider/slider';
import AvailableSlots from './components/available-slots/available-slots';

import Slots from './mocks/slots.json';

import convertSlots from './helpers/convertSlots';
import getDaysAndWeekdays from './helpers/getWeekday';

const App: React.FC = () => {
  const slots = convertSlots(Slots);
  const slotsList = getDaysAndWeekdays(Object.keys(slots));

  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleReset = () => {
    setSelectedSlot('');
    setSelectedTime('');
  };

  useEffect(() => {
    setSelectedTime('');
  }, [selectedSlot]);

  const handleSlotSelection = () => {
    console.log('slot selected', selectedTime, selectedSlot);
    handleReset();
  };

  return (
    <div className="container">
      <Slider
        cards={slotsList}
        setSelectedSlot={setSelectedSlot}
        selectedSlot={selectedSlot}
        heading="Pick a date"
      />
      <AvailableSlots
        availableSlots={slots[selectedSlot]}
        setSelectedTime={setSelectedTime}
        selectedTime={selectedTime}
      />
      <div className="button__controls">
        <CustomButton
          label="Book"
          onClick={handleSlotSelection}
          disabled={!selectedTime}
          styles={{
            base: 'button',
            conditionals: { 'button--disabled': !selectedTime },
          }}
        />
        <CustomButton
          label="Cancel"
          onClick={handleReset}
          disabled={!selectedSlot}
          styles={{
            base: 'button',
            conditionals: { 'button--disabled': !selectedSlot },
          }}
        />
      </div>
    </div>
  );
};

export default App;
