import { defineCustomElement } from 'vue';

import Header from './Header.ce.vue';

const HeaderElement = defineCustomElement(Header);

customElements.define('main-header', HeaderElement);
