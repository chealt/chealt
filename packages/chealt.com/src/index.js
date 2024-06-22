import 'preact/debug';
import { hydrate, prerender as ssr } from 'preact-iso';

import App from './App/App';

hydrate(<App />);

const prerender = async (data) => await ssr(<App {...data} />);

export { prerender };
