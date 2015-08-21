import React, { PropTypes } from 'react/addons';
import Component from 'PureComponent';
import classnames from 'classnames';

class TableRow extends Component {
  render() {
    const { idx, className, ...props } = this.props;
    props.className = classnames(
      (idx % 2 === 1) && 'pure-table-odd', className
    );
    return <tr {...props} />;
  }
}
TableRow.propTypes = {
  idx: PropTypes.number
};

class Table extends Component {
  render() {
    const { className, bordered, horizontal, striped, ...props } = this.props;
    props.className = classnames(
      'pure-table', className, {
        'pure-table-bordered': bordered,
        'pure-table-horizontal': horizontal,
        'pure-table-striped': striped
      });
    return <table {...props} />;
  }
}
Table.propTypes = {
  bordered: PropTypes.bool,
  horizontal: PropTypes.bool,
  striped: PropTypes.bool
};
Table.defaultProps = {
  bordered: false,
  horizontal: false,
  striped: false
};

Table.Row = TableRow;

export default Table;
