import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import {
  FormAutocomplete
} from 'components';
import { Field, formValueSelector } from 'redux-form';
import {
  purchaseOrderSearchSupplierRequest,
  supplierLocationsGetRequest
} from 'redux-base/actions';
import { connect } from 'react-redux';
import {
  renderAutocompleteItem,
  filterAutoCompleteSuggestions,
  getColorByStatus
} from 'utils';
import Address from './Address/Address';
import OrderCommonData from './OrderCommonData/OrderCommonData';
import styles from './OrderInfo.scss';
import { canBeEditedUntilPicked } from '../../orderHelpers';

const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  loadingAutoComplete: state.purchaseOrder.loadingAutoComplete,
  suppliersAutocomplete: state.purchaseOrder.suppliersAutocomplete,
  suppliersKeyword: state.purchaseOrder.suppliersKeyword,
  supplierAddress: state.purchaseOrder.supplierAddress,
  billingAddress: state.purchaseOrder.billingAddress,
  shippingAddress: state.purchaseOrder.shippingAddress,
  supplierLocations: state.purchaseOrder.supplierLocations,
  companyLocations: state.purchaseOrder.companyLocations,
  contactUsers: state.purchaseOrder.contactUsers,
  payterms: state.commonData.payterms,
  shippingMethods: state.commonData.shippingMethods,
  staticData: selector(state,
    'status',
    'date',
    'deliveryDate',
    'shippingMethodId',
    'paymentTerms',
    'contactUserId',
  )
});

const mapDispatchToProps = {
  purchaseOrderSearchSupplierRequest,
  supplierLocationsGetRequest
};

const renderSupplierItem = renderAutocompleteItem(['id', 'name', 'country'], 'Supplier');

class OrderInfo extends Component {

  handleSearchSupplier = (keyword) => {
    this.props.purchaseOrderSearchSupplierRequest({
      payload: keyword
    });
  }

  handleSelectSupplierSuggestion = (data) => {
    this.props.supplierLocationsGetRequest(data);
  }

  render() {
    const {
      // state
      isNewOrder,
      readonly,

      // data
      supplierAddress,
      billingAddress,
      shippingAddress,
      supplierLocations,
      companyLocations,
      contactUsers,
      payterms,
      shippingMethods,

      // autocompletes
      suppliersAutocomplete,
      suppliersKeyword,

      // triggers
      loadingAutoComplete,

      // form
      change,
      staticData: {
        status,
        date,
        deliveryDate,
      }
    } = this.props;

    const canBeEditedUntilPick = canBeEditedUntilPicked(status);
    const statusColor = getColorByStatus(status);

    return (
      <Row className={ styles.orderInfo }>
        <Col xs={ 12 } md={ 6 } lg={ 7 }>
          { isNewOrder &&
            <Row middle="xs" className={ styles.supplier }>
              <strong className={ styles.label }>Supplier</strong>
              <Col xs={ 12 } md={ 8 } lg={ 4 }>
                <Field
                  name="vendor.id"
                  component="div"
                />
                <Field
                  name="vendor.name"
                  component={ FormAutocomplete }
                  props={ {
                    itemKey: 'name',
                    fieldName: 'vendor',
                    autocomplete: filterAutoCompleteSuggestions(suppliersAutocomplete, suppliersKeyword),
                    getItemValue: item => item.data.id.toString(),
                    onChange: this.handleSearchSupplier,
                    onSelect: this.handleSelectSupplierSuggestion,
                    renderItem: renderSupplierItem,
                    loadingAutoComplete,
                    changeFormField: change,
                    placeholder: 'Type to autocomplete supplier name'
                  } }
                />
              </Col>
            </Row>
          }
          {
            <Address
              supplierAddress={ supplierAddress }
              billingAddress={ billingAddress }
              shippingAddress={ shippingAddress }
              supplierLocations={ supplierLocations }
              companyLocations={ companyLocations }
              readonly={ readonly || !canBeEditedUntilPick }
            />
          }
        </Col>
        {
          <OrderCommonData
            isNewOrder={ isNewOrder }
            date={ date }
            deliveryDate={ deliveryDate }
            shippingMethods={ shippingMethods }
            payterms={ payterms }
            contactUsers={ contactUsers }
            status={ status }
            statusColor={ statusColor }
            readonly={ readonly }
            canBeEditedUntilPick={ canBeEditedUntilPick }
          />
        }
      </Row>
    );
  }
}

OrderInfo.propTypes = {
  // data
  supplierAddress: PropTypes.object,
  billingAddress: PropTypes.object,
  shippingAddress: PropTypes.object,
  supplierLocations: PropTypes.array,
  companyLocations: PropTypes.array,
  contactUsers: PropTypes.array,
  payterms: PropTypes.array,
  shippingMethods: PropTypes.array,

  // state
  isNewOrder: PropTypes.bool.isRequired,
  readonly: PropTypes.bool,

  // redux-base
  purchaseOrderSearchSupplierRequest: PropTypes.func.isRequired,
  supplierLocationsGetRequest: PropTypes.func.isRequired,

  // autocompletes
  loadingAutoComplete: PropTypes.bool.isRequired,
  suppliersAutocomplete: PropTypes.array.isRequired,
  suppliersKeyword: PropTypes.string.isRequired,

  // form
  change: PropTypes.func.isRequired,
  staticData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
