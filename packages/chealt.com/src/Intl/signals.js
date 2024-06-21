import { signal } from '@preact/signals';

const selectedLanguage = signal();

const state = {
  selectedLanguage
};

const setSelectedLanguage = (language) => {
  selectedLanguage.value = language;
};

export { state, setSelectedLanguage };
