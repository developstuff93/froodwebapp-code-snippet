import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import { TopFormModal } from 'components';
import {
  uomGetRequest,
  uomSaveRequest,
  uomUpdateRequest,
  uomDeleteRequest
} from 'redux-base/actions';
import { table } from 'styles/common.scss';
import columns from './uomTabHelper';
import fields from '../../modalFields';

const mapStateToProps = state => ({
  uom: state.uom.data,
  loadingPage: state.uom.loadingPage,
  needReloadUOM: state.uom.needReloadUOM,
});

const mapDispatchToProps = {
  uomGetRequest,
  uomSaveRequest,
  uomUpdateRequest,
  uomDeleteRequest
};

class UOMTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update uom
    if (nextProps.needReloadUOM) {
      this.props.uomGetRequest();
      return;
    }

    // when we create uom
    if (this.props.uom.length !== nextProps.uom.length) {
      this.setState({
        modalVisible: false,
        modalData: {}
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: null
    });
  }

  handleSave = (data) => {
    if (this.state.modalData) {
      this.props.uomUpdateRequest({
        payload: {
          id: this.state.modalData.id,
          name: data.name,
          description: data.description,
        }
      });
    } else {
      this.props.uomSaveRequest({ payload: data });
    }
  }

  handleEdit = (e) => {
    const uomId = e.target.id;
    const { id, name, description } = this.props.uom.find(uom => uom.id === Number(uomId));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        name,
        description,
      }
    });
  }

  handleDeactivate = (e) => {
    this.props.uomDeleteRequest({
      id: e.target.id
    });
  }


  render() {
    const {
      uom,
      loadingPage
    } = this.props;

    const {
      modalVisible,
      modalData
    } = this.state;

    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title="New UOM"
          buttonText="New UOM"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(uom).newUOM }
        />
        <Spin spinning={ loadingPage }>
          <Table
            rowKey="id"
            size="small"
            className={ table }
            columns={ columns(this.handleEdit, this.handleDeactivate) }
            dataSource={ uom }
          />
        </Spin>
      </div>
    );
  }
}

UOMTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadUOM: PropTypes.bool.isRequired,
  // data
  uom: PropTypes.array.isRequired,
  // redux-base
  uomGetRequest: PropTypes.func.isRequired,
  uomSaveRequest: PropTypes.func.isRequired,
  uomUpdateRequest: PropTypes.func.isRequired,
  uomDeleteRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UOMTab);
