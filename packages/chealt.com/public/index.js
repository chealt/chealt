import { LocationProvider, Router, Route, ErrorBoundary, hydrate, prerender as ssr } from 'preact-iso';
import Home from './pages/home/index.js';
import Documents from './pages/documents/index.js';
import NotFound from './pages/_404.js';
import Header from './Header/Header.js';
import swURL from 'sw:./sw.js'; // eslint-disable-line import/no-unresolved

navigator.serviceWorker.register(swURL);

const App = () => (
  <LocationProvider>
    <Header />
    <main>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/documents" component={Documents} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </main>
  </LocationProvider>
);

hydrate(<App />);

const prerender = async (data) => await ssr(<App {...data} />);

export { prerender, App };
