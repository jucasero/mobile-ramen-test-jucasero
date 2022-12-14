interface TimeDiff {
  hrs: number;
  min: number;
  sec: number;
}

interface ElapsedTime {
  time: number;
  text: string;
  result: string;
}

/**
 * Get elapsed time from calendar date
 * @param {any} timestamp Epoch date (to date)
 * @returns {Object} elapsed hrs, min, secs
 */
export const getTimeDiff = (timestamp: any): TimeDiff => {
  timestamp = new Date(timestamp * 1000);
  const endTime: any = new Date();
  const intervals = {
    hrs: 3600,
    min: 60,
    sec: 1,
  };
  const timeDiff: any = (endTime - timestamp) / 1000; // seconds
  return {
    hrs: Math.round(timeDiff / intervals.hrs),
    min: Math.round(timeDiff / intervals.min),
    sec: Math.round(timeDiff / intervals.sec),
  };
};

/**
 * Get elapsed time result from calendar date
 * @param {any} timestamp Epoch date (to date)
 * @returns {Object} elapsed time, text, result
 */
export const getElapsedTime = (timestamp: any): ElapsedTime => {
  if (typeof timestamp === 'string')
    timestamp = new Date(timestamp).getTime() / 1000;
  const timeDiff = getTimeDiff(timestamp);
  let time = timeDiff.sec;
  let text = 'segundos';
  if (timeDiff.hrs > 0) {
    time = timeDiff.hrs;
    text = `hora${time > 1 ? 's' : ''}`;
  } else if (timeDiff.min > 0) {
    time = timeDiff.min;
    text = `minuto${time > 1 ? 's' : ''}`;
  }
  return { time, text, result: `hace ${time} ${text}` };
};
