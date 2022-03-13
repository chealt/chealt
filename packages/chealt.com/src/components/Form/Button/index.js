import { defineCustomElement } from 'vue';

import Button from './Button.ce.vue';

const ButtonElement = defineCustomElement(Button);

customElements.define('chealt-button', ButtonElement);
