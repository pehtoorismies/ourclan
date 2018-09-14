import auth0 from 'auth0-js';

const AUTH0_DOMAIN = 'prod-tuomaalafi.eu.auth0.com';
const AUTH0_CLIENT_ID = '6maNRjtjiFie9k4ShgWAeX2GOt5JoWNY';

const webAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: 'http://localhost:8000/callback',
  audience: `https://${AUTH0_DOMAIN}/api/v2/`,
  responseType: 'token id_token',
  scope: 'openid profile email',
});

export default webAuth;
