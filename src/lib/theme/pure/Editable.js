import React, { PropTypes } from 'react/addons';
import Component from 'PureComponent';

class Editable extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
      editValue: props.value
    };
  }
  render() {
    const { editing, editValue } = this.state;
    const { value, text, className, ...props } = this.props;
    if (editing) {
      return (
        <div className={className}>
          <input ref="input" value={editValue}
            onChange={::this.handleChange}
            onKeyUp={::this.handleKeyUp}
            onBlur={::this.handleBlur} {...props} />
        </div>
      );
    }
    else {
      const t = text === void 0 ? value
        : (typeof text === 'function' ? text(value) : text);
      return (
        <div className={className}
          onDoubleClick={::this.handleEditing}>{t}</div>
      );
    }
  }

  input() {
    return this.node('input');
  }
  focus() {
    return this.input().focus();
  }

  handleEditing(evt) {
    evt.preventDefault();
    this.setState({
      editing: true,
      editValue: this.props.value
    }, this.focus.bind(this));
  }
  handleChange(evt) {
    this.setState({ editValue: evt.target.value });
  }
  handleKeyUp(evt) {
    const { editing, editValue } = this.state;
    const { value, onUpdate, onCancel } = this.props;
    if (evt.key === 'Enter') {
      editValue !== value && onUpdate(editValue);
      this.setState({ editing: false });
    }
    else if (evt.key === 'Escape') {
      onCancel && onCancel();
      this.setState({
        editing: false,
        editValue: value
      });
    }
  }
  handleBlur(evt) {
    const { editing, editValue } = this.state;
    if (editing) {
      const { value, onUpdate } = this.props;
      editValue !== value && onUpdate(editValue);
      this.setState({ editing: false });
    }
  }

}
Editable.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  value: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default Editable;
