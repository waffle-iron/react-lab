import React, { PropTypes } from 'react';
import Component from 'PureComponent';

import Header from './comps/Header';
import Footer from './comps/Footer';
import Loading from './comps/Loading';

import Bom from '../bom/bom';

import { connect } from 'react-redux';
import appStateSelector from './appSelector';

import { load, save } from './appActions';

class App extends Component {
  render() {
    const { renderOnly, dispatch, req, nav, bom } = this.props;
    const _dispatch = renderOnly ? null : dispatch;
    return (
      <div>
        <Header nav={nav} />
        <Bom dispatch={_dispatch} {...bom} />
        <Footer />
        <Loading loading={req.loading} />
      </div>
    );
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(load());
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(save());
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  req: PropTypes.shape({
    loading: Loading.propTypes.loading
  }),
  nav: Header.propTypes.nav,
  bom: PropTypes.shape(Bom.propTypes).isRequired
};

export default connect(appStateSelector)(App);
