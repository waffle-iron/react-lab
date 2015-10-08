import React from 'react';
import ReactDOMServer from 'react-dom/server';

import SpecList from '../SpecList';

const noop = () => {};

describe('SpecList', () => {
  it('render', () => {
    const spec = {
      time: 1.5,
      specs: [
        {code: 'DS01', text: '烧录设备'},
        {code: 'DS04', text: '测试设备'},
      ]
    };
    const e = <SpecList spec={spec}
      timeLabel="设备占用" timeUnit="H"
      onSpecAddNew={noop} onSpecDelete={noop} onTimeUpdate={noop} />;
    const h = ReactDOMServer.renderToStaticMarkup(e);
    h.should.be.equal([
      '<div class="spec-list"><div class="head">',
      '<label>设备占用<input type="text" placeholder="数量" value="1.5" class="time"/>H</label>',
      '<i class="fa fa-plus"></i></div>',
      '<div class="list">',
      '<div class="item"><i class="fa fa-close"></i>烧录设备</div>',
      '<div class="item"><i class="fa fa-close"></i>测试设备</div>',
      '</div></div>'
    ].join(''));
  });
});
