import { sortBy } from 'lodash';

/**
 *
 * @param {object} state
 * @param {string} reducerName
 */
export const mapMainContainerState = (state, reducerName) => ({
  // triggers
  loadingPage: state[reducerName].loadingPage,
  loadingTableData: state[reducerName].loadingTableData,
  loadingAutoComplete: state[reducerName].loadingAutoComplete,

  // data
  data: state[reducerName].data.tableData,
  filters: state[reducerName].data.filters,
  columns: sortBy(state[reducerName].data.columns, 'order'),
  stats: state[reducerName].data.stats,
  totalRows: state[reducerName].data.totalRows,

  // state
  limit: state[reducerName].limit,
  offset: state[reducerName].offset,
  keyword: state[reducerName].keyword,
  searchSectionFilters: state[reducerName].searchSectionFilters,
  activeFilterId: state[reducerName].activeFilterId,
  filterDeleted: state[reducerName].filterDeleted,

  // autocomplete
  autocomplete: state[reducerName].autocomplete
});

/**
 *
 * @param {object} REQUESTS
 */
export const mapMainContainerRequests = REQUESTS => ({
  searchRequest: REQUESTS.searchRequest,
  updateColumnsRequest: REQUESTS.updateColumnsRequest,
  getAllItemsRequest: REQUESTS.getAllItemsRequest,
  getWithFilterRequest: REQUESTS.getWithFilterRequest,
  saveFilterRequest: REQUESTS.saveFilterRequest,
  deleteFilterRequest: REQUESTS.deleteFilterRequest,
  updateFilterRequest: REQUESTS.updateFilterRequest,
  updateCommonData: REQUESTS.updateCommonData
});
