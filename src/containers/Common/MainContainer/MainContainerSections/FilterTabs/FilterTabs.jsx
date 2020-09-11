import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutocompleteSection from './AutocompleteSection/AutocompleteSection';
import SearchSection from './SearchSection/SearchSection';
import TabsSection from './TabsSection/TabsSection';
import styles from './FilterTabs.scss';

class FilterTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSectionVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // if Tab changes hide filter search params
    if (nextProps.activeFilterId !== this.props.activeFilterId) {
      this.setState({
        searchSectionVisible: false
      });
    }
  }

  handleToggleSearchSection = () => {
    this.setState({
      searchSectionVisible: !this.state.searchSectionVisible
    });
  }

  render() {
    const {
      limit,
      offset,
      searchSectionFilters,
      autocomplete,
      autocompletePlaceholder,
      renderAutocompleteItem,
      filters,
      activeFilterId,
      columns,
      loadingAutoComplete,
    } = this.props;

    const { searchSectionVisible } = this.state;

    const filterColumns = columns.filter(col => col.isFilter === true);
    const activeFilter = filters.find(fil => fil.filterId === Number(activeFilterId));
    const activeFilterName = activeFilter && activeFilter.filterName;
    const filterUserDefined = activeFilter && activeFilter.userDefined;

    return (
      <div id="filters" className={ styles.filters }>
        <TabsSection
          // data
          filters={ filters }
          columns={ columns }
          limit={ limit }
          offset={ offset }
          activeFilterId={ activeFilterId }
          // redux-base
          updateCommonData={ this.props.updateCommonData }
          updateColumnsRequest={ this.props.updateColumnsRequest }
          getAllItemsRequest={ this.props.getAllItemsRequest }
          getWithFilterRequest={ this.props.getWithFilterRequest }
          // Search Section Trigger
          handleToggleSearchSection={ this.handleToggleSearchSection }
        />
        { activeFilterId === 'Search' &&
          <AutocompleteSection
            // data
            autocomplete={ autocomplete }
            inputPlaceholder={ autocompletePlaceholder }
            renderItem={ renderAutocompleteItem }
            loadingAutoComplete={ loadingAutoComplete }
            // redux-base
            searchRequest={ this.props.searchRequest }
            getAllItemsRequest={ this.props.getAllItemsRequest }
            // Search Section Trigger
            handleToggleSearchSection={ this.handleToggleSearchSection }
          />
        }
        { searchSectionVisible &&
          <SearchSection
            // data
            limit={ limit }
            filters={ searchSectionFilters }
            columns={ filterColumns }
            activeFilterId={ activeFilterId }
            filterName={ activeFilterName }
            filterUserDefined={ filterUserDefined }
            // redux-base
            updateCommonData={ this.props.updateCommonData }
            saveFilterRequest={ this.props.saveFilterRequest }
            deleteFilterRequest={ this.props.deleteFilterRequest }
            updateFilterRequest={ this.props.updateFilterRequest }
            getWithFilterRequest={ this.props.getWithFilterRequest }
          />
        }
      </div>
    );
  }
}

FilterTabs.propTypes = {
  // trigger
  loadingAutoComplete: PropTypes.bool.isRequired,
  // state
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  searchSectionFilters: PropTypes.array.isRequired,
  activeFilterId: PropTypes.string.isRequired,
  // data
  filters: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  autocomplete: PropTypes.array.isRequired,
  // container dynamic props
  autocompletePlaceholder: PropTypes.string.isRequired,
  renderAutocompleteItem: PropTypes.func.isRequired,
  // redux-base
  updateCommonData: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  saveFilterRequest: PropTypes.func.isRequired,
  updateFilterRequest: PropTypes.func.isRequired,
  deleteFilterRequest: PropTypes.func.isRequired,
  updateColumnsRequest: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  getAllItemsRequest: PropTypes.func.isRequired,
};

export default FilterTabs;
