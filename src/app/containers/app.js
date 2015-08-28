import React, { PropTypes } from 'react';
import Component from 'PureComponent';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

import Bom from './bom/bom';

import { connect } from 'react-redux';
import appStateSelector from './appSelector';

class App extends Component {
  render() {
    const { renderOnly, dispatch, req, navis, bom } = this.props;
    const _dispatch = renderOnly ? null : dispatch;
    return (
      <div>
        <Header navis={navis} />
        <Bom dispatch={_dispatch} {...bom} />
        <Footer />
        <Loading loading={req.loading} />
      </div>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  req: PropTypes.shape({
    loading: Loading.propTypes.loading
  }),
  navis: Header.propTypes.navis,
  bom: PropTypes.shape(Bom.propTypes).isRequired
};

export default connect(appStateSelector)(App);
