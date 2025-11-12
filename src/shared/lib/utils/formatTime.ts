export const time = {
  toHhMm: (minutes: number): string => {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0');
    const m = Math.floor(minutes % 60)
      .toString()
      .padStart(2, '0');
    return `${h}:${m}`;
  },
  toMinutes: (val: string): number => {
    const [h, m] = val.split(':').map(Number);

    return h * 60 + m;
  },

  fromSeconds: (seconds: number): number => seconds / 60,
};
