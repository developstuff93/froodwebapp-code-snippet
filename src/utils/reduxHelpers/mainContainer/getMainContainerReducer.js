import { searchSectionFilters } from 'utils';
import { ERROR } from 'redux-base/actions';

const initialState = {
  loadingPage: false,
  loadingTableData: false,
  loadingAutoComplete: false,
  data: {
    tableData: [],
    columns: [],
    stats: { },
    filters: [],
    totalRows: 0
  },
  activeFilterId: 'All',
  filterDeleted: false,
  limit: 40,
  offset: 0,
  searchSectionFilters,
  autocomplete: [],
  keyword: ''
};

export default actionsObj => (state = initialState, action = {}) => {
  switch (action.type) {
    // REQUEST
    case actionsObj.GET.REQUEST:
      return {
        ...state,
        activeFilterId: action.orderNo || action.id ? 'Search' : 'All',
        loadingPage: !(action.orderNo || action.id) && true,
        loadingTableData: false,
        filterDeleted: false
      };
    case actionsObj.GET_WITH_FILTER.REQUEST: {
      let activeFilterValue;
      if (action.payload.filterId) {
        activeFilterValue = state.data.filters.find(fil => fil.filterId === Number(action.payload.filterId)).filterValue;
        activeFilterValue = activeFilterValue.map((fil, id) => ({ ...fil, id }));
      }
      return {
        ...state,
        totalRows: 0,
        activeFilterId: action.payload.filterId || state.activeFilterId,
        searchSectionFilters: activeFilterValue || state.searchSectionFilters,
        limit: action.payload.limit || state.limit,
        offset: action.payload.offset,
        loadingPage: false,
        loadingTableData: true,
      };
    }
    case actionsObj.FILTER_UPDATE.REQUEST:
    case actionsObj.FILTER_SAVE.REQUEST:
    case actionsObj.FILTER_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true
      };
    case actionsObj.UPDATE_DEFAULT_COLUMNS.REQUEST:
      return {
        ...state,
        loadingPage: false,
        loadingTableData: true,
      };
    case actionsObj.SEARCH.REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          tableData: [],
          totalRows: 0
        },
        loadingAutoComplete: true,
      };


    // SUCCESS
    case actionsObj.GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        loadingTableData: false,
        data: action.data,
      };
    case actionsObj.GET_WITH_FILTER.SUCCESS:
      return {
        ...state,
        loadingTableData: false,
        data: action.data,
      };
    case actionsObj.FILTER_UPDATE.SUCCESS:
      return {
        ...state,
        data: action.data,
        loadingPage: false,
        loadingTableData: false,
      };
    case actionsObj.FILTER_DELETE.SUCCESS:
      return {
        ...state,
        filterDeleted: true
      };
    case actionsObj.FILTER_SAVE.SUCCESS:
    case actionsObj.UPDATE_DEFAULT_COLUMNS.SUCCESS: {
      const activeFilterId = action.data.filters.length !== 0 && action.data.filters[action.data.filters.length - 1].filterId.toString();
      return {
        ...state,
        data: action.data,
        loadingPage: false,
        loadingTableData: false,
        activeFilterId: activeFilterId || 'All'
      };
    }
    case actionsObj.SEARCH.SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          tableData: [],
          totalRows: 0
        },
        loadingAutoComplete: false,
        autocomplete: action.data.autocomplete,
        keyword: action.data.keyword,
      };
    case actionsObj.UPDATE_COMMON_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          tableData: action.data || state.data.tableData,
          totalRows: action.totalRows
        },
        searchSectionFilters: action.searchSectionFilters || searchSectionFilters,
        activeFilterId: action.activeFilterId || state.activeFilterId
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
        loadingTableData: false,
        loadingAutoComplete: false
      };
    default:
      return state;
  }
};
