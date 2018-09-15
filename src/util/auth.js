import auth0 from 'auth0-js';
import config from '../config';

const webAuth = new auth0.WebAuth({
  domain: config.AUTH0_DOMAIN,
  clientID: config.AUTH0_CLIENT_ID,
  redirectUri: 'http://localhost:8000/callback',
  audience: 'https://images.tuomaala.fi', // https://${AUTH0_DOMAIN}/api/v2/`,
  responseType: 'token id_token',
  scope: 'openid profile email',
});

export default webAuth;
