import 'styles/main.scss';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider, notification } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Footer, Breadcrumb } from 'components';
import parseError from './parseError';
import styles from './CoreLayout.scss';

const mapStateToProps = state => ({
  errorDescription: state.error.errorDescription,
  successMessage: state.success.successMessage,
  user: state.login.user,
  commonDataLoaded: state.commonData.commonDataLoaded
});

const showNotification = (errorDescription, dispatch) => {
  notification.error({
    message: 'Error',
    description: parseError(errorDescription, dispatch)
  });
};

class CoreLayout extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errorDescription) {
      showNotification(nextProps.errorDescription, this.props.dispatch);
    }

    if (nextProps.successMessage) {
      notification.success({
        message: 'Success',
        description: nextProps.successMessage
      });
    }
  }

  render() {
    const {
      children,
      location,
      user,
      commonDataLoaded
    } = this.props;

    const pathnames = location.pathname.split('/');

    return (
      <LocaleProvider locale={ enUS }>
        <div id="content" className={ styles.content }>
          <Header />
          { user && commonDataLoaded && <Breadcrumb pathnames={ pathnames } /> }
          <main id="main" className={ styles.main }>
            { children }
          </main>
          <Footer />
        </div>
      </LocaleProvider>
    );
  }
}

CoreLayout.propTypes = {
  // props
  user: PropTypes.object,
  commonDataLoaded: PropTypes.bool.isRequired,
  errorDescription: PropTypes.object,
  successMessage: PropTypes.string,
  children: PropTypes.node,
  // router
  location: PropTypes.object,
  // redux
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps)(CoreLayout));
