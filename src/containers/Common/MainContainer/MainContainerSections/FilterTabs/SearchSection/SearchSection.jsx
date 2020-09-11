import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Button as ControlButton } from 'components';
import { prepareFilterValue } from 'utils';
import FilterRow from './FilterRow/FilterRow';
import styles from './SearchSection.scss';

class SearchSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: props.filterName,
      defaultColumnId: props.columns[0].id
    };
  }

  handleSearchButtonClick = () => {
    const { filters } = this.props;
    const { defaultColumnId } = this.state;

    const data = prepareFilterValue(filters, defaultColumnId);

    this.props.getWithFilterRequest({
      payload: {
        filterValue: data,
        limit: this.props.limit,
        offset: 0
      }
    });
  }

  handleFilterNameChange = (e) => {
    this.setState({ filterName: e.target.value });
  }

  // Add/Delete Filter
  handleSaveFilter = () => {
    const {
      filterUserDefined,
      filters,
      activeFilterId
    } = this.props;

    const { filterName, defaultColumnId } = this.state;

    if (!filterUserDefined) {
      this.props.saveFilterRequest({
        payload: {
          filterName,
          filterValue: prepareFilterValue(filters, defaultColumnId)
        }
      });
    } else {
      this.props.updateFilterRequest({
        payload: {
          filterId: activeFilterId,
          filterName,
          filterValue: prepareFilterValue(filters)
        }
      });
    }
  }

  handleDeleteFilter = () => {
    const { activeFilterId } = this.props;
    this.props.deleteFilterRequest({
      id: activeFilterId
    });
  }

  // Add/Delete Filter Row
  handleAddFilterRow = () => {
    const filters = [...this.props.filters];
    const lastFilterIndex = filters.length;
    const { defaultColumnId } = this.state;

    filters.push({
      id: lastFilterIndex,
      relationalOpId: 1, // Is Equal
      columnId: defaultColumnId,
      logicalOpId: 7, // AND
      value: ''
    });

    if (filters.length > 10) filters.length = 10; // Max 10 Filter Rows

    this.props.updateCommonData({
      searchSectionFilters: filters
    });
  }

  handleDeleteFilterRow = (e) => {
    const filterId = Number(e.target.id);
    const filters = [...this.props.filters];
    filters.splice(filterId, 1);
    this.props.updateCommonData({
      searchSectionFilters: filters
    });
  }

  // Filter Manipulation Logic
  handleFilterChange = ({ item: { props: { activeKey } } }) => {
    const filterId = activeKey.filterId;
    const filters = [...this.props.filters];
    const filter = { ...filters[filterId] };

    switch (activeKey.name) {
      case 'logicalOperators':
        filter.logicalOpId = activeKey.logicalOpId;
        break;
      case 'relationalOperators':
        filter.relationalOpId = activeKey.relationalOpId;
        break;
      case 'columns':
        filter.columnId = activeKey.columnId;
        filter.relationalOpId = 1; // Is Equal To
        filter.value = ''; // reset value if column changed
        break;
      case 'availableValues':
        filter.value = activeKey.value;
        break;
      default: break;
    }

    filters[filterId] = filter;

    this.props.updateCommonData({
      searchSectionFilters: filters
    });
  }

  handleFilterInputChange = (e) => {
    const filters = [...this.props.filters];
    const filter = { ...filters[e.target.id] };
    filter.value = e.target.value;
    filters[e.target.id] = filter;

    this.props.updateCommonData({
      searchSectionFilters: filters
    });
  }

  handleDatePickerChange = (date, filterId) => {
    const filters = [...this.props.filters];
    const filter = { ...filters[filterId] };
    filter.value = date;
    filters[filterId] = filter;

    this.props.updateCommonData({
      searchSectionFilters: filters
    });
  }

  render() {
    const {
      activeFilterId,
      filters,
      columns
    } = this.props;

    const { filterName } = this.state;

    return (
      <div className={ styles.searchSection }>
        { activeFilterId === 'Search' &&
          <Row>
            <Col lg>
              <ControlButton
                className={ styles.searchButton }
                onClick={ this.handleSearchButtonClick }
              >
                Search
              </ControlButton>
            </Col>
          </Row>
        }
        { filters.map((filter, index) => (
          <FilterRow
            key={ `${index}afr` }
            firstRow={ index === 0 }
            columns={ columns }
            // Active Tab
            activeFilterId={ activeFilterId }
            // Filter Row data
            filterId={ index }
            filterValue={ filters[index].value }
            columnId={ filters[index].columnId || columns[0].id }
            relationalOpId={ filters[index].relationalOpId }
            logicalOpId={ filters[index].logicalOpId }
            // Filter Dropdown/Input/Datepicker handlers
            handleFilterChange={ this.handleFilterChange }
            handleFilterInputChange={ this.handleFilterInputChange }
            handleDatePickerChange={ this.handleDatePickerChange }
            // Filter Name Change handler
            filterName={ filterName }
            handleFilterNameChange={ this.handleFilterNameChange }
            // Add/Delete Filter Row
            handleAddFilterRow={ this.handleAddFilterRow }
            handleDeleteFilterRow={ this.handleDeleteFilterRow }
            // Save/Delete Filter
            handleSaveFilter={ this.handleSaveFilter }
            handleDeleteFilter={ this.handleDeleteFilter }
          />
        ))}
      </div>
    );
  }
}

SearchSection.propTypes = {
  // redux-base
  deleteFilterRequest: PropTypes.func.isRequired,
  saveFilterRequest: PropTypes.func.isRequired,
  updateFilterRequest: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  updateCommonData: PropTypes.func.isRequired,
  // filter
  filterName: PropTypes.string,
  filterUserDefined: PropTypes.bool,
  // data
  columns: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  activeFilterId: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
};

export default SearchSection;
