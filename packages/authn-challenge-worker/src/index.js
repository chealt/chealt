const dec2hex = (dec) => dec.toString(16).padStart(2, '0');

const generateRandomString = (length = 40) => {
  const arr = new Uint8Array(length / 2);

  crypto.getRandomValues(arr);

  return Array.from(arr, dec2hex).join('');
};

const getJSONResponse = (response, allowedOrigin) =>
  new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': allowedOrigin
    }
  });

export default {
  async fetch(request, env) {
    const { ALLOWED_ORIGIN } = env;

    if (request.method === 'OPTIONS') {
      return new Response(undefined, {
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    const { uuid } = await request.json();

    const challenge = generateRandomString();

    await env.AUTHN_CHALLENGES.put(uuid, challenge);

    return getJSONResponse({ challenge, uuid }, ALLOWED_ORIGIN);
  }
};
