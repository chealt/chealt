const changeCurrentView = (name) => ({
    type: 'VIEWS.SWITCH_VIEW',
    payload: name
});

export {
    changeCurrentView
};
