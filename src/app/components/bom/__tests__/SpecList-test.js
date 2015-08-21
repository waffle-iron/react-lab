import React from 'react';
import SpecList from '../SpecList';

const noop = () => {};

describe('SpecList', () => {
  it('render', () => {
    const specs = [
      {code: 'DS01', name: '烧录设备', selected: true},
      {code: 'DS03', name: '老化设备'},
      {code: 'DS04', name: '测试设备', selected: true},
      {code: 'DS05', name: '包装设备'}
    ];
    const e = <SpecList specs={specs}
      timeLabel="设备占用" timeUnit="H" timeQty={1.5}
      onSpecToggle={noop} onTimeUpdate={noop} />;
    const h = React.renderToStaticMarkup(e);
    h.should.be.equal([
      '<div class="spec-list"><div class="time">',
      '<label>设备占用<input type="text" placeholder="数量" value="1.5" class="time-qty">H</label>',
      '<button type="button" class="pure-button">...</button></div>',
      '<div class="spec"><ul>',
      '<li><label><input type="checkbox" checked value="0">烧录设备</label></li>',
      '<li><label><input type="checkbox" value="1">老化设备</label></li>',
      '<li><label><input type="checkbox" checked value="2">测试设备</label></li>',
      '<li><label><input type="checkbox" value="3">包装设备</label></li>',
      '</ul></div></div>'
    ].join(''));
  });
});
