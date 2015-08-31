import React, { PropTypes } from 'react';
import { Table, Editable, Button, Pure } from 'theme/pure';
import Component from 'PureComponent';
import classnames from 'classnames';

const COL_HEADS = '分类|编号|名称|主辅|供应商|消耗单位|数量|属性|删除'.split('|');

export
class BomItem extends Component {
  render() {
    const { item, odd, selected, onSelect, onDelete } = this.props;
    return (
      <Table.Row odd={odd} selected={selected}
        onClick={onSelect}>
        <td>{item.id}</td>
        <td>{item.code}</td>
        <td>{item.name}</td>
        <td>{item.main ? '主' : '辅'}</td>
        <td>{item.from}</td>
        <td>{item.unit}</td>
        <td className="number">
          <Editable ref="qty" value={item.qty.toString()}
            onUpdate={::this.handleQtyUpdate} />
        </td>
        <td>{item.misc}</td>
        <td>
          <i className="fa fa-close" ref="del" onClick={onDelete} />
        </td>
      </Table.Row>
    );
  }
  handleQtyUpdate(qty) {
    const { onQtyUpdate } = this.props;
    onQtyUpdate(parseFloat(qty));
  }
}
BomItem.propTypes = {
  item: PropTypes.object.isRequired,
  odd: PropTypes.bool,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onQtyUpdate: PropTypes.func.isRequired
};

class BomItemList extends Component {
  render() {
    const { itemi, items, onAddNew, onSelect, onDelete, onQtyUpdate } = this.props;
    return (
      <div className="item-list">
        <div className="head">
          <div className="title">物料</div>
          <div className="add">
            <i className="fa fa-plus" ref="add" onClick={onAddNew} />
          </div>
        </div>
        <div className="list">
          <Table striped={true}>
            <thead>
              <tr>{COL_HEADS.map((col, idx) => <th key={idx}>{col}</th>)}</tr>
            </thead>
            <tbody>
              {items.map((item, idx) =>
                <BomItem key={idx} item={item}
                  odd={idx % 2 === 1} selected={idx === itemi}
                  onSelect={() => onSelect(idx)}
                  onDelete={() => onDelete(idx)}
                  onQtyUpdate={qty => onQtyUpdate(idx, qty)} />)}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
BomItemList.propTypes = {
  itemi: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddNew: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onQtyUpdate: PropTypes.func.isRequired
};

export default BomItemList;
