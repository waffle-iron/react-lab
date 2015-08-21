import React, { PropTypes } from 'react/addons';
import { Table, Editable, Button } from 'theme/pure';
import Component from 'PureComponent';

class BomItem extends Component {
  render() {
    const { key, item } = this.props;
    return (
      <Table.Row odd={key % 2 === 1}>
        <td>{item.id}</td>
        <td>{item.code}</td>
        <td>{item.name}</td>
        <td>{item.main ? '主' : '辅'}</td>
        <td>{item.from}</td>
        <td>{item.unit}</td>
        <td className="number">
          <Editable value={item.qty.toString()}
            onUpdate={::this.handleQtyUpdate} />
        </td>
        <td>{item.misc}</td>
      </Table.Row>
    );
  }
  handleQtyUpdate(qty) {
    this.props.onQtyUpdate(parseFloat(qty));
  }
}
BomItem.propTypes = {
  item: PropTypes.object.isRequired,
  onQtyUpdate: PropTypes.func.isRequired
};

class BomItemList extends Component {
  render() {
    const { items, onQtyUpdate, onDelete, onAddNew } = this.props;
    const cols = '分类 | 编号 | 名称 | 主辅 | 供应商 | 消耗单位 | 数量 | 属性'.split(' | ');
    return (
      <div className="bom-item-list">
        <div className="head">
          <div className="title">物料</div>
          <div className="add"><Button onClick={onAddNew}>+</Button></div>
        </div>
        <Table className="list" striped={true}>
          <thead>
            <tr>{cols.map((col, idx) => <th key={idx}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {items.map((item, idx) =>
              <BomItem key={idx} item={item}
                onDelete={() => onDelete(idx)}
                onQtyUpdate={(qty) => onQtyUpdate(idx, qty)} />)}
          </tbody>
        </Table>
      </div>
    );
  }
}
BomItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onQtyUpdate: PropTypes.func.isRequired
};

export default BomItemList;
