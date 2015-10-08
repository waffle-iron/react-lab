import assign from 'object-assign';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class PureComponent extends Component {
  node(refId) {
    const comp = refId ? this.refs[refId] : this;
    return ReactDOM.findDOMNode(comp);
  }
  render() {
    console.warn('It is an abstract class.');
  }
}

[
  PureRenderMixin
].forEach(mixin => assign(
  PureComponent.prototype, mixin));

export default PureComponent;
