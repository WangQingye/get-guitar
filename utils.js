import request from 'request'
export const getUrl = url => new Promise((resolve, reject) => request.get(url, (err, response, body) => {
  if (err) {
    reject(err);
  } else {
    resolve(body);
  }
}))