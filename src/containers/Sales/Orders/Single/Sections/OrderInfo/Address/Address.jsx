import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field } from 'redux-form';
import styles from './Address.scss';

const Address = ({
  orderNo,
  shippingAddress,
  billingAddress,
  email,
  customer,
  readonly
}) => (
  <Row>
    <Col xs={ 12 } md={ 12 } lg={ 12 }>
      { orderNo &&
        <div className={ styles.orderNo }>Order - { orderNo }</div>
      }
      <Row>
        <Col lg={ 6 }>
          <div className={ styles.addressHeader }>
            Billing Address
          </div>
          <div className={ styles.customerName }>
            <strong>{ customer }</strong>
          </div>
          <div className={ styles.customerAddress }>
            <div>{ billingAddress.address1 }</div>
            <div>{ billingAddress.address2 }</div>
            <div>{ `${billingAddress.cityName} ${billingAddress.postalCode || ''}` }</div>
            <div>{ billingAddress.countryName }</div>
            <div className={ styles.customerInfo }>{ `${billingAddress.countryCode}${billingAddress.phone}` }</div>
            <div className={ styles.customerInfo }>{ email }</div>
          </div>
        </Col>
        <Col lg={ 6 }>
          <div className={ styles.addressHeader }>
            Shipping Address
            { !readonly && <span>Edit</span> }
          </div>
          <div className={ styles.customerName }>
            <strong>{ customer }</strong>
          </div>
          <Field
            name="addresses.shippingAddressId"
            component="div"
          />
          <div className={ styles.customerAddress }>
            <div>{ shippingAddress.address1 }</div>
            <div>{ shippingAddress.address2 }</div>
            <div>{ `${shippingAddress.cityName} ${shippingAddress.postalCode || ''}` }</div>
            <div>{ shippingAddress.countryName }</div>
            <div className={ styles.customerInfo }>{ `${shippingAddress.countryCode}${shippingAddress.phone}` }</div>
            <div className={ styles.customerInfo }>{ email }</div>
          </div>
        </Col>
      </Row>

    </Col>
  </Row>
);

Address.propTypes = {
  orderNo: PropTypes.string,
  shippingAddress: PropTypes.object,
  billingAddress: PropTypes.object,
  email: PropTypes.string,
  customer: PropTypes.string.isRequired,
  readonly: PropTypes.bool,
};

export default Address;
