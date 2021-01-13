import { h } from 'preact';
import { Router } from 'preact-router';

import AppProvider from './context';
import Header from './Header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';

const App = () => (
  <AppProvider>
    <div id="app">
      <Header />
      <Router>
        <Home path="/" />
      </Router>
    </div>
  </AppProvider>
)

export default App;
