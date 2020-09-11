import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field } from 'redux-form';
import styles from './Address.scss';

const Address = ({
  // supplierLocations,
  // companyLocations,
  supplierAddress,
  shippingAddress,
  billingAddress,
  readonly
}) => (
  <Row>
    <Col xs={ 12 } md={ 12 } lg={ 12 }>
      <Row>
        <Col lg={ 4 }>
          <div className={ styles.addressHeader }>
            Purchase Order To:
          </div>
          <div className={ styles.addressCompany }>
            <strong>{ }</strong>
          </div>
          { supplierAddress &&
            <div className={ styles.addressInfo }>
              <div>{ supplierAddress.address1 }</div>
              <div>{ supplierAddress.address2 }</div>
              <div>{ `${supplierAddress.cityName} ${supplierAddress.postalCode || ''}` }</div>
              <div>{ supplierAddress.countryName }</div>
              <div className={ styles.phoneNo }>{ `${supplierAddress.countryCode || ''}${supplierAddress.phone || ''}` }</div>
            </div>
          }
        </Col>
        <Col lg={ 4 }>
          <div className={ styles.addressHeader }>
            Ship To:
            { !readonly && <span>Edit</span> }
          </div>
          <div className={ styles.addressCompany }>
            <strong>{ }</strong>
          </div>
          <Field
            name="addresses.shippingAddressId"
            component="div"
          />
          { shippingAddress &&
            <div className={ styles.addressInfo }>
              <div>{ shippingAddress.address1 }</div>
              <div>{ shippingAddress.address2 }</div>
              <div>{ `${shippingAddress.cityName} ${shippingAddress.postalCode || ''}` }</div>
              <div>{ shippingAddress.countryName }</div>
              <div className={ styles.phoneNo }>{ `${shippingAddress.countryCode || ''}${shippingAddress.phone || ''}` }</div>
            </div>
          }
        </Col>
        <Col lg={ 4 }>
          <div className={ styles.addressHeader }>
            Bill To:
          </div>
          <div className={ styles.addressCompany }>
            <strong>{ }</strong>
          </div>
          { billingAddress &&
            <div className={ styles.addressInfo }>
              <div>{ billingAddress.address1 }</div>
              <div>{ billingAddress.address2 }</div>
              <div>{ `${billingAddress.cityName} ${billingAddress.postalCode || ''}` }</div>
              <div>{ billingAddress.countryName }</div>
              <div className={ styles.phoneNo }>{ `${billingAddress.countryCode || ''}${billingAddress.phone || ''}` }</div>
            </div>
          }
        </Col>
      </Row>

    </Col>
  </Row>
);

Address.propTypes = {
  supplierAddress: PropTypes.object,
  shippingAddress: PropTypes.object,
  billingAddress: PropTypes.object,
  supplierLocations: PropTypes.array,
  companyLocations: PropTypes.array,
  readonly: PropTypes.bool,
};

export default Address;
