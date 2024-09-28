import { SlotTime } from 'types';

type Slot = {
  displayDate: string;
  displayTime: string;
  displayTimeEnd: string;
  startTimeUtc: number;
  endTimeUtc: number;
};

type GroupedSlots = {
  [key: string]: SlotTime;
};

const convertSlots = (slots: Slot[]): GroupedSlots => {
  const groupedSlots: GroupedSlots = {};

  slots.forEach((slot) => {
    const { displayDate, displayTime } = slot;

    if (!groupedSlots[displayDate]) {
      groupedSlots[displayDate] = [];
    }

    groupedSlots[displayDate].push({ displayTime });
  });

  return groupedSlots;
};

export default convertSlots;
