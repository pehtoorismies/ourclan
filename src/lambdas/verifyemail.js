require('dotenv').config();

const emails = process.env.EMAIL_WHITE_LIST;

/* eslint-disable */
export function handler(event, context, callback) {
  console.log(event);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: emails }),
  });
}
