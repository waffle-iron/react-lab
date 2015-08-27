import React, { PropTypes } from 'react';
import Component from 'PureComponent';
import classnames from 'classnames';

class CraftBar extends Component {
  render() {
    const { craft, proci, procs, onProcSelect } = this.props;
    return (
      <div className="craft-bar">
        {procs.map((proc, idx) => {
          const cls = classnames('node proc', {
            selected: idx === proci
          });
          return (
            <div key={idx}>
              <div className={cls}
                onClick={() => onProcSelect(idx)}>
                {proc.name}
              </div>
              <div className="line" />
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
