import { LocationProvider, Router, Route, ErrorBoundary, hydrate, prerender as ssr } from 'preact-iso';
import Home from './pages/home/index.js';
import Upload from './pages/upload/index.js';
import NotFound from './pages/_404.js';
import Header from './Header/Header.js';

const App = () => (
  <LocationProvider>
    <Header />
    <main>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </main>
  </LocationProvider>
);

hydrate(<App />);

const prerender = async (data) => await ssr(<App {...data} />);

export { prerender, App };
