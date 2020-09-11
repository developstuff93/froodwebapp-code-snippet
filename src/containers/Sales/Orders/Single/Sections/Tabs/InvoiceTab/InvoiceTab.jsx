import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { OrderTabHeader } from 'components';
import { connect } from 'react-redux';
import InvoiceTotalAndNotes from './InvoiceTotalAndNotes/InvoiceTotalAndNotes';
import InvoiceItemsTable from './InvoiceItemsTable';
import styles from '../Tabs.scss';

const mapStateToProps = state => ({
  data: state.order.invoiceData,
});

const InvoiceTab = ({ data }) => (
  <div>
    <OrderTabHeader
      location={ data && data.invoiceNo }
      locationLabel="Tax Invoice"
      primaryButtonText="Download"
    >
      <Row className={ styles.row }>
        <Col lg>
          Payment Date: { data && data.paymentDate }
        </Col>
      </Row>
    </OrderTabHeader>
    <Row>
      <Col xs>
        <InvoiceItemsTable
          data={ data && data.list }
          isRecurring={ data && data.isRecurring }
        />
        <InvoiceTotalAndNotes
          data={ data }
        />
      </Col>
    </Row>
  </div>
);

InvoiceTab.propTypes = {
  data: PropTypes.object
};

export default connect(mapStateToProps)(InvoiceTab);
