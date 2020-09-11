import React, { Component } from 'react';
import { MainContainer } from 'containers';
import { connect } from 'react-redux';
import { ITEMS_REQUESTS } from 'redux-base/actions';
import { mapMainContainerState, mapMainContainerRequests } from 'utils';
import {
  renderItem,
  getRowClickRedirectLink
} from './itemsHelpers';

const mapStateToProps = state => mapMainContainerState(state, 'items');

const mapDispatchToProps = mapMainContainerRequests(ITEMS_REQUESTS);

class Items extends Component {
  render = () => (
    <MainContainer
      // autocomplete
      autocompletePlaceholder="Search by sku code or use advanced filter below"
      renderAutocompleteItem={ renderItem }

      // top buttons
      statsEnabled={ false }
      newButtonVisible
      newButtonText="New Inventory"
      newButtonLink="/inventory/all-items/new"

      // table
      actionColumn={ false }
      getRowClickRedirectLink={ getRowClickRedirectLink }

      { ...this.props }
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
