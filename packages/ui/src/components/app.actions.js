const loadAppState = (payload) => ({
    type: 'APP.LOAD_STATE',
    payload
});

const initAppState = () => {
    return (/*dispatch*/) => {
        //dispatch(loadAppState());
    };
};

export {
    initAppState
};
