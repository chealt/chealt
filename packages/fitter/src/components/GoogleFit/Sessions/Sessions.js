import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { loadSessions } from './api';
import { Context } from '../../context';
import { Card, CardBody, CardSubtitle, CardTitle } from '../../Card';

const Sessions = () => {
  const { dateFormat, googleUser, googleSessions, setGoogleSessions, timeFormat } = useContext(Context);
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
        {googleSessions.map(({ id, name, startTime }) => (
          <Card key={id}>
            <CardBody>
              <CardTitle>
                <h2>{name}</h2>
              </CardTitle>
              <CardSubtitle>
                <div>{new Intl.DateTimeFormat('default', dateFormat).format(startTime)}</div>
                <div>{new Intl.DateTimeFormat('default', timeFormat).format(startTime)}</div>
              </CardSubtitle>
            </CardBody>
          </Card>
        ))}
      </div>
    )
  );
};

export default Sessions;