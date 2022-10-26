/*
 * Returns an object of the form data
 *
 * return { fieldName: fieldValue };
 */
const getFormData = (form) => {
  const formData = {};

  for (const [key, value] of new FormData(form)) {
    formData[key] = value;
  }

  return formData;
};

export { getFormData };
