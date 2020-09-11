import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { FormInput } from 'components';
import { toFixed2 } from 'utils';
import styles from './TotalAndNotes.scss';

const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  data: selector(state, 'details'),
  shipping: selector(state, 'shipping'),
  adjustment: selector(state, 'adjustment')
});

const getTotals = data => (
  data && data.reduce((prevValue, currValue) => ({
    price: Number(prevValue.price) + Number(currValue.price * currValue.qty),
    tax: Number(prevValue.tax) + Number(currValue.tax),
    discount: Number(prevValue.discount) + Number(currValue.discount),
    total: Number(prevValue.total) + Number((currValue.price * currValue.qty) - currValue.discount)
  }), { price: 0, tax: 0, discount: 0, shippingCharge: 0, total: 0 })
);

const TotalAndNotes = ({ data, shipping, adjustment, currency }) => {
  const total = getTotals(data);

  return (
    <Row className={ styles.statsRow }>
      <Col xs={ 12 } md={ 6 }>
        <Row end="xs" className={ styles.row }>
          <Col xs={ 12 } md={ 6 } lg={ 3 }>
            <strong>Supplier Notes</strong>
          </Col>
          <Col xs={ 12 } md={ 6 } lg={ 9 }>
            <Field
              name="vendorNotes"
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
            <strong>Internal Notes</strong>
          </Col>
          <Col xs={ 12 } md={ 6 } lg={ 9 }>
            <Field
              name="internalNotes"
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
      </Col>
      <Col xs={ 12 } mdOffset={ 2 } md={ 4 } className={ styles.stats } >
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Sub Total (Before Tax)</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${toFixed2(total.total)} ${currency}` }</strong>
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
            <Field
              name="shipping"
              component={ FormInput }
              props={ {
                style: {
                  width: 'auto',
                  marginLeft: '0.5rem'
                }
              } }
            />
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Adjustment</strong>
          </Col>
          <Col xs={ 4 }>
            <Field
              name="adjustment"
              component={ FormInput }
              props={ {
                style: {
                  width: 'auto',
                  marginLeft: '0.5rem'
                }
              } }
            />
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Total</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${toFixed2(total.total + Number(shipping) + Number(adjustment))} ${currency}` }</strong>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

TotalAndNotes.propTypes = {
  data: PropTypes.array,
  shipping: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  adjustment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  currency: PropTypes.string,
};

export default connect(mapStateToProps)(TotalAndNotes);

