const loadAppState = (payload) => ({
    type: 'APP.LOAD_STATE',
    payload
});

const initAppState = () => {
    return (dispatch) => {
        console.log('initAppState'); // eslint-disable-line no-console
        dispatch(loadAppState({}));
    };
};

export {
    initAppState
};
