import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  supplierOrdersGetRequest,
} from 'redux-base/actions';
import { ActionButton } from 'components';
import { Table, Spin, Input, Icon } from 'antd';
import columns from './ordersTabHelpers';
import styles from '../../Supplier.scss';

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  orders: state.supplier.orders,
});

const mapDispatchToProps = {
  supplierOrdersGetRequest,
};

class OrdersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  onSearchChange = (e) => {
    this.setState({ searchText: e.target.value }, () =>
      this.props.supplierOrdersGetRequest({
        id: this.props.supplierId,
        orderNo: this.state.searchText
      })
    );
  }

  render() {
    const { searchText } = this.state;

    const {
      orders,
      loadingPage
    } = this.props;

    return (
      <div>
        <Row className={ styles.row } end="xs">
          <Col xs md={ 6 } lg={ 4 }>
            <Input
              placeholder="Search by Order number"
              prefix={ <Icon type="search" /> }
              value={ searchText }
              onChange={ this.onSearchChange }
            />
          </Col>
          <Col lg={ 8 }>
            <ActionButton>
              New PO
            </ActionButton>
          </Col>
        </Row>
        <Row>
          <Col lg>
            <Spin spinning={ loadingPage }>
              <Table
                className={ styles.table }
                rowKey="id"
                size="middle"
                columns={ columns }
                dataSource={ orders }
              />
            </Spin>
          </Col>
        </Row>
      </div>
    );
  }
}

OrdersTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  supplierId: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  // redux-base
  supplierOrdersGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab);
