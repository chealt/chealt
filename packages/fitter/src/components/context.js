import { h, createContext } from 'preact';
import { useState } from 'preact/hooks';

export const Context = createContext(null);

const AppProvider = ({ children }) => {
  const [isAuthMenuOpen, setAuthMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const [googleUser, setGoogleUser] = useState();
  const [googleSessions, setGoogleSessions] = useState();
  const [isLoadingAuth, setLoadingAuth] = useState(true);
  const [dateFormat, setDateFormat] = useState({
    weekday: 'short',
    month: 'short',
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
      isAuthMenuOpen,
      isLoadingAuth,
      timeFormat,
      toastMessage,
      setAuthMenuOpen,
      setDateFormat,
      setGoogleSessions,
      setGoogleUser,
      setLoadingAuth,
      setTimeFormat,
      setToastMessage
    }}>{children}</Context.Provider>
  );
};

export default AppProvider;
