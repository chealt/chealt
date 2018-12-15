import getConfig from './get-config';

const { HOMEPAGE_URL } = getConfig();

const findInputByText = async ({ text, inElement = page }) => {
    const inputWithPlaceholder = await inElement.$(`[placeholder="${text}"]`);

    return inputWithPlaceholder;
};

describe('Homepage', () => {
    const visitPage = async () => {
        await page.goto(`${HOMEPAGE_URL}`);
    };

    it('has the proper title', async () => {
        await visitPage();

        const title = await page.title();

        expect(title).toEqual('Chealt');
    });

    it('has a feeling input', async () => {
        await visitPage();

        const input = await findInputByText({
            text: 'Tell me how you feel...'
        });

        expect(input).toBeTruthy();
    });
});
