'use client';

import { useRecurringStore } from '../store/useRecurringStore';
import { useState, useMemo } from 'react';
import { format, addDays, addWeeks, addMonths, isBefore, isAfter } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FrequencySelector from './FrequencySelector';

export default function CalendarView() {
  const { frequency } = useRecurringStore();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const recurringDates = useMemo(() => {
    if (!selectedStartDate || !selectedEndDate) return [];

    const base = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    const result = [];

    let nextDate = base;

    while (!isAfter(nextDate, end)) {
      result.push(nextDate);
      if (frequency === 'daily') nextDate = addDays(nextDate, 1);
      else if (frequency === 'weekly') nextDate = addWeeks(nextDate, 1);
      else if (frequency === 'monthly') nextDate = addMonths(nextDate, 1);
    }

    return result;
  }, [selectedStartDate, selectedEndDate, frequency]);

  const recurringDateStrings = useMemo(
    () => recurringDates.map((d) => format(d, 'yyyy-MM-dd')),
    [recurringDates]
  );

  return (
    <div className="mt-8 space-y-6">

      <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-10">
      
        <div className="w-full md:w-auto">
          <FrequencySelector />
        </div>

      
        <div className="flex flex-col md:flex-row gap-6">
 
          <div className="border-2 border-white rounded-xl p-4 shadow-lg bg-blue-900">
            <h2 className="text-xl font-bold mb-2 text-white text-center">
              Start Date
            </h2>
            <Calendar
              onClickDay={(value) => setSelectedStartDate(value)}
              value={selectedStartDate}
              tileClassName={({ date }) => {
                const dateStr = format(date, 'yyyy-MM-dd');
                return recurringDateStrings.includes(dateStr) ? 'highlight' : null;
              }}
            />
          </div>

        
          <div className="border-2 border-white rounded-xl p-4 shadow-lg bg-blue-900">
            <h2 className="text-xl font-bold mb-2 text-white text-center">
              End Date
            </h2>
            <Calendar
              onClickDay={(value) => setSelectedEndDate(value)}
              value={selectedEndDate}
              tileDisabled={({ date }) =>
                selectedStartDate ? isBefore(date, selectedStartDate) : false
              }
            />
          </div>
        </div>
      </div>


      {selectedStartDate && selectedEndDate && (
        <div className="mt-4 text-white text-center">
          <p className="font-semibold mb-2">
            {frequency.charAt(0).toUpperCase() + frequency.slice(1)} dates from{' '}
            {format(selectedStartDate, 'yyyy-MM-dd')} to{' '}
            {format(selectedEndDate, 'yyyy-MM-dd')}:
          </p>
          <ul className="list-disc list-inside">
            {recurringDateStrings.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </div>
      )}


      <style jsx global>{`
        .highlight {
          background: #bfdbfe !important;
          border-radius: 55% !important;
          color: black !important;
        }
      `}</style>
    </div>
  );
}
