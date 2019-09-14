import { observeStore } from '../../redux-utils';
import { googleAccessTokenSelector } from '../../Authentication/selectors';
import { getRequestOptions, getDataSourceUrl } from './utils';

const fetchJSON = (...props) =>
    fetch(...props).then((response) => response.json());

const loadData = async (accessToken) => {
    const data = await fetchJSON(
        getDataSourceUrl(),
        getRequestOptions(accessToken)
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
