import React, { PropTypes } from 'react';
import { Input, Button } from 'theme/pure';
import Component from 'PureComponent';

class SpecList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { time: props.spec.time || 0 };
  }
  render() {
    const { spec, timeUnit, timeLabel } = this.props;
    return (
      <div className="spec-list">
        <div className="head">
          <Input input={`${timeLabel}[-数量]${timeUnit}`}
            className="time" value={this.state.time}
            onChange={::this.handleTimeChange}
            onKeyUp={::this.handleTimeKeyUp}
            onBlur={::this.handleTimeBlur} />
          <i className="fa fa-plus" />
        </div>
        <div className="list">
          <ul>
            {spec.specs.map((spec, idx) =>
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
    this.setState({ time: evt.target.value });
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

SpecList.propTypes = {
  onSpecToggle: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  timeUnit: PropTypes.string.isRequired,
  timeLabel: PropTypes.string.isRequired,
  spec: PropTypes.shape({
    time: PropTypes.number.isRequired,
    specs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool
    })).isRequired,
  }).isRequired,
};

export default SpecList;
