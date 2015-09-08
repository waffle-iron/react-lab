import React, { PropTypes } from 'react';
import { Input, Button } from 'theme/pure';
import Component from 'PureComponent';

class SpecList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { time: props.spec.time };
  }
  render() {
    const { spec, timeUnit, timeLabel, onSpecAddNew, onSpecDelete } = this.props;
    return (
      <div className="spec-list">
        <div className="head">
          <Input input={`${timeLabel}[-数量]${timeUnit}`}
            className="time" value={this.state.time}
            onChange={::this.handleTimeChange}
            onKeyUp={::this.handleTimeKeyUp}
            onBlur={::this.handleTimeBlur} />
          <i className="fa fa-plus" ref="add" onClick={onSpecAddNew} />
        </div>
        <div className="list">
          {spec.specs.map((spec, idx) =>
            <div key={idx} className="item">
              <i className="fa fa-close" onClick={() => onSpecDelete(idx)} />
              {spec.text}
            </div>
          )}
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
  onSpecAddNew: PropTypes.func.isRequired,
  onSpecDelete: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  timeUnit: PropTypes.string.isRequired,
  timeLabel: PropTypes.string.isRequired,
  spec: PropTypes.shape({
    time: PropTypes.number.isRequired,
    specs: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })).isRequired,
  }).isRequired,
};

export default SpecList;
