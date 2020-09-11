import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import {
  CalendarTab,
  BlackoutTab,
  CustomTab,
  CutOffTab
} from './Tabs';

const TabPane = Tabs.TabPane;

const getFulfilmentId = (pathname) => {
  const pathnames = pathname.split('/');
  return pathnames[pathnames.length - 1].replace(/-/g, '/');
};

class FulfilmentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'calendar',
      fulfilmentId: getFulfilmentId(this.props.location.pathname)
    };
  }

  handleTabChange = (activeTab) => {
    this.setState({
      activeTab
    });
  }

  render() {
    const {
      activeTab,
      fulfilmentId
    } = this.state;

    return (
      <Row>
        <Col lg>
          <Tabs
            activeKey={ activeTab }
            onChange={ this.handleTabChange }
            animated={ false }
          >
            <TabPane
              key="calendar"
              tab="Calendar"
            >
              <CalendarTab fulfilmentId={ fulfilmentId } />
            </TabPane>
            <TabPane
              key="blackout"
              tab="Blackout Days"
            >
              <BlackoutTab fulfilmentId={ fulfilmentId } />
            </TabPane>
            <TabPane
              key="cutoff"
              tab="Cutoff"
            >
              <CutOffTab fulfilmentId={ fulfilmentId } />
            </TabPane>
            <TabPane
              key="customText"
              tab="Custom Text"
            >
              <CustomTab fulfilmentId={ fulfilmentId } />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

FulfilmentItem.propTypes = {
  // router
  location: PropTypes.object.isRequired,
};

export default withRouter(FulfilmentItem);
