const puppeteer = require('../../lib/utils/puppeteer');
const wait = require('../../lib/utils/wait');

describe('puppeteer', () => {
    it('puppeteer run', async () => {
        const browser = await puppeteer();
        const page = await browser.newPage();
        await page.goto('https://www.google.com', {
            waitUntil: 'domcontentloaded',
        });

        // eslint-disable-next-line no-undef
        const html = await page.evaluate(() => document.body.innerHTML);
        expect(html.length).toBeGreaterThan(0);

        expect((await browser.process()).signalCode).toBe(null);
        await wait(31 * 1000);
        expect((await browser.process()).signalCode).toBe('SIGKILL');
    }, 40000);
});
