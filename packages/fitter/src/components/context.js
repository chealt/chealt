import { h, createContext } from 'preact';
import { useState } from 'preact/hooks';

export const Context = createContext(null);

const AppProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState();
  const [googleSessions, setGoogleSessions] = useState();
  const [isLoadingAuth, setLoadingAuth] = useState(true);
  const [dateFormat, setDateFormat] = useState({
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  return (
    <Context.Provider value={{
      dateFormat,
      googleSessions,
      googleUser,
      isLoadingAuth,
      setDateFormat,
      setGoogleSessions,
      setGoogleUser,
      setLoadingAuth
    }}>{children}</Context.Provider>
  );
};

export default AppProvider;
