require('dotenv').config();

const emails = process.env.EMAIL_WHITE_LIST;

const emailArray = emails
  .split(',')
  .filter(x => x.trim().length !== 0)
  .map(x => x.trim().toLowerCase());

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

/* eslint-disable */
export function handler(event, context, callback) {
  const { path } = event;

  const pathArray = path.split('/');
  if (pathArray.length != 3) {
    return callback('Not found');
  }
  if (pathArray[1] !== 'verifyemail') {
    return callback('Not found');
  }
  const email = pathArray[2];
  const verifiableEmail = decodeURIComponent(email)
    .toLowerCase()
    .trim();
  const hasEmail = emailArray.indexOf(verifiableEmail) >= 0;

  callback(null, {
    headers,
    statusCode: 200,
    body: JSON.stringify({ valid: hasEmail }),
  });
}
