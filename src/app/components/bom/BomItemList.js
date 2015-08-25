import React, { PropTypes } from 'react/addons';
import { Table, Editable, Button } from 'theme/pure';
import Component from 'PureComponent';
import classnames from 'classnames';

const COL_HEADS = '分类|编号|名称|主辅|供应商|消耗单位|数量|属性|删除'.split('|');

export
class BomItem extends Component {
  render() {
    const { item, idx, selected } = this.props;
    return (
      <Table.Row odd={idx % 2 === 1} selected={idx === selected}
        onClick={::this.handleSelect}>
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
          <Button ref="del" onClick={::this.handleDelete}>x</Button>
        </td>
      </Table.Row>
    );
  }
  handleSelect() {
    const { idx, onSelect } = this.props;
    onSelect(idx);
  }
  handleDelete() {
    const { idx, onDelete } = this.props;
    onDelete(idx);
  }
  handleQtyUpdate(qty) {
    const { idx, onQtyUpdate } = this.props;
    onQtyUpdate(idx, parseFloat(qty));
  }
}
BomItem.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  selected: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onQtyUpdate: PropTypes.func.isRequired
};
BomItem.defaultProps = {
  selected: -1
};

class BomItemList extends Component {
  render() {
    const { items, idx, selected, onAddNew, onSelect, onDelete, onQtyUpdate } = this.props;
    return (
      <div className="bom-item-list">
        <div className="head">
          <div className="title">物料</div>
          <div className="add"><Button ref="add" onClick={onAddNew}>+</Button></div>
        </div>
        <Table className="list" striped={true}>
          <thead>
            <tr>{COL_HEADS.map((col, idx) => <th key={idx}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {items.map((item, idx) =>
              <BomItem key={idx} item={item} idx={idx}
                selected={selected} onSelect={onSelect}
                onDelete={onDelete} onQtyUpdate={onQtyUpdate} />)}
          </tbody>
        </Table>
      </div>
    );
  }
}
BomItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.number,
  onAddNew: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onQtyUpdate: PropTypes.func.isRequired
};
BomItemList.defaultProps = {
  selected: -1
};

export default BomItemList;
