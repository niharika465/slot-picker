import { ReactElement, useId } from 'react';

import { SlotTime } from 'types';

import './available-slots.scss';

import classNames from 'classnames';

type AvailableSlots = {
  availableSlots: SlotTime;
  setSelectedTime: (time: string) => void;
  selectedTime: string;
};

const AvailableSlots = ({
  availableSlots,
  setSelectedTime,
  selectedTime,
}: AvailableSlots): ReactElement | null => {
  // will only be displayed when user will select a slot time
  if (!availableSlots?.length) {
    return null;
  }
  return (
    <div className="available-slot">
      <div className="available-slot__heading">Available time slots</div>
      <div className="available-slot__info">
        Each session lasts for 30 minutes
      </div>
      <div className="available-slot__card-list">
        {availableSlots.map(({ displayTime }) => {
          const id = useId();
          return (
            <div
              key={id}
              onClick={() => setSelectedTime(displayTime)}
              className={classNames('available-slot__card', {
                'available-slot__card--selected': selectedTime === displayTime,
              })}
            >
              {displayTime}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableSlots;
