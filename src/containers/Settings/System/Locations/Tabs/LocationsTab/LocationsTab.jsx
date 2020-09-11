import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridTable, TopFormModal } from 'components';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  locationsUpdateInfoRequest,
  locationsGetRequest,
  locationsSaveRequest,
  locationsUpdateRequest,
  citySearchRequest,
} from 'redux-base/actions';
import { table } from 'styles/common.scss';
import columns from './locationsTabHelpers';
import fields from '../../modalFields';

const selector = formValueSelector('topFormModal');

const mapStateToProps = state => ({
  needReloadLocations: state.locations.needReloadLocations,
  loadingPage: state.locations.loadingPage,
  locations: state.locations.locations,
  cities: state.commonData.cities,
  userCountryStates: state.commonData.userCountryStates,
  locationTypes: state.commonData.locationTypes,
  activeCountryState: selector(state, 'state')
});

const mapDispatchToProps = {
  locationsUpdateInfoRequest,
  locationsGetRequest,
  locationsSaveRequest,
  locationsUpdateRequest,
  citySearchRequest,
};

class LocationsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesLoading: false,
      modalVisible: false,
      modalData: null,
      locations: [],
      cities: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update location
    if (nextProps.needReloadLocations) {
      this.props.locationsGetRequest();
      return;
    }

    // when we create location
    if (nextProps.locations.length !== this.props.locations.length) {
      this.setState({
        modalVisible: false,
        modalData: null
      });
    }

    // if we change state select inside modal
    if (!this.state.citiesLoading && nextProps.activeCountryState && nextProps.activeCountryState !== this.props.activeCountryState) {
      this.props.citySearchRequest({ id: nextProps.activeCountryState });
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
        locations: nextProps.locations,
        cities: nextProps.cities,
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: null,
      cities: []
    });
  }

  handleUpdateTableData = (locations, rowId) => {
    this.setState({
      locations
    }, () => this.props.locationsUpdateRequest({
      payload: {
        id: locations[rowId].id,
        isActive: locations[rowId].isActive,
        isDefault: locations[rowId].isDefault,
        holdStock: locations[rowId].holdStock,
      }
    }));
  }

  handleSave = (location) => {
    if (this.state.modalData) {
      this.props.locationsUpdateInfoRequest({
        id: this.state.modalData.id,
        payload: {
          name: location.name,
          address1: location.address1,
          address2: location.address2,
          suburb: location.suburb,
          stateId: location.stateId,
          cityId: location.cityId,
          postalCode: location.postalCode,
        }
      });
    } else {
      this.props.locationsSaveRequest({
        payload: {
          name: location.name,
          prefix: location.prefix,
          address1: location.address1,
          address2: location.address2,
          suburb: location.suburb,
          stateId: location.stateId,
          cityId: location.cityId,
          postalCode: location.postalCode,
          type: location.type
        }
      });
    }
  }

  handleEdit = (rowIndex) => {
    const {
      id,
      name,
      prefix,
      stateId,
      cityId,
      suburb,
      postalCode,
      address1,
      address2,
      type
    } = this.props.locations[rowIndex];

    this.setState({
      citiesLoading: true,
      modalData: {
        id,
        name,
        prefix,
        stateId,
        cityId,
        suburb,
        postalCode,
        address1,
        address2,
        type
      }
    }, () => this.props.citySearchRequest({ id: cityId }));
  }

  render() {
    const {
      locations,
      cities,
      modalVisible,
      modalData
    } = this.state;

    const {
      loadingPage,
      userCountryStates,
      locationTypes
    } = this.props;

    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title="New Location"
          buttonText="New Location"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={
            fields(
              this.handleStateSelect,
              userCountryStates,
              cities,
              locationTypes
            ).newLocation
          }
        />
        <GridTable
          loadingData={ loadingPage }
          className={ table }
          rowKey="id"
          expandable={ false }
          readonly={ false }
          columns={ columns }
          dataSource={ locations }
          updateTableData={ this.handleUpdateTableData }
          handleModalButtonClick={ this.handleEdit }
        />
      </div>
    );
  }
}

LocationsTab.propTypes = {
  // triggers
  needReloadLocations: PropTypes.bool.isRequired,
  loadingPage: PropTypes.bool.isRequired,
  // data
  locations: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  locationTypes: PropTypes.array.isRequired,
  userCountryStates: PropTypes.array.isRequired,
  activeCountryState: PropTypes.number,
  // redux-base
  locationsUpdateInfoRequest: PropTypes.func.isRequired,
  locationsGetRequest: PropTypes.func.isRequired,
  locationsSaveRequest: PropTypes.func.isRequired,
  locationsUpdateRequest: PropTypes.func.isRequired,
  citySearchRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsTab);
