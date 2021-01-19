import { h } from 'preact';

import Page from '../../components/Page/Page';
import GoogleSessions from '../../components/GoogleFit/Sessions/Sessions'
import Toast from '../../components/Toast/Toast';

const Home = () => (
  <>
    <Page>
      <h1>Sessions</h1>
      <GoogleSessions />
    </Page>
    <Toast />
  </>
);

export default Home;
