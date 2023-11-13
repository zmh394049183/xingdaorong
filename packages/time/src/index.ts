export function isYesterday(timestamp: number, now = new Date().getTime()) {
  const yesterday = new Date(now - 24 * 60 * 60 * 1000);
  const date = new Date(timestamp);
  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  );
}

export const formatTimeView = (
  timestamp: number,
  now = new Date().getTime(),
) => {
  const diff = now - timestamp;
  const date = new Date(timestamp);
  const getMinutes = `${date.getMinutes()}`.padStart(2, '0');
  const getHours = `${date.getHours()}`.padStart(2, '0');
  const timeStr = `${getHours}:${getMinutes}`;
  if (diff < 60 * 1000) {
    return '刚刚';
  } else if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))}分钟前`;
  } else if (isYesterday(timestamp, now)) {
    return `昨天 ${timeStr}`;
  } else if (diff < 24 * 60 * 60 * 1000) {
    return timeStr;
  } else {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }
};
