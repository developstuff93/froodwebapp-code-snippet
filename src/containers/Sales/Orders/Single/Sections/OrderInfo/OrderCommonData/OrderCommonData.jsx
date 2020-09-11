import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import {
  FormDatePicker,
  FormSelect
} from 'components';
import { Field } from 'redux-form';
import styles from './OrderCommonData.scss';

const OrderCommonData = ({
  // status
  status,
  statusColor,

  // select data
  deliveryMethods,
  payterms,
  slots,

  // form data
  orderDate,
  channel,
  channelRef,

  // state
  isNewOrder,
  readonly,
  canBeEditedUntilPick,
}) => (
  <Col xs={ 12 } md={ 6 } lg={ 5 }>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col xs>
        <span className={ styles.status } style={ { backgroundColor: statusColor } }>
          { status }
        </span>
      </Col>
    </Row>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col xs>
        <strong>
          Order Channel: { channel.name }
        </strong>
      </Col>
    </Row>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col xs>
        <strong>
          Channel Ref: { channelRef }
        </strong>
      </Col>
    </Row>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col>
        <strong>Order Date</strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 4 }>
        { isNewOrder &&
          <Field
            name="orderDate"
            component={ FormDatePicker }
          /> }
        { !isNewOrder &&
          <Row start="xs">
            <Col xs>
              <div className={ styles.orderDate }>
                { orderDate }
              </div>
            </Col>
          </Row> }
      </Col>
    </Row>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col>
        <strong>
          Expected Delivery Date
        </strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 4 }>
        <Field
          name="deliveryDate"
          component={ FormDatePicker }
          readonly={ !isNewOrder && (readonly || !canBeEditedUntilPick) }
        />
      </Col>
    </Row>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col>
        <strong>Payment Terms</strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 4 }>
        <Field
          name="paymentTerms.id"
          component={ FormSelect }
          menuItems={ payterms.map(pt => ({ key: pt.id, value: pt.name })) }
          readonly={ !isNewOrder }
        />
      </Col>
    </Row>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col>
        <strong>Delivery Method</strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 4 }>
        <Field
          name="deliveryMethodId"
          component={ FormSelect }
          menuItems={ deliveryMethods.map(dm => ({ key: dm.id, value: dm.description })) }
          readonly={ readonly }
        />
      </Col>
    </Row>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col>
        <strong>Delivery Slot</strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 4 }>
        <Field
          name="deliverySlotId"
          component={ FormSelect }
          menuItems={ slots }
          readonly={ !isNewOrder && (readonly || !canBeEditedUntilPick) }
        />
      </Col>
    </Row>
    { /* <Row middle="xs" end="xs" className={ styles.row }>
      <Col>
        <strong>Sales Person</strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 4 }>
        <Field
          name="salesPerson.name"
          component={ FormAutocomplete }
          props={ {
            fieldName: 'salesPerson',
            itemKey: 'name',
            autocomplete: filterAutoCompleteSuggestions(salesAutocomplete, salesKeyword),
            getItemValue: item => item.data.id.toString(),
            onChange: this.handleSearchSalesPerson,
            onSelect: this.handleSelectSalesSuggestion,
            renderItem: renderSalesItem,
            loadingAutoComplete,
            changeFormField: change,
            placeholder: 'Search by name',
            alignRight: true
          } }
        />
      </Col>
    </Row> */ }
  </Col>
);

OrderCommonData.propTypes = {
  // select data
  payterms: PropTypes.array,
  slots: PropTypes.array,
  deliveryMethods: PropTypes.array,
  // form data
  status: PropTypes.string,
  channelRef: PropTypes.string,
  channel: PropTypes.object,
  orderDate: PropTypes.string,

  // common data
  isNewOrder: PropTypes.bool.isRequired,
  readonly: PropTypes.bool.isRequired,
  canBeEditedUntilPick: PropTypes.bool.isRequired,
  statusColor: PropTypes.string,
};

export default OrderCommonData;
