import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { loadSessions } from './api';
import { Context } from '../../context';
import Card from '../../Card/Card';

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
      <div>
        {googleSessions.map((session) => (
          <Card key={session.id}>
            {new Intl.DateTimeFormat('default', dateFormat).format(session.startTime)}
          </Card>
        ))}
      </div>
    )
  );
};

export default Sessions;
