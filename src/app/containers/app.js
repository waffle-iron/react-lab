import React, { PropTypes } from 'react';
import PureComponent from 'PureComponent';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

import Bom from './bom/bom';

import { connect } from 'react-redux';
import appStateSelector from './appSelector';

class App extends PureComponent {
  render() {
    const { dispatch, req, navis, bom } = this.props;
    return (
      <div>
        <Header navis={navis} />
        <Bom dispatch={dispatch} {...bom} />
        <Footer />
        <Loading loading={req.loading} />
      </div>
    );
  }
}

export default connect(appStateSelector)(App);
