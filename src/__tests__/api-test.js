import API from '../api';

describe('API', () => {

  it('loadNav', done => {
    API.loadNav().finally(done)
      .then(r => console.log(r.length));
  });

  it('loadBom', done => {
    API.loadBom().finally(done)
      .then(r => console.log(Object.keys(r)));
  });

  it('loadMst', done => {
    API.loadMst().finally(done)
      .then(r => console.log(Object.keys(r)));
  });

});
