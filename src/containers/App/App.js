import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {uiLeftMenuOpen, showLoader, hideLoader} from '../../actions/ui';
import {initAndAuth} from '../../actions/vk';

import Header from '../../components/Header/Header';
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer';
import Loader from '../../components/Loader/Loader';

import classes from './app.scss';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

class App extends Component {
  static propTypes = {
    leftMenuOpen: PropTypes.bool.isRequired,
    isShowLoader: PropTypes.bool.isRequired,
    uiLeftMenuOpen: PropTypes.func.isRequired,
    hideLoader: PropTypes.func.isRequired,
    showLoader: PropTypes.func.isRequired,
    isVKInitialized: PropTypes.bool.isRequired,
    isVKAuthorized: PropTypes.bool.isRequired,
    VKAuthExpire: PropTypes.number.isRequired,
    initAndAuthVk: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (!this.props.isVKInitialized) {
      this.props.initAndAuthVk(this.props.VKAuthExpire);
    }
  }

  getLoader() {
    if (this.props.isVKInitialized && this.props.isVKAuthorized) {
      return null;
    }

    return <Loader />;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className={classes.app}>
          <Header onMenuClick={this.props.uiLeftMenuOpen} open={this.props.leftMenuOpen} />
          <LeftDrawer open={this.props.leftMenuOpen} topPosition={darkMuiTheme.appBar.height} />
          {this.getLoader()}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  leftMenuOpen: state.ui.leftMenuOpen,
  isShowLoader: state.ui.showLoader,
  isVKInitialized: state.vk.initialized,
  isVKAuthorized: state.vk.authorized,
  VKAuthExpire: state.vk.expire
});

const mapDispatchToProps = dispatch => ({
  uiLeftMenuOpen: () => dispatch(uiLeftMenuOpen()),
  showLoader: () => dispatch(showLoader()),
  hideLoader: () => dispatch(hideLoader()),
  initAndAuthVk: expire => dispatch(initAndAuth(expire))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
