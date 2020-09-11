import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import {
  orderGetAllocationData,
  orderGetPickData,
  orderGetPackData,
  orderGetShipData,
  orderGetInvoiceData
} from 'redux-base/actions';
import { connect } from 'react-redux';
import {
  OrderTab,
  AllocationsTab,
  PickTab,
  PackTab,
  ShipTab,
  InvoiceTab,
  ActivityTab
} from './index';
import { tabs } from './Tabs.scss';

const mapDispatchToProps = {
  orderGetPickData,
  orderGetAllocationData,
  orderGetPackData,
  orderGetShipData,
  orderGetInvoiceData
};

const TabPane = Tabs.TabPane;

class OrderTabs extends Component {
  handleTabChange = (tabId) => {
    const { orderNo } = this.props;

    switch (tabId) {
      case 'allocations':
        this.props.orderGetAllocationData({ orderNo });
        break;
      case 'pick':
        this.props.orderGetPickData({ orderNo });
        break;
      case 'pack':
        this.props.orderGetPackData({ orderNo });
        break;
      case 'ship':
        this.props.orderGetShipData({ orderNo });
        break;
      case 'invoice':
        this.props.orderGetInvoiceData({ orderNo });
        break;
      default:
    }
  }

  render() {
    const {
      // common data
      isNewOrder,
      readonly,
      orderNo
    } = this.props;

    return (
      <Row className={ tabs }>
        <Col xs>
          <Tabs
            id="newOrderTabs"
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
            <TabPane
              key="allocations"
              tab="Allocations"
            >
              <AllocationsTab orderNo={ orderNo } />
            </TabPane>
            <TabPane
              key="pick"
              tab="Pick"
            >
              <PickTab orderNo={ orderNo } />
            </TabPane>
            <TabPane
              key="pack"
              tab="Pack"
            >
              <PackTab orderNo={ orderNo } />
            </TabPane>
            <TabPane
              key="ship"
              tab="Ship"
            >
              <ShipTab orderNo={ orderNo } />
            </TabPane>
            <TabPane
              key="invoice"
              tab="Invoice"
            >
              <InvoiceTab />
            </TabPane>
            <TabPane
              key="returns"
              tab="Returns"
            >
              Returns
            </TabPane>
            <TabPane
              key="notes"
              tab="Notes"
            >
              Notes
            </TabPane>
            <TabPane
              key="activity"
              tab="Activity"
            >
              <ActivityTab />
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
  orderNo: PropTypes.string.isRequired,
  // redux-base
  orderGetPickData: PropTypes.func.isRequired,
  orderGetAllocationData: PropTypes.func.isRequired,
  orderGetPackData: PropTypes.func.isRequired,
  orderGetShipData: PropTypes.func.isRequired,
  orderGetInvoiceData: PropTypes.func.isRequired,
  // state
  readonly: PropTypes.bool,
  isNewOrder: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(OrderTabs);
