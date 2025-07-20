import { create } from 'zustand';

export const useRecurringStore = create((set) => ({
  frequency: 'daily',
  setFrequency: (frequency) => set({ frequency }),

  interval: 1,
  setInterval: (interval) => set({ interval }),

  excludedDates: [],
  toggleExcludedDate: (date) =>
    set((state) => {
      const exists = state.excludedDates.includes(date);
      return {
        excludedDates: exists
          ? state.excludedDates.filter((d) => d !== date)
          : [...state.excludedDates, date],
      };
    }),
}));
