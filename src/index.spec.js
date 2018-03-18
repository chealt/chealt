import './index';

import startServer from './server/start-server';

jest.mock('./server/start-server', () => jest.fn());

describe('index', () => {
    it('starts the server', () => {
        expect(startServer).toHaveBeenCalled();
    });
});
