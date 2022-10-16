const createDefaultProfile = ({ instance }) =>
  instance.save({
    type: 'profiles',
    key: crypto.randomUUID(),
    value: { name: 'default', isSelected: true }
  });

const initProfiles = async ({ instance }) => {
  const profiles = await instance.list({ type: 'profiles' });

  if (!profiles?.length) {
    await createDefaultProfile({ instance });
  }
};

export { initProfiles };
