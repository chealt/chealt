import { defineCustomElement } from 'vue';

import App from './App.ce.vue';
import './index.css';

const AppElement = defineCustomElement(App);

customElements.define('chealt-app', AppElement);
