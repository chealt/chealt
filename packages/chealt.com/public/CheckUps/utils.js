const findDetails = (items, profileId) =>
  (items.length && items.find(({ value }) => value.profileId === profileId)) || {};

const byProfileId =
  (selectedProfileId) =>
  ({ value: { profileId } }) =>
    profileId === selectedProfileId;
const withCheckUpTag =
  (checkUpTags) =>
  ({ value: { tags } }) =>
    tags && checkUpTags.some((tag) => tags.includes(tag));

export { findDetails, byProfileId, withCheckUpTag };
