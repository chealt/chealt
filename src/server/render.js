import { renderToNodeStream } from 'react-dom/server';

const render = (pageRenderer) => (req, res) => {
    res.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Chealt</title>
            </head>
            <body>
    `);

    const stream = renderToNodeStream(pageRenderer());

    stream.pipe(res, { end: false });

    stream.on('end', () => {
        res.write(`
                </body>
            </html>
        `);

        res.end();
    });
};

export default render;
