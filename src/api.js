import createAjax from 'createAjax';

const ajax = createAjax('http://localhost:3001');

const API = {
  loadNav: () => ajax.get('/nav'),
  loadBom: () => ajax.get('/bom'),
  loadMst: () => ajax.get('/mst'),
};

export default API;
