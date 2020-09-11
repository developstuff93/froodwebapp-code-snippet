import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderUpdatePickData } from 'redux-base/actions';
import { GridTable, Controls, OrderTabHeader } from 'components';

const mapDispatchToProps = { orderUpdatePickData };

const columns = [{
  title: 'Pick List #',
  dataIndex: 'code'
}, {
  title: 'Item Name',
  dataIndex: 'name'
}, {
  title: 'UOM',
  dataIndex: 'uomName'
}, {
  title: 'Order Qty',
  dataIndex: 'orderQty'
}, {
  title: 'Batch',
  dataIndex: 'batch'
}, {
  title: 'Expiry',
  dataIndex: 'expiryDate'
}, {
  title: 'Pick Qty',
  dataIndex: 'pickQty',
  render: true,
  type: 'number',
  min: 1
}, {
  title: 'Pick Status',
  dataIndex: 'isPicked',
  render: true,
  type: 'checkbox'
}];

class PickTabSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data.list,
      location: props.data.location
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data.list,
      location: nextProps.data.location
    });
  }

  handleUpdateTableData = (data) => {
    this.setState({
      data
    });
  }

  handleUpdatePickData = () => {
    this.props.orderUpdatePickData({
      payload: {
        orderNo: this.props.orderNo,
        code: this.state.data[0].code,
        id: this.state.data[0].id,
        children: this.state.data[0].children.map(item => ({
          lineNo: item.lineNo,
          pickQty: Number(item.pickQty)
        }))
      }
    });
  }

  render() {

    const { data, location } = this.state;

    return (
      <div>
        <OrderTabHeader
          location={ location }
          locationLabel="Location"
          primaryButtonText="Assign"
          secondaryButtonText="Print List"
        />
        <GridTable
          rowKey="code"
          expandable
          readonly={ this.props.data.list[0] && this.props.data.list[0].isPicked }
          columns={ columns }
          dataSource={ data }
          updateTableData={ this.handleUpdateTableData }
        />
        <Controls
          save={ this.props.data.list[0] && !this.props.data.list[0].isPicked } // items can not be picked twice
          onSave={ this.handleUpdatePickData }
          saveText="Save"
          // onCancel={ this.handleCancel }
        />
      </div>
    );
  }
}

PickTabSection.propTypes = {
  data: PropTypes.object,
  orderUpdatePickData: PropTypes.func.isRequired,
  orderNo: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(PickTabSection);

