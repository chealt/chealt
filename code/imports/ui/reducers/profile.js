const initialState = {
    isBubbleShown: false
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_PROFILE_BUBBLE':
            return {
                isBubbleShown: !state.isBubbleShown
            };
        case 'CLOSE_PROFILE_BUBBLE':
            return {
                isBubbleShown: false
            };
        default:
            return state;
    }
};

export default profile;
