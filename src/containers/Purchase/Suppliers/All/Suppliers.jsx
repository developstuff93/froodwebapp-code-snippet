import React, { Component } from 'react';
import { MainContainer } from 'containers';
import { connect } from 'react-redux';
import { SUPPLIERS_REQUESTS } from 'redux-base/actions';
import { mapMainContainerState, mapMainContainerRequests } from 'utils';
import {
  renderItem,
  getStatisticsColumns,
  getRowClickRedirectLink
} from './suppliersHelpers';

const mapStateToProps = state => mapMainContainerState(state, 'suppliers');

const mapDispatchToProps = mapMainContainerRequests(SUPPLIERS_REQUESTS);

class AllSuppliers extends Component {
  render = () => (
    <MainContainer
      // autocomplete
      autocompletePlaceholder="Search by supplier name or use advanced filter below"
      renderAutocompleteItem={ renderItem }

      // top buttons
      statsEnabled
      newButtonVisible
      newButtonText="New Supplier"
      newButtonLink="/purchase/suppliers/new"

      // table
      actionColumn={ false }
      getRowClickRedirectLink={ getRowClickRedirectLink }

      // helpers
      getStatisticsColumns={ getStatisticsColumns }
      { ...this.props }
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSuppliers);
