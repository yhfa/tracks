import fd from 'format-duration';

export const formatTime = (timeInSeconds = 0) => {
  return fd(timeInSeconds * 1000);
};

export const formatData = (date = new Date()) => {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
};
