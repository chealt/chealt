import { setSelectedProfileId } from './signals';

const createDefaultProfile = ({ instance }) => {
  const id = crypto.randomUUID();

  instance.save({
    type: 'profiles',
    key: id,
    value: { id, name: 'default', isSelected: true }
  });

  return id;
};

const initProfiles = async ({ instance }) => {
  const profiles = await instance.list({ type: 'profiles' });

  if (!profiles?.length) {
    const profileId = await createDefaultProfile({ instance });

    setSelectedProfileId(profileId);
  } else {
    const selectedProfileId = profiles.find(({ value: { isSelected } }) => isSelected).value.id;

    setSelectedProfileId(selectedProfileId);
  }
};

const sanitizeLoadedProfiles = async ({ profiles, loadedProfiles, saveProfile }) => {
  // set all current profiles' selected flag to false
  for (const profile of profiles) {
    const { key, value } = profile;

    await saveProfile({ key, value: { ...value, isSelected: false } });
  }

  // overwrite the selected profile based on the loaded profiles
  const selectedProfileId = loadedProfiles.find(({ value: { isSelected } }) => isSelected).value.id;

  setSelectedProfileId(selectedProfileId);
};

export { initProfiles, sanitizeLoadedProfiles };
