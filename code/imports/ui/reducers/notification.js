const initialState = {
    text: '',
    undoMethod: null,
    shown: false
};

const notification = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW':
            return {
                text: action.text,
                undoMethod: action.undoMethod,
                shown: true
            };
        case 'HIDE':
            return Object.assign({}, state, {
                shown: false
            });
        default:
            return state;
    }
};

export default notification;