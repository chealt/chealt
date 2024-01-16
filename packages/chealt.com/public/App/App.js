import { useState } from 'preact/hooks';
import { LocationProvider, Router, Route, ErrorBoundary, lazy } from 'preact-iso';

import { createAppState, AppState } from './state';
import Header from '../Header/Header';
import IntlProvider from '../Intl/IntlProvider';
import LayoutContainer from '../Layout/Container';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import ProfileProvider from '../Profiles/Provider';
import Toast from '../Toast/Toast';

const Home = lazy(() => import(`../pages/Home`));
const Documents = lazy(() => import(`../pages/Documents`));
const View = lazy(() => import('../pages/View'));
const PersonalDetails = lazy(() => import('../pages/PersonalDetails'));
const Share = lazy(() => import('../pages/Share'));
const CheckUps = lazy(() => import('../pages/CheckUps'));
const Vaccinations = lazy(() => import('../pages/Vaccinations'));
const Integrations = lazy(() => import('../pages/Integrations'));
const Profiles = lazy(() => import('../pages/Profiles'));
const FamilyHistory = lazy(() => import(`../pages/FamilyHistory`));
const NotFound = lazy(() => import('../pages/_404'));

let isInitialRender = true;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ErrorBoundary>
      <AppState.Provider value={createAppState()}>
        <ProfileProvider>
          <IntlProvider>
            <LocationProvider>
              <Header />
              <main>
                <LayoutContainer largeLimit>
                  {isLoading && <LoadingIndicator />}
                  <Router
                    onLoadStart={() => {
                      if (isInitialRender) {
                        isInitialRender = false;
                      } else {
                        setIsLoading(true);
                      }
                    }}
                    onRouteChange={() => setIsLoading(false)}
                  >
                    <Route path="/" component={Home} />
                    <Route path="/documents" component={Documents} />
                    <Route
                      path="/documents/view/:encodedDocumentKey/:refererPage"
                      component={View}
                    />
                    <Route path="/share" component={Share} />
                    <Route path="/personal-details" component={PersonalDetails} />
                    <Route path="/check-ups" component={CheckUps} />
                    <Route path="/integrations" component={Integrations} />
                    <Route path="/vaccinations" component={Vaccinations} />
                    <Route path="/profiles" component={Profiles} />
                    <Route path="/family-history" component={FamilyHistory} />
                    <Route path="/family-history/:action" component={FamilyHistory} />
                    <Route default component={NotFound} />
                  </Router>
                </LayoutContainer>
              </main>
              <Toast />
            </LocationProvider>
          </IntlProvider>
        </ProfileProvider>
      </AppState.Provider>
    </ErrorBoundary>
  );
};

export default App;
