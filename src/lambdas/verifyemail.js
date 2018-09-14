require('dotenv').config();

const emails = process.env.EMAIL_WHITE_LIST;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

/* eslint-disable */
export function handler(event, context, callback) {
  const { path } = event;

  console.log(path);
  const pathArray = path.split('/');
  if (pathArray.length != 3) {
    return callback('Not found');
  }
  if (pathArray[1] !== 'verifyemail') {
    return callback('Not found');
  }
  const email = pathArray[2];



  callback(null, {
    headers,
    statusCode: 200,
    body: JSON.stringify({ msg: email }),
  });
}
