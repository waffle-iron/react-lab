import React from 'react';
import CraftBar from '../CraftBar';

const noop = () => {};

describe('CraftBar', () => {
  it('render', () => {
    const proci = 1, procs = [
      {id: 'CP01', name: '烧录'},
      {id: 'CP02', name: '组装'},
      {id: 'CP03', name: '老化'},
      {id: 'CP04', name: '测试'},
      {id: 'CP05', name: '包装'}
    ];
    const e = <CraftBar craft={'电子组装'} proci={proci} procs={procs} onProcSelect={noop} />;
    const h = React.renderToStaticMarkup(e);
    h.should.be.equal([
      '<div class="craft-bar">',
      '<div><div class="proc">烧录</div><div class="line"></div></div>',
      '<div><div class="proc selected">组装</div><div class="line"></div></div>',
      '<div><div class="proc">老化</div><div class="line"></div></div>',
      '<div><div class="proc">测试</div><div class="line"></div></div>',
      '<div><div class="proc">包装</div><div class="line"></div></div>',
      '<div class="craft-name">电子组装</div></div>'
    ].join(''));
  });
});
