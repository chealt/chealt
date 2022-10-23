import { signal } from '@preact/signals';

const selectedProfileId = signal();

const state = () => ({
  selectedProfileId
});

const setSelectedProfileId = (id) => {
  selectedProfileId.value = id;
};

export { state, setSelectedProfileId };
