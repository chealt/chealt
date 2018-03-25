import render from './render';

import { header } from './layout';

jest.mock('react-dom/server', () => ({
    renderToNodeStream: jest.fn(() => ({
        pipe: jest.fn(),
        on: jest.fn()
    }))
}));
jest.mock('./layout', () => ({
    header: jest.fn(),
    footer: jest.fn()
}));

describe('render module', () => {
    const resMock = { write: jest.fn() };

    it('returns a function', () => {
        const SUT = render();

        expect(typeof SUT).toEqual('function');
    });

    it('writes the header to the response', () => {
        const pageRenderer = () => null;
        const renderer = render(pageRenderer);
        header.mockReturnValue('header');

        renderer(undefined, resMock);

        expect(resMock.write).toHaveBeenCalledWith('header');
    });
});
