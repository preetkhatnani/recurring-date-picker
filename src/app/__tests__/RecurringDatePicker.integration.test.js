import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecurringDatePicker from '../page';

describe('RecurringDatePicker Integration Test', () => {
  test('User selects Weekly, picks weekdays, and sees calendar preview', () => {
    render(<RecurringDatePicker />);

    // Step 1: Click on "Weekly"
    const weeklyButton = screen.getByText(/Weekly/i);
    fireEvent.click(weeklyButton);

    // Step 2: Select weekdays — Mon and Wed
    const monBtn = screen.getAllByText(/Mon/i).find(el => el.tagName === 'BUTTON');
    const wedBtn = screen.getAllByText(/Wed/i).find(el => el.tagName === 'BUTTON');
    
    fireEvent.click(monBtn);
    fireEvent.click(wedBtn);

    // Step 3: Calendar should be visible
    const calendar = screen.getByLabelText('Start Date Calendar');
    expect(calendar).toBeInTheDocument();
  });
});
