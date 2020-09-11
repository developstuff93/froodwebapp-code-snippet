/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { FormInput, FormSelect, Controls } from 'components';
import { reduxForm, Field } from 'redux-form';
import { push } from 'react-router-redux';
import { Spin } from 'antd';
import {
  supplierSaveRequest,
  supplierUpdateRequest
} from 'redux-base/actions';
// import fields from '../../modalFields';
import styles from '../../Supplier.scss';

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  supplierCreated: state.supplier.supplierCreated,
  initialValues: state.supplier.supplierData,
  countries: state.commonData.countries,
  payterms: state.commonData.payterms,
});

const mapDispatchToProps = {
  supplierSaveRequest,
  supplierUpdateRequest,
  push
};

const reduxFormConfig = {
  form: 'supplierMainTab',
  enableReinitialize: true
};

class MainTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.supplierCreated) {
      this.props.push('/purchase/suppliers');
    }
  }


  handleSave = (formData) => {
    if (this.props.isNewSupplier) {
      this.props.supplierSaveRequest({
        payload: {
          countryId: formData.country.id,
          currencyId: formData.currency.id,
          description: formData.description,
          name: formData.name,
          website: formData.website
        }
      });
    } else {
      this.props.supplierUpdateRequest({
        payload: {
          countryId: formData.country.id,
          currencyId: formData.currency.id,
          description: formData.description,
          id: this.props.supplierId,
          paymentTerms: formData.paymentTerms.id,
          tin: formData.tin,
          website: formData.website
        }
      });
    }
  }

  render() {
    const {
      loadingPage,
      handleSubmit,
      countries,
      payterms,
      isNewSupplier
    } = this.props;

    const countriesMenuItems = countries.map(country => ({ key: country.id, value: country.name }));
    const currenciesMenuItems = countries.map(country => ({ key: country.id, value: country.currency }));
    const payTermsMenuItems = payterms.map(payterm => ({ key: payterm.id, value: payterm.name }));

    return (
      <Spin spinning={ loadingPage }>
        <form
          className={ styles.form }
          onSubmit={ handleSubmit(this.handleSave) }
        >
          { isNewSupplier &&
            <Row middle="xs" center="xs">
              <Col lg={ 2 }>
                <label>Company Name</label>
              </Col>
              <Col lg={ 4 }>
                <Field
                  name="name"
                  placeholder="Enter name of a company"
                  component={ FormInput }
                />
              </Col>
            </Row>
          }
          <Row middle="xs" center="xs">
            <Col lg={ 2 }>
              <label>Description</label>
            </Col>
            <Col lg={ 4 }>
              <Field
                name="description"
                placeholder="Description"
                type="textarea"
                component={ FormInput }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col lg={ 2 }>
              <label>Country</label>
            </Col>
            <Col lg={ 4 }>
              <Field
                name="country.id"
                menuItems={ countriesMenuItems }
                component={
                  FormSelect
                }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col lg={ 2 }>
              <label>Dealing Currency</label>
            </Col>
            <Col lg={ 4 }>
              <Field
                name="currency.id"
                menuItems={ currenciesMenuItems }
                component={
                  FormSelect
                }
              />
            </Col>
          </Row>
          <Row middle="xs" center="xs">
            <Col lg={ 2 }>
              <label>Website</label>
            </Col>
            <Col lg={ 4 }>
              <Field
                name="website"
                placeholder="abc.com (Optional)"
                type="text"
                component={ FormInput }
              />
            </Col>
          </Row>
          { !isNewSupplier &&
          <Row middle="xs" center="xs">
            <Col lg={ 2 }>
              <label>Payment Terms</label>
            </Col>
            <Col lg={ 4 }>
              <Field
                name="paymentTerms.id"
                menuItems={ payTermsMenuItems }
                component={
                  FormSelect
                }
              />
            </Col>
          </Row>
          }
          { !isNewSupplier &&
          <Row middle="xs" center="xs">
            <Col lg={ 2 }>
              <label>Tax Identification Number</label>
            </Col>
            <Col lg={ 4 }>
              <Field
                name="tin"
                placeholder="Any text"
                type="text"
                component={ FormInput }
              />
            </Col>
          </Row>
          }
          <Controls
            submit
            cancel={ false }
          />
        </form>
      </Spin>
    );
  }
}

MainTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  supplierCreated: PropTypes.bool.isRequired,
  // data
  countries: PropTypes.array.isRequired,
  payterms: PropTypes.array.isRequired,
  supplierId: PropTypes.string.isRequired,
  isNewSupplier: PropTypes.bool.isRequired,
  // routeri
  push: PropTypes.func.isRequired,
  // redux-base
  supplierSaveRequest: PropTypes.func.isRequired,
  supplierUpdateRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(MainTab));
