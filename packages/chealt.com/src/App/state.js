import { createContext } from 'preact';

import { state as intl } from '../Intl/signals';
import { state as profiles } from '../Profiles/signals';

const createAppState = () => ({
  intl,
  profiles
});

const AppState = createContext();

export { createAppState, AppState };
