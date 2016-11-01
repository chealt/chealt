export const showNotification = ({ text, undoMethod }) => {
    return {
        type: 'SHOW',
        text,
        undoMethod
    };
};

export const hideNotification = () => {
    return {
        type: 'HIDE'
    };
};
