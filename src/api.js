import createAjax from 'ajax';

const ajax = createAjax('http://localhost:3001');

const API = {
  loadNav: () => ajax.get('/nav'),
  loadBom: () => ajax.get('/bom'),
};

export default API;
