const getConfig = () => {
    const { HOMEPAGE_URL } = process.env;

    return {
        HOMEPAGE_URL
    };
};

export default getConfig;
