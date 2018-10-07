import getConfig from './get-config';

const { HOMEPAGE_URL } = getConfig();

describe('Homepage', () => {
    const visitPage = async () => {
        await page.goto(`${HOMEPAGE_URL}`);
    };

    it('has the proper title', async () => {
        await visitPage();

        const title = await page.title();

        expect(title).toEqual('Chealt');
    });
});
