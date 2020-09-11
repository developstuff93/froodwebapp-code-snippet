import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormAutocomplete } from 'components';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  skuSearchGetRequest
} from 'redux-base/actions';
import {
  renderAutocompleteItem,
  filterAutoCompleteSuggestions,
} from 'utils';

const renderSkusItem = renderAutocompleteItem(['id', 'name', 'skuCode'], 'Sku/Variants');

const mapStateToProps = state => ({
  loadingAutoComplete: state.autocomplete.loadingAutoComplete,
  skus: state.autocomplete.skus,
  keyword: state.autocomplete.keyword
});

const mapDispatchToProps = {
  skuSearchGetRequest
};

class SkuAutocompleteField extends Component {
  handleSearchSkus = (keyword) => {
    this.props.skuSearchGetRequest({
      payload: keyword
    });
  }

  render() {
    const {
      disabled,
      loadingAutoComplete,
      skus,
      keyword
    } = this.props;

    return (
      <Field
        name="skuId"
        placeholder="Search SKU"
        component={ FormAutocomplete }
        disabled={ disabled }
        autocomplete={ filterAutoCompleteSuggestions(skus, keyword) }
        onAutocompleteChange={ this.handleSearchSkus }
        renderItem={ renderSkusItem }
        loadingAutoComplete={ loadingAutoComplete }
      />
    );
  }
}

SkuAutocompleteField.propTypes = {
  // triggers
  disabled: PropTypes.bool.isRequired,
  loadingAutoComplete: PropTypes.bool.isRequired,
  // data
  skus: PropTypes.array.isRequired,
  keyword: PropTypes.string.isRequired,
  // redux-base
  skuSearchGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkuAutocompleteField);
