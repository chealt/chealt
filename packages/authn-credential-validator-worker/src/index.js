import { verifyRegistrationResponse } from '@simplewebauthn/server';

const getOriginHeaders = (allowedOrigin) => ({
  'Access-Control-Allow-Origin': allowedOrigin
});

const getJSONResponse = (response, allowedOrigin) =>
  new Response(JSON.stringify(response), {
    headers: {
      ...getOriginHeaders(allowedOrigin),
      'content-type': 'application/json'
    }
  });

export default {
  async fetch(request, env) {
    const { ALLOWED_ORIGIN } = env;

    if (request.method === 'OPTIONS') {
      return new Response(undefined, {
        headers: {
          ...getOriginHeaders(ALLOWED_ORIGIN),
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    const { credential, uuid, rpId } = await request.json();

    const challenge = await env.AUTHN_CHALLENGES.get(uuid);

    try {
      const {
        registrationInfo: { credentialPublicKey, credentialID, counter },
        verified
      } = await verifyRegistrationResponse({
        response: credential,
        expectedChallenge: challenge,
        expectedOrigin: ALLOWED_ORIGIN,
        expectedRPID: rpId
      });

      // Save verification info
      await env.AUTHN_CREDENTIALS.put(`${uuid}.credentialPublicKey`, credentialPublicKey);
      await env.AUTHN_CREDENTIALS.put(`${uuid}.credentialID`, credentialID);
      await env.AUTHN_CREDENTIALS.put(`${uuid}.counter`, counter);

      return getJSONResponse({ verified }, ALLOWED_ORIGIN);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      return new Response('Invalid credentials provided', {
        status: 400,
        headers: {
          ...getOriginHeaders(ALLOWED_ORIGIN)
        }
      });
    }
  }
};
