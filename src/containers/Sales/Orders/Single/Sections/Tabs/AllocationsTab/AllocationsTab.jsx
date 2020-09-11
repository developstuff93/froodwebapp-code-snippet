import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { GridTable, Controls, OrderTabHeader } from 'components';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { orderUpdateAllocationData } from 'redux-base/actions';
import PropTypes from 'prop-types';
import styles from '../Tabs.scss';

const Option = Select.Option;

const mapStateToProps = state => ({
  data: state.order.allocationData,
});

const mapDispatchToProps = { orderUpdateAllocationData };

const columns = [{
  title: 'Batch',
  dataIndex: 'batch'
}, {
  title: 'Expiry',
  dataIndex: 'expiry'
}, {
  title: 'Available Qty',
  dataIndex: 'availableQty'
}, {
  title: 'Allocated Qty',
  dataIndex: 'allocatedQty',
  render: true,
  type: 'number',
  min: 1
}];

class AllocationsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemId: '',
      items: [],
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeItemId: nextProps.data.items[0].id,
      code: nextProps.data.items[0].code,
      items: nextProps.data.items.map(item => ({ key: item.id, value: item.id, text: item.code })),
      batches: nextProps.data.items[0].batches,
      location: nextProps.data.location
    });
  }

  handleChangeItem = (itemId) => {
    const activeItem = this.props.data.items.find(item => item.id === itemId);
    this.setState({
      activeItemId: itemId,
      code: activeItem.code,
      batches: activeItem.batches
    });
  }

  handleUpdateTableData = (batches) => {
    this.setState({
      batches
    });
  }

  handleUpdateAllocationData = () => {
    this.props.orderUpdateAllocationData({
      payload: {
        orderNo: this.props.orderNo,
        code: this.state.code,
        batches: this.state.batches.map(item => ({
          allocatedQty: Number(item.allocatedQty),
          batch: item.batch,
          id: item.id
        }))
      }
    });
  }

  render() {
    const { activeItemId, batches, items, location } = this.state;

    return (
      <div>
        <OrderTabHeader
          location={ location }
          locationLabel="Location"
          primaryButtonText="Edit Allocation"
          secondaryButtonText="Pick List"
        >
          <Row className={ styles.row }>
            <Col lg={ 3 }>
              <Select
                value={ activeItemId }
                onChange={ this.handleChangeItem }
              >
                { items.map(item => (
                  <Option
                    key={ item.key }
                    value={ item.value }
                  >
                    { item.text }
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </OrderTabHeader>
        <GridTable
          rowKey="id"
          columns={ columns }
          expandable={ false }
          dataSource={ batches }
          updateTableData={ this.handleUpdateTableData }
        />
        <Controls
          save
          onSave={ this.handleUpdateAllocationData }
          saveText="Save"
          // onCancel={ this.handleCancel }
        />
      </div>
    );
  }
}

AllocationsTab.propTypes = {
  orderNo: PropTypes.string,
  data: PropTypes.object,
  orderUpdateAllocationData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllocationsTab);
