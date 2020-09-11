import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tabs } from 'antd';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import TabsExtraContent from './TabsExtraContent/TabsExtraContent';
import styles from './TabsSection.scss';

class TabsSection extends Component {
  handleTabChange = (filterId) => {
    const { limit, offset } = this.props;

    switch (filterId) {
      case 'Search':
        this.props.updateCommonData({
          activeFilterId: 'Search',
          data: [],
          totalRows: 0
        });
        break;
      case 'All': {
        this.props.getAllItemsRequest({
          limit,
          offset
        });
        break;
      }
      default: {
        this.props.getWithFilterRequest({
          payload: {
            filterId,
            limit,
            offset
          }
        });
        break;
      }
    }
  }

  render() {
    const {
      activeFilterId,
      filters,
      columns,
      limit,
      offset
    } = this.props;

    const tabsExtraContent = (
      <TabsExtraContent
        activeFilterId={ activeFilterId }
        filters={ filters }
        limit={ limit }
        offset={ offset }
        columns={ columns }
        updateColumnsRequest={ this.props.updateColumnsRequest }
        getAllItemsRequest={ this.props.getAllItemsRequest }
        getWithFilterRequest={ this.props.getWithFilterRequest }
      />
    );

    return (
      <Tabs
        className={ styles.tabs }
        activeKey={ activeFilterId }
        type="card"
        onChange={ this.handleTabChange }
        tabBarExtraContent={ tabsExtraContent }
      >
        <Tabs.TabPane
          key="All"
          tab="All"
        />
        { filters.map(filter => (
          <Tabs.TabPane
            key={ filter.filterId }
            tab={
              <div>
                <span>{ filter.filterName }</span>
                { filter.userDefined &&
                  <FontAwesome
                    className={ classnames('fa-filter', { [styles.filterIcon]: true }) }
                    name="fa-filter"
                    onClick={ this.props.handleToggleSearchSection }
                  />
                }
              </div> }
          />
        ))}
        <Tabs.TabPane
          key="Search"
          tab={
            <span>
              <Icon
                type="search"
                className={ styles.searchIcon }
              />
              Search
            </span>
          }
        />
      </Tabs>
    );
  }
}

TabsSection.propTypes = {
  // data
  activeFilterId: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  filters: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  // redux-base
  getAllItemsRequest: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  updateCommonData: PropTypes.func.isRequired,
  updateColumnsRequest: PropTypes.func.isRequired,
  // handlers
  handleToggleSearchSection: PropTypes.func.isRequired,
};

export default TabsSection;
