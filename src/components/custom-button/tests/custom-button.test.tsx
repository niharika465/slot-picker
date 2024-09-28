import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from '../custom-button';

describe('CustomButton Component', () => {
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test('renders with the correct label', () => {
    render(
      <CustomButton
        label="Click Me"
        onClick={onClickMock}
        styles={{ base: 'btn' }}
      />
    );

    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });

  test('applies the base class correctly', () => {
    render(
      <CustomButton
        label="Click Me"
        onClick={onClickMock}
        styles={{ base: 'btn' }}
      />
    );

    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('btn'); // Check if base class is applied
  });

  test('applies conditional classes correctly', () => {
    render(
      <CustomButton
        label="Click Me"
        onClick={onClickMock}
        styles={{ base: 'btn', conditionals: { 'btn--active': true } }}
      />
    );

    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('btn--active'); // Check if conditional class is applied
  });

  test('calls onClick when clicked and not disabled', () => {
    render(
      <CustomButton
        label="Click Me"
        onClick={onClickMock}
        styles={{ base: 'btn' }}
      />
    );

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1); // Check if onClick was called
  });

  test('does not call onClick when disabled', () => {
    render(
      <CustomButton
        label="Click Me"
        onClick={onClickMock}
        disabled={true}
        styles={{ base: 'btn' }}
      />
    );

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(onClickMock).not.toHaveBeenCalled(); // Check if onClick was not called
  });
});
