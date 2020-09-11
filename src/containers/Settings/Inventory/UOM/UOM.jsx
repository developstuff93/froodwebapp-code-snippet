import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import {
  uomGetRequest,
} from 'redux-base/actions';
import { UOMTab, ConversionsTab } from './Tabs';

const mapStateToProps = state => ({
  needReloadUOM: state.uom.needReloadUOM,
  loadingPage: state.uom.loadingPage,
  uom: state.uom.data,
});

const mapDispatchToProps = {
  uomGetRequest,
};

const TabPane = Tabs.TabPane;

class UOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'uom',
    };
  }

  componentWillMount() {
    this.props.uomGetRequest();
  }

  handleTabChange = (tab) => {
    this.setState({
      activeTab: tab
    }, () => {
      switch (tab) {
        case 'uom':
          this.props.uomGetRequest();
          break;
        case 'conversions':
          this.props.uomGetRequest();
          break;
        default:
      }
    });
  }

  render() {
    const {
      activeTab,
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
              key="uom"
              tab="UOM"
            >
              <UOMTab />
            </TabPane>
            <TabPane
              key="conversions"
              tab="Conversions"
            >
              <ConversionsTab />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

UOM.propTypes = {
  loadingPage: PropTypes.bool.isRequired,
  needReloadUOM: PropTypes.bool.isRequired,
  // data
  uom: PropTypes.array.isRequired,
  // redux-base
  uomGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UOM);
