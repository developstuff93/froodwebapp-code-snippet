import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import styles from '../Tabs.scss';

const InvoiceItemsTable = ({ data, isRecurring }) => (
  <Table
    rowKey="lineNo"
    dataSource={ data }
    size="middle"
    pagination={ false }
    className={ styles.invoiceTable }
  >
    <Table.Column
      title="ORDER TYPE"
      render={ () => (
        <div>{ isRecurring ? 'Recurring' : 'Single Purchase' }</div>
      ) }
    />
    <Table.Column
      title="ITEM NAME"
      dataIndex="name"
    />
    <Table.Column
      title="UOM"
      dataIndex="uomName"
    />
    <Table.Column
      title="ORDER QTY"
      dataIndex="orderQty"
    />
    <Table.Column
      title="PRICE"
      dataIndex="price"
      render={ text => (
        <div>{ `${text} $` }</div>
      ) }
    />
    <Table.Column
      title="DISCOUNT"
      dataIndex="discount"
      render={ text => (
        <div>{ `${text} $` }</div>
      ) }
    />
    <Table.Column
      title="TAX"
      dataIndex="tax"
      render={ text => (
        <div>{ `${text} $` }</div>
      ) }
    />
    <Table.Column
      title="TOTAL"
      dataIndex="total"
      render={ text => (
        <div>{ `${text} $` }</div>
      ) }
    />
  </Table>
);

InvoiceItemsTable.propTypes = {
  data: PropTypes.array,
  isRecurring: PropTypes.bool
};

export default InvoiceItemsTable;
