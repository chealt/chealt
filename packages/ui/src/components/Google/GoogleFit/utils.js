import { API_URL, DATA_SOURCES_PATH } from './constants';

const getHeaders = (accessToken) => ({
    Authorization: `Bearer ${accessToken}`
});

const getRequestOptions = (accessToken) => ({
    headers: getHeaders(accessToken)
});

const getDataSourceUrl = () =>
    `${API_URL}/${DATA_SOURCES_PATH}?startTime=2019-09-13T00:00:00.000Z&endTime=2019-09-14T23:59:59.999Z`;

export { getRequestOptions, getDataSourceUrl };
