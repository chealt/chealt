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
    <Toast>No sessions found between 2020-01-01 and 2020-02-02</Toast>
  </>
);

export default Home;
