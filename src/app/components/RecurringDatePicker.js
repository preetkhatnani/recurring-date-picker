'use client';

import { useRecurringStore } from '../store/useRecurringStore';
import { useState } from 'react';
import React from 'react';
import { format, addDays, addWeeks, addMonths } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FrequencySelector from './FrequencySelector'; 

export default function RecurringDatePicker() {
  const { frequency } = useRecurringStore();
  const [selectedDate, setSelectedDate] = useState(null);

  const generateRecurringDates = () => {
    if (!selectedDate) return [];

    const base = new Date(selectedDate);
    const result = [base]; 

    if (frequency === 'daily') {
      for (let i = 1; i <= 7; i++) {
        result.push(addDays(base, i));
      }
    } else if (frequency === 'weekly') {
      for (let i = 1; i <= 4; i++) {
        result.push(addWeeks(base, i));
      }
    } else if (frequency === 'monthly') {
      for (let i = 1; i <= 6; i++) {
        result.push(addMonths(base, i));
      }
    }

    return result;
  };

  const recurringDates = generateRecurringDates();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Recurring Date Picker</h2>

      <FrequencySelector />

      <div aria-label="Start Date Calendar">
        <Calendar
          onClickDay={(value) => setSelectedDate(value)}
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              const formatted = format(date, 'yyyy-MM-dd');
              return recurringDates.some((d) =>
                format(d, 'yyyy-MM-dd') === formatted
              )
                ? 'highlight'
                : null;
            }
          }}
        />
      </div>

      <style jsx>{`
        .highlight {
          background: #facc15 !important; /* yellow-400 */
          border-radius: 50%;
          color: black !important;
        }
      `}</style>

      {selectedDate && (
        <div className="mt-4">
          <p className="font-semibold mb-2">Next {frequency} dates:</p>
          <ul className="list-disc pl-5">
            {recurringDates.map((date, index) => (
              <li key={index} data-testid="preview-date">
                {format(date, 'yyyy-MM-dd')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
