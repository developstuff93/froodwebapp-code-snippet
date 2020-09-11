/* eslint-disable class-methods-use-this, react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  locationsGetRequest
} from 'redux-base/actions';
import { Tabs } from 'antd';
import { PageHeader } from 'components';
import {
  LocationsTab,
  ZonesTab,
  BinsTab
} from './Tabs';

const mapDispatchToProps = {
  locationsGetRequest
};

const TabPane = Tabs.TabPane;

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'locations'
    };
  }

  componentWillMount() {
    this.props.locationsGetRequest();
  }

  handleTabChange = (tab) => {
    this.setState({
      activeTab: tab
    }, () => {
      switch (tab) {
        case 'locations':
          this.props.locationsGetRequest();
          break;
        default:
      }
    });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div>
        <PageHeader
          bigText="Adamant and Co. Ltd - Locations"
          smallText="Manage company locations"
        />
        <Row>
          <Col lg>
            <Tabs
              activeKey={ activeTab }
              onChange={ this.handleTabChange }
              animated={ false }
            >
              <TabPane
                key="locations"
                tab="Locations"
              >
                <LocationsTab />
              </TabPane>
              <TabPane
                key="zones"
                tab="Zones"
              >
                <ZonesTab />
              </TabPane>
              <TabPane
                key="bins"
                tab="Bins"
              >
                <BinsTab />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

Locations.propTypes = {
  // redux-base
  locationsGetRequest: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Locations);
