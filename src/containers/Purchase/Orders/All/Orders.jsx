import React, { Component } from 'react';
import { MainContainer } from 'containers';
import { connect } from 'react-redux';
import { PURCHASE_ORDERS_REQUESTS } from 'redux-base/actions';
import { mapMainContainerState, mapMainContainerRequests } from 'utils';
import {
  renderItem,
  getStatisticsColumns,
  getRowClickRedirectLink
} from './purchasesHelpers';

const mapStateToProps = state => mapMainContainerState(state, 'purchaseOrders');

const mapDispatchToProps = mapMainContainerRequests(PURCHASE_ORDERS_REQUESTS);

class Orders extends Component {
  render = () => (
    <MainContainer
      // autocomplete
      autocompletePlaceholder="Search by code, delivery date, vendor name or use advanced filter below"
      renderAutocompleteItem={ renderItem }

      // top buttons
      statsEnabled
      newButtonVisible
      newButtonText="New Purchase"
      newButtonLink="/purchase/orders/new"

      // table
      actionColumn={ false }
      getRowClickRedirectLink={ getRowClickRedirectLink }

      // helpers
      getStatisticsColumns={ getStatisticsColumns }
      { ...this.props }
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
