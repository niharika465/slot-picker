import { DateInfo } from 'types';

const getDaysAndWeekdays = (dateStrings: string[]): DateInfo[] => {
  return dateStrings.map((dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Extract day and format to two digits
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    const weekday = date.toLocaleDateString('en-US', options); // Get short weekday

    return { day, weekday, date: dateString };
  });
};

export default getDaysAndWeekdays;
