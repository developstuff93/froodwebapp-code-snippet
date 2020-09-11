import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Icon } from 'antd';
import ColumnsModal from '../../../ColumnsModal/ColumnsModal';
import styles from './TabsExtraContent.scss';

class TabsExtraContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsModalVisible: false
    };
  }

  handleToggleColumnsModal = () => {
    this.setState({
      columnsModalVisible: !this.state.columnsModalVisible
    });
  }

  handleUpdateDefaultColumns = (newDefaultColumns) => {
    this.setState({ columnsModalVisible: !this.state.columnsModalVisible },
      () => this.props.updateColumnsRequest({
        payload: newDefaultColumns
      }));
  }

  handleRefresh = () => {
    const { activeFilterId, filters, limit, offset } = this.props;

    switch (activeFilterId) {
      case 'Search':
        this.props.getWithFilterRequest({
          payload: {
            filterValue: filters.find(fil => fil.filterId === Number(activeFilterId)).filterValue
              .map((fil, id) => ({ ...fil, id })),
            limit,
            offset
          }
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
            filterId: activeFilterId,
            limit,
            offset
          }
        });
        break;
      }
    }
  }

  render() {

    const { columnsModalVisible } = this.state;
    const { columns } = this.props;

    return (
      <div className={ styles.tabsExtraContent }>
        <Row>
          <Col lg>
            <span className={ styles.refreshIcon }>
              <Icon
                type="sync"
                onClick={ this.handleRefresh }
              />
            </span>
          </Col>
          <Col lg>
            <span className={ styles.tableCogIcon }>
              <Icon
                type="setting"
                onClick={ this.handleToggleColumnsModal }
              />
            </span>
          </Col>
        </Row>
        <ColumnsModal
          handleToggleColumnsModal={ this.handleToggleColumnsModal }
          handleUpdateDefaultColumns={ this.handleUpdateDefaultColumns }
          visible={ columnsModalVisible }
          columns={ columns }
        />
      </div>
    );
  }
}

TabsExtraContent.propTypes = {
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  activeFilterId: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  updateColumnsRequest: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  getAllItemsRequest: PropTypes.func.isRequired,
};

export default TabsExtraContent;
