import vaccinations from './vaccinations.json';

const getLocalVaccinations = (locale) => vaccinations[locale]?.items;

const getConditions = ({ vaccinationName, locale }) => {
  const localVaccinations = getLocalVaccinations(locale);
  const vaccination = localVaccinations?.find(({ name }) => name === vaccinationName);

  if (vaccination?.conditions) {
    return vaccination.conditions.map(({ name }) => name).join(',');
  }

  return undefined;
};

const findItems = (items, profileId) =>
  (items.length && items.filter(({ value }) => value.profileId === profileId)) || [];

export { getConditions, getLocalVaccinations, findItems };
