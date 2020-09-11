import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { PageHeader } from 'components';
import { connect } from 'react-redux';
import {
  usersGetRequest,
  rolesGetRequest,
  rightsGetRequest
} from 'redux-base/actions';
import { UsersTab, RolesTab, RightsTab } from './Tabs';

const mapDispatchToProps = {
  usersGetRequest,
  rolesGetRequest,
  rightsGetRequest
};

const TabPane = Tabs.TabPane;

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'users',
      activeRoleId: 0
    };
  }

  componentWillMount() {
    this.props.usersGetRequest();
  }

  handleTabChange = (tab, activeRoleId) => {
    this.setState({
      activeTab: tab,
      activeRoleId
    }, () => {
      switch (tab) {
        case 'users':
          this.props.usersGetRequest();
          break;
        case 'roles':
          this.props.rolesGetRequest();
          break;
        case 'rights':
          this.props.rightsGetRequest();
          break;
        default:
      }
    });
  }

  render() {
    const { activeTab, activeRoleId } = this.state;

    return (
      <div>
        <PageHeader
          bigText="Manage Users, Roles & Rights"
          smallText="Add your users, roles and rights and manage their details & permissions"
        />
        <Row>
          <Col lg>
            <Tabs
              activeKey={ activeTab }
              onChange={ this.handleTabChange }
              animated={ false }
            >
              <TabPane
                key="users"
                tab="Users"
              >
                <UsersTab />
              </TabPane>
              <TabPane
                key="roles"
                tab="Roles"
              >
                <RolesTab handleTabChange={ this.handleTabChange } />
              </TabPane>
              <TabPane
                key="rights"
                tab="Rights"
              >
                <RightsTab activeRoleId={ activeRoleId } />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

Users.propTypes = {
  // redux-base
  usersGetRequest: PropTypes.func.isRequired,
  rolesGetRequest: PropTypes.func.isRequired,
  rightsGetRequest: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Users);
