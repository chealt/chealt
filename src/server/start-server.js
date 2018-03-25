import express from 'express';

import render from './render';
import { render as renderHome } from '../home';

const startServer = () => {
    const PORT = process.env.SERVER_PORT || 3000;

    const app = express();

    app.use('/', render(renderHome));

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
    });
};


export default startServer;
