import startServer from './start-server';

import express from 'express';

import render from './render';
import { render as renderHome } from '../home';

jest.mock('express', () => jest.fn());
jest.mock('../home', () => ({ render: jest.fn() }));
jest.mock('./render', () => jest.fn());

describe('index module', () => {
    const listenSpy = jest.fn();
    const useSpy = jest.fn();

    beforeEach(() => {
        express.mockImplementation(() => ({
            listen: listenSpy,
            use: useSpy
        }));
    });

    it('creates express web server', () => {
        startServer();

        expect(express).toHaveBeenCalled();
    });

    it('adds the home route', () => {
        const renderResult = 'render result';
        render.mockImplementation(() => renderResult);

        startServer();

        expect(useSpy).toHaveBeenCalledWith('/', renderResult);
        expect(render).toHaveBeenCalledWith(renderHome);
    });

    it('starts listening on port 3000 by default', () => {
        startServer();

        expect(listenSpy).toHaveBeenCalledWith(3000, expect.any(Function));
    });

    it('uses the env SERVER_PORT variable as the port', () => {
        const serverPort = "1234";
        process.env.SERVER_PORT = serverPort;

        startServer();

        expect(listenSpy).toHaveBeenCalledWith(serverPort, expect.any(Function));
    });

    it('logs message after start', () => {
        global.console = { log: jest.fn() };
        const serverPort = 1234;
        process.env.SERVER_PORT = serverPort;
        let triggerCallback;
        listenSpy.mockImplementation((port, callback) => {
            triggerCallback = callback;
        });

        startServer();
        triggerCallback();

        expect(global.console.log).toHaveBeenCalledWith(`Listening on port ${serverPort}...`);
    });
});
