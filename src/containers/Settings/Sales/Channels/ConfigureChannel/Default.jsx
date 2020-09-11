/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  defaultChannelGetRequest,
  defaultChannelUpdateRequest
} from 'redux-base/actions';
import { reduxForm, Field } from 'redux-form';
import { Spin } from 'antd';
import { FormSelect, Controls } from 'components';
import { form } from 'styles/common.scss';

const mapStateToProps = state => ({
  loadingPage: state.channels.loadingPage,
  channelData: state.channels.channelData,
  priceList: state.channels.priceList,
  initialValues: state.channels.channelData,
  payterms: state.commonData.payterms
});

const mapDispatchToProps = {
  defaultChannelGetRequest,
  defaultChannelUpdateRequest,
  push
};

const reduxFormConfig = {
  form: 'defaultChannelPageForm',
  enableReinitialize: true
  // validate: NumericsFormValidation
};

class Default extends Component {

  componentWillMount = () => {
    this.props.defaultChannelGetRequest({
      params: [{
        id: this.props.channelId
      }]
    });
  }

  handleCancel = () => {
    this.props.push('/settings/sales/channels');
  }

  handleSave = (values) => {
    const payload = {
      paymentTermId: values.paymentTermId,
      priceListId: values.priceListId,
      isActive: values.isActive,
    };
    payload.id = this.props.channelId;
    this.props.defaultChannelUpdateRequest({
      payload
    });
  }

  render() {
    const {
      payterms,
      priceList,
      handleSubmit,
      loadingPage
    } = this.props;

    const sellpriceList = priceList.filter(pl => pl.type === 2);

    return (
      <div>
        <Spin spinning={ loadingPage }>
          <Row center="xs">
            <Col xs={ 12 } lg={ 5 }>
              <form
                className={ form }
                onSubmit={ handleSubmit(this.handleSave) }
              >
                <Row middle="xs" center="xs">
                  <Col xs={ 4 }>
                    <label>Price List</label>
                  </Col>
                  <Col xs={ 8 }>
                    <Field
                      name="priceListId"
                      type="select"
                      menuItems={ sellpriceList.map(item => ({ key: item.id, value: item.name })) }
                      component={ FormSelect }
                    />
                  </Col>
                </Row>
                <Row middle="xs" center="xs">
                  <Col xs={ 4 }>
                    <label>Payment Terms</label>
                  </Col>
                  <Col xs={ 8 }>
                    <Field
                      name="paymentTermId"
                      type="select"
                      menuItems={ payterms.map(item => ({ key: item.id, value: item.name })) }
                      component={ FormSelect }
                    />
                  </Col>
                </Row>
                <Controls
                  onCancel={ this.handleCancel }
                  submit
                />
              </form>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

Default.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  // data
  channelId: PropTypes.number.isRequired,
  priceList: PropTypes.array.isRequired,
  payterms: PropTypes.array.isRequired,
  // redux-base
  defaultChannelGetRequest: PropTypes.func.isRequired,
  defaultChannelUpdateRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
  // react router
  push: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Default));
