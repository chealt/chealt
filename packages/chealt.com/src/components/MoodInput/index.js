import { defineCustomElement } from 'vue';

import MoodInput from './MoodInput.ce.vue';

const MoodInputElement = defineCustomElement(MoodInput);

customElements.define('mood-input', MoodInputElement);
