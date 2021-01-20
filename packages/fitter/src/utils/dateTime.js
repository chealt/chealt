const formatDate = (dateFormat, time) => new Intl.DateTimeFormat('default', dateFormat).format(time);

const formatTime = (timeFormat, time) => new Intl.DateTimeFormat('default', timeFormat).format(time);

export {
  formatDate,
  formatTime
};
