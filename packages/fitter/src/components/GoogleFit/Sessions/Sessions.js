import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { loadSessions, mergeSessions, getNextStartTimeMillis } from './api';
import { Context } from '../../context';
import { Card, CardBody, CardFooter, CardSubtitle, CardTitle } from '../../Card';
import ActivityType from '../ActivityType/ActivityType';
import MoveMinutes from '../MoveMinutes/MoveMinutes';
import Distance from '../Distance/Distance';
import HeartPoints from '../HeartPoints/HeartPoints';
import Button from '../../Button/Button';
import { formatTime, formatDate } from '../../../utils/dateTime';
import NoSessionsToast from './NoSessionsToast';

const Sessions = () => {
  const {
    dateFormat,
    googleUser,
    googleSessions,
    setGoogleSessions,
    timeFormat,
    setToastMessage
  } = useContext(Context);
  const accessToken = googleUser && googleUser.getAuthResponse(true).access_token;
  const [nextStartTimeMillis, setNextStartTimeMillis] = useState();

  useEffect(() => {
    if (accessToken) {
      (async () => {
        const sessions = await loadSessions(accessToken);

        setGoogleSessions(sessions);
      })();
    }
  }, [accessToken, setGoogleSessions]);

  useEffect(() => {
    if (googleSessions) {
      setNextStartTimeMillis(googleSessions.slice(-1)[0].startTimeMillis);
    }
  }, [googleSessions]);

  const loadNewSessions = async (accessToken, startTimeMillis) => {
    // reset Toast to clear any potential messages
    setToastMessage();
    const newSessions = await loadSessions(accessToken, startTimeMillis);

    if (!newSessions.length) {
      // if there are no sessions, we adjust the load more time interval
      const updatedNextStartTimeMillis = getNextStartTimeMillis(nextStartTimeMillis);
      setToastMessage(
        <NoSessionsToast
          startTimeMillis={nextStartTimeMillis}
          loadMore={() => loadNewSessions(accessToken, updatedNextStartTimeMillis)} />
      );
      setNextStartTimeMillis(updatedNextStartTimeMillis);
    } else {
      const mergedSessions = mergeSessions(googleSessions, newSessions);

      setGoogleSessions(mergedSessions);
    }
  };

  return (
    googleSessions && (
      <>
        {googleSessions.map(({ endTimeMillis, id, name, startTime, startTimeMillis, activityType }) => (
          <Card key={id}>
            <CardBody>
              <CardTitle>
                <h2>{formatDate(dateFormat, startTime)}</h2>
                <div>{formatTime(timeFormat, startTime)}</div>
              </CardTitle>
              <CardSubtitle>
                <div>
                  <Distance startTimeMillis={startTimeMillis} endTimeMillis={endTimeMillis} />
                  <MoveMinutes startTimeMillis={startTimeMillis} endTimeMillis={endTimeMillis} />
                </div>
                <div>
                  <HeartPoints startTimeMillis={startTimeMillis} endTimeMillis={endTimeMillis} />
                </div>
              </CardSubtitle>
              <CardFooter>
                <div>{name}</div>
                <ActivityType type={activityType} />
              </CardFooter>
            </CardBody>
          </Card>
        ))}
        <div class="centered">
          <Button size="small" type="cta" onClick={() => loadNewSessions(accessToken, nextStartTimeMillis)}>
            Load more
          </Button>
        </div>
      </>
    )
  );
};

export default Sessions;
