import request from 'superagent-bluebird-promise';

const _errorHandler = e => console.warn(
  'Please start API service by command "npm run data"', e);

function get(url) {
  return request.get(url)
    .promise()
    .error(_errorHandler)
    .then(r => JSON.parse(r.text));
}

export default function createAjax(url) {
  return {
    get: uri => get(url + uri)
  };
}
