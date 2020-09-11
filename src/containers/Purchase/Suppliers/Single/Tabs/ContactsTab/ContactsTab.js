import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  supplierContactsGetRequest,
  supplierContactsSaveRequest,
  supplierContactsUpdateRequest,
  supplierContactsDeleteRequest
} from 'redux-base/actions';
import { Select } from 'antd';
import { TopFormModal, GridTable } from 'components';
import fields from './modalFields';
import columns from './contactsTabHelpers';
import styles from '../../Supplier.scss';

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  needReloadContacts: state.supplier.needReloadContacts,
  contacts: state.supplier.contacts,
});

const mapDispatchToProps = {
  supplierContactsGetRequest,
  supplierContactsSaveRequest,
  supplierContactsUpdateRequest,
  supplierContactsDeleteRequest
};

class ContactsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null,
      selectedLocationId: null,
      selectedContacts: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we create contact
    if (nextProps.needReloadContacts) {
      this.props.supplierContactsGetRequest({
        id: this.props.supplierId
      });
      return;
    }

    const { selectedContacts, selectedLocationId } = this.state;

    // called on initialization
    if (!selectedLocationId && nextProps.contacts.length !== 0) {
      this.setState({
        selectedLocationId: nextProps.contacts[0].id,
        selectedContacts: nextProps.contacts[0].contacts
      });
    }

    if (selectedLocationId
     && nextProps.contacts.length !== 0
     && selectedContacts.length !== nextProps.contacts.find(cn => cn.id === selectedLocationId).contacts.length
    ) {
      this.setState({
        modalVisible: false,
        modalData: {},
        selectedContacts: nextProps.contacts.find(cn => cn.id === selectedLocationId).contacts
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: null
    });
  }

  handleLocationSelect = (selectedLocationId) => {
    this.setState({
      selectedLocationId,
      selectedContacts: this.props.contacts.find(contact => contact.id === selectedLocationId).contacts
    });
  }

  handleSave = (formData) => {
    const payload = {
      isDefault: formData.isDefault,
      includeInEmails: formData.includeInEmails,
      email: formData.email,
      fax: formData.fax,
      firstName: formData.firstName,
      lastName: formData.lastName,
      locationId: this.state.selectedLocationId,
      phone: formData.phone,
      title: formData.title
    };

    if (this.state.modalData) {
      this.props.supplierContactsUpdateRequest({
        id: this.props.supplierId,
        payload: {
          ...payload,
          id: formData.id
        }
      });
    } else {
      this.props.supplierContactsSaveRequest({
        id: this.props.supplierId,
        payload
      });
    }
  }

  handleUpdateTableData = (selectedContacts, rowId) => {
    const contact = selectedContacts[rowId];

    this.setState({
      selectedContacts
    }, () => this.props.supplierContactsUpdateRequest({
      id: this.props.supplierId,
      payload: {
        id: contact.id,
        isDefault: contact.isDefault,
        includeInEmails: contact.includeInEmails,
        email: contact.email,
        fax: contact.fax,
        firstName: contact.firstName,
        lastName: contact.lastName,
        locationId: this.state.selectedLocationId,
        phone: contact.phone,
        title: contact.title
      }
    }));
  }

  handleDeactivate = (e) => {
    this.props.supplierContactsDeleteRequest({
      id: this.props.supplierId,
      contactId: e.target.id,
    });
  }

  handleEdit = (e) => {
    const contactId = e.target.id;
    const modalData = this.state.selectedContacts.find(cde => cde.id === Number(contactId));
    modalData.firstName = modalData.name.split(' ')[0];
    modalData.lastName = modalData.name.split(' ')[1];
    modalData.locationId = this.state.selectedLocationId;
    this.setState({
      modalVisible: true,
      modalData
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
      selectedContacts,
      selectedLocationId
    } = this.state;

    const {
      loadingPage,
      contacts
    } = this.props;

    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title="New Contact"
          buttonText="New Contact"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(contacts) }
        />
        <Row end="xs" middle="xs" className={ styles.row }>
          <Col lg={ 1 }>
            Locations
          </Col>
          <Col xs md={ 6 } lg={ 4 }>
            <Select
              className={ styles.select }
              onChange={ this.handleLocationSelect }
              value={ selectedLocationId }
            >
              { contacts.map(contact => (
                <Select.Option
                  key={ contact.id }
                  value={ contact.id }
                >
                  { contact.name }
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col lg="7" />
        </Row>
        <GridTable
          loadingData={ loadingPage }
          className={ styles.table }
          rowKey="id"
          expandable={ false }
          readonly={ false }
          columns={ columns(this.handleEdit, this.handleDeactivate) }
          dataSource={ selectedContacts }
          updateTableData={ this.handleUpdateTableData }
        />
      </div>
    );
  }
}

ContactsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadContacts: PropTypes.bool.isRequired,
  // data
  supplierId: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
  // redux-base
  supplierContactsGetRequest: PropTypes.func.isRequired,
  supplierContactsSaveRequest: PropTypes.func.isRequired,
  supplierContactsUpdateRequest: PropTypes.func.isRequired,
  supplierContactsDeleteRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsTab);
