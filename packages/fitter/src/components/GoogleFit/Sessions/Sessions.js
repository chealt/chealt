import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { Context } from '../../context';

const loadSessions = (accessToken) => (
  fetch("https://www.googleapis.com/fitness/v1/users/me/sessions", {
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then((response) => response.json())
    .then((sessions) => sessions.session
      .map(((session) => ({
        ...session,
        startTime: new Date(parseInt(session.startTimeMillis, 10))
      })))
      .sort((a, b) => b.startTime - a.startTime))
);

const Sessions = () => {
  const { googleUser, googleSessions, setGoogleSessions } = useContext(Context);
  const accessToken = googleUser && googleUser.getAuthResponse(true).access_token;
  const dateFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

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
            {new Intl.DateTimeFormat('default', dateFormatOptions).format(session.startTime)}
          </li>
        ))}
      </ul>
    )
  );
};

export default Sessions;
