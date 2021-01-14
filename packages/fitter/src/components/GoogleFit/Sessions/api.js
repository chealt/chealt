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

export {
  loadSessions
}
