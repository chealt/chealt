import { h } from 'preact';
import { useEffect, useState, useContext } from 'preact/hooks';

import { Context } from '../../context';

const getDistance = (distanceResponse) => {
  const points = distanceResponse?.bucket[0]?.dataset[0]?.point;
  const distance = points?.reduce((sum, point) => sum + point.value[0].fpVal, 0);

  return distance && (distance / 1000).toFixed(2);
};

const loadDistance = ({ accessToken, startTimeMillis, endTimeMillis }) =>
  fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
    mode: 'cors',
    method: 'post',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      aggregateBy: [
        {
          dataTypeName: 'com.google.distance.delta'
        }
      ],
      startTimeMillis,
      endTimeMillis
    })
  })
    .then((response) => response.json())
    .then((responseJSON) => getDistance(responseJSON));

const Distance = ({ startTimeMillis, endTimeMillis }) => {
  const [distance, setDistance] = useState();
  const { googleUser } = useContext(Context);
  const accessToken = googleUser && googleUser.getAuthResponse(true).access_token;

  useEffect(() => {
    if (startTimeMillis && endTimeMillis) {
      (async () => {
        const distanceResult = await loadDistance({ accessToken, startTimeMillis, endTimeMillis });

        setDistance(distanceResult);
      })();
    }
  }, [accessToken, startTimeMillis, endTimeMillis]);

  return distance ? (
    <>
      <span class="cta-text--secondary">{distance} km</span>
      {' in '}
    </>
  ) : null;
};

export default Distance;
