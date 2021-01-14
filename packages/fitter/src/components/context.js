import { h, createContext } from 'preact';
import { useState } from 'preact/hooks';

export const Context = createContext(null);

const AppProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState();
  const [googleSessions, setGoogleSessions] = useState();
  const [isLoadingAuth, setLoadingAuth] = useState(true);
  const [dateFormat, setDateFormat] = useState({
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  const [timeFormat, setTimeFormat] = useState({
    hour: 'numeric',
    minute: 'numeric'
  })

  return (
    <Context.Provider value={{
      dateFormat,
      googleSessions,
      googleUser,
      isLoadingAuth,
      timeFormat,
      setDateFormat,
      setGoogleSessions,
      setGoogleUser,
      setLoadingAuth,
      setTimeFormat
    }}>{children}</Context.Provider>
  );
};

export default AppProvider;
