import { h } from 'preact';
import { useEffect, useState, useContext } from 'preact/hooks';

import { Context } from '../../context';

const loadMoveMinutes = ({ accessToken, startTimeMillis, endTimeMillis }) =>
  fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
    mode: 'cors',
    method: 'post',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      aggregateBy: [
        {
          dataTypeName: 'com.google.active_minutes'
        }
      ],
      startTimeMillis,
      endTimeMillis
    })
  })
    .then((response) => response.json())
    .then((responseJSON) => responseJSON?.bucket[0]?.dataset[0]?.point.length);

const MoveMinutes = ({ startTimeMillis, endTimeMillis }) => {
  const [moveMinutes, setMoveMinutes] = useState();
  const { googleUser } = useContext(Context);
  const accessToken = googleUser && googleUser.getAuthResponse(true).access_token;

  useEffect(() => {
    if (startTimeMillis && endTimeMillis) {
      (async () => {
        setMoveMinutes(await loadMoveMinutes({ accessToken, startTimeMillis, endTimeMillis }));
      })();
    }
  }, [accessToken, startTimeMillis, endTimeMillis]);

  return moveMinutes ? <span class="cta-text">{moveMinutes} mins</span> : '';
};

export default MoveMinutes;
