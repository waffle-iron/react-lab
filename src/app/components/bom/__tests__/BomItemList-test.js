import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import BomItemList, { BomItem } from '../BomItemList';

const noop = () => {};
const _items = require('./BomItemList-test.json');
const _itemComps = (itemHandlers) => {
  const tree = TestUtils.renderIntoDocument((
    <table><tbody>
      {_items.slice(0, 2).map((item, idx) =>
        <BomItem key={idx} idx={idx} item={item}
          {...itemHandlers} />)}
    </tbody></table>
  ));
  return TestUtils.scryRenderedComponentsWithType(tree, BomItem);
}

describe('BomItem', () => {

  it('should render an even row', () => {
    const idx = 0;
    const e = <BomItem idx={idx} item={_items[idx]}
      onSelect={noop} onDelete={noop} onQtyUpdate={noop} />;
    const h = React.renderToStaticMarkup(e);
    h.should.be.equal([
      '<tr class=""><td>1001</td><td>MBD-A1</td><td>A1型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td class="number"><div>1.1</div></td><td>USB2</td>',
      '<td><button type="button" class="pure-button">x</button></td></tr>',
    ].join(''));
  });
  it('should render an odd row', () => {
    const idx = 1;
    const e = <BomItem idx={idx} item={_items[idx]}
      onSelect={noop} onDelete={noop} onQtyUpdate={noop} />;
    const h = React.renderToStaticMarkup(e);
    h.should.be.equal([
      '<tr class="pure-table-odd"><td>1002</td><td>MBD-A2</td><td>A2型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td class="number"><div>1.2</div></td><td>USB2/WiFi</td>',
      '<td><button type="button" class="pure-button">x</button></td></tr>',
    ].join(''));
  });

  it('should tigger `onQtyUpdate`', () => {
    let _idx = -1, _qty = -1;
    const comps = _itemComps({
      onSelect: noop,
      onDelete: noop,
      onQtyUpdate: (idx, qty) => { _idx = idx; _qty = qty; }
    });
    const comp = comps[1].refs.qty;
    TestUtils.Simulate.doubleClick(comp.node());
    const node = comp.input();
    node.value = '2';
    TestUtils.Simulate.change(node);
    TestUtils.Simulate.blur(node);
    _idx.should.be.equal(1);
    _qty.should.be.equal(2);
  });

  it('should tigger `onSelect`', () => {
    let _idx = -1;
    const comps = _itemComps({
      onSelect: (idx) => { _idx = idx; },
      onDelete: noop,
      onQtyUpdate: noop
    });
    TestUtils.Simulate.click(comps[1].node());
    _idx.should.be.equal(1);
  });

  it('should tigger `onDelete`', () => {
    let _idx = -1;
    const comps = _itemComps({
      onSelect: noop,
      onDelete: (idx) => { _idx = idx; },
      onQtyUpdate: noop
    });
    TestUtils.Simulate.click(comps[1].node('del'));
    _idx.should.be.equal(1);
  });

});

describe('BomItemList', () => {

  it('should render an empty bom item list', () => {
    const e = <BomItemList items={[]}
      onSelect={noop} onAddNew={noop} onDelete={noop} onQtyUpdate={noop} />;
    const h = React.renderToStaticMarkup(e);
    h.should.be.equal([
      '<div class="bom-item-list">',
      '<div class="head"><div class="title">物料</div>',
      '<div class="add"><button type="button" class="pure-button">+</button></div></div>',
      '<table class="pure-table list pure-table-striped"><thead><tr>',
      '<th>分类</th><th>编号</th><th>名称</th><th>主辅</th><th>供应商</th>',
      '<th>消耗单位</th><th>数量</th><th>属性</th><th>删除</th></tr></thead><tbody>',
      '</tbody></table></div>',
    ].join(''));
  });
  it('should render an bom item list with 2 rows', () => {
    const e = <BomItemList items={_items.slice(0, 2)}
      onSelect={noop} onAddNew={noop} onDelete={noop} onQtyUpdate={noop} />;
    const h = React.renderToStaticMarkup(e);
    h.should.be.equal([
      '<div class="bom-item-list">',
      '<div class="head"><div class="title">物料</div>',
      '<div class="add"><button type="button" class="pure-button">+</button></div></div>',
      '<table class="pure-table list pure-table-striped"><thead><tr>',
      '<th>分类</th><th>编号</th><th>名称</th><th>主辅</th><th>供应商</th>',
      '<th>消耗单位</th><th>数量</th><th>属性</th><th>删除</th></tr></thead><tbody>',
      '<tr class=""><td>1001</td><td>MBD-A1</td><td>A1型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td class="number"><div>1.1</div></td><td>USB2</td>',
      '<td><button type="button" class="pure-button">x</button></td></tr>',
      '<tr class="pure-table-odd"><td>1002</td><td>MBD-A2</td><td>A2型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td class="number"><div>1.2</div></td><td>USB2/WiFi</td>',
      '<td><button type="button" class="pure-button">x</button></td></tr>',
      '</tbody></table></div>',
    ].join(''));
  });

  it('should tigger `onAddNew`', () => {
    let _add = false;
    const _handleAddNew = () => { _add = true; };

    const e = <BomItemList items={_items.slice(0, 2)}
      onSelect={noop} onAddNew={_handleAddNew} onDelete={noop} onQtyUpdate={noop} />;
    const c = TestUtils.renderIntoDocument(e)
    const addNode = c.refs.add.node();
    TestUtils.Simulate.click(addNode);
    _add.should.be.true;
  });

});
