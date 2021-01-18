const loadMoreIntervalMillis = (1000 * 60 * 60 * 24 * 7 * 4); // 4 weeks in milliseconds
const byStartTime = (a, b) => b.startTime - a.startTime;

const mapSessions = (sessions) => sessions.session
  .map(((session) => ({
    ...session,
    startTime: new Date(parseInt(session.startTimeMillis, 10))
  })))
  .sort(byStartTime);

const getFetchOptions = (accessToken) => ({
  mode: 'cors',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const getNextStartTimeMillis = (startTimeMillis) => parseInt(startTimeMillis, 10) - loadMoreIntervalMillis;

const loadSessions = (accessToken, startedBeforeMillis) => {
  let sessionsURL = "https://www.googleapis.com/fitness/v1/users/me/sessions";

  if (startedBeforeMillis) {
    const startTime = new Date(getNextStartTimeMillis(startedBeforeMillis)).toISOString();
    const endTime = new Date(parseInt(startedBeforeMillis, 10)).toISOString();
    sessionsURL += `?startTime=${startTime}&endTime=${endTime}`;
  }

  return fetch(sessionsURL, getFetchOptions(accessToken))
    .then((response) => response.json())
    .then(mapSessions)
};

const mergeSessions = (sessions, newSessions) => {
  const uniqueNewSessions = newSessions.filter(({ id }) => !sessions.some((session) => session.id === id));

  return [...sessions, ...uniqueNewSessions];
};

export {
  getNextStartTimeMillis,
  loadSessions,
  mergeSessions
}
