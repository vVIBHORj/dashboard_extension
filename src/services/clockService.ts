export const clockService = {
  /**
   * Get formatted time string object for given timezone
   */
  getTimeForZone(timezone: string, use24Hour: boolean = true) {
    const now = new Date();
    
    // Format hours, minutes, seconds using Intl.DateTimeFormat
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !use24Hour
    });

    const parts = timeFormatter.formatToParts(now);
    let hours = '00';
    let minutes = '00';
    let seconds = '00';

    parts.forEach(p => {
      if (p.type === 'hour') hours = p.value;
      if (p.type === 'minute') minutes = p.value;
      if (p.type === 'second') seconds = p.value;
    });

    // Date formatting (e.g. TUE, MAY 12)
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const dateStr = dateFormatter.format(now).toUpperCase(); // e.g. TUE, MAY 12

    return {
      hours,
      minutes,
      seconds,
      dateStr,
      fullTimeStr: `${hours}:${minutes}`
    };
  },

  /**
   * Format milliseconds into MM:SS.ms or HH:MM:SS
   */
  formatDuration(ms: number) {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const centis = Math.floor((ms % 1000) / 10);

    const pad = (n: number) => n.toString().padStart(2, '0');

    return {
      hours: pad(hours),
      minutes: pad(mins),
      seconds: pad(secs),
      centis: pad(centis)
    };
  }
};
