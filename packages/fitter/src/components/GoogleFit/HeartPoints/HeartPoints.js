import { useEffect, useState, useContext } from 'preact/hooks';

import { Context } from '../../context';

const getHeartPoints = (heartPointsResponse) => {
  const points = heartPointsResponse?.bucket[0]?.dataset[0]?.point;
  const heartPoints = points?.reduce((sum, point) => sum + point.value[0].fpVal, 0);

  return heartPoints;
};

const loadHeartPoints = ({ accessToken, startTimeMillis, endTimeMillis }) =>
  fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
    mode: 'cors',
    method: 'post',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      aggregateBy: [
        {
          dataTypeName: 'com.google.heart_minutes'
        }
      ],
      startTimeMillis,
      endTimeMillis
    })
  })
    .then((response) => response.json())
    .then((responseJSON) => getHeartPoints(responseJSON));

const HeartPoints = ({ startTimeMillis, endTimeMillis }) => {
  const [heartPoints, setHeartPoints] = useState();
  const { googleUser } = useContext(Context);
  const accessToken = googleUser && googleUser.getAuthResponse(true).access_token;

  useEffect(() => {
    if (startTimeMillis && endTimeMillis) {
      (async () => {
        setHeartPoints(await loadHeartPoints({ accessToken, startTimeMillis, endTimeMillis }));
      })();
    }
  }, [accessToken, startTimeMillis, endTimeMillis]);

  return heartPoints ? `${heartPoints} points` : '';
};

export default HeartPoints;
