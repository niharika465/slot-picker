import { render, screen, fireEvent } from '@testing-library/react';
import AvailableSlots from '../available-slots';
import { SlotTime } from 'types';

// Sample data for available slots
const mockAvailableSlots: SlotTime = [
  { displayTime: '09:00' },
  { displayTime: '09:30' },
  { displayTime: '10:00' },
];

describe('AvailableSlots', () => {
  const setSelectedTime = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders available slots', () => {
    const { asFragment } = render(
      <AvailableSlots
        availableSlots={mockAvailableSlots}
        setSelectedTime={setSelectedTime}
        selectedTime=""
      />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Available time slots')).toBeInTheDocument();
    expect(
      screen.getByText('Each session lasts for 30 minutes')
    ).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('09:30')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  test('does not render when no available slots', () => {
    render(
      <AvailableSlots
        availableSlots={[]}
        setSelectedTime={setSelectedTime}
        selectedTime=""
      />
    );

    expect(screen.queryByText('Available time slots')).not.toBeInTheDocument();
  });

  test('calls setSelectedTime when a slot is clicked', () => {
    render(
      <AvailableSlots
        availableSlots={mockAvailableSlots}
        setSelectedTime={setSelectedTime}
        selectedTime=""
      />
    );

    fireEvent.click(screen.getByText('09:00'));
    expect(setSelectedTime).toHaveBeenCalledWith('09:00');

    fireEvent.click(screen.getByText('10:00'));
    expect(setSelectedTime).toHaveBeenCalledWith('10:00');
  });

  test('highlights the selected slot', () => {
    const selectedTime = '09:30';

    render(
      <AvailableSlots
        availableSlots={mockAvailableSlots}
        setSelectedTime={setSelectedTime}
        selectedTime={selectedTime}
      />
    );

    const selectedSlot = screen.getByText(selectedTime).closest('div');
    expect(selectedSlot).toHaveClass('available-slot__card--selected');
  });
});
