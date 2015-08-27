import _ from 'lodash';
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
].forEach(mixin => _.assign(
  PureComponent.prototype, mixin));

export default PureComponent;
