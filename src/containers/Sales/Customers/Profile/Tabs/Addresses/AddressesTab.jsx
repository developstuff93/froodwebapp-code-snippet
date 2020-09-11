import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  customerAddressesGetRequest,
  customerAddressSaveRequest,
  customerAddressUpdateRequest,
  customerAddressDeleteRequest,
  citySearchRequest
} from 'redux-base/actions';
import { Table, Spin } from 'antd';
import { formValueSelector } from 'redux-form';
import { TopFormModal, NewTableRow } from 'components';
import fields from './modalFields';
import columns from './columns';
import styles from '../../Tabs.scss';

const selector = formValueSelector('topFormModal');

const mapStateToProps = state => ({
  addresses: state.customer.addresses,
  cities: state.commonData.cities,
  userCountryStates: state.commonData.userCountryStates,
  loadingPage: state.customer.loadingPage,
  needReloadAddresses: state.customer.needReloadAddresses,
  activeCountryState: selector(state, 'state')
});

const mapDispatchToProps = {
  customerAddressesGetRequest,
  customerAddressSaveRequest,
  customerAddressUpdateRequest,
  customerAddressDeleteRequest,
  citySearchRequest
};

class AddressesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      citiesLoading: false,
      modalVisible: false,
      modalData: null,
      modalTitle: 'Edit Address'
    };
  }

  componentWillMount() {
    this.props.customerAddressesGetRequest({
      id: this.props.customerId
    });
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update address
    if (nextProps.needReloadAddresses) {
      this.props.customerAddressesGetRequest({ id: this.props.customerId });
      return;
    }

    // when we create address
    if (nextProps.addresses.length !== this.props.addresses.length) {
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
        cities: nextProps.cities,
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalTitle: 'New Address',
      modalVisible: !this.state.modalVisible,
      modalData: null,
      cities: []
    });
  }

  handleEdit = (e) => {
    const {
      id,
      isDefault,
      label,
      state,
      city,
      suburb,
      postalCode,
      address1,
      address2,
    } = this.props.addresses.find(item => item.id === Number(e.target.id));

    this.setState({
      citiesLoading: true,
      modalTitle: 'Edit Address',
      modalData: {
        id,
        isDefault,
        label,
        state,
        city,
        suburb,
        postalCode,
        address1,
        address2
      }
    }, () => this.props.citySearchRequest({ id: city }));
  }

  handleSave = (address) => {
    const isDefault = address.isDefault || false;

    const {
      label,
      state,
      city,
      suburb,
      postalCode,
      address1,
      address2
    } = address;

    if (this.state.modalData) {
      this.props.customerAddressUpdateRequest({
        id: this.props.customerId,
        payload: {
          id: this.state.modalData.id,
          label,
          state,
          city,
          isDefault,
          suburb,
          postalCode,
          address1,
          address2
        }
      });
    } else {
      this.props.customerAddressSaveRequest({
        id: this.props.customerId,
        payload: {
          label,
          state,
          city,
          isDefault,
          suburb,
          postalCode,
          address1,
          address2
        }
      });
    }
  }

  handleDelete = (e) => {
    this.props.customerAddressDeleteRequest({
      id: this.props.customerId,
      addressId: e.target.id
    });
  }

  render() {
    const {
      addresses,
      loadingPage,
      userCountryStates
    } = this.props;

    const {
      modalData,
      modalVisible,
      modalTitle,
      cities
    } = this.state;

    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title={ modalTitle }
          buttonVisible={ false }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={
            fields(
              this.handleStateSelect,
              userCountryStates,
              cities
            )
          }
        />
        <Spin spinning={ loadingPage }>
          <Row start="xs">
            <Col xs md lg>
              <Table
                className={ styles.table }
                rowKey="id"
                columns={ columns(this.handleEdit, this.handleDelete) }
                dataSource={ addresses }
                size="small"
                pagination={ false }
              />
              <NewTableRow
                addOtherRowText="Add Another Address"
                addNewRowText="Add New Address"
                hasData={ addresses.length !== 0 }
                onClick={ this.handleToggleModal }
              />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

AddressesTab.propTypes = {
  // triger
  loadingPage: PropTypes.bool.isRequired,
  needReloadAddresses: PropTypes.bool.isRequired,
  // data
  addresses: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  userCountryStates: PropTypes.array.isRequired,
  customerId: PropTypes.string.isRequired,
  activeCountryState: PropTypes.number,
  // redux-base
  customerAddressesGetRequest: PropTypes.func.isRequired,
  customerAddressSaveRequest: PropTypes.func.isRequired,
  customerAddressUpdateRequest: PropTypes.func.isRequired,
  customerAddressDeleteRequest: PropTypes.func.isRequired,
  citySearchRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressesTab);
