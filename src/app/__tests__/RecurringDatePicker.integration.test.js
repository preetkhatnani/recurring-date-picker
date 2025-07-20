import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecurringDatePicker from '../page';

describe('RecurringDatePicker Integration Test', () => {
  test('User selects Weekly, picks weekdays, and sees calendar preview', () => {
    render(<RecurringDatePicker />);

    const weeklyButton = screen.getByText(/Weekly/i);
    fireEvent.click(weeklyButton);

    const monBtn = screen.getAllByText(/Mon/i).find(el => el.tagName === 'BUTTON');
    const wedBtn = screen.getAllByText(/Wed/i).find(el => el.tagName === 'BUTTON');
    
    fireEvent.click(monBtn);
    fireEvent.click(wedBtn);

    const calendar = screen.getByLabelText('Start Date Calendar');
    expect(calendar).toBeInTheDocument();
  });
});
