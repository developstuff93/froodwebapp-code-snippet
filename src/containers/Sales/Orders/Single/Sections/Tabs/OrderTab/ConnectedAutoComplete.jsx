import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridAutoComplete } from 'components';
import { connect } from 'react-redux';
import { searchSkuRequest } from 'redux-base/actions';
import { filterAutoCompleteSuggestions } from 'utils';

const mapStateToProps = state => ({
  loadingTableAutoComplete: state.order.loadingTableAutoComplete,
  tableAutocomplete: state.order.tableAutocomplete,
  keyword: state.order.tableAutocompleteKeyword
});

const mapDispatchToProps = { searchSkuRequest };

class ConnectedAutoComplete extends Component {
  handleGetItemName = (keyword) => {
    this.props.searchSkuRequest({
      payload: keyword
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
      />
    );
  }
}

ConnectedAutoComplete.propTypes = {
  keyword: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string,
  handleSaveItemName: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  searchSkuRequest: PropTypes.func.isRequired,
  loadingTableAutoComplete: PropTypes.bool.isRequired,
  tableAutocomplete: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedAutoComplete);

