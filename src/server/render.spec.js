import render from './render';

import { renderToNodeStream } from 'react-dom/server';
import { header, footer } from './layout';

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
    const resMock = {
        write: jest.fn(),
        end: jest.fn()
    };

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

    it('pipes the components to the response', () => {
        const pageRenderer = () => null;
        const renderer = render(pageRenderer);
        const mockPipe = jest.fn();
        renderToNodeStream.mockReturnValue(({
            pipe: mockPipe,
            on: () => null
        }));
        renderer(undefined, resMock);

        expect(mockPipe).toHaveBeenCalledWith(resMock, { end: false });
    });

    it('writes the footer to the response on end event', () => {
        const pageRenderer = () => null;
        const renderer = render(pageRenderer);

        let triggerEndCallback;
        renderToNodeStream.mockReturnValue(({
            pipe: () => null,
            on: jest.fn((eventName, callback) => {
                triggerEndCallback = callback;
            })
        }));
        footer.mockReturnValue('footer');

        renderer(undefined, resMock);
        triggerEndCallback();

        expect(footer).toHaveBeenCalled();
        expect(resMock.write).toHaveBeenCalledWith('footer');
        expect(resMock.end).toHaveBeenCalled();
    });
});
