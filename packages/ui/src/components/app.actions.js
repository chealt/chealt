// const loadAppState = (payload) => ({
//     type: 'APP.LOAD_STATE',
//     payload
// });

const initAppState = () => {
    return (/*dispatch*/) => {
        //dispatch(loadAppState());
    };
};

const showCreateItem = (payload) => ({
    type: 'APP.SHOW_CREATE_ITEM',
    payload
});

export {
    initAppState,
    showCreateItem
};
