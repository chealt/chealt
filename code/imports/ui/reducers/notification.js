const initialState = {
    text: '',
    undoMethod: null,
    shown: false
};

const notification = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                text: action.text,
                undoMethod: action.undoMethod,
                shown: true
            };
        case 'HIDE_NOTIFICATION':
            return Object.assign({}, state, {
                shown: false
            });
        default:
            return state;
    }
};

export default notification;