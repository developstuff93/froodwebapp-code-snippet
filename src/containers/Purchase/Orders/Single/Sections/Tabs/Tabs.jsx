import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import {
} from 'redux-base/actions';
import { connect } from 'react-redux';
import {
  OrderTab,
} from './index';
import { tabs } from './Tabs.scss';

const mapDispatchToProps = {
};

const TabPane = Tabs.TabPane;

class OrderTabs extends Component {
  handleTabChange = () => {
  }

  render() {
    const {
      // common data
      isNewOrder,
      readonly,
    } = this.props;

    return (
      <Row className={ tabs }>
        <Col xs>
          <Tabs
            id="newPurchaseOrderTabs"
            defaultActiveKey="order"
            onChange={ this.handleTabChange }
            animated={ false }
          >
            <TabPane
              key="order"
              tab="Order"
            >
              <OrderTab
                readonly={ readonly }
                isNewOrder={ isNewOrder }
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

OrderTabs.propTypes = {
  // data
  shippingCharge: PropTypes.number,
  customerCredit: PropTypes.string,
  orderId: PropTypes.string.isRequired,
  // redux-base
  // orderGetPickData: PropTypes.func.isRequired,
  // orderGetAllocationData: PropTypes.func.isRequired,
  // orderGetPackData: PropTypes.func.isRequired,
  // orderGetShipData: PropTypes.func.isRequired,
  // orderGetInvoiceData: PropTypes.func.isRequired,
  // state
  readonly: PropTypes.bool,
  isNewOrder: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(OrderTabs);
