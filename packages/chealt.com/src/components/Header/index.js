import { defineCustomElement } from 'vue';

import Header from './Header.ce.vue';

const HeaderElement = defineCustomElement(Header);

customElements.define('chealt-header', HeaderElement);
