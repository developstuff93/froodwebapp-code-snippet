import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Table, Pagination, Spin } from 'antd';
import {
  customerOrdersGetRequest,
  customerOrderSearchRequest
} from 'redux-base/actions';
import { AutoComplete } from 'components';
import { renderAutocompleteItem, filterAutoCompleteSuggestions } from 'utils';
import ordersColumns from './columns';
import styles from '../../Tabs.scss';

const mapStateToProps = state => ({
  orders: state.customer.orders,
  orderAutocomplete: state.customer.orderAutocomplete,
  loadingAutoComplete: state.customer.loadingAutoComplete,
  loadingPage: state.customer.loadingPage
});

const mapDispatchToProps = {
  customerOrdersGetRequest,
  customerOrderSearchRequest,
  push
};

const renderItem = renderAutocompleteItem(['id', 'orderDate', 'status'], 'Order');

class OrdersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      limit: 10,
      offset: 0,
      value: ''
    };
  }

  componentWillMount() {
    const {
      limit,
      offset
    } = this.state;

    this.props.customerOrdersGetRequest({
      id: this.props.customerId,
      limit,
      offset
    });
  }

  handleLimitChange = (current, pageSize) => {
    this.setState({
      limit: pageSize,
      offset: 0,
      activePage: 1
    }, () => this.props.customerOrdersGetRequest({
      id: this.props.customerId,
      limit: this.state.limit,
      offset: this.state.offset
    }));
  }

  handleEdit = (e) => {
    const url = `/sales/orders/${e.target.id.replace(/\//g, '-')}`;
    this.props.push(url);
  }

  handleCancel = () => {
    // TODO when api will be done
  }

  handlePaginate = (activePage) => {
    const { limit } = this.state;
    this.setState({
      activePage
    }, () => this.props.customerOrdersGetRequest({
      id: this.props.customerId,
      offset: (activePage - 1) * limit,
      limit
    }));
  }

  handleSearchAutocomplete = (e, value) => {
    if (value.length < 3) {
      this.setState({
        value
      });
    } else {
      this.setState({
        value
      }, () => this.props.customerOrderSearchRequest({
        id: this.props.customerId,
        payload: value
      }));
    }
  }

  handleSelectAutoCompleteSuggestion = (selectedOrderId) => {
    const url = `/sales/orders/${selectedOrderId.replace(/\//g, '-')}`;
    this.props.push(url);
  }

  render() {
    const {
      activePage,
      limit,
      value
    } = this.state;

    const {
      orders,
      orderAutocomplete,
      loadingPage,
      loadingAutoComplete
    } = this.props;

    return (
      <Spin spinning={ loadingPage }>
        <Row>
          <Col xs={ 12 } md={ 4 } lg={ 4 }>
            <AutoComplete
              items={ filterAutoCompleteSuggestions(orderAutocomplete, value) }
              getItemValue={ item => item.data.id.toString() }
              value={ value }
              onChange={ this.handleSearchAutocomplete }
              onSelect={ this.handleSelectAutoCompleteSuggestion }
              renderItem={ renderItem }
              loadingAutoComplete={ loadingAutoComplete }
              inputPlaceholder="Search by order number"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 } md={ 12 } lg={ 12 }>
            <Table
              className={ styles.ordersTable }
              columns={ ordersColumns(this.handleEdit, this.handleCancel) }
              dataSource={ orders.data }
              size="small"
              scroll={ { x: 1700, y: 250 } }
              pagination={ false }
            />
            <Pagination
              className={ styles.pagination }
              onChange={ this.handlePaginate }
              showSizeChanger
              onShowSizeChange={ this.handleLimitChange }
              pageSize={ limit }
              current={ activePage }
              showTotal={ total => `Total ${total} records` }
              total={ orders.totalRows }
            />
          </Col>
        </Row>
      </Spin>
    );
  }
}

OrdersTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  loadingAutoComplete: PropTypes.bool.isRequired,
  // router
  push: PropTypes.func.isRequired,
  // data
  orders: PropTypes.object.isRequired,
  orderAutocomplete: PropTypes.array.isRequired,
  customerId: PropTypes.string.isRequired,
  // redux-base
  customerOrdersGetRequest: PropTypes.func.isRequired,
  customerOrderSearchRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab);
