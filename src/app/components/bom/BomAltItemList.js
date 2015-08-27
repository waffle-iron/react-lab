import React, { PropTypes } from 'react';
import { Table, Input } from 'theme/pure';
import Component from 'PureComponent';

const COL_HEADS = '选择|分类|编号|名称|主辅|供应商|消耗单位|属性'.split('|');

export
class BomAltItem extends Component {
  render() {
    const { item, idx } = this.props;
    return (
      <Table.Row odd={idx % 2 === 1}>
        <td><Input ref="toggle" input="[]" value={idx} checked={item.alt}
          onChange={::this.handleToggle} /></td>
        <td>{item.id}</td>
        <td>{item.code}</td>
        <td>{item.name}</td>
        <td>{item.main ? '主' : '辅'}</td>
        <td>{item.from}</td>
        <td>{item.unit}</td>
        <td>{item.misc}</td>
      </Table.Row>
    );
  }
  handleToggle() {
    const { idx, onToggle } = this.props;
    onToggle(idx);
  }
}
BomAltItem.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
};

class BomAltItemList extends Component {
  render() {
    const { items, onToggle } = this.props;
    return (
      <div className="item-alt-list">
        <div className="head">可替换件</div>
        <Table className="list" striped={true}>
          <thead>
            <tr>{COL_HEADS.map((col, idx) => <th key={idx}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {items.map((item, idx) =>
              <BomAltItem key={idx} item={item}
                idx={idx} onToggle={onToggle} />)}
          </tbody>
        </Table>
      </div>
    );
  }
}
BomAltItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired
};

export default BomAltItemList;
