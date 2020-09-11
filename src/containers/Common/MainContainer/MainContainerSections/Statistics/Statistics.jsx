import React from 'react';
import PropTypes from 'prop-types';
import styles from './Statistics.scss';

const checkColor = value => (
  value > 0 ? 'green' : 'red'
);

const simpleSection = (column, key) => (
  <div key={ key } className={ styles.statisticsItem }>
    <div>{ column.dollarSign ? `$${column.value || 0}` : column.value }</div>
    <div>{ column.description }</div>
  </div>
);

const dynamicSection = (column, key) => (
  <div key={ key } className={ styles.statisticsItem }>
    <div style={ { color: checkColor(column.value) } }>
      {
        column.value > 0 ? `+${column.value}` : `-${column.value}`
      }
    </div>
    <div>{ column.description }</div>
  </div>
);

const Statistics = ({ collapsed, columns }) => (
  <div className={ styles.statistics }>
    { !collapsed &&
      columns.map((column, index) => (
        column.dynamic
          ? dynamicSection(column, index)
          : simpleSection(column, index)
      ))
    }
  </div>
);

Statistics.propTypes = {
  collapsed: PropTypes.bool,
  columns: PropTypes.array,
};

export default Statistics;

