import { observeStore } from '../../redux-utils';
import { googleAccessTokenSelector } from '../../Authentication/selectors';

const fetchJSON = (...props) =>
    fetch(...props).then((response) => response.json());

const loadData = async (accessToken) => {
    const data = await fetchJSON(
        'https://www.googleapis.com/fitness/v1/users/me/dataSources?startTime=2019-09-13T00:00:00.000Z&endTime=2019-09-14T23:59:59.999Z',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    console.log(data); // eslint-disable-line no-console
};

const initGoogleFitData = (store) => {
    observeStore(store, googleAccessTokenSelector, (accessToken) => {
        if (accessToken) {
            loadData(accessToken);
        }
    });
};

export { initGoogleFitData };
