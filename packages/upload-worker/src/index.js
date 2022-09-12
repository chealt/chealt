const getCommonHeaders = (allowedOrigin) => ({
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET, PUT',
  'content-type': 'application/json'
});

export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: getCommonHeaders(allowedOrigin) });
    }

    if (request.method === 'PUT') {
      const objectName = `${crypto.randomUUID()}/data.json`;

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
      const object = await env.MY_BUCKET.get(objectName);

      return new Response(JSON.stringify(object), { headers: getCommonHeaders(allowedOrigin) });
    }

    return new Response(null, { status: 400, headers: getCommonHeaders(allowedOrigin) });
  }
};
