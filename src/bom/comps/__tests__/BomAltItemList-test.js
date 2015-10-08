import assign from 'object-assign';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactTestUtils from 'react-addons-test-utils';

import BomAltItemList, { BomAltItem } from '../BomAltItemList';

const noop = () => {};
const _items = require('./BomItemList-test.json');
const Wrapper = React.createClass({
  render() {
    const itemHandlers = this.props.itemHandlers;
    return (
      <table><tbody>
        {_items.slice(0, 2).map((item, idx) =>
          <BomAltItem key={idx} idx={idx} item={item}
            {...itemHandlers} />)}
      </tbody></table>
    );
  }
});
const _itemComps = (itemHandlers) => {
  const tree = ReactTestUtils.renderIntoDocument(<Wrapper itemHandlers={itemHandlers} />);
  return ReactTestUtils.scryRenderedComponentsWithType(tree, BomAltItem);
}

describe('BomAltItem', () => {

  it('should render an even row', () => {
    const idx = 0;
    const e = <BomAltItem idx={idx} item={_items[idx]} onToggle={noop} />;
    const h = ReactDOMServer.renderToStaticMarkup(e);
    h.should.be.equal([
      '<tr class=""><td><input type="checkbox" value="0"/></td>',
      '<td>1001</td><td>MBD-A1</td><td>A1型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td>USB2</td></tr>'
    ].join(''));
  });

  it('should render an odd row with toggle-on', () => {
    const idx = 1, item = assign({}, _items[idx], {alt: true});
    const e = <BomAltItem idx={idx} item={item} onToggle={noop} />;
    const h = ReactDOMServer.renderToStaticMarkup(e);
    h.should.be.equal([
      '<tr class="pure-table-odd">',
      '<td><input type="checkbox" value="1" checked=""/></td>',
      '<td>1002</td><td>MBD-A2</td><td>A2型主板</td><td>主</td><td>I</td>',
      '<td>p</td><td>USB2/WiFi</td></tr>'
    ].join(''));
  });

  it('should tigger `onToggle`', () => {
    let _idx = -1;
    const items = _itemComps({
      onToggle: (idx) => { _idx = idx; }
    });
    ReactTestUtils.Simulate.change(items[1].node('toggle'));
    _idx.should.be.equal(1);
  });

});
