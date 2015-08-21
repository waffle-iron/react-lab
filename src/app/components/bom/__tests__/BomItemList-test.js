import React from 'react';
import BomItemList from '../BomItemList';

const noop = () => {};

describe('BomItemList', () => {
  it('render', () => {
    const items = require('./BomItemList-test.json');
    const e = <BomItemList items={items}
      onQtyUpdate={noop} onAddNew={noop} onDelete={noop} />;
    const h = React.renderToStaticMarkup(e);
    h.should.be.equal([
      '<div class="bom-item-list">',
      '<div class="head"><div class="title">物料</div>',
      '<div class="add"><button type="button" class="pure-button">+</button></div></div>',
      '<table class="pure-table list pure-table-striped"><thead><tr>',
      '<th>分类</th><th>编号</th><th>名称</th><th>主辅</th><th>供应商</th>',
      '<th>消耗单位</th><th>数量</th><th>属性</th></tr></thead><tbody>',
      '<tr class=""><td>1001</td><td>MBD-A1</td><td>A1型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td class="number"><div>1.1</div></td><td>USB2</td></tr>',
      '<tr class=""><td>1002</td><td>MBD-A2</td><td>A2型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td class="number"><div>1.2</div></td><td>USB2/WiFi</td></tr>',
      '<tr class=""><td>1003</td><td>MBD-A3</td><td>A3型主板</td><td>主</td><td>A</td>',
      '<td>p</td><td class="number"><div>1.3</div></td><td>USB3/WiFi</td></tr>',
      '<tr class=""><td>2001</td><td>SCN-A1</td><td>A1型屏幕</td><td>主</td><td>ZENITH</td>',
      '<td>p</td><td class="number"><div>1.4</div></td><td>8寸</td></tr>',
      '<tr class=""><td>2002</td><td>SCN-A2</td><td>A2型屏幕</td><td>主</td><td>A</td>',
      '<td>p</td><td class="number"><div>1.5</div></td><td>8寸/触摸</td></tr>',
      '<tr class=""><td>2003</td><td>SCN-B1</td><td>B1型屏幕</td><td>主</td><td>H</td>',
      '<td>p</td><td class="number"><div>1.6</div></td><td>10寸/触摸</td></tr>',
      '<tr class=""><td>3001</td><td>BBD-A1</td><td>A1型背板</td><td>主</td><td>L</td>',
      '<td>p</td><td class="number"><div>1.7</div></td><td>8寸</td></tr>',
      '<tr class=""><td>3002</td><td>BBD-A2</td><td>A2型背板</td><td>主</td><td>L</td>',
      '<td>p</td><td class="number"><div>1.8</div></td><td>10寸</td></tr>',
      '<tr class=""><td>4001</td><td>BOX-A1</td><td>A1型包装箱</td><td>主</td><td>Z</td>',
      '<td>p</td><td class="number"><div>1.1</div></td><td>40x40x20</td></tr>',
      '<tr class=""><td>4002</td><td>BOX-A2</td><td>A2型包装箱</td><td>主</td><td>Z</td>',
      '<td>p</td><td class="number"><div>1.1</div></td><td>50x50x30</td></tr>',
      '</tbody></table></div>',
    ].join(''));
  });
});
