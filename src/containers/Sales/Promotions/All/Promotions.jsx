import React, { Component } from 'react';
import { MainContainer } from 'containers';
import { connect } from 'react-redux';
import { PROMOTIONS_REQUESTS } from 'redux-base/actions';
import { mapMainContainerState, mapMainContainerRequests } from 'utils';
import {
  renderItem,
  getRowClickRedirectLink
} from './promotionsHelpers';

const mapStateToProps = state => mapMainContainerState(state, 'promotions');

const mapDispatchToProps = mapMainContainerRequests(PROMOTIONS_REQUESTS);

class Promotions extends Component {
  render = () => (
    <MainContainer
      // autocomplete
      autocompletePlaceholder="Search by promotion code or use advanced filter below"
      renderAutocompleteItem={ renderItem }

      // top buttons
      statsEnabled={ false }
      newButtonVisible
      newButtonText="New Promotion"
      newButtonLink="/sales/promotions/new"

      // table
      actionColumn={ false }
      getRowClickRedirectLink={ getRowClickRedirectLink }

      { ...this.props }
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);
