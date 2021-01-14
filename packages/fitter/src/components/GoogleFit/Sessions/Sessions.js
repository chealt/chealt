import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { loadSessions } from './api';
import { Context } from '../../context';

const Sessions = () => {
  const { dateFormat, googleUser, googleSessions, setGoogleSessions } = useContext(Context);
  const accessToken = googleUser && googleUser.getAuthResponse(true).access_token;

  useEffect(() => {
    if (accessToken) {
      (async () => {
        const sessions = await loadSessions(accessToken);

        setGoogleSessions(sessions);
      })()
    }
  }, [accessToken, setGoogleSessions]);

  return (
    googleSessions && (
      <ul>
        {googleSessions.map((session) => (
          <li key={session.id}>
            {new Intl.DateTimeFormat('default', dateFormat).format(session.startTime)}
          </li>
        ))}
      </ul>
    )
  );
};

export default Sessions;
