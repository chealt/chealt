const localFormatDate = (dateString) => {
  if (!dateString) {
    return '';
  }

  return new Intl.DateTimeFormat().format(new Date(dateString));
};

export { localFormatDate };
