import './index';

import startServer from './start-server';

jest.mock('./start-server', () => jest.fn());

describe('index', () => {
    it('starts the server', () => {
        expect(startServer).toHaveBeenCalled();
    });
});
