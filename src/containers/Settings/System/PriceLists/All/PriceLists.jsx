/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import { push } from 'react-router-redux';
import {
  priceListsGetRequest
} from 'redux-base/actions';
import { PageHeader } from 'components';
import { table } from 'styles/common.scss';
import { TopButtons } from 'containers/Common/MainContainer/MainContainerSections';
import columns from './priceListHelpers';

const mapStateToProps = state => ({
  loadingPage: state.priceLists.loadingPage,
  priceLists: state.priceLists.priceLists,
});

const mapDispatchToProps = {
  priceListsGetRequest,
  push
};

class PriceLists extends Component {
  componentDidMount = () => {
    this.props.priceListsGetRequest();
  }

  handleEdit = (e) => {
    const priceListId = e.target.id;
    const { code } = this.props.priceLists.find(item => item.id === Number(priceListId));
    const url = `/settings/system/price-lists/${priceListId}/${code}`;
    this.props.push(url);
  }

  render() {
    const {
      priceLists,
      loadingPage
    } = this.props;

    return (
      <div>
        <TopButtons
          newButtonVisible
          newButtonText="New Price List"
          newButtonLink="/settings/system/price-lists/new"
        />
        <PageHeader
          bigText="Adamant and Co. Ltd - Price Lists"
          smallText="A price list is non-standart set of prices that can be attached to channels (Sell Type) or vendors (Buy Type)."
        />
        <Spin spinning={ loadingPage }>
          <Row>
            <Col xs>
              <Table
                className={ table }
                columns={ columns(this.handleEdit) }
                dataSource={ priceLists }
                size="small"
                rowKey="id"
                pagination={ false }
              />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

PriceLists.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  priceLists: PropTypes.array.isRequired,
  // redux-base
  priceListsGetRequest: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceLists);
