const findDetails = (items, profileId) =>
  (items.length && items.find(({ value }) => value.profileId === profileId)) || {};

export { findDetails };
