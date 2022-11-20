import { signal } from '@preact/signals';

const selectedLanguage = signal(navigator.language || 'en-US');

const state = {
  selectedLanguage
};

const setSelectedLanguage = (language) => {
  selectedLanguage.value = language;
};

export { state, setSelectedLanguage };
