import { createContext } from 'preact';

import { state as profiles } from '../Profiles/signals';

const createAppState = () => ({
  profiles
});

const AppState = createContext();

export { createAppState, AppState };
