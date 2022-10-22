import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';
import lazy, { ErrorBoundary } from 'preact-iso/lazy';
import { useEffect, useState } from 'preact/hooks';
import swURL from 'sw:./sw.js'; // eslint-disable-line import/no-unresolved

import Header from './Header';
import { useObjectStore } from './IndexedDB/hooks';
import LayoutContainer from './Layout/Container';
import { initProfiles } from './Profiles/utils';
import Toast from './Toast';

navigator.serviceWorker.register(swURL);

const Home = lazy(() => import(`./pages/Home`));
const Documents = lazy(() => import(`./pages/Documents`));
const View = lazy(() => import('./pages/View'));
const PersonalDetails = lazy(() => import('./pages/PersonalDetails'));
const Share = lazy(() => import('./pages/Share'));
const Vaccinations = lazy(() => import('./pages/Vaccinations'));
const Profiles = lazy(() => import('./pages/Profiles'));
const NotFound = lazy(() => import('./pages/_404'));

const App = () => {
  const [isProfileInitialized, setIsProfilesInitialized] = useState(false);
  const { instance } = useObjectStore('profiles');

  useEffect(() => {
    (async () => {
      if (instance) {
        try {
          await initProfiles({ instance });

          setIsProfilesInitialized(true);
        } catch {
          setIsProfilesInitialized(true);
        }
      }
    })();
  }, [instance]);

  if (!isProfileInitialized) {
    return null;
  }

  return (
    <LocationProvider>
      <Header />
      <main>
        <LayoutContainer largeLimit>
          <ErrorBoundary>
            <Router>
              <Route path="/" component={Home} />
              <Route path="/documents" component={Documents} />
              <Route path="/documents/view/:encodedDocumentKey" component={View} />
              <Route path="/share" component={Share} />
              <Route path="/personal-details" component={PersonalDetails} />
              <Route path="/vaccinations" component={Vaccinations} />
              <Route path="/profiles" component={Profiles} />
              <Route default component={NotFound} />
            </Router>
          </ErrorBoundary>
        </LayoutContainer>
      </main>
      <Toast />
    </LocationProvider>
  );
};

hydrate(<App />);

const prerender = async (data) => await ssr(<App {...data} />);

export { prerender, App };
