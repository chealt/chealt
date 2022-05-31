import { LocationProvider, Router, Route, ErrorBoundary, hydrate, prerender as ssr } from 'preact-iso';
import Home from './pages/Home';
import Documents from './pages/Documents';
import PersonalDetails from './pages/PersonalDetails';
import View from './pages/View';
import NotFound from './pages/_404';
import Header from './Header';
import swURL from 'sw:./sw.js'; // eslint-disable-line import/no-unresolved
import LayoutContainer from './Layout/Container';

navigator.serviceWorker.register(swURL);

const App = () => (
  <LocationProvider>
    <Header />
    <main>
      <LayoutContainer largeLimit>
        <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/documents" component={Documents} />
            <Route path="/documents/view/:encodedDocumentKey" component={View} />
            <Route path="/personal-details" component={PersonalDetails} />
            <Route default component={NotFound} />
          </Router>
        </ErrorBoundary>
      </LayoutContainer>
    </main>
  </LocationProvider>
);

hydrate(<App />);

const prerender = async (data) => await ssr(<App {...data} />);

export { prerender, App };
