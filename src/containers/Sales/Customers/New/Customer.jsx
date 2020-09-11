/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Spin } from 'antd';
import { customerNewRequest, clearSuccess } from 'redux-base/actions';
import { Row, Col } from 'react-flexbox-grid';
import {
  FormInput,
  FormRadioButtonGroup,
  FormTelephoneInput,
  PageHeader,
  Controls
} from 'components';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styles from './Customer.scss';

const mapStateToProps = state => ({
  customer: state.customer.newCustomer,
  successSave: state.customer.successSave,
  loadingPage: state.customer.loadingPage
});

const mapDispatchToProps = {
  customerNewRequest,
  clearSuccess,
  push
};

const reduxFormConfig = {
  form: 'customersNewPageForm',
  initialValues: {
    type: '0'
  }
  // validate: CustomersNewFormValidation
};

const radioButtonValues = [{
  value: '0',
  text: 'B2C',
}, {
  value: '1',
  text: 'B2B',
}];


class Customer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.successSave) {
      const { newCustomer } = nextProps;
      this.props.push(`/sales/customers/${newCustomer.id}/${newCustomer.name}`);
    }
  }

  componentWillUnmount() {
    this.props.clearSuccess();
  }


  handleSave = (values) => {
    this.props.customerNewRequest({
      payload: {
        ...values,
        phone: values.phone.number,
        countryCode: values.phone.countryCode
      }
    });
  }

  handleCancel = () => {
    this.props.push('/sales/customers');
  }

  render() {

    const {
      handleSubmit,
      loadingPage
    } = this.props;

    return (
      <Spin spinning={ loadingPage }>
        <PageHeader
          bigText="Customer Details"
          smallText="Enter your customer details, name, type to setup your relationship"
        />
        <form
          className={ styles.form }
          onSubmit={ handleSubmit(this.handleSave) }
        >
          <Row middle="xs" center="xs">
            <Col xs={ 12 } md={ 6 } lg={ 2 }>
              <label>
                <strong>
                  Customer type
                </strong>
              </label>
            </Col>
            <Col xs={ 12 } md={ 6 } lg={ 4 }>
              <Field
                name="type"
                props={ {
                  radioButtonValues,
                  className: styles.radioGroup
                } }
                component={ FormRadioButtonGroup }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs={ 12 } md={ 6 } lg={ 2 }>
              <label>
                <strong>
                  First name
                </strong>
              </label>
            </Col>
            <Col xs={ 12 } md={ 6 } lg={ 4 }>
              <Field
                name="firstName"
                placeholder="first name"
                component={ FormInput }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs={ 12 } md={ 6 } lg={ 2 }>
              <label>
                <strong>Last name</strong>
              </label>
            </Col>
            <Col xs={ 12 } md={ 6 } lg={ 4 }>
              <Field
                name="lastName"
                placeholder="last name"
                component={ FormInput }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs={ 12 } md={ 6 } lg={ 2 }>
              <label>
                <strong>
                  Email address
                </strong>
              </label>
            </Col>
            <Col xs={ 12 } md={ 6 } lg={ 4 }>
              <Field
                name="email"
                placeholder="someone@xyz.com"
                component={ FormInput }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col xs={ 12 } md={ 6 } lg={ 2 }>
              <label>
                <strong>
                  Contact number
                </strong>
              </label>
            </Col>
            <Col xs={ 12 } md={ 6 } lg={ 4 }>
              <Field
                name="phone"
                component={ FormTelephoneInput }
                props={ {
                  defaultCountry: 'sg'
                } }
              />
            </Col>
          </Row>
          <Controls
            submitText="Create"
            submit
            onCancel={ this.handleCancel }
          />
        </form>
      </Spin>
    );
  }
}

Customer.propTypes = {
  newCustomer: PropTypes.object,
  customerNewRequest: PropTypes.func.isRequired,
  clearSuccess: PropTypes.func.isRequired,
  successSave: PropTypes.bool.isRequired,
  loadingPage: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Customer));
