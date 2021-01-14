import { h } from 'preact';

import Page from '../../components/Page/Page';
import GoogleSessions from '../../components/GoogleFit/Sessions/Sessions'

const Home = () => (
  <Page>
    <h1>Sessions</h1>
    <GoogleSessions />
  </Page>
);

export default Home;
