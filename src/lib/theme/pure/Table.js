import React, { PropTypes } from 'react/addons';
import Component from 'PureComponent';
import classnames from 'classnames';

class TableRow extends Component {
  render() {
    const { odd, selected, className, ...props } = this.props;
    props.className = classnames(
      odd && 'pure-table-odd', className,
      selected && 'selected'
    );
    return <tr {...props} />;
  }
}
TableRow.propTypes = {
  odd: PropTypes.bool,
  selected: PropTypes.bool
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
