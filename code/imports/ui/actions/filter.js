export const filter = (filter) => {
    return {
        type: 'FILTER',
        filter
    };
};

export const clearFilter = () => {
    return {
        type: 'CLEAR'
    };
};
