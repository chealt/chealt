const save = feeling => ({
    type: 'FEELINGS.ADD',
    feeling
});

const loadAction = feelings => ({
    type: 'FEELINGS.LOAD',
    feelings
});

// PERSISTANCE
const STORAGE_KEY = 'chealt.feelings';

const load = () => {
    return dispatch => {
        const feelings = window.localStorage.getItem(STORAGE_KEY);

        dispatch(loadAction(feelings));
    };
};

export { load, save };
