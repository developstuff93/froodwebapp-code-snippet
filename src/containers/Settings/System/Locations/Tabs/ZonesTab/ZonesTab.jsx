import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  locationZonesGetRequest,
  locationZonesSaveRequest,
  locationZonesUpdateRequest,
} from 'redux-base/actions';
import { Table, Spin, Select } from 'antd';
import { TopFormModal, ActionButton } from 'components';
import { table, select, row } from 'styles/common.scss';
import columns from './zonesTabHelpers';
import fields from './modalFields';

const mapStateToProps = state => ({
  locations: state.locations.locations,
  locationZones: state.locations.locationZones,
  loadingPage: state.locations.loadingPage,
  needReloadLocationZones: state.locations.needReloadLocationZones,
  zoneTypes: state.commonData.zoneTypes,
});

const mapDispatchToProps = {
  locationZonesGetRequest,
  locationZonesSaveRequest,
  locationZonesUpdateRequest,
};

class ZonesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null,
      selectedLocationId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we update zone
    if (nextProps.needReloadLocationZones) {
      this.setState({
        modalVisible: false,
      }, () => this.props.locationZonesGetRequest({
        id: this.state.selectedLocationId
      }));
      return;
    }

    // when we create zone
    if (this.props.locationZones.length !== nextProps.locationZones.length) {
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

  handleSave = (payload) => {
    if (this.state.modalData) {
      this.props.locationZonesUpdateRequest({
        id: this.state.selectedLocationId,
        payload: {
          id: payload.id,
          name: payload.name
        }
      });
    } else {
      this.props.locationZonesSaveRequest({
        id: this.state.selectedLocationId,
        payload
      });
    }
  }

  handleLocationSelect = (id) => {
    this.setState({
      selectedLocationId: id
    }, () => {
      this.props.locationZonesGetRequest({
        id
      });
    });
  }

  handleEdit = (e) => {
    const locationId = e.target.id;
    const { id, name, type } = this.props.locationZones.find(item => item.id === Number(locationId));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        name,
        type
      }
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
      selectedLocationId
    } = this.state;

    const {
      locations,
      zoneTypes,
      locationZones,
      loadingPage
    } = this.props;
    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title="New Zone"
          buttonVisible={ false }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(zoneTypes) }
        />
        <Row className={ row } between="xs">
          <Col xs md={ 6 } lg={ 4 }>
            Location
            <Select
              className={ select }
              onChange={ this.handleLocationSelect }
            >
              { locations.map(item => (
                <Select.Option
                  key={ item.id }
                  value={ item.id }
                >
                  { item.name }
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={ 1 } >
            <ActionButton
              disabled={ !selectedLocationId }
              onClick={ this.handleToggleModal }
            >
              New Zone
            </ActionButton>
          </Col>
        </Row>
        <Spin spinning={ loadingPage }>
          <Table
            className={ table }
            rowKey="id"
            size="small"
            columns={ columns(this.handleEdit, this.handleDeactivate) }
            dataSource={ locationZones }
          />
        </Spin>
      </div>
    );
  }
}

ZonesTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadLocationZones: PropTypes.bool.isRequired,
  // data
  locations: PropTypes.array.isRequired,
  locationZones: PropTypes.array.isRequired,
  zoneTypes: PropTypes.array.isRequired,
  // redux-base
  locationZonesGetRequest: PropTypes.func.isRequired,
  locationZonesSaveRequest: PropTypes.func.isRequired,
  locationZonesUpdateRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ZonesTab);
