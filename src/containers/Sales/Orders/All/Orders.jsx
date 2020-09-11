import React, { Component } from 'react';
import { MainContainer } from 'containers';
import { connect } from 'react-redux';
import {
  ORDERS_REQUESTS,
  ordersGetInvoiceRequest,
} from 'redux-base/actions';
import { mapMainContainerState, mapMainContainerRequests } from 'utils';
import {
  renderItem,
  getStatisticsColumns,
  getRowClickRedirectLink
} from './ordersHelpers';

const mapStateToProps = state => ({
  ...mapMainContainerState(state, 'orders'),
  // optional
  downloadedItem: state.download.downloadedItem
});

const mapDispatchToProps = {
  ...mapMainContainerRequests(ORDERS_REQUESTS),
  downloadItemRequest: ordersGetInvoiceRequest
};

class Orders extends Component {
  render = () => (
    <MainContainer
      // autocomplete
      autocompletePlaceholder="Search by order number, customer name... or use advanced filter below"
      renderAutocompleteItem={ renderItem }

      // top buttons
      statsEnabled
      newButtonVisible
      newButtonText="New Order"
      newButtonLink="/sales/orders/new"

      // table
      actionColumn
      getRowClickRedirectLink={ getRowClickRedirectLink }

      // helpers
      getStatisticsColumns={ getStatisticsColumns }

      { ...this.props }
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
