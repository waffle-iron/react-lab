import React, { PropTypes } from 'react';
import Component from 'PureComponent';

class CraftBar extends Component {
  render() {
    const { craft, value, onProcSelected } = this.props;
    return (
      <div className="craft-bar">
        {craft.procs.map((proc, idx) => {
          const cls = proc.id === value ? 'proc selected' : 'proc';
          return (
            <div key={idx}>
              <div className={cls}
                onClick={onProcSelected(proc.id)}>
                {proc.name}
              </div>
              <div className="line" />
            </div>
          );
        })}
        <div className="craft-end">{craft.name}</div>
      </div>
    );
  }
}
const procShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});
const craftShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  procs: PropTypes.arrayOf(procShape).isRequired
});
CraftBar.propTypes = {
  onProcSelected: PropTypes.func.isRequired,
  craft: craftShape.isRequired,
  value: PropTypes.string.isRequired // selected proc id
};

export default CraftBar;
