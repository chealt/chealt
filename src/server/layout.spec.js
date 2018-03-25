import {
    header,
    footer
} from './layout';

describe('layout module', () => {
    describe('header()', () => {
        it('returns the doctype html', () => {
            const html = header();

            expect(html).toEqual(
                expect.stringContaining('<!DOCTYPE html>')
            );
        });

        it('opens the html tag', () => {
            const html = header();

            expect(html).toEqual(
                expect.stringContaining('<html>')
            );
        });

        it('opens the head tag', () => {
            const html = header();

            expect(html).toEqual(
                expect.stringContaining('<head>')
            );
        });

        it('has the title tag', () => {
            const html = header();

            expect(html).toEqual(
                expect.stringContaining('<title>Chealt</title>')
            );
        });

        it('closes the head tag', () => {
            const html = header();

            expect(html).toEqual(
                expect.stringContaining('</head>')
            );
        });

        it('opens the body tag', () => {
            const html = header();

            expect(html).toEqual(
                expect.stringContaining('<body>')
            );
        });
    });

    describe('footer()', () => {
        it('closes the body tag', () => {
            const html = footer();

            expect(html).toEqual(
                expect.stringContaining('</body>')
            );
        });

        it('closes the html tag', () => {
            const html = footer();

            expect(html).toEqual(
                expect.stringContaining('</html>')
            );
        });
    });
});
