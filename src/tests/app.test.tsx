import { render, screen, fireEvent } from '@testing-library/react';
import App from '../app';
import convertSlots from '../helpers/convertSlots';
import getDaysAndWeekdays from '../helpers/getWeekday';

// Mocking dependencies
jest.mock('../helpers/convertSlots', () => jest.fn());
jest.mock('../helpers/getWeekday', () => jest.fn());

// Mock class for IntersectionObserver
class IntersectionObserverMock {
  private callback: IntersectionObserverCallback;
  private observedElements: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(element: Element) {
    this.observedElements.push(element);
    // Trigger the callback
    this.callback(
      [
        {
          isIntersecting: true,
          boundingClientRect: element.getBoundingClientRect(),
          intersectionRatio: 1,
          target: element,
          time: 0,
        } as IntersectionObserverEntry,
      ],
      this // Pass the mock instance as the second argument
    );
  }

  unobserve(element: Element) {
    this.observedElements = this.observedElements.filter((e) => e !== element);
  }

  disconnect() {
    this.observedElements = [];
  }

  // Added these properties incase typescript doesn't recognize them
  get root() {
    return null;
  }

  get rootMargin() {
    return '';
  }

  get thresholds() {
    return [];
  }

  takeRecords() {
    return [];
  }
}

// global scope for the observer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).IntersectionObserver = IntersectionObserverMock;

const mockSlots = {
  '2023-10-01': [{ displayTime: '09:00' }, { displayTime: '10:00' }],
  '2023-10-02': [{ displayTime: '09:00' }, { displayTime: '10:00' }],
};

beforeEach(() => {
  (convertSlots as jest.Mock).mockReturnValue(mockSlots);
  (getDaysAndWeekdays as jest.Mock).mockReturnValue([
    { day: '01', weekday: 'Mon', date: '2023-10-01' },
    { day: '02', weekday: 'Tue', date: '2023-10-02' },
  ]);
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the component successfully', () => {
  const { asFragment } = render(<App />);
  // match withe snapshot
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByText('Pick a date')).toBeInTheDocument();
});

test('the Book button should be disabled when no slot timing is selected', () => {
  render(<App />);
  const button = screen.getByText('Book');
  expect(button).toHaveClass('button--disabled');
});

test('the Book button should be enabled when a slot timing is selected', () => {
  render(<App />);

  // selecting a slot: triggered onclick
  fireEvent.click(screen.getByText('01'));

  // selecting a time: triggered onclick
  fireEvent.click(screen.getByText('09:00'));

  const button = screen.getByText('Book');
  expect(button).not.toHaveClass('button--disabled');
});

test('when Book button is clicked: goes back to initial state', () => {
  render(<App />);

  // selecting a slot: triggered onclick
  fireEvent.click(screen.getByText('01'));

  // selecting a time: triggered onclick
  fireEvent.click(screen.getByText('09:00'));

  const bookButton = screen.getByText('Book');
  // Click the Book button
  fireEvent.click(bookButton);
  // after clicking the button , everything goes back to initial state and button is disabled again
  expect(bookButton).toHaveClass('button--disabled');
});

test.skip('handleReset should be triggered on Cancel button click', () => {
  // selecting a slot: triggered onclick
  fireEvent.click(screen.getByText('01'));

  // selecting a time: triggered onclick
  fireEvent.click(screen.getByText('09:00'));

  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);

  // After cancel, the selected slot and time should be reset and the button is disabled again
  expect(cancelButton).toHaveClass('button--disabled');
});
