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
      '<div class="node" style="left:0px;">烧录<i class="fa fa-arrow-right"></i></div>',
      '<div class="node selected" style="left:80px;">组装<i class="fa fa-arrow-right"></i></div>',
      '<div class="node" style="left:160px;">老化<i class="fa fa-arrow-right"></i></div>',
      '<div class="node" style="left:240px;">测试<i class="fa fa-arrow-right"></i></div>',
      '<div class="node" style="left:320px;">包装<i class="fa fa-arrow-right"></i></div>',
      '<div class="node craft">电子组装</div></div>'
    ].join(''));
  });
});
