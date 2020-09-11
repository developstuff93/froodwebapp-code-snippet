import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import {
  AddressesTab,
  ProfileTab,
  OrdersTab
} from './Tabs';

const TabPane = Tabs.TabPane;

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: this.props.match.params.id
    };
  }

  render() {
    const { customerId } = this.state;

    return (
      <Row>
        <Col xs md lg>
          <Tabs
            defaultActiveKey="profile"
          >
            <TabPane
              key="profile"
              tab="Profile"
            >
              <ProfileTab
                customerId={ customerId }
              />
            </TabPane>
            <TabPane
              key="addresses"
              tab="Addresses"
            >
              <AddressesTab
                customerId={ customerId }
              />
            </TabPane>
            <TabPane
              key="orders"
              tab="Orders"
            >
              <OrdersTab
                customerId={ customerId }
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

CustomerProfile.propTypes = {
  // router
  match: PropTypes.object.isRequired,
};

export default withRouter(CustomerProfile);
