const { DEBUG } = process.env;

module.exports = {
    launch: {
        headless: !DEBUG,
        slowMo: DEBUG ? 250 : 0
    }
};
