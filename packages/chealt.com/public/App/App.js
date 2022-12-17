import classNames from 'classnames';
import { LocationProvider, Router, Route } from 'preact-iso';
import lazy, { ErrorBoundary } from 'preact-iso/lazy';
import { useState } from 'preact/hooks';

import Header from '../Header/Header';
import IntlProvider from '../Intl/IntlProvider';
import LayoutContainer from '../Layout/Container';
import ProfileProvider from '../Profiles/Provider';
import Toast from '../Toast/Toast';
import { createAppState, AppState } from './state';

import styles from './App.module.css';

const Home = lazy(() => import(`../pages/Home`));
const Documents = lazy(() => import(`../pages/Documents`));
const View = lazy(() => import('../pages/View'));
const PersonalDetails = lazy(() => import('../pages/PersonalDetails'));
const Share = lazy(() => import('../pages/Share'));
const CheckUps = lazy(() => import('../pages/CheckUps'));
const Vaccinations = lazy(() => import('../pages/Vaccinations'));
const Profiles = lazy(() => import('../pages/Profiles'));
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
              <main class={classNames({ [styles.loading]: isLoading })}>
                <LayoutContainer largeLimit>
                  <Router
                    onLoadStart={() =>
                      (isInitialRender ? (isInitialRender = false) : setIsLoading(true))
                    }
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
                    <Route path="/vaccinations" component={Vaccinations} />
                    <Route path="/profiles" component={Profiles} />
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
