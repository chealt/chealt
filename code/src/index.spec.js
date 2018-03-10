import init from './index';

describe('init()', () => {
    it('returns 2 dummy', () => {
        const result = init();

        expect(result).toBe(2);
    });
});
