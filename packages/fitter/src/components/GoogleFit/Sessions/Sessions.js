import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { loadSessions } from './api';
import { Context } from '../../context';
import { Card, CardBody, CardFooter, CardSubtitle, CardTitle } from '../../Card';
import ActivityType from '../ActivityType/ActivityType';
import MoveMinutes from '../MoveMinutes/MoveMinutes';
import Distance from '../Distance/Distance';

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
      <>
        {googleSessions.map(({ endTimeMillis, id, name, startTime, startTimeMillis, activityType }) => (
          <Card key={id}>
            <CardBody>
              <CardTitle>
                <h2>{name}</h2>
              </CardTitle>
              <CardSubtitle>
                <div>{new Intl.DateTimeFormat('default', dateFormat).format(startTime)}</div>
                <div>{new Intl.DateTimeFormat('default', timeFormat).format(startTime)}</div>
              </CardSubtitle>
              <CardFooter>
                <ActivityType type={activityType} />
                <Distance startTimeMillis={startTimeMillis} endTimeMillis={endTimeMillis} />
                {' in '}
                <MoveMinutes startTimeMillis={startTimeMillis} endTimeMillis={endTimeMillis} />
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </>
    )
  );
};

export default Sessions;
