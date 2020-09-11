import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Table, Spin, Button } from 'antd';
import { FroodSwitch, TopFormModal, NewTableRow } from 'components';
import {
  slotsGetRequest,
  slotsUpdateRequest,
  slotItemSaveRequest,
  slotStatusUpdateRequest,
  slotItemDeleteRequest
} from 'redux-base/actions';
import { rowsContainer, table } from 'styles/common.scss';
import fields from './modalFields';
import columns from './columns';

const selector = formValueSelector('topFormModal');

const mapStateToProps = state => ({
  slots: state.transporters.slots,
  needReloadSlots: state.transporters.needReloadSlots,
  loadingPage: state.transporters.loadingPage,
  activeDelivery: selector(state, 'isDeliveryLimited')
});

const mapDispatchToProps = {
  slotsGetRequest,
  slotsUpdateRequest,
  slotItemSaveRequest,
  slotItemDeleteRequest,
  slotStatusUpdateRequest
};

class CalendarTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'HOLIDAYS'],
      tableData: [],
      choosenSlot: 0,
      modalVisible: false,
      modalData: null,
      modalTitle: 'Edit Slot',
      modalFields: fields(false).editSlot
    };
  }

  componentWillMount() {
    this.props.slotsGetRequest({
      id: this.props.fulfilmentId
    });
  }

  componentWillReceiveProps(nextProps) {
    // when we create or edit or delete slots
    if (nextProps.needReloadSlots) {
      this.props.slotsGetRequest({
        id: this.props.fulfilmentId
      });
    // when we change checkbox value inside modal
    } else if (nextProps.activeDelivery !== this.props.activeDelivery) {
      if (this.state.modalTitle === 'Edit Slot') {
        this.setState({
          modalFields: fields(nextProps.activeDelivery).editSlot
        });
      } else {
        this.setState({
          modalFields: fields(nextProps.activeDelivery).newSlot
        });
      }
    }
    // to set new tableData after we create edit or delete slot
    if (nextProps.slots !== this.props.slots && this.state.choosenSlot) {
      this.setState({
        tableData: nextProps.slots.find(slot => slot.id === this.state.choosenSlot).slots
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: null,
    });
  }

  handleUpdateSlotStatus = (isActive, id) => {
    this.props.slotStatusUpdateRequest({
      id: this.props.fulfilmentId,
      payload: {
        id,
        isActive
      }
    });
  }

  handleSave = (slot) => {
    const activeSlotId = this.state.choosenSlot;
    const sl = slot;
    sl.isDeliveryLimited = slot.isDeliveryLimited || false;
    // we do this because API throw issue, that delieveries can`t be false
    sl.deliveries = sl.isDeliveryLimited ? sl.deliveries : null;

    if (this.state.modalTitle === 'New Slot') {
      this.props.slotItemSaveRequest({
        id: this.props.fulfilmentId,
        payload: {
          id: activeSlotId,
          slots: [sl]
        }
      });
    } else {
      const {
        deliveries,
        isDeliveryLimited
      } = sl;

      const { id } = this.state.modalData;

      this.props.slotsUpdateRequest({
        id: this.props.fulfilmentId,
        payload: {
          id: activeSlotId,
          slots: [{
            id,
            deliveries,
            isDeliveryLimited
          }]
        }
      });
    }

    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: null
    });
  }

  handleToggleSlotsTable = (e) => {
    const slots = [...this.props.slots];
    this.setState({
      tableData: slots[e.target.id].slots,
      choosenSlot: slots[e.target.id].id
    });
  }

  handleDeleteRow = (e) => {
    const slotId = e.target.id;
    this.props.slotItemDeleteRequest({
      id: this.props.fulfilmentId,
      slotId
    });
  }

  handleEditRow = (e) => {
    const {
      id,
      from,
      to,
      isDeliveryLimited,
      deliveries
    } = this.state.tableData.find(item => item.id === parseInt(e.target.id, 10));
    this.setState({
      modalVisible: true,
      modalTitle: 'Edit Slot',
      modalData: {
        id,
        from,
        to,
        isDeliveryLimited,
        deliveries
      }
    });
  }

  handleAddRow = () => {
    this.setState({
      modalVisible: true,
      modalTitle: 'New Slot',
      modalFields: fields(false).newSlot,
      modalData: {
        deliveries: ''
      }
    });
  }

  render() {
    const {
      loadingPage,
      slots
    } = this.props;

    const {
      days,
      tableData,
      modalData,
      modalVisible,
      modalTitle,
      modalFields
    } = this.state;

    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title={ modalTitle }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ modalFields }
          buttonVisible={ false }
        />
        <Spin spinning={ loadingPage }>
          <div className={ rowsContainer }>
            <Row center="xs">
              { days.map((day, index) => (
                <Col xs={ 1 } key={ index }>
                  {day}
                </Col>
              ))}
            </Row>
            <Row center="xs">
              { slots.map(slot => (
                <Col xs={ 1 } key={ slot.id }>
                  <FroodSwitch
                    id={ slot.id }
                    checkedText="ON"
                    unCheckedText="OFF"
                    checked={ slot.isActive }
                    onChange={ this.handleUpdateSlotStatus }
                  />
                </Col>
              )) }
            </Row>
            <Row center="xs">
              { slots.map((slot, index) => (
                <Col xs={ 1 } key={ slot.id }>
                  <Button
                    disabled={ !slot.isActive }
                    type="primary"
                    id={ index }
                    onClick={ this.handleToggleSlotsTable }
                  >
                    <span id={ index }>SLOTS</span>
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
          { tableData && tableData.length > 0 && (
            <Row>
              <Table
                className={ table }
                rowKey="id"
                dataSource={ tableData }
                columns={ columns(this.handleDeleteRow, this.handleEditRow) }
                size="small"
                pagination={ false }
              />
              <NewTableRow
                addOtherRowText="Add Another Slot"
                addNewRowText="Add New Slot"
                hasData={ tableData.length !== 0 }
                onClick={ this.handleAddRow }
              />
            </Row>
          )}
        </Spin>
      </div>
    );
  }
}

CalendarTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadSlots: PropTypes.bool.isRequired,
  // data
  slots: PropTypes.array.isRequired,
  activeDelivery: PropTypes.bool,
  fulfilmentId: PropTypes.string.isRequired,
  // redux-base
  slotsGetRequest: PropTypes.func.isRequired,
  slotsUpdateRequest: PropTypes.func.isRequired,
  slotItemSaveRequest: PropTypes.func.isRequired,
  slotStatusUpdateRequest: PropTypes.func.isRequired,
  slotItemDeleteRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTab);
