import { render, screen, fireEvent } from '@testing-library/react';
import Slider from '../slider';
import { DateInfo } from 'types';

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

const mockCards: DateInfo[] = [
  { day: '30', weekday: 'Mon', date: '2024-09-30' },
  { day: '01', weekday: 'Tue', date: '2024-10-01' },
  { day: '02', weekday: 'Wed', date: '2024-10-02' },
  { day: '03', weekday: 'Thu', date: '2024-09-03' },
  { day: '04', weekday: 'Fri', date: '2024-10-04' },
  { day: '05', weekday: 'Sat', date: '2024-10-05' },
];

describe('Slider', () => {
  const setSelectedSlot = jest.fn();

  test('renders cards', () => {
    const { asFragment } = render(
      <Slider
        cards={mockCards}
        setSelectedSlot={setSelectedSlot}
        heading="Pick a date"
        selectedSlot=""
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(
      <Slider
        cards={mockCards}
        setSelectedSlot={setSelectedSlot}
        heading="Pick a date"
        selectedSlot=""
      />
    );

    expect(screen.getByTestId('ArrowForwardIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ArrowBackIcon')).toBeInTheDocument();
  });

  test('does not navigate back when at the beginning', () => {
    render(
      <Slider
        cards={mockCards}
        setSelectedSlot={setSelectedSlot}
        heading="Pick a date"
        selectedSlot=""
      />
    );

    const backButton = screen
      .getByTestId('ArrowBackIcon')
      .closest('div') as HTMLDivElement;
    fireEvent.click(backButton);

    expect(backButton).toHaveClass('navigation-btn--disabled');
  });

  test('selects a card and calls setSelectedSlot', () => {
    render(
      <Slider
        cards={mockCards}
        setSelectedSlot={setSelectedSlot}
        heading="Pick a date"
        selectedSlot=""
      />
    );

    const card = screen.getByText('Mon');
    fireEvent.click(card);

    expect(setSelectedSlot).toHaveBeenCalledWith('2024-09-30');
  });

  test('highlights the selected card', () => {
    render(
      <Slider
        cards={mockCards}
        setSelectedSlot={setSelectedSlot}
        heading="Pick a date"
        selectedSlot="2024-09-30"
      />
    );

    const selectedCard = screen
      .getByText('Mon')
      .closest('.slide-item') as HTMLDivElement;
    fireEvent.click(selectedCard);
    expect(selectedCard).toHaveClass('slide-item--selected');
  });
});
