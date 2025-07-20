import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FrequencySelector from '../components/FrequencySelector';
import { useRecurringStore } from '../store/useRecurringStore';

beforeEach(() => {
  const { setFrequency } = useRecurringStore.getState();
  setFrequency(null);
});

test('renders all frequency options', () => {
  render(<FrequencySelector />);
  expect(screen.getByText(/Daily/i)).toBeInTheDocument();
  expect(screen.getByText(/Weekly/i)).toBeInTheDocument();
  expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
});

test('clicking on "Weekly" selects it', () => {
  render(<FrequencySelector />);

  const weeklyOption = screen.getByText(/Weekly/i);
  fireEvent.click(weeklyOption);

  const updatedWeeklyOption = screen.getByText(/Weekly/i);
  expect(updatedWeeklyOption).toHaveClass('bg-white');
  expect(updatedWeeklyOption).toHaveClass('text-blue-950');

  expect(useRecurringStore.getState().frequency).toBe('weekly');
});
