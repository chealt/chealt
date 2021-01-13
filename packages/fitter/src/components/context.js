import { h, createContext } from 'preact';
import { useState } from 'preact/hooks';

export const Context = createContext(null);

const AppProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState();
  const [googleSessions, setGoogleSessions] = useState();
  const [isLoadingAuth, setLoadingAuth] = useState(true);

  return (
    <Context.Provider value={{
      googleSessions,
      googleUser,
      isLoadingAuth,
      setGoogleSessions,
      setGoogleUser,
      setLoadingAuth
    }}>{children}</Context.Provider>
  );
};

export default AppProvider;
