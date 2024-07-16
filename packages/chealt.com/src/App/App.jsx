import { useState } from 'preact/hooks';
import { LocationProvider, Router, Route, ErrorBoundary } from 'preact-iso';

import { createAppState, AppState } from './state';
import CheckUps from '../CheckUps/CheckUps';
import Documents from '../Documents/Documents';
import ViewDocument from '../Documents/View';
import FamilyHistory from '../FamilyHistory/FamilyHistory';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Integrations from '../Integrations/Integrations';
import IntlProvider from '../Intl/IntlProvider';
import LayoutContainer from '../Layout/Container';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import NotFound from '../NotFound/NotFound';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import Profiles from '../Profiles/Profiles';
import ProfileProvider from '../Profiles/Provider';
import Share from '../Share/Share';
import Toast from '../Toast/Toast';
import Vaccinations from '../Vaccinations/Vaccinations';

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
                    <Route path="/documents/edit/:documentKey" component={Documents} />
                    <Route
                      path="/documents/view/:encodedDocumentKey/:refererPage"
                      component={ViewDocument}
                    />
                    <Route path="/share" component={Share} />
                    <Route path="/personal-details" component={PersonalDetails} />
                    <Route path="/check-ups" component={CheckUps} />
                    <Route path="/integrations" component={Integrations} />
                    <Route path="/vaccinations" component={Vaccinations} />
                    <Route path="/vaccinations/:action" component={Vaccinations} />
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
