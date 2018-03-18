import startServer from './start-server';

import express from 'express';

jest.mock('express', () => jest.fn(() => ({
    listen: jest.fn()
})));

describe('index module', () => {
    it('creates express web server', () => {
        startServer();

        expect(express).toHaveBeenCalled();
    });

    it('starts listening on port 3000 by default', () => {
        const listenSpy = jest.fn();
        express.mockImplementation(() => ({
            listen: listenSpy
        }));

        startServer();

        expect(listenSpy).toHaveBeenCalledWith(3000, expect.any(Function));
    });

    it('uses the env SERVER_PORT variable as the port', () => {
        const serverPort = "1234";
        process.env.SERVER_PORT = serverPort;
        const listenSpy = jest.fn();
        express.mockImplementation(() => ({
            listen: listenSpy
        }));

        startServer();

        expect(listenSpy).toHaveBeenCalledWith(serverPort, expect.any(Function));
    });

    it('logs message after start', () => {
        global.console = { log: jest.fn() };
        let triggerCallback;
        const serverPort = 1234;
        process.env.SERVER_PORT = serverPort;
        const listenSpy = jest.fn((port, callback) => {
            triggerCallback = callback;
        });
        express.mockImplementation(() => ({
            listen: listenSpy
        }));

        startServer();
        triggerCallback();

        expect(global.console.log).toHaveBeenCalledWith(`Listening on port ${serverPort}...`);
    });
});
