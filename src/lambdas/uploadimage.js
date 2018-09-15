import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import config from '../config';

const JWKS_URL = `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`;

let cert;

const certToPEM = localCert => {
  const next = localCert.match(/.{1,64}/g).join('\n');
  return `-----BEGIN CERTIFICATE-----\n${next}\n-----END CERTIFICATE-----\n`;
};

const fetchCert = async url => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    const signingKeys = json.keys
      .filter(
        key =>
          key.use === 'sig' && // JWK property `use` determines the JWK is for signing
          key.kty === 'RSA' && // We are only supporting RSA (RS256)
          key.kid && // The `kid` must be present to be useful for later
          ((key.x5c && key.x5c.length) || (key.n && key.e)), // Has useful public keys
      )
      .map(key => ({
        kid: key.kid,
        nbf: key.nbf,
        publicKey: certToPEM(key.x5c[0]),
      }));
    return signingKeys[0].publicKey;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.handler = async (event, context, callback) => {
  const { httpMethod, headers } = event;
  if (httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 405,
      body: 'Only POST allowed',
    });
  }
  const authHeader = headers.authorization;
  if (!authHeader) {
    return callback(null, {
      statusCode: 401,
      body: 'No bearer token found',
    });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return callback(null, {
      statusCode: 400,
      body: 'Wrong type of auth header',
    });
  }

  if (!cert) {
    cert = await fetchCert(JWKS_URL);
    if (!cert) {
      return callback(null, {
        statusCode: 500,
        body: 'Auth0 not responding',
      });
    }
  }

  const token = authHeader.substring(7, authHeader.length);

  try {
    jwt.verify(token, cert, (err, decoded) => {

      if (err) {
        console.error(err);
        return callback(null, {
          statusCode: 401,
          body: 'JWT incorrect or expired',
        });
      }

      const { aud, iss } = decoded;
      
      
      if (iss !== `https://${config.AUTH0_DOMAIN}/`) {
        return callback(null, {
          statusCode: 401,
          body: 'JWT incorrect (iss)',
        });
      }
      if (aud.indexOf('https://images.tuomaala.fi') < 0) {
        return callback(null, {
          statusCode: 401,
          body: 'JWT incorrect (aud)',
        });
      }

      return callback(null, {
        statusCode: 200,
        body: 'jee',
      });
    });
  } catch (error) {
    return callback(null, {
      statusCode: 500,
      body: 'Something is wrong',
    });
  }

  // console.log('*** EVENT ***');
  // console.log(event);
  // console.log('**************');
  // console.log('--- CONTEXT ---');
  // console.log(context);
  // console.log('--------------');
};
