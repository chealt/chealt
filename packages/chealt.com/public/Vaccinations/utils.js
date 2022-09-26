const deleteItem = ({ instance, items }) =>
  Promise.all(items.map((key) => instance.deleteItem({ type: 'vaccinations', key })));

const save = ({ instance, key, value }) => instance.save({ type: 'vaccinations', key, value });

export { deleteItem, save };
