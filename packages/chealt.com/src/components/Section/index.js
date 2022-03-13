import { defineCustomElement } from 'vue';

import Section from './Section.ce.vue';

const SectionElement = defineCustomElement(Section);

customElements.define('chealt-section', SectionElement);
