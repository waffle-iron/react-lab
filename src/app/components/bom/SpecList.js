import React, { PropTypes } from 'react/addons';
import { Input, Button } from 'theme/pure';
import Component from 'PureComponent';

class SpecList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { timeQty: props.timeQty || 0 };
  }
  render() {
    const { specs, timeUnit, timeLabel } = this.props;
    return (
      <div className="spec-list">
        <div className="time">
          <Input input={`${timeLabel}[-数量]${timeUnit}`}
            className="time-qty" value={this.state.timeQty}
            onChange={::this.handleTimeChange}
            onKeyUp={::this.handleTimeKeyUp}
            onBlur={::this.handleTimeBlur} />
          <Button>...</Button>
        </div>
        <div className="spec">
          <ul>
            {specs.map((spec, idx) =>
              <li key={idx}><Input input={`[]${spec.name}`}
                checked={spec.selected || false}
                value={idx} onChange={::this.handleSpecToggle} /></li>
            )}
          </ul>
        </div>
      </div>
    );
  }
  handleTimeChange(evt) {
    this.setState({ timeQty: evt.target.value });
  }
  handleTimeKeyUp(evt) {
    if (evt.key === 'Enter') {
      this.handleTimeUpdate(evt.target.value);
    }
    else if (evt.key === 'Escape') {
      evt.target.value = this.props.timeQty || 0;
    }
  }
  handleTimeBlur(evt) {
    this.handleTimeUpdate(evt.target.value);
  }
  handleTimeUpdate(input) {
    this.props.onTimeUpdate(parseFloat(input));
  }
  handleSpecToggle(evt) {
    this.props.onSpecToggle(evt.target.value);
  }
}
const specShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool
});
SpecList.propTypes = {
  onSpecToggle: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  specs: PropTypes.arrayOf(specShape).isRequired,
  timeQty: PropTypes.number.isRequired,
  timeUnit: PropTypes.string.isRequired,
  timeLabel: PropTypes.string.isRequired
};

export default SpecList;
