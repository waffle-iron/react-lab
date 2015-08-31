import React, { PropTypes } from 'react';
import Component from 'PureComponent';
import classnames from 'classnames';

const noop = e => e.stopPropagation();

class CraftBar extends Component {
  render() {
    const { craft, proci, procs, onProcSelect } = this.props;
    return (
      <div className="craft-bar">
        {procs.map((proc, idx) => {
          const cls = classnames('node', {
            selected: idx === proci
          });
          const css = {
            left: (idx * 80) + 'px'
          };
          return (
            <div key={idx} className={cls} style={css}
              onClick={() => onProcSelect(idx)}>
              {proc.name}
              <i className="fa fa-arrow-right" onClick={noop} />
            </div>
          );
        })}
        <div className="node craft">{craft}</div>
      </div>
    );
  }
}
CraftBar.propTypes = {
  onProcSelect: PropTypes.func.isRequired,
  craft: PropTypes.string.isRequired,
  proci: PropTypes.number.isRequired,
  procs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

export default CraftBar;
