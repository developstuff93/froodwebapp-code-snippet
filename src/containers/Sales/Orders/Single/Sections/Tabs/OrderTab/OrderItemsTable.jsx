import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderAutocompleteItem, checkNegative } from 'utils';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { skuInfoGetRequest } from 'redux-base/actions';
import { GridText, NewTableRow } from 'components';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import ConnectedAutoComplete from './ConnectedAutoComplete';
import styles from './OrderTab.scss';

const mapStateToProps = state => ({
  skuInfo: state.order.skuInfo,
});

const mapDispatchToProps = {
  skuInfoGetRequest
};

const tableItem = {
  skuName: '',
  uomName: '',
  availableQuantity: '',
  qty: '',
  unitPrice: 0,
  discount: 0,
  tax: 0,
  total: 0,
  new: true
};

const renderSkuItem = renderAutocompleteItem(['id', 'name', 'skuCode'], 'Sku');

class OrderItemsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentTableRowIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.data.length === 0 && nextProps.input.value) {
      this.setState({
        data: nextProps.input.value.map((sku, index) => ({
          key: index,
          ...sku
        }))
      });
    }

    // fill values of row when user choose sku name from autocomplete
    if (nextProps.skuInfo) {
      const data = [...this.state.data];
      data[this.state.currentTableRowIndex].uomName = nextProps.skuInfo.uomName;
      data[this.state.currentTableRowIndex].unitPrice = nextProps.skuInfo.salePrice;
      data[this.state.currentTableRowIndex].availableQuantity = nextProps.skuInfo.availableQuantity;

      this.setState({
        data,
      }, () => this.props.input.onChange(data));
    }
  }

  handleAddItem = () => {
    const data = [...this.state.data];
    const lastItem = data[data.length - 1];
    const lineNo = (lastItem && lastItem.lineNo + 1) || 1;
    data.push({
      lineNo,
      ...tableItem
    });
    this.setState({
      data
    }, () => this.props.input.onChange(data));
  }

  handleDeleteItem = (e) => {
    const newData = [...this.state.data];
    const itemIndex = newData.findIndex(item => item.lineNo === Number(e.target.id));
    newData[itemIndex].deleted = true;

    this.setState({
      data: newData
    }, () => this.props.input.onChange(newData));
  }

  handleSaveItemName = (sku, lineNo) => {
    const data = [...this.state.data];
    const itemIndex = data.findIndex(item => item.lineNo === Number(lineNo));

    data[itemIndex] = {
      ...data[itemIndex],
      id: sku.id,
      skuName: sku.name
    };

    this.setState({
      data,
      currentTableRowIndex: itemIndex
    },
    () => this.props.skuInfoGetRequest({ id: sku.id }));
  }

  handleEditGridCell = (val, lineNo, propName) => {
    const data = [...this.state.data];
    const itemIndex = data.findIndex(item => item.lineNo === Number(lineNo));
    const value = checkNegative(val);

    const obj = { ...data[itemIndex] };
    obj[propName] = value.toFixed(2);
    data[itemIndex] = obj;
    this.setState({
      data
    }, () => this.props.input.onChange(data));
  }

  render() {
    const { data } = this.state;
    const { readonly, currency } = this.props;
    return (
      <div>
        <Table
          rowKey="lineNo"
          dataSource={ data.filter(item => item.deleted === false
                                        || item.deleted === undefined) }
          size="middle"
          pagination={ false }
          className={ styles.itemsTable }
        >
          <Table.Column
            title="Item Name"
            dataIndex="skuName"
            render={ (text, record) => (
              (!text &&
              <ConnectedAutoComplete
                index={ record.lineNo }
                text={ text }
                handleSaveItemName={ this.handleSaveItemName }
                renderItem={ renderSkuItem }
              />) || text
            ) }
          />
          <Table.Column
            title="UOM"
            dataIndex="uomName"
          />
          <Table.Column
            title="Available Qty"
            dataIndex="availableQuantity"
          />
          <Table.Column
            title="Order Qty"
            dataIndex="qty"
            render={ (text, record) => (
              <GridText
                value={ text }
                index={ record.lineNo }
                min={ 1 }
                type="number"
                propName="qty"
                handleChange={ this.handleEditGridCell }
                readonly={ readonly }
              />
            ) }
          />
          <Table.Column
            title="Price"
            dataIndex="unitPrice"
            render={ text => (
              `${text} ${currency}`
            ) }
          />
          <Table.Column
            title="Discount"
            dataIndex="discount"
            render={ (text, record) => (
              <GridText
                value={ text }
                index={ record.lineNo }
                min={ 1 }
                type="number"
                propName="discount"
                handleChange={ this.handleEditGridCell }
                readonly={ readonly }
                suffix={ currency }
              />
            ) }
          />
          <Table.Column
            title="Tax"
            dataIndex="tax"
            render={ text => (
              `${text} ${currency}`
            ) }
          />
          <Table.Column
            title="Total"
            dataIndex="total"
            render={ (text, record) => (
              <div>
                { `${((record.qty * record.unitPrice) - record.discount).toFixed(2)} ${currency}` }
                { !readonly &&
                  <FontAwesome
                    id={ record.lineNo }
                    className={ classnames('times', styles.deleteTableRowIcon) }
                    name="times"
                    onClick={ this.handleDeleteItem }
                  />
                }
              </div>
            ) }
          />
        </Table>
        { !readonly &&
          <NewTableRow
            addOtherRowText="Add New Item"
            onClick={ this.handleAddItem }
          />
        }
      </div>
    );
  }
}

OrderItemsTable.propTypes = {
  // data
  currency: PropTypes.string,
  data: PropTypes.array,
  readonly: PropTypes.bool,
  skuInfo: PropTypes.object,
  // form
  input: PropTypes.object.isRequired,
  // redux-base
  skuInfoGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemsTable);
