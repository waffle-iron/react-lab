import React from 'react';
import SpecList from '../SpecList';

const noop = () => {};

describe('SpecList', () => {
  it('render', () => {
    const spec = {
      time: 1.5,
      specs: [
        {code: 'DS01', name: '烧录设备'},
        {code: 'DS04', name: '测试设备'},
      ]
    };
    const e = <SpecList spec={spec}
      timeLabel="设备占用" timeUnit="H"
      onSpecAddNew={noop} onSpecDelete={noop} onTimeUpdate={noop} />;
    const h = React.renderToStaticMarkup(e);
    h.should.be.equal([
      '<div class="spec-list"><div class="head">',
      '<label>设备占用<input type="text" placeholder="数量" value="1.5" class="time">H</label>',
      '<i class="fa fa-plus"></i></div>',
      '<div class="list"><ul>',
      '<li><i class="fa fa-close"></i>烧录设备</li>',
      '<li><i class="fa fa-close"></i>测试设备</li>',
      '</ul></div></div>'
    ].join(''));
  });
});
