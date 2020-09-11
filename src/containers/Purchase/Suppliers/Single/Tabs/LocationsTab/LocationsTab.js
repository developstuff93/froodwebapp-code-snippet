import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  supplierLocationsGetRequest,
  supplierLocationsSaveRequest,
  supplierLocationsUpdateRequest,
  supplierLocationsDeleteRequest,
  citySearchRequest
} from 'redux-base/actions';
import { Table, Spin } from 'antd';
import { TopFormModal } from 'components';
import fields from './modalFields';
import columns from './locationTabHelpers';
import styles from '../../Supplier.scss';

const selector = formValueSelector('topFormModal');

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  locations: state.supplier.locations,
  needReloadLocations: state.supplier.needReloadLocations,
  userCountryStates: state.commonData.userCountryStates,
  cities: state.commonData.cities,
  locationTypes: state.commonData.locationTypes,
  activeCountryState: selector(state, 'stateId'),
});

const mapDispatchToProps = {
  supplierLocationsGetRequest,
  supplierLocationsSaveRequest,
  supplierLocationsUpdateRequest,
  supplierLocationsDeleteRequest,
  citySearchRequest
};

class LocationsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null,
      citiesLoading: false,
      cities: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // When editing or updating location
    if (nextProps.needReloadLocations) {
      this.props.supplierLocationsGetRequest({
        id: this.props.supplierId
      });
    }

    // if we change state select inside modald
    if (!this.state.citiesLoading && nextProps.activeCountryState && nextProps.activeCountryState !== this.props.activeCountryState) {
      this.props.citySearchRequest({ id: nextProps.activeCountryState });
    }

    // when we create location
    if (this.props.locations.length !== nextProps.locations.length) {
      this.setState({
        modalVisible: false,
        modalData: {}
      });
    }

    // if we press edit button we need to load cities for current state inside modal
    if (this.state.citiesLoading && nextProps.loadingPage !== this.props.loadingPage) {
      this.setState({
        citiesLoading: false,
        modalVisible: true,
        cities: nextProps.cities
      });
    } else {
      this.setState({
        cities: nextProps.cities,
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: null
    });
  }

  handleSave = (formData) => {
    if (this.state.modalData) {
      this.props.supplierLocationsUpdateRequest({
        id: this.props.supplierId,
        payload: {
          locationId: formData.locationId,
          address1: formData.address1,
          address2: formData.address2,
          cityId: formData.cityId,
          postalCode: formData.postalCode,
          stateId: formData.stateId
        }
      });
    } else {
      this.props.supplierLocationsSaveRequest({
        id: this.props.supplierId,
        payload: formData
      });
    }
  }

  handleDeactivate = (e) => {
    this.props.supplierLocationsDeleteRequest({
      id: this.props.supplierId,
      locationId: e.target.id,
    });
  }

  handleEdit = (e) => {
    const locationId = e.target.id;
    const {
      id,
      name,
      prefix,
      suburb,
      type,
      address1,
      address2,
      cityId,
      postalCode,
      stateId
    } = this.props.locations.find(location => location.id === Number(locationId));

    this.setState({
      citiesLoading: true,
      modalData: {
        locationId: id,
        name,
        prefix,
        suburb,
        address1,
        address2,
        cityId,
        type,
        postalCode,
        stateId
      }
    }, () => this.props.citySearchRequest({ id: cityId }));
  }

  render() {
    const {
      modalData,
      modalVisible
    } = this.state;

    const {
      loadingPage,
      locations,
      userCountryStates,
      cities,
      locationTypes
    } = this.props;
    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title="New location"
          buttonText="New location"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(userCountryStates, cities, locationTypes) }
        />
        <Spin spinning={ loadingPage }>
          <Table
            className={ styles.table }
            rowKey="id"
            size="small"
            columns={ columns(this.handleEdit, this.handleDeactivate) }
            dataSource={ locations }
          />
        </Spin>
      </div>
    );
  }
}

LocationsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadLocations: PropTypes.bool.isRequired,
  // data
  activeCountryState: PropTypes.number,
  supplierId: PropTypes.string.isRequired,
  userCountryStates: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  locationTypes: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  // redux-base
  supplierLocationsGetRequest: PropTypes.func.isRequired,
  supplierLocationsSaveRequest: PropTypes.func.isRequired,
  supplierLocationsUpdateRequest: PropTypes.func.isRequired,
  supplierLocationsDeleteRequest: PropTypes.func.isRequired,
  citySearchRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsTab);
