/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { Checkbox, Button, Spin } from 'antd';
import {
  transportersGetRequest,
  transportersUpdateRequest
} from 'redux-base/actions';
import { channel } from 'styles/settings.scss';

const mapStateToProps = state => ({
  data: state.transporters.fulfilments,
  loadingPage: state.transporters.loadingPage,
  needReloadTransporters: state.transporters.needReloadTransporters
});

const mapDispatchToProps = {
  transportersGetRequest,
  transportersUpdateRequest
};

class Fulfilment extends Component {

  componentWillMount() {
    this.props.transportersGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReloadTransporters) {
      this.props.transportersGetRequest();
    }
  }

  handleUpdateFulfilmentStatus = (e) => {
    this.props.transportersUpdateRequest({
      payload: {
        id: e.target.id,
        isActive: e.target.checked
      }
    });
  }

  render() {
    const {
      data,
      loadingPage
    } = this.props;

    return (
      <Spin spinning={ loadingPage }>
        <Row>
          { data.map(item => (
            <Col lg={ 3 } key={ item.id }>
              <div className={ channel }>
                <div>
                  <Checkbox
                    id={ item.id }
                    checked={ item.isActive }
                    onChange={ this.handleUpdateFulfilmentStatus }
                  >
                    Enabled
                  </Checkbox>
                </div>
                <div>
                  Image
                </div>
                <div>
                  <Button disabled={ !item.isActive }>
                    <Link
                      to={ `/settings/sales/fulfilment/${item.id}` }
                      replace
                    >
                      Configure
                    </Link>
                  </Button>
                </div>
              </div>
            </Col>
          )) }
        </Row>
      </Spin>
    );
  }
}

Fulfilment.propTypes = {
  // data
  data: PropTypes.array.isRequired,
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadTransporters: PropTypes.bool.isRequired,
  // redux-base
  transportersGetRequest: PropTypes.func.isRequired,
  transportersUpdateRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Fulfilment);
