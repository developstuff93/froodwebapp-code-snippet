import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { GridTable, Controls } from 'components';
import { differenceWith } from 'lodash';
import {
  rolesGetRequest,
  rightsUpdateRequest
} from 'redux-base/actions';
import { select, table } from 'styles/common.scss';
import { columns, prepareRole } from './rightsTabHelpers';

const mapStateToProps = state => ({
  loadingPage: state.users.loadingPage,
  needReloadRights: state.users.needReloadRights,
  roles: state.users.roles,
  rights: state.users.rights
});

const mapDispatchToProps = {
  rolesGetRequest,
  rightsUpdateRequest
};

class RightsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRole: {},
      activeRoleId: props.activeRoleId
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      roles,
      rights,
      activeRoleId,
      needReloadRights,
      loadingPage
    } = nextProps;

    if (needReloadRights) {
      this.props.rolesGetRequest();
      return;
    }

    if (activeRoleId && !loadingPage) {
      const activeRole = prepareRole(roles, rights, activeRoleId);
      this.setState({
        originalRole: activeRole,
        activeRole,
        activeRoleId
      });
    } else if (!loadingPage) {
      const activeRole = prepareRole(roles, rights);
      this.setState({
        originalRole: activeRole,
        activeRole,
        activeRoleId: activeRole.id
      });
    }
  }

  handleRoleSelect = (roleId) => {
    const {
      roles,
      rights
    } = this.props;

    const activeRole = prepareRole(roles, rights, roleId);
    this.setState({
      originalRole: activeRole,
      activeRole,
      activeRoleId: roleId
    });
  }

  handleUpdateTableData = (rights) => {
    const { activeRole } = this.state;

    this.setState({
      activeRole: {
        ...activeRole,
        rights
      }
    });
  }

  handleUpdateRights = () => {
    const { activeRole, originalRole, activeRoleId } = this.state;

    const rightsToUpdate = differenceWith(activeRole.rights, originalRole.rights, (a, b) => a.id === b.id && a.isActive === b.isActive);
    this.props.rightsUpdateRequest({
      id: activeRoleId,
      payload: rightsToUpdate.map(item => ({ id: item.id, isActive: item.isActive }))
    });
  }

  render() {
    const { activeRole } = this.state;
    const { roles, loadingPage } = this.props;

    return (
      <div>
        <Row>
          <Col xs md={ 6 } lg={ 4 }>
            <Select
              className={ select }
              value={ activeRole.id }
              onChange={ this.handleRoleSelect }
            >
              { roles.map(role => (
                <Select.Option
                  key={ role.id }
                  value={ role.id }
                >
                  { role.name }
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <GridTable
          loadingData={ loadingPage }
          className={ table }
          rowKey="id"
          expandable={ false }
          columns={ columns }
          dataSource={ activeRole.rights }
          updateTableData={ this.handleUpdateTableData }
        />
        <Controls
          save
          onSave={ this.handleUpdateRights }
          saveText="Save"
          // onCancel={ this.handleCancel }
        />
      </div>
    );
  }
}

RightsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadRights: PropTypes.bool.isRequired,
  // data
  roles: PropTypes.array.isRequired,
  rights: PropTypes.array.isRequired,
  // redux-base
  rolesGetRequest: PropTypes.func.isRequired,
  rightsUpdateRequest: PropTypes.func.isRequired,
  // props
  activeRoleId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(RightsTab);
