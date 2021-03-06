import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactTestUtils from 'react-addons-test-utils';

import BomItemList, { BomItem } from '../BomItemList';

const noop = () => {};
const _items = require('./BomItemList-test.json');
const Wrapper = React.createClass({
  render() {
    const itemHandlers = this.props.itemHandlers;
    return (
      <table><tbody>
        {_items.slice(0, 2).map((item, idx) =>
          <BomItem key={idx} item={item}
            odd={idx % 2 === 1} selected={idx === 1}
            {...itemHandlers} />)}
      </tbody></table>
    );
  }
});
const _itemComps = (itemHandlers) => {
  const tree = ReactTestUtils.renderIntoDocument(<Wrapper itemHandlers={itemHandlers} />);
  return ReactTestUtils.scryRenderedComponentsWithType(tree, BomItem);
}

describe('BomItem', () => {

  it('should render an even row', () => {
    const idx = 0;
    const e = <BomItem item={_items[idx]}
      odd={idx % 2 === 1} selected={idx === 1}
      onSelect={noop} onDelete={noop} onQtyUpdate={noop} />;
    const h = ReactDOMServer.renderToStaticMarkup(e);
    h.should.be.equal([
      '<tr class=""><td>1001</td><td>MBD-A1</td><td>A1型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td class="number"><div>1.1</div></td><td>USB2</td>',
      '<td><i class="fa fa-close"></i></td></tr>',
    ].join(''));
  });
  it('should render an odd and selected row', () => {
    const idx = 1;
    const e = <BomItem item={_items[idx]}
      odd={idx % 2 === 1} selected={idx === 1}
      onSelect={noop} onDelete={noop} onQtyUpdate={noop} />;
    const h = ReactDOMServer.renderToStaticMarkup(e);
    h.should.be.equal([
      '<tr class="pure-table-odd selected"><td>1002</td><td>MBD-A2</td><td>A2型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td class="number"><div>1.2</div></td><td>USB2/WiFi</td>',
      '<td><i class="fa fa-close"></i></td></tr>',
    ].join(''));
  });

  it('should tigger `onQtyUpdate`', () => {
    let _qty = -1;
    const comps = _itemComps({
      onSelect: noop,
      onDelete: noop,
      onQtyUpdate: (qty) => { _qty = qty; }
    });
    const comp = comps[1].refs.qty;
    ReactTestUtils.Simulate.doubleClick(comp.node());
    const node = comp.input();
    node.value = '2';
    ReactTestUtils.Simulate.change(node);
    ReactTestUtils.Simulate.blur(node);
    _qty.should.be.equal(2);
  });

  it('should tigger `onSelect`', () => {
    let _tigger = '';
    const comps = _itemComps({
      onSelect: () => { _tigger = 'onSelect'; },
      onDelete: noop,
      onQtyUpdate: noop
    });
    ReactTestUtils.Simulate.click(comps[1].node());
    _tigger.should.be.equal('onSelect');
  });

  it('should tigger `onDelete`', () => {
    let _tigger = '';
    const comps = _itemComps({
      onSelect: noop,
      onDelete: () => { _tigger = 'onDelete'; },
      onQtyUpdate: noop
    });
    ReactTestUtils.Simulate.click(comps[1].node('del'));
    _tigger.should.be.equal('onDelete');
  });

});

describe('BomItemList', () => {

  it('should render an empty bom item list', () => {
    const e = <BomItemList itemi={-1} items={[]}
      onSelect={noop} onAddNew={noop} onDelete={noop} onQtyUpdate={noop} />;
    const h = ReactDOMServer.renderToStaticMarkup(e);
  });
  it('should render an bom item list with 2 rows', () => {
    const e = <BomItemList itemi={1} items={_items.slice(0, 2)}
      onSelect={noop} onAddNew={noop} onDelete={noop} onQtyUpdate={noop} />;
    const h = ReactDOMServer.renderToStaticMarkup(e);
  });

  it('should tigger `onAddNew`', () => {
    let _add = false;
    const _handleAddNew = () => { _add = true; };

    const e = <BomItemList itemi={1} items={_items.slice(0, 2)}
      onSelect={noop} onAddNew={_handleAddNew} onDelete={noop} onQtyUpdate={noop} />;
    const c = ReactTestUtils.renderIntoDocument(e);
    ReactTestUtils.Simulate.click(c.node('add'));
    _add.should.be.true;
  });

});
