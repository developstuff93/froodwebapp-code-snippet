import React, { Component } from 'react';
import { MainContainer } from 'containers';
import { connect } from 'react-redux';
import { CUSTOMERS_REQUESTS } from 'redux-base/actions';
import { mapMainContainerState, mapMainContainerRequests } from 'utils';
import {
  renderItem,
  getStatisticsColumns,
  getRowClickRedirectLink
} from './customersHelpers';

const mapStateToProps = state => mapMainContainerState(state, 'customers');

const mapDispatchToProps = mapMainContainerRequests(CUSTOMERS_REQUESTS);

class Orders extends Component {
  render = () => (
    <MainContainer
      // autocomplete
      autocompletePlaceholder="Search by customer name or use advanced filter below"
      renderAutocompleteItem={ renderItem }

      // top buttons
      statsEnabled
      newButtonVisible
      newButtonText="New Customer"
      newButtonLink="/sales/customers/new"

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
