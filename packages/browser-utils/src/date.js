const localFormatDate = (dateString) => new Intl.DateTimeFormat().format(new Date(dateString));

export { localFormatDate };
