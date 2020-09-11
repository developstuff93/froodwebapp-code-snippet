import React from 'react';
import { TableActionButtons } from 'components';

export default (handleEdit, handleCancel) => [{
  title: 'Order No',
  dataIndex: 'id',
  width: '10%'
}, {
  title: 'Customer Name',
  dataIndex: 'customerName',
  width: '10%'
}, {
  title: 'Paid',
  dataIndex: 'paidOrder',
  width: '5%'
}, {
  title: 'Delivery On',
  dataIndex: 'expectedDeliveryDate',
  width: '8%'
}, {
  title: 'Order Date',
  dataIndex: 'orderDate',
  width: '8%'
}, {
  title: 'Pick Up Date',
  dataIndex: 'pickUpDate',
  width: '6%'
}, {
  title: 'Status',
  dataIndex: 'status',
  width: '5%'
}, {
  title: 'Channel',
  dataIndex: 'channelName',
  width: '5%'
}, {
  title: 'External ID',
  dataIndex: 'externalId',
  width: '6%'
}, {
  title: 'Recur Discount',
  dataIndex: 'recurDiscount',
  width: '8%'
}, {
  title: 'Promotion Discount',
  dataIndex: 'promotionDiscount',
  width: '10%'
}, {
  title: 'Weight',
  dataIndex: 'totalWeight',
  width: '4%'
}, {
  title: 'Actions',
  dataIndex: 'action',
  width: '11%',
  render: (text, record) => (
    <TableActionButtons
      record={ record }
      handleEdit={ handleEdit }
      handleDeactivate={ handleCancel }
      deleteButtonVisible
    />
  )
}];
