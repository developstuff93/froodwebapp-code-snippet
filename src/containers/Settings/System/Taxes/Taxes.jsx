import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { PageHeader } from 'components';
import {
  taxCategoriesGetRequest,
  taxCodesGetRequest
} from 'redux-base/actions';
import {
  CategoriesTab,
  TaxCodesTab
} from './Tabs';

const mapStateToProps = state => ({
  loadingPage: state.taxes.loadingPage,
  // taxCodes: state.taxes.taxCodes,
});

const mapDispatchToProps = {
  taxCategoriesGetRequest,
  taxCodesGetRequest
};

const TabPane = Tabs.TabPane;

class Taxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'taxCategories',
      activeRoleId: 0
    };
  }

  componentWillMount() {
    this.props.taxCategoriesGetRequest();
  }

  handleTabChange = (tab, activeRoleId) => {
    this.setState({
      activeTab: tab,
      activeRoleId
    }, () => {
      switch (tab) {
        case 'taxCategories':
          this.props.taxCategoriesGetRequest();
          break;
        case 'taxCodes':
          this.props.taxCodesGetRequest();
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
          bigText="XYZ Company - Taxes"
          smallText="xxxx"
        />
        <Row>
          <Col lg>
            <Tabs
              activeKey={ activeTab }
              onChange={ this.handleTabChange }
              animated={ false }
            >
              <TabPane
                key="taxCategories"
                tab="Tax Categories"
              >
                <CategoriesTab />
              </TabPane>
              <TabPane
                key="taxCodes"
                tab="Tax Codes"
              >
                <TaxCodesTab />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

Taxes.propTypes = {
  // redux-base
  taxCategoriesGetRequest: PropTypes.func.isRequired,
  taxCodesGetRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Taxes);
