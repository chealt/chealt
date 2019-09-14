const getHeaders = (accessToken) => ({
    Authorization: `Bearer ${accessToken}`
});

export { getHeaders };
