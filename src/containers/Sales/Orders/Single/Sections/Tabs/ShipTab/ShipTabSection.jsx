import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderUpdateShipData } from 'redux-base/actions';
import { GridTable, Controls, OrderTabHeader } from 'components';

const mapDispatchToProps = { orderUpdateShipData };

const columns = [{
  title: 'Package #',
  dataIndex: 'code'
}, {
  title: 'Delivery Method',
  dataIndex: 'method'
}, {
  title: 'Delivery Slot',
  dataIndex: 'slot'
}, {
  title: 'Boxes',
  dataIndex: 'boxes'
}, {
  title: 'Tracking #',
  dataIndex: 'trackingNo'
}, {
  title: 'Ship Status',
  dataIndex: 'isShipped',
  render: true,
  type: 'checkbox'
}];

class ShipTabSection extends Component {
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

  handleUpdateShipData = () => {
    if (this.state.data[0].isShipped) {
      this.props.orderUpdateShipData({
        payload: {
          orderNo: this.props.orderNo,
          code: this.state.data[0].code,
          id: this.state.data[0].id,
        }
      });
    }
  }

  render() {

    const { data, location } = this.state;

    return (
      <div>
        <OrderTabHeader
          location={ location }
          locationLabel="Order Shipping Pickup"
          primaryButtonText="Assign"
          secondaryButtonText="Print Slip"
        />
        <GridTable
          rowKey="code"
          expandable={ false }
          readonly={ this.props.data.list[0] && this.props.data.list[0].isShipped }
          columns={ columns }
          dataSource={ data }
          updateTableData={ this.handleUpdateTableData }
        />
        <Controls
          save={ this.props.data.list[0] && !this.props.data.list[0].isShipped } // items can not be shipped twice
          onSave={ this.handleUpdateShipData }
          saveText="Save"
          // onCancel={ this.handleCancel }
        />
      </div>
    );
  }
}

ShipTabSection.propTypes = {
  data: PropTypes.object,
  orderUpdateShipData: PropTypes.func.isRequired,
  orderNo: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(ShipTabSection);

