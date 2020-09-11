/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Button, Input } from 'antd';
import { Button as ControlButton } from 'components';
import { Row, Col } from 'react-flexbox-grid';
import { logicOperators, relOperators } from 'utils';
import getComponentByType from './getComponentByType';
import styles from './FilterRow.scss';

const getAvailableValuesForColumn = (columns, columnId) => (
  columns.find(col => col.id === columnId).availableValues
);

const getColumnTypeById = (columns, columnId) => (
  columns.find(col => col.id === columnId).tableDataType
);

const getRelOperatorsByType = (operators, type) => {
  switch (true) {
    case type.includes('varchar'):
      return relOperators.filter(op => op.operator === '=' || op.operator === '!=');
    default:
      return relOperators;
  }
};

const FilterRow = ({
  columns,
  firstRow = false,
  columnId,
  relationalOpId,
  logicalOpId,
  filterId,
  filterValue,
  filterName,
  activeFilterId,
  handleSaveFilter,
  handleDeleteFilter,
  handleFilterNameChange,
  handleFilterChange,
  handleFilterInputChange,
  handleDatePickerChange,
  handleAddFilterRow,
  handleDeleteFilterRow
}) => (
  <Row middle="xs" className={ styles.filterRow }>
    <Col lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
      { !firstRow &&
        <Dropdown
          id="logicalOperators"
          overlay={
            <Menu onSelect={ handleFilterChange }>
              { logicOperators.map((operator, index) => (
                <Menu.Item
                  key={ index }
                  activeKey={ {
                    name: 'logicalOperators',
                    logicalOpId: operator.id,
                    filterId
                  } }
                >
                  { operator.description }
                </Menu.Item>
              ))
              }
            </Menu>
          }
        >
          <Button size="default" className={ styles.logicalDropdown }>
            { logicOperators.find(logc => logc.id === logicalOpId).description }
            <Icon type="down" />
          </Button>
        </Dropdown>
      }
    </Col>
    <Col lg={ 2 } md={ 3 } sm={ 3 } xs={ 12 }>
      <Dropdown
        id="columns"
        overlay={
          <Menu onSelect={ handleFilterChange }>
            { columns.map((column, index) => (
              <Menu.Item
                key={ index }
                activeKey={ {
                  name: 'columns',
                  columnId: column.id,
                  filterId
                } }
              >
                { column.displayName }
              </Menu.Item>
            ))
            }
          </Menu>
        }
      >
        <Button size="default" className={ styles.columnDropdown }>
          { columns.find(col => col.id === columnId).displayName }
          <Icon type="down" />
        </Button>
      </Dropdown>
    </Col>
    <Col lg={ 2 } md={ 3 } sm={ 3 } xs={ 12 }>
      <Dropdown
        id="relationalOperators"
        overlay={
          <Menu onSelect={ handleFilterChange }>
            { getRelOperatorsByType(relOperators, getColumnTypeById(columns, columnId)).map((operator, index) => (
              <Menu.Item
                key={ index }
                activeKey={ {
                  name: 'relationalOperators',
                  relationalOpId: operator.id,
                  filterId
                } }
              >
                { operator.description }
              </Menu.Item>
            ))
            }
          </Menu>
        }
      >
        <Button size="default" className={ styles.relationsDropdown }>
          { relOperators.find(rel => rel.id === relationalOpId).description }
          <Icon type="down" />
        </Button>
      </Dropdown>
    </Col>
    <Col lg={ 2 } md={ 3 } sm={ 3 } xs={ 12 } className={ styles.valueCol }>
      { getAvailableValuesForColumn(columns, columnId) &&
        <Dropdown
          id="availableValues"
          overlay={
            <Menu onSelect={ handleFilterChange }>
              { getAvailableValuesForColumn(columns, columnId).map(({ key, value }, index) => (
                <Menu.Item
                  key={ index }
                  activeKey={ {
                    name: 'availableValues',
                    value: key,
                    filterId
                  } }
                >
                  { value }
                </Menu.Item>
              ))
              }
            </Menu>
          }
        >
          <Button size="default" className={ styles.availableValuesDropdown }>
            { (filterValue && getAvailableValuesForColumn(columns, columnId).find(val => val.key === Number(filterValue)).value)
            || getAvailableValuesForColumn(columns, columnId)[0].value }
            <Icon type="down" />
          </Button>
        </Dropdown>
      }
      { !getAvailableValuesForColumn(columns, columnId) &&
        getComponentByType(
          getColumnTypeById(columns, columnId), // columnDataType
          filterId, // id
          filterValue, // value
          handleFilterInputChange, // Input Change handler
          handleDatePickerChange // DatePicker Change handler
        )
      }
      <Icon
        type="plus-circle-o"
        className={ styles.addIcon }
        onClick={ handleAddFilterRow }
      />
      { !firstRow &&
        <Icon
          id={ filterId }
          type="delete"
          className={ styles.deleteIcon }
          onClick={ handleDeleteFilterRow }
        />
      }
    </Col>
    { firstRow &&
      <Col lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 } />
    }
    { firstRow &&
      <Col lg={ 2 } md={ 3 } sm={ 6 } xs={ 12 }>
        <Input
          id="filterName"
          type="text"
          placeholder="Filter name.."
          size="default"
          className={ styles.filterName }
          value={ filterName }
          onChange={ handleFilterNameChange }
        />
      </Col>
    }
    { firstRow &&
      <Col lg={ filterName && activeFilterId !== 'Search' ? 1 : 2 } md={ 3 } sm={ 6 } xs={ 12 }>
        <ControlButton
          size="default"
          className={ styles.saveFilterButton }
          onClick={ handleSaveFilter }
        >
          Save
        </ControlButton>
      </Col>
    }
    { firstRow && filterName && activeFilterId !== 'Search' &&
      <Col lg={ 1 } md={ 3 } sm={ 6 } xs={ 12 }>
        <ControlButton
          size="default"
          className={ styles.deleteFilterButton }
          onClick={ handleDeleteFilter }
        >
          Delete
        </ControlButton>
      </Col>
    }
  </Row>
);

FilterRow.propTypes = {
  columns: PropTypes.array.isRequired,
  firstRow: PropTypes.bool,
  columnId: PropTypes.number,
  relationalOpId: PropTypes.number,
  logicalOpId: PropTypes.number,
  filterValue: PropTypes.any,
  filterId: PropTypes.number,
  filterName: PropTypes.string,
  activeFilterId: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleFilterInputChange: PropTypes.func.isRequired,
  handleFilterNameChange: PropTypes.func.isRequired,
  handleDatePickerChange: PropTypes.func.isRequired,
  handleAddFilterRow: PropTypes.func.isRequired,
  handleDeleteFilterRow: PropTypes.func.isRequired,
  handleSaveFilter: PropTypes.func.isRequired,
  handleDeleteFilter: PropTypes.func.isRequired
};

export default FilterRow;

