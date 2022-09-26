const save = ({ instance, key, value }) => instance.save({ type: 'vaccinations', key, value });

export { save };
