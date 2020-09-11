import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderUpdatePackData } from 'redux-base/actions';
import { GridTable, Controls, OrderTabHeader } from 'components';

const mapDispatchToProps = { orderUpdatePackData };

const columns = [{
  title: 'Package #',
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
  title: 'Pack Qty',
  dataIndex: 'packQty'
}, {
  title: 'Pack Status',
  dataIndex: 'isPacked',
  render: true,
  type: 'checkbox'
}];

class PackTabSection extends Component {
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

  handleUpdatePackData = () => {
    this.props.orderUpdatePackData({
      payload: {
        orderNo: this.props.orderNo,
        code: this.state.data[0].code,
        id: this.state.data[0].id,
        children: this.state.data[0].children.map(item => ({
          lineNo: item.lineNo,
          isPacked: item.isPacked
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
          locationLabel="Packing Station"
          primaryButtonText="Assign"
          secondaryButtonText="Print Slip"
        />
        <GridTable
          rowKey="code"
          expandable
          readonly={ this.props.data.list[0] && this.props.data.list[0].isPacked }
          columns={ columns }
          dataSource={ data }
          updateTableData={ this.handleUpdateTableData }
        />
        <Controls
          save={ this.props.data.list[0] && !this.props.data.list[0].isPacked } // items can not be packed twice
          onSave={ this.handleUpdatePackData }
          saveText="Save"
          // onCancel={ this.handleCancel }
        />
      </div>
    );
  }
}

PackTabSection.propTypes = {
  data: PropTypes.object,
  orderUpdatePackData: PropTypes.func.isRequired,
  orderNo: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(PackTabSection);

