export const time = {
  toHhMm: (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  },
  toSeconds: (input: string): number => {
    const trimmed = input.trim();
    if (trimmed.includes(':')) {
      const [h, m] = trimmed.split(':').map(Number);
      return (h || 0) * 3600 + (m || 0) * 60;
    }
    return Math.max(0, Number(trimmed) * 60);
  },
};
