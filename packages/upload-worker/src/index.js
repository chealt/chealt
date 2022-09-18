import { getContentHash } from '@chealt/browser-utils';

const isAppPreviewOrigin = (origin) => origin.includes('-chealt.vercel.app');

const hashHeader = 'x-hash';
const setCommonHeaders = ({ headers, allowedOrigin }) => {
  headers.set('Access-Control-Allow-Origin', allowedOrigin);
  headers.set('Access-Control-Allow-Methods', 'GET, PUT');
  headers.set('Access-Control-Allow-Headers', hashHeader);
};
const getCommonHeaders = (allowedOrigin) => ({
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET, PUT',
  'content-type': 'application/json',
  'Access-Control-Allow-Headers': hashHeader
});

const requestToContentHash = async (request) => {
  // need to clone the request as it is being handled
  const requestClone = await request.clone();
  const arrayBuffer = await requestClone.arrayBuffer();

  return getContentHash({ arrayBuffer });
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowedOrigin = isAppPreviewOrigin(origin) ? origin : env.ALLOWED_ORIGIN;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: getCommonHeaders(allowedOrigin) });
    }

    if (request.method === 'PUT') {
      const hash = request.headers.get(hashHeader);
      const objectName = hash || (await requestToContentHash(request));

      // eslint-disable-next-line no-console
      console.log(`${request.method} object ${objectName}`);

      const object = await env.UPLOAD_BUCKET.put(objectName, request.body, {
        httpMetadata: request.headers
      });

      return new Response(JSON.stringify({ objectName }), {
        headers: {
          etag: object.httpEtag,
          ...getCommonHeaders(allowedOrigin)
        }
      });
    }

    if (request.method === 'GET') {
      const url = new URL(request.url);
      const objectName = url.pathname.slice(1);
      const object = await env.UPLOAD_BUCKET.get(objectName, {
        range: undefined,
        onlyIf: request.headers
      });

      if (object === null) {
        return new Response(null, { status: 404, headers: getCommonHeaders(allowedOrigin) });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      setCommonHeaders({ headers, allowedOrigin });

      return new Response(object.body, {
        headers
      });
    }

    return new Response(null, { status: 400, headers: getCommonHeaders(allowedOrigin) });
  }
};
