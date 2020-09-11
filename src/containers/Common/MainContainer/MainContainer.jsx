import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showPdfPreview } from 'utils';
import {
  Statistics,
  TopButtons,
  FilterTabs,
  Table
} from './MainContainerSections';

const mapDispatchToProps = { push };

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsCollapsed: true
    };
  }

  componentWillMount() {
    this.props.getAllItemsRequest({
      limit: this.props.limit,
      offset: 0
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.downloadedItem) {
      showPdfPreview(nextProps.downloadedItem);
    }

    if (nextProps.filterDeleted) {
      this.props.getAllItemsRequest({
        limit: this.props.limit,
        offset: 0
      });
    }
  }

  handleRowClick = (itemId) => {
    if (this.props.getRowClickRedirectLink) {
      const {
        data,
        getRowClickRedirectLink,
      } = this.props;

      const matchingId = Number(itemId) || itemId;
      const row = data.find(item => item.id === matchingId);

      const url = getRowClickRedirectLink(row);
      this.props.push({
        pathname: url,
        state: {
          id: row.id
        }
      });
    }
  }

  // Triggers
  handleCollapseStats = () => {
    this.setState({ statsCollapsed: !this.state.statsCollapsed });
  }

  render() {
    const { statsCollapsed } = this.state;

    return (
      <div>
        <TopButtons
          statsEnabled={ this.props.statsEnabled }
          statsCollapsed={ statsCollapsed }
          handleCollapseStats={ this.handleCollapseStats }
          newButtonVisible={ this.props.newButtonVisible }
          newButtonText={ this.props.newButtonText }
          newButtonLink={ this.props.newButtonLink }
        />
        <Spin
          spinning={ this.props.loadingPage }
        >
          <Statistics
            collapsed={ statsCollapsed }
            columns={ this.props.getStatisticsColumns && this.props.getStatisticsColumns(this.props.stats) }
          />
          <FilterTabs
            // triggers
            loadingAutoComplete={ this.props.loadingAutoComplete }

            // data
            filters={ this.props.filters }
            columns={ this.props.columns }

            // state
            limit={ this.props.limit }
            offset={ this.props.offset }
            keyword={ this.props.keyword }
            activeFilterId={ this.props.activeFilterId }
            searchSectionFilters={ this.props.searchSectionFilters }

            // autocomplete
            autocomplete={ this.props.autocomplete }
            autocompletePlaceholder={ this.props.autocompletePlaceholder }
            renderAutocompleteItem={ this.props.renderAutocompleteItem }

            // redux-base
            // get data
            getAllItemsRequest={ this.props.getAllItemsRequest } // get
            getWithFilterRequest={ this.props.getWithFilterRequest } // post
            // filters logic
            saveFilterRequest={ this.props.saveFilterRequest }
            deleteFilterRequest={ this.props.deleteFilterRequest }
            updateFilterRequest={ this.props.updateFilterRequest }

            // autocomplete
            searchRequest={ this.props.searchRequest }

            // update columns
            updateColumnsRequest={ this.props.updateColumnsRequest }

            // update state with common sections data
            updateCommonData={ this.props.updateCommonData }
          />
          <Table
            actionColumn={ this.props.actionColumn } // show or not special action column
            handleRowClick={ this.handleRowClick }

            // triggers
            loadingTableData={ this.props.loadingTableData }

            // data
            data={ this.props.data }
            columns={ this.props.columns }
            totalRows={ this.props.totalRows }

            // state
            limit={ this.props.limit }
            searchSectionFilters={ this.props.searchSectionFilters }
            activeFilterId={ this.props.activeFilterId }

            // redux-base
            getWithFilterRequest={ this.props.getWithFilterRequest }
            updateColumnsRequest={ this.props.updateColumnsRequest }
            downloadItemRequest={ this.props.downloadItemRequest }
          />
        </Spin>
      </div>
    );
  }
}

MainContainer.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  loadingTableData: PropTypes.bool.isRequired,
  loadingAutoComplete: PropTypes.bool.isRequired,

  // data
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  filters: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
  stats: PropTypes.object,

  // state
  keyword: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  searchSectionFilters: PropTypes.array.isRequired,
  activeFilterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  filterDeleted: PropTypes.bool.isRequired,

  // autocomplete
  autocomplete: PropTypes.array.isRequired,
  autocompletePlaceholder: PropTypes.string.isRequired,
  renderAutocompleteItem: PropTypes.func.isRequired,

  // top buttons
  statsEnabled: PropTypes.bool,
  newButtonVisible: PropTypes.bool,
  newButtonText: PropTypes.string,
  newButtonLink: PropTypes.string,

  // table
  actionColumn: PropTypes.bool.isRequired,
  getRowClickRedirectLink: PropTypes.func,

  // helpers
  getStatisticsColumns: PropTypes.func,

  // redux-base
  // get data
  getAllItemsRequest: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  // filters
  saveFilterRequest: PropTypes.func.isRequired,
  deleteFilterRequest: PropTypes.func.isRequired,
  updateFilterRequest: PropTypes.func.isRequired,
  // autocomplete
  searchRequest: PropTypes.func.isRequired,
  // update columns
  updateColumnsRequest: PropTypes.func.isRequired,
  // update state with common sections data
  updateCommonData: PropTypes.func.isRequired,
  // item download request
  downloadItemRequest: PropTypes.func,

  // optional
  downloadedItem: PropTypes.object,

  // router
  push: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(MainContainer);
