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
  shippingMethods,
  payterms,
  contactUsers,

  // form data

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
      <Col>
        <strong>Purchase Order Date</strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 4 }>
        <Field
          name="date"
          component={ FormDatePicker }
          readonly={ !isNewOrder && (readonly || !canBeEditedUntilPick) }
        />
      </Col>
    </Row>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col>
        <strong>
          Required By
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
        <strong>Shipping Method</strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 6 }>
        <Field
          name="shippingMethodId"
          component={ FormSelect }
          menuItems={ shippingMethods.map(dm => ({ key: dm.id, value: dm.name })) }
          readonly={ readonly }
        />
      </Col>
    </Row>
    <Row middle="xs" end="xs" className={ styles.input }>
      <Col>
        <strong>Payment Terms</strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 6 }>
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
        <strong>Contact User</strong>
      </Col>
      <Col xs={ 12 } md={ 8 } lg={ 6 }>
        <Field
          name="contactUserId"
          component={ FormSelect }
          menuItems={ contactUsers.map(cu => ({ key: cu.id, value: cu.name })) }
          readonly={ !isNewOrder }
        />
      </Col>
    </Row>
  </Col>
);

OrderCommonData.propTypes = {
  // select data
  shippingMethods: PropTypes.array,
  payterms: PropTypes.array,
  contactUsers: PropTypes.array,
  // form data
  status: PropTypes.string,
  date: PropTypes.string,
  deliveryDate: PropTypes.string,

  // common data
  isNewOrder: PropTypes.bool.isRequired,
  readonly: PropTypes.bool.isRequired,
  canBeEditedUntilPick: PropTypes.bool.isRequired,
  statusColor: PropTypes.string,
};

export default OrderCommonData;
