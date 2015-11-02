import Promise from 'bluebird';
import request from 'superagent';

const _tips = () => console.warn(
  'Please start API service by command "npm run data"');

function get(url) {
  return new Promise(function(resolve, reject) {
    request.get(url)
      .end((e, r) => {
        if (e) {
          _tips();
          reject(e);
        }
        else {
          resolve(JSON.parse(r.text));
        }
      });
  });
}

export default function createAjax(urlBase) {
  return {
    get: uri => get(urlBase + uri)
  }
};
