'use client';

import { useRecurringStore } from '../store/useRecurringStore';
import React from 'react';


const options = ['daily', 'weekly', 'monthly'];

export default function FrequencySelector() {
  const { frequency, setFrequency } = useRecurringStore();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Select Frequency
      </h2>

      <div className="border-2 border-white rounded-xl p-4 shadow-lg bg-sky-300 max-w-fit mx-auto flex gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setFrequency(option)}
            className={`px-4 py-2 rounded-md transition duration-300 font-medium ${
              frequency === option
                ? 'bg-white text-blue-950'
                : 'bg-blue-700 text-white hover:bg-blue-950'
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
