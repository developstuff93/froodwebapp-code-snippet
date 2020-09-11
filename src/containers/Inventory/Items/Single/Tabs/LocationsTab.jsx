/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Controls } from 'components';
import { Table, Icon } from 'antd';
import styles from '../Item.scss';

const columns = [{
  title: 'SKU/Variant',
  dataIndex: 'pv'
}, {
  title: 'Bin Locations',
  dataIndex: 'bl'
}, {
  title: 'Available Qty',
  dataIndex: 'aqty'
}, {
  title: 'UOM',
  dataIndex: 'uom'
}, {
  title: 'Reorder Threshold',
  dataIndex: 'rth'
}, {
  title: 'Reorder Qty',
  dataIndex: 'rtq'
}];

class LocationsTab extends PureComponent {
  handleSave = () => {

  }

  render() {
    const { productVariants } = this.props;

    return (
      <div>
        <Row start="xs">
          <Col xs>
            <strong className={ styles.infoHeader }>Product Locations</strong>
          </Col>
        </Row>
        <Row key="info" middle="xs" className={ styles.row }>
          <Col xs>
            Check details about current stock levels of variants in all your stock holding locations
            edit re-order point for fine grained control of stock levels, and specify/remove bin locations
          </Col>
        </Row>
        <Row middle="xs" className={ styles.addNewVendorRow }>
          <Col>
            <Icon
              type="plus-circle-o"
              className={ styles.addIcon }
              // onClick={ this.handleAddRow }
            />
          </Col>
          <Col xs md lg>
            <span>
              Add New Stock Locations
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Table
              className={ styles.table }
              columns={ columns }
              dataSource={ productVariants }
              size="middle"
              pagination={ false }
            />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Controls
              submit
            />
          </Col>
        </Row>
      </div>
    );
  }
}

LocationsTab.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  productVariants: PropTypes.array,
};

export default LocationsTab;
