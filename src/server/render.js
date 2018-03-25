import { renderToNodeStream } from 'react-dom/server';

import { header, footer } from './layout';

const render = (pageRenderer) => (req, res) => {
    res.write(header());

    const stream = renderToNodeStream(pageRenderer());

    stream.pipe(res, { end: false });

    stream.on('end', () => {
        res.write(footer());

        res.end();
    });
};

export default render;
