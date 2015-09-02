import assign from 'object-assign';
import React, { Component } from 'react/addons';

class PureComponent extends Component {
  node(refId) {
    const comp = refId ? this.refs[refId] : this;
    return React.findDOMNode(comp);
  }
  render() {
    console.warn('It is an abstract class.');
  }
}

[
  React.addons.PureRenderMixin
].forEach(mixin => assign(
  PureComponent.prototype, mixin));

export default PureComponent;
