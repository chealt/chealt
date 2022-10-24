import { createContext } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import lazy, { ErrorBoundary } from 'preact-iso/lazy';

import Header from '../Header';
import LayoutContainer from '../Layout/Container';
import ProfileProvider from '../Profiles/Provider';
import Toast from '../Toast';
import { createAppState } from './utils';

const Home = lazy(() => import(`../pages/Home`));
const Documents = lazy(() => import(`../pages/Documents`));
const View = lazy(() => import('../pages/View'));
const PersonalDetails = lazy(() => import('../pages/PersonalDetails'));
const Share = lazy(() => import('../pages/Share'));
const Vaccinations = lazy(() => import('../pages/Vaccinations'));
const Profiles = lazy(() => import('../pages/Profiles'));
const NotFound = lazy(() => import('../pages/_404'));

const AppState = createContext();

const App = () => (
  <ErrorBoundary>
    <AppState.Provider value={createAppState()}>
      <ProfileProvider>
        <LocationProvider>
          <Header />
          <main>
            <LayoutContainer largeLimit>
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
            </LayoutContainer>
          </main>
          <Toast />
        </LocationProvider>
      </ProfileProvider>
    </AppState.Provider>
  </ErrorBoundary>
);

export { AppState };
export default App;
