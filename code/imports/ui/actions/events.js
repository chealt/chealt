export const toggleEventMap = (eventId) => {
    return {
        type: 'TOGGLE_EVENT_MAP',
        id: eventId
    };
};

export const toggleEventComments = (eventId) => {
    return {
        type: 'TOGGLE_EVENT_COMMENTS',
        id: eventId
    };
};

export const showMoreComments = (eventId) => {
    return {
        type: 'SHOW_MORE_COMMENTS',
        id: eventId
    };
};
