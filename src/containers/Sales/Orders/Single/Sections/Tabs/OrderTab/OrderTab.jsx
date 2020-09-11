import React from 'react';
import PropTypes from 'prop-types';
import { FormRadioButtonGroup, Controls } from 'components';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Field, formValueSelector } from 'redux-form';
import TotalAndNotes from './TotalAndNotes/TotalAndNotes';
import OrderItemsTable from './OrderItemsTable';
import styles from './OrderTab.scss';

const selector = formValueSelector('newSalesOrderForm');

const mapStateToProps = state => ({
  status: selector(state, 'status'),
});

const radioButtonValues = [{
  value: false,
  text: 'Single'
}, {
  value: true,
  text: 'Recurring',
}];

const OrderTab = ({
  status,
  readonly,
  isNewOrder
}) => (
  <Row>
    <Col xs>
      <Field
        name="isRecurring"
        props={ {
          radioButtonValues,
          className: styles.orderType
        } }
        type="checkbox"
        disabled={ !isNewOrder }
        component={ FormRadioButtonGroup }
      />
      <Field
        name="skuDetails"
        readonly={ readonly }
        currency="$"
        component={ OrderItemsTable }
      />
      <TotalAndNotes currency="$" />
      <Controls
        submit={ status !== 'Cancel' }
        submitText={ isNewOrder ? 'Save' : 'Confirm' }
        save={ isNewOrder }
        saveText="Save as Draft"
        // onCancel={ this.handleCancel }
      />
    </Col>
  </Row>
);

OrderTab.propTypes = {
  // data
  status: PropTypes.string,
  // state
  readonly: PropTypes.bool,
  isNewOrder: PropTypes.bool,
};

export default connect(mapStateToProps)(OrderTab);
