import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import {
  itemInfoGetRequest,
  // itemBinsGetRequest,
  // itemSuppliersGetRequest,
  // itemStockLifeCycleGetRequest,
  // itemUOMGetRequest
} from 'redux-base/actions';
import {
  MainTab,
  // BinsTab,
  // SuppliersTab,
  // StockLifeCycleTab,
  // UOMTab
} from './index';

const TabPane = Tabs.TabPane;

const mapDispatchToProps = {
  itemInfoGetRequest,
  // itemBinsGetRequest,
  // itemSuppliersGetRequest,
  // itemStockLifeCycleGetRequest,
  // itemUOMGetRequest
};


class ItemsTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'main'
    };
  }

  componentWillMount() {
    this.props.itemInfoGetRequest({
      id: this.props.skuItemId
    });
  }

  handleTabChange = (tab) => {
    const id = this.props.skuItemId;
    this.setState({
      activeTab: tab
    }, () => {
      switch (tab) {
        case 'main':
          this.props.itemInfoGetRequest({ id });
          break;
        // case 'bins':
        //   this.props.itemBinsGetRequest({ id });
        //   break;
        // case 'suppliers':
        //   this.props.itemSuppliersGetRequest({ id });
        //   break;
        // case 'stockLifeCycle':
        //   this.props.itemStockLifeCycleGetRequest({ id });
        //   break;
        // case 'uom':
        //   this.props.itemUOMGetRequest({ id });
        //   break;
        default:
      }
    });
  }

  render() {
    const { activeTab } = this.state;

    const {
      skuItemId,
      isNewSkuItem
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
                skuItemId={ skuItemId }
                isNewSkuItem={ isNewSkuItem }
              />
            </TabPane>
            { /*
            <TabPane
              key="locations"
              tab="Locations"
            >
              <BinsTab
                skuItemId={ skuItemId }
              />
            </TabPane>
            <TabPane
              key="contacts"
              tab="Contacts"
            >
              <SuppliersTab
                skuItemId={ skuItemId }
              />
            </TabPane>
            <TabPane
              key="orders"
              tab="Orders"
            >
              <StockLifeCycleTab
                skuItemId={ skuItemId }
              />
            </TabPane>
            <TabPane
              key="pricelist"
              tab="Price List"
            >
              <UOMTab
                skuItemId={ skuItemId }
              />
            </TabPane>
            */ }
          </Tabs>
        </Col>
      </Row>
    );
  }
}

ItemsTabs.propTypes = {
  // props
  skuItemId: PropTypes.string.isRequired,
  isNewSkuItem: PropTypes.bool.isRequired,
  // redux-base
  itemInfoGetRequest: PropTypes.func.isRequired,
  // itemBinsGetRequest: PropTypes.func.isRequired,
  // itemSuppliersGetRequest: PropTypes.func.isRequired,
  // itemStockLifeCycleGetRequest: PropTypes.func.isRequired,
  // itemUOMGetRequest: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(ItemsTabs);
