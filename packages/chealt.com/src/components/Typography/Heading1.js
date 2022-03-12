import { defineCustomElement } from 'vue';

import Heading1 from './Heading1.ce.vue';

const Heading1Element = defineCustomElement(Heading1);

customElements.define('heading-1', Heading1Element);
