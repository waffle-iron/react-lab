import React from 'react';
import Header from '../Header';

describe('Header', () => {
  it('render', () => {
    const history = [
      {url: '/#/', txt: 'Home'},
      {url: '/#/prod', txt: 'Products'},
      {url: '/#/prod/mt4230t', txt: 'MT4230T'}
    ];
    const current = {url: '/#/prod/mt4230t/craft', txt: '电子组装'};
    const h = React.renderToStaticMarkup(<Header history={history} current={current} />);
    h.should.be.equal([
      '<div class="header">',
      '<span><a href="/#/">Home</a><i class="fa fa-chevron-right"></i></span>',
      '<span><a href="/#/prod">Products</a><i class="fa fa-chevron-right"></i></span>',
      '<span><a href="/#/prod/mt4230t">MT4230T</a><i class="fa fa-chevron-right"></i></span>',
      '<span>电子组装</span></div>'
    ].join(''));
  });
});
