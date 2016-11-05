const event = (state, action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            return {
                id: action.id,
                isMapShown: Boolean(action.isMapShown),
                isCommentsShown: Boolean(action.isCommentsShown),
                commentLimit: 2
            };
        case 'TOGGLE_EVENT_MAP':
            if (state.id !== action.id) {
                return state;
            }
            
            return Object.assign({}, state, { isMapShown: !state.isMapShown });
        case 'TOGGLE_EVENT_COMMENTS':
            if (state.id !== action.id) {
                return state;
            }
            
            return Object.assign({}, state, { isCommentsShown: !state.isCommentsShown });
        case 'SHOW_MORE_COMMENTS':
            if (state.id !== action.id) {
                return state;
            }
            
            return Object.assign({}, state, { commentLimit: (state.commentLimit + 2) });
        default:
            return state;
    }
};

const events = (state = [], action) => {
    const isStatefullEvent = state.find(event => event.id === action.id);

    switch (action.type) {
        case 'ADD_EVENT':
            return [
                ...state,
                event(undefined, action)
            ];
        case 'TOGGLE_EVENT_MAP':
            if (!isStatefullEvent) {
                return events(state, {
                    type: 'ADD_EVENT',
                    id: action.id,
                    isMapShown: true
                });
            }

            return state.map(_event => event(_event, action));
        case 'TOGGLE_EVENT_COMMENTS':
            if (!isStatefullEvent) {
                return events(state, {
                    type: 'ADD_EVENT',
                    id: action.id,
                    isCommentsShown: true
                });
            }

            return state.map(_event => event(_event, action));
        case 'SHOW_MORE_COMMENTS':
            if (!isStatefullEvent) {
                return events(state, {
                    type: 'ADD_EVENT',
                    id: action.id
                });
            }

            return state.map(_event => event(_event, action));
        default:
            return state;
    }
};

export default events;
