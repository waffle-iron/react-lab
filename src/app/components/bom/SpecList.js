import React, { PropTypes } from 'react';
import { Input, Button } from 'theme/pure';
import Component from 'PureComponent';

class SpecList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { time: props.spec.time };
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
                value={idx} checked={spec.selected || false}
                onChange={::this.handleSpecToggle} /></li>
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
      this._submit(evt.target.value);
    }
    else if (evt.key === 'Escape') {
      this._cancel();
    }
  }
  handleTimeBlur(evt) {
    this._submit(evt.target.value);
  }
  handleSpecToggle(evt) {
    this.props.onSpecToggle(evt.target.value);
  }

  _submit(input) {
    const val = parseFloat(input);
    if (isNaN(val)) {
      this._cancel();
    }
    else if (val !== this.props.spec.time) {
      this.props.onTimeUpdate(val);
    }
  }
  _cancel() {
    this.setState({ time: this.props.spec.time });
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
