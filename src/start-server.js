import express from 'express';

const startServer = () => {
    const PORT = process.env.SERVER_PORT || 3000;

    const app = express();

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
    });
};


export default startServer;
