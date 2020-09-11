import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import {
  supplierInfoGetRequest,
  supplierLocationsGetRequest,
  supplierNotesGetRequest,
  supplierContactsGetRequest,
  supplierOrdersGetRequest,
  supplierPriceListGetRequest,
} from 'redux-base/actions';
import {
  MainTab,
  LocationsTab,
  ContactsTab,
  OrdersTab,
  PriceListTab,
  ReturnsTab,
  NotesTab
} from './index';

const TabPane = Tabs.TabPane;

const mapDispatchToProps = {
  supplierInfoGetRequest,
  supplierLocationsGetRequest,
  supplierNotesGetRequest,
  supplierContactsGetRequest,
  supplierOrdersGetRequest,
  supplierPriceListGetRequest,
};


class PurchaseSupplierTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'main'
    };
  }

  componentWillMount() {
    this.props.supplierInfoGetRequest({
      id: this.props.supplierId
    });
  }

  handleTabChange = (tab) => {
    const id = this.props.supplierId;
    this.setState({
      activeTab: tab
    }, () => {
      switch (tab) {
        case 'main':
          this.props.supplierInfoGetRequest({ id });
          break;
        case 'locations':
          this.props.supplierLocationsGetRequest({ id });
          break;
        case 'contacts':
          this.props.supplierContactsGetRequest({ id });
          break;
        case 'orders':
          this.props.supplierOrdersGetRequest({ id });
          break;
        case 'pricelist':
          this.props.supplierPriceListGetRequest({
            params: [{
              id
            }]
          });
          break;
        case 'notes':
          this.props.supplierNotesGetRequest({ id });
          break;
        default:
      }
    });
  }

  render() {
    const { activeTab } = this.state;

    const {
      supplierId,
      isNewSupplier
    } = this.props;

    return (
      <Row>
        <Col lg>
          <Tabs
            activeKey={ activeTab }
            onChange={ this.handleTabChange }
            animated={ false }
          >
            <TabPane
              key="main"
              tab="Main"
            >
              <MainTab
                supplierId={ supplierId }
                isNewSupplier={ isNewSupplier }
              />
            </TabPane>
            <TabPane
              key="locations"
              tab="Locations"
            >
              <LocationsTab
                supplierId={ supplierId }
              />
            </TabPane>
            <TabPane
              key="contacts"
              tab="Contacts"
            >
              <ContactsTab
                supplierId={ supplierId }
              />
            </TabPane>
            <TabPane
              key="orders"
              tab="Orders"
            >
              <OrdersTab
                supplierId={ supplierId }
              />
            </TabPane>
            <TabPane
              key="pricelist"
              tab="Price List"
            >
              <PriceListTab
                supplierId={ supplierId }
              />
            </TabPane>
            <TabPane
              key="returns"
              tab="Returns"
            >
              <ReturnsTab />
            </TabPane>
            <TabPane
              key="notes"
              tab="Notes"
            >
              <NotesTab
                supplierId={ supplierId }
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

PurchaseSupplierTabs.propTypes = {
  // props
  supplierId: PropTypes.string.isRequired,
  isNewSupplier: PropTypes.bool.isRequired,
  // redux-base
  supplierInfoGetRequest: PropTypes.func.isRequired,
  supplierLocationsGetRequest: PropTypes.func.isRequired,
  supplierNotesGetRequest: PropTypes.func.isRequired,
  supplierContactsGetRequest: PropTypes.func.isRequired,
  supplierOrdersGetRequest: PropTypes.func.isRequired,
  supplierPriceListGetRequest: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(PurchaseSupplierTabs);
