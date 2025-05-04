export const calculateCycleDates = (
    startDate: Date,
    frequencyDays: number,
    repetitions: number
  ): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < repetitions; i++) {
      const cycleDate = new Date(startDate);
      cycleDate.setDate(cycleDate.getDate() + i * frequencyDays);
      dates.push(cycleDate);
    }
    return dates;
  };
