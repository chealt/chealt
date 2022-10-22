const createDefaultProfile = ({ instance }) => {
  const id = crypto.randomUUID();

  instance.save({
    type: 'profiles',
    key: id,
    value: { id, name: 'default', isSelected: true }
  });
};

const initProfiles = async ({ instance }) => {
  const profiles = await instance.list({ type: 'profiles' });

  if (!profiles?.length) {
    await createDefaultProfile({ instance });
  }
};

export { initProfiles };
