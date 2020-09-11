/* eslint-disable jsx-a11y/anchor-is-valid, css-modules/no-unused-class */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import {
  FormAutocomplete
} from 'components';
import { Field, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import {
  searchCustomerRequest,
  searchSalesPersonSearchRequest,
  customerInfoGetRequest
} from 'redux-base/actions';
import { connect } from 'react-redux';
import {
  renderAutocompleteItem,
  filterAutoCompleteSuggestions
} from 'utils';
import Address from './Address/Address';
import OrderCommonData from './OrderCommonData/OrderCommonData';
import getColorByStatus from './getColorByStatus';
import styles from './OrderInfo.scss';
import { canBeEditedUntilPicked } from '../../orderHelpers';

const selector = formValueSelector('newSalesOrderForm');

const mapStateToProps = state => ({
  loadingAutoComplete: state.order.loadingAutoComplete,
  customersAutocomplete: state.order.customersAutocomplete,
  salesAutocomplete: state.order.salesAutocomplete,
  billingAddress: state.order.billingAddress,
  shippingAddress: state.order.shippingAddress,
  customersKeyword: state.order.customersKeyword,
  salesKeyword: state.order.salesKeyword,
  payterms: state.commonData.payterms,
  deliveryMethods: state.commonData.deliveryMethods,
  staticData: selector(state,
    'status',
    'channelRef',
    'customer',
    'channel',
    'customerCredit',
    'orderNo',
    'orderDate',
    'deliveryMethodId'
  )
});

const mapDispatchToProps = {
  searchCustomerRequest,
  searchSalesPersonSearchRequest,
  customerInfoGetRequest
};

const renderCustomerItem = renderAutocompleteItem(['id', 'name', 'email'], 'Customer');
// const renderSalesItem = renderAutocompleteItem(['id', 'name', 'email'], 'User');

class OrderInfo extends Component {

  handleSearchCustomer = (keyword) => {
    this.props.searchCustomerRequest({
      payload: keyword
    });
  }

  handleSearchSalesPerson = (keyword) => {
    this.props.searchSalesPersonSearchRequest({
      payload: keyword
    });
  }

  handleSelectCustomerSuggestion = (data) => {
    this.props.customerInfoGetRequest(data);
  }

  render() {
    const {
      // state
      isNewOrder,
      readonly,

      // data
      billingAddress,
      shippingAddress,
      deliveryMethods,
      payterms,

      // autocompletes
      customersAutocomplete,
      customersKeyword,
      // salesAutocomplete,
      // salesKeyword,

      // triggers
      loadingAutoComplete,

      // form
      change,
      staticData: {
        orderNo,
        status,
        channelRef,
        customer,
        channel,
        orderDate,
        deliveryMethodId
      }
    } = this.props;

    let slots = [];
    const deliveryMethod = deliveryMethods.find(dm => dm.id === deliveryMethodId);

    if (deliveryMethod) {
      slots = deliveryMethod.slots.map(sl => ({ key: sl.id, value: sl.name }));
    }

    const canBeEditedUntilPick = canBeEditedUntilPicked(status);
    const statusColor = getColorByStatus(status);

    return (
      <Row>
        <Col xs={ 12 } md={ 6 } lg={ 7 }>
          { isNewOrder &&
            <Row middle="xs" className={ styles.customer }>
              <strong className={ styles.label }>Customer</strong>
              <Col xs={ 12 } md={ 8 } lg={ 4 }>
                <Field
                  name="customer.id"
                  component="div"
                />
                <Field
                  name="customer.name"
                  component={ FormAutocomplete }
                  itemKey="name"
                  fieldName="customer"
                  autocomplete={ filterAutoCompleteSuggestions(customersAutocomplete, customersKeyword) }
                  getItemValue={ item => item.data.id.toString() }
                  onChange={ this.handleSearchCustomer }
                  onSelect={ this.handleSelectCustomerSuggestion }
                  renderItem={ renderCustomerItem }
                  loadingAutoComplete={ loadingAutoComplete }
                  changeFormField={ change }
                  placeholder="Search by customer name"
                />
              </Col>
              <Col xs={ 12 } md={ 8 } lg={ 4 }>
                <Link to="/sales/customers/new">Add New Customer</Link>
              </Col>
            </Row>
          }
          { shippingAddress &&
            <Address
              orderNo={ orderNo }
              customer={ customer.name }
              billingAddress={ billingAddress }
              shippingAddress={ shippingAddress }
              email={ customer && customer.email }
              readonly={ readonly || !canBeEditedUntilPick }
            />
          }
        </Col>
        <OrderCommonData
          isNewOrder={ isNewOrder }
          channelRef={ channelRef }
          channel={ channel }
          orderDate={ orderDate }
          deliveryMethods={ deliveryMethods }
          payterms={ payterms }
          slots={ slots }
          status={ status }
          statusColor={ statusColor }
          readonly={ readonly }
          canBeEditedUntilPick={ canBeEditedUntilPick }
        />
      </Row>
    );
  }
}

OrderInfo.propTypes = {
  // data
  billingAddress: PropTypes.object,
  shippingAddress: PropTypes.object,
  deliveryMethods: PropTypes.array,
  payterms: PropTypes.array,

  // state
  orderNo: PropTypes.string,
  isNewOrder: PropTypes.bool.isRequired,
  readonly: PropTypes.bool,

  // redux-base
  searchCustomerRequest: PropTypes.func.isRequired,
  searchSalesPersonSearchRequest: PropTypes.func.isRequired,
  customerInfoGetRequest: PropTypes.func.isRequired,

  // autocompletes
  loadingAutoComplete: PropTypes.bool.isRequired,
  customersAutocomplete: PropTypes.array.isRequired,
  customersKeyword: PropTypes.string.isRequired,
  salesAutocomplete: PropTypes.array.isRequired,
  salesKeyword: PropTypes.string.isRequired,

  // form
  change: PropTypes.func.isRequired,
  staticData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
