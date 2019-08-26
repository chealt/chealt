const observeStore = (store, select, onChange) => {
    let currentState;

    function handleChange() {
        let nextState = select(store.getState());

        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();

    return unsubscribe;
};

const observeStoreWithout = (store, needles, onChange) => {
    observeStore(
        store,
        (state) => {
            return Object.keys(state).reduce((filteredState, stateProperty) => {
                if (!needles.includes(stateProperty)) {
                    filteredState[stateProperty] = state[stateProperty];
                }

                return filteredState;
            }, {});
        },
        onChange
    );
};

export { observeStore, observeStoreWithout };
