import React from 'react';
import PropTypes from 'prop-types';
import { Controls } from 'components';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Field, formValueSelector } from 'redux-form';
import TotalAndNotes from './TotalAndNotes/TotalAndNotes';
import OrderItemsTable from './OrderItemsTable';

const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  status: selector(state, 'status'),
});

const OrderTab = ({
  status,
  readonly,
  isNewOrder
}) => (
  <Row>
    <Col xs>
      <Field
        name="details"
        readonly={ readonly }
        currency="$"
        component={ OrderItemsTable }
      />
      <TotalAndNotes currency="$" />
      <Controls
        submit={ status !== 'Cancel' }
        showHr={ false }
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
