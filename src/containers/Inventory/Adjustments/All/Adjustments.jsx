import React, { Component } from 'react';
import { MainContainer } from 'containers';
import { connect } from 'react-redux';
import { ADJUSTMENTS_REQUESTS } from 'redux-base/actions';
import { mapMainContainerState, mapMainContainerRequests } from 'utils';
import {
  renderItem,
  getStatisticsColumns
} from './adjustmentsHelpers';

const mapStateToProps = state => mapMainContainerState(state, 'adjustments');

const mapDispatchToProps = mapMainContainerRequests(ADJUSTMENTS_REQUESTS);

class Adjustments extends Component {
  render = () => (
    <MainContainer
      // autocomplete
      autocompletePlaceholder="Search by adjustment name or use advanced filter below"
      renderAutocompleteItem={ renderItem }

      // top buttons
      statsEnabled
      newButtonVisible
      newButtonText="New Adjustment"
      newButtonLink="/inventory/adjustments/new"

      // table
      actionColumn={ false }

      // helpers
      getStatisticsColumns={ getStatisticsColumns }
      { ...this.props }
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Adjustments);
