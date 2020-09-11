import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { FormInput } from 'components';
import { toFixed2 } from 'utils';
import styles from './TotalAndNotes.scss';

const selector = formValueSelector('newSalesOrderForm');

const mapStateToProps = state => ({
  data: selector(state, 'skuDetails'),
  shippingCharge: selector(state, 'shippingCharge'),
  customerCredit: selector(state, 'customerCredit'),
});

const getTotals = data => (
  data && data.reduce((prevValue, currValue) => ({
    unitPrice: Number(prevValue.unitPrice) + Number(currValue.unitPrice * currValue.qty),
    tax: Number(prevValue.tax) + Number(currValue.tax),
    discount: Number(prevValue.discount) + Number(currValue.discount),
    total: Number(prevValue.total) + Number((currValue.unitPrice * currValue.qty) - currValue.discount)
  }), { unitPrice: 0, tax: 0, discount: 0, shippingCharge: 0, total: 0 })
);

const TotalAndNotes = ({ data, shippingCharge, customerCredit, currency }) => {
  const total = getTotals(data);

  return (
    <Row className={ styles.statsRow }>
      { /* <Col xs={ 12 } md={ 6 } lg={ 6 }>
        <Row end="xs" className={ styles.row }>
          <Col xs={ 12 } md={ 6 } lg={ 3 }>
            <strong>Customer Notes</strong>
          </Col>
          <Col xs={ 12 } md={ 6 } lg={ 9 }>
            <Field
              name="customerNotes"
              placeholder="Any text"
              type="textarea"
              component={ FormInput }
              props={ {
                style: {
                  minHeight: '5rem'
                }
              } }
            />
          </Col>
        </Row>
        <Row end="xs">
          <Col xs={ 12 } md={ 6 } lg={ 3 }>
            <strong>Terms & Conditions</strong>
          </Col>
          <Col xs={ 12 } md={ 6 } lg={ 9 }>
            <Field
              name="termsAndCondition"
              placeholder="Any text"
              type="textarea"
              component={ FormInput }
              props={ {
                style: {
                  minHeight: '5rem'
                }
              } }
            />
          </Col>
        </Row>
      </Col> */ }
      <Col xs={ 12 } md={ 8 } lg={ 8 } />
      <Col xs={ 12 } md={ 4 } lg={ 4 } className={ styles.stats } >
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Sub Total</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${toFixed2(total.unitPrice)} ${currency}` }</strong>
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Taxes</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${toFixed2(total.tax)} ${currency}` }</strong>
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Shipping</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${toFixed2(shippingCharge)} ${currency}` }</strong>
          </Col>
        </Row>
        <Row middle="xs" className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Promotion</strong>
            <Field
              name="promoCode"
              component={ FormInput }
              disabled
              props={ {
                style: {
                  width: 'auto',
                  marginLeft: '0.5rem'
                }
              } }
            />
          </Col>
          <Col xs={ 4 }>
            <strong>{ 0 }</strong>
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Recur Discounts</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${toFixed2(total.discount)} ${currency}` }</strong>
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Customer Credit</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ `${toFixed2(customerCredit)} ${currency}` }</strong>
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Total (SGD)</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${toFixed2((total.total + shippingCharge) - total.discount)} ${currency}` }</strong>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

TotalAndNotes.propTypes = {
  data: PropTypes.array,
  shippingCharge: PropTypes.number,
  customerCredit: PropTypes.number,
  currency: PropTypes.string,
};

export default connect(mapStateToProps)(TotalAndNotes);

