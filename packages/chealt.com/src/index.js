import 'preact/debug';
import { hydrate, prerender as ssr } from 'preact-iso';
// import swURL from 'sw:./sw.js'; // eslint-disable-line import/no-unresolved

import App from './App/App';

// SSR
// if (typeof navigator !== 'undefined') {
  // navigator.serviceWorker.register(swURL);
// }

hydrate(<App />);

const prerender = async (data) => await ssr(<App {...data} />);

export { prerender };
