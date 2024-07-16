import 'preact/debug';
import { hydrate, prerender as ssr } from 'preact-iso';

import App from './App/App';
import { mockClientSide } from './utils';

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app'));
} else {
  mockClientSide();
}

const prerender = async (data) => await ssr(<App {...data} />);

export { prerender };
