import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Table } from 'antd';
import styles from '../Tabs.scss';

const Column = Table.Column;

const ActivityTab = ({ data }) => (
  <div>
    <Row middle="xs" className={ styles.row }>
      <Col lg className={ styles.header }>
        Activity
      </Col>
    </Row>
    <Row>
      <Col xs>
        <Table
          className={ styles.table }
          dataSource={ data }
          size="middle"
          pagination={ false }
        >
          <Column
            title="Date"
            dataIndex="date"
          />
          <Column
            title="Activity"
            dataIndex="activity"
          />
        </Table>
      </Col>
    </Row>
  </div>
);

ActivityTab.propTypes = {
  data: PropTypes.array
};

export default ActivityTab;
