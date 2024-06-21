const findItems = (items, profileId) =>
  (items.length && items.filter(({ value }) => value.profileId === profileId)) || [];

export { findItems };
