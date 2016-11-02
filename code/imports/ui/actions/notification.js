export const showNotification = ({ text, undoMethod }) => {
    return {
        type: 'SHOW_NOTIFICATION',
        text,
        undoMethod
    };
};

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    };
};
