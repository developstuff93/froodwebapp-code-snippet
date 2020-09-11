import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { DynamicTable } from 'components';
import { prepareFilterValue, prepareHeaders } from 'utils';
import styles from './Table.scss';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      selectedRows: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // reset page on new data or tab change
    if (nextProps.totalRows !== this.props.totalRows ||
        nextProps.activeFilterId !== this.props.activeFilterId) {
      this.setState({
        activePage: 1
      });
    }
  }

  handlePaginate = (page, limit, sortByColumn, sortOrder) => {
    const { activeFilterId, searchSectionFilters } = this.props;

    const filter = {
      limit: limit || this.props.limit,
      offset: this.props.limit * (page - 1)
    };

    if (sortByColumn) {
      filter.sortBy = sortByColumn;
      filter.sortOrder = sortOrder;
    }

    if (activeFilterId === 'All') {
      filter.filterId = null;
    } else if (activeFilterId !== 'Search') { // any tab except search
      filter.filterId = activeFilterId;
    } else {
      filter.filterValue = prepareFilterValue(searchSectionFilters);
    }
    this.setState(
      { activePage: page },
      () => this.props.getWithFilterRequest({
        payload: filter,
        limit,
        offset: filter.offset
      })
    );
  }


  handleSort = (sortByColumn, sortOrder) => {
    this.handlePaginate(
      this.state.activePage,
      this.props.limit,
      sortByColumn,
      sortOrder
    );
  }

  handleLimitChange = (currentPage, limit) => {
    this.handlePaginate(currentPage, limit);
  }

  handleUpdateColumnsOrder = (columns) => {
    this.props.updateColumnsRequest({
      payload: columns
    });
  }

  handleSelectRows = (rowId, checked) => {
    if (rowId === 'all' && checked) {
      const allRows = this.props.data.map(item => item.id);
      this.setState({
        selectedRows: allRows
      });
      return;
    } else if (rowId === 'all' && !checked) {
      this.setState({
        selectedRows: []
      });
      return;
    }

    const selectedRows = [...this.state.selectedRows];
    const selectedRow = selectedRows.find(sr => sr === rowId);
    if (!selectedRow) {
      selectedRows.push(rowId);
    } else {
      const index = selectedRows.indexOf(selectedRow);
      selectedRows.splice(index, 1);
    }
    this.setState({
      selectedRows
    });
  }

  handleRowClick = (e) => {
    this.props.handleRowClick(e.target.parentNode.id);
  }

  handleDownloadItem = (e) => {
    this.props.downloadItemRequest({
      id: e.target.id
    });
  }

  render() {
    const {
      columns,
      data,
      totalRows,
      loadingTableData,
      actionColumn,
      limit
    } = this.props;

    const {
      activePage,
      selectedRows
    } = this.state;

    const tableDefaultColumns = columns.filter(col => col.isDefault === true);

    return (
      <div id="salesTable">
        <DynamicTable
          // trigger
          loadingTableData={ loadingTableData }
          // props
          actionColumn={ actionColumn }
          selectedRows={ selectedRows }
          // data
          data={ data }
          headers={ prepareHeaders(tableDefaultColumns) }
          // handlers
          handleUpdateRow={ this.handleUpdateRow }
          handleRowClick={ this.handleRowClick }
          handleUpdateColumnsOrder={ this.handleUpdateColumnsOrder }
          handleDownloadItem={ this.handleDownloadItem }
          handleSelectRows={ this.handleSelectRows }
          handleSort={ this.handleSort }

        />
        <Pagination
          className={ styles.pagination }
          onChange={ this.handlePaginate }
          showSizeChanger
          onShowSizeChange={ this.handleLimitChange }
          defaultCurrent={ 1 }
          pageSize={ limit }
          current={ activePage }
          showTotal={ total => `Total ${total} records` }
          total={ totalRows }
        />
      </div>
    );
  }
}

Table.propTypes = {
  // trigger
  loadingTableData: PropTypes.bool.isRequired,
  // data
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  // props
  actionColumn: PropTypes.bool,
  limit: PropTypes.number.isRequired,
  totalRows: PropTypes.number.isRequired,
  activeFilterId: PropTypes.string.isRequired,
  searchSectionFilters: PropTypes.array.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  // redux-base
  getWithFilterRequest: PropTypes.func.isRequired,
  updateColumnsRequest: PropTypes.func.isRequired,
  downloadItemRequest: PropTypes.func,
};

export default Table;
