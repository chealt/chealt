import { h } from 'preact';

import GoogleSessions from '../../components/GoogleFit/Sessions/Sessions'

import style from './style.css';

const Home = () => (
  <div class={style.home}>
    <h1>Sessions</h1>
    <GoogleSessions />
  </div>
);

export default Home;
