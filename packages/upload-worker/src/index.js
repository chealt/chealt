const isAppPreviewOrigin = (origin) => origin.includes('-chealt.vercel.app');

const getCommonHeaders = (allowedOrigin) => ({
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET, PUT',
  'content-type': 'application/json'
});

const convertToHex = (arrayBuffer) =>
  Array.from(new Uint8Array(arrayBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

const getContentHash = async (request) => {
  // need to clone the request as it is being handled
  const requestClone = await request.clone();
  const content = await requestClone.arrayBuffer();

  const hashBuffer = await crypto.subtle.digest('SHA-256', content);

  return convertToHex(hashBuffer);
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowedOrigin = isAppPreviewOrigin(origin) ? origin : env.ALLOWED_ORIGIN;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: getCommonHeaders(allowedOrigin) });
    }

    if (request.method === 'PUT') {
      const objectName = await getContentHash(request);

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

      const data = await object.json();
      const response = JSON.stringify(data);

      return new Response(response, {
        headers: {
          etag: object.etag,
          ...getCommonHeaders(allowedOrigin)
        }
      });
    }

    return new Response(null, { status: 400, headers: getCommonHeaders(allowedOrigin) });
  }
};
