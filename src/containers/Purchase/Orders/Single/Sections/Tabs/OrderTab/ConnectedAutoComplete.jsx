import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridAutoComplete } from 'components';
import { connect } from 'react-redux';
import { purchaseOrderSearchSkuRequest } from 'redux-base/actions';
import { filterAutoCompleteSuggestions } from 'utils';

const mapStateToProps = state => ({
  loadingTableAutoComplete: state.purchaseOrder.loadingTableAutoComplete,
  tableAutocomplete: state.purchaseOrder.tableAutocomplete,
  keyword: state.purchaseOrder.tableAutocompleteKeyword
});

const mapDispatchToProps = {
  searchSkuRequest: purchaseOrderSearchSkuRequest,
};

class ConnectedAutoComplete extends Component {
  handleGetItemName = (keyword) => {
    this.props.searchSkuRequest({
      payload: keyword,
      vendorId: this.props.vendorId,
    });
  }

  render() {
    const {
      keyword,
      tableAutocomplete,
      loadingTableAutoComplete,
      text,
      handleSaveItemName,
      renderItem,
      index
    } = this.props;

    return (
      <GridAutoComplete
        index={ index }
        autocomplete={ filterAutoCompleteSuggestions(tableAutocomplete, keyword) }
        value={ text }
        onChange={ this.handleGetItemName }
        onSelect={ handleSaveItemName }
        renderItem={ renderItem }
        loadingAutoComplete={ loadingTableAutoComplete }
        getItemValue={ item => item.data.id.toString() }
        inputPlaceholder="Search..."
        dashText="Search..."
      />
    );
  }
}

ConnectedAutoComplete.propTypes = {
  keyword: PropTypes.string.isRequired,
  vendorId: PropTypes.string,
  index: PropTypes.number.isRequired,
  text: PropTypes.string,
  handleSaveItemName: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  searchSkuRequest: PropTypes.func.isRequired,
  loadingTableAutoComplete: PropTypes.bool.isRequired,
  tableAutocomplete: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedAutoComplete);

