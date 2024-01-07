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

export { getConditions, getLocalVaccinations };
