import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import getColumnRender from './getColumnRender';

const Column = Table.Column;

class GridTable extends Component {
  handleEditCell = (value, rowIndex, propName) => {
    if (this.props.expandable) { // if expanded rows

      let children = [...this.props.dataSource[0].children]; // copy children
      const data = this.props.dataSource[0]; // get data

      if (rowIndex) { // if expanded row

        const obj = { ...children[rowIndex - 1] }; // lineNo starts with 1
        obj[propName] = value; // change value in obj at lineNo
        children[rowIndex - 1] = obj; // replace obj in array with new obj
        this.props.updateTableData([{ ...data, children }]); // update state

      } else { // if header row

        const newData = { ...data }; // get copy of data
        newData[propName] = value; // change value of top data
        children = children.map(item => ({ // replace values of expanded rows for that prop
          ...item,
          [propName]: value
        }));
        this.props.updateTableData([{ ...newData, children }], rowIndex); // update state

      }
    } else { // if no expanded rows
      const data = [...this.props.dataSource]; // copy data
      const obj = { ...data[rowIndex] }; // copy obj
      obj[propName] = value; // replace value
      data[rowIndex] = obj; // replace obj
      this.props.updateTableData(data, rowIndex); // update state
    }
  }

  handleModalButtonClick = (rowIndex) => {
    this.props.handleModalButtonClick(rowIndex);
  }

  render() {
    const {
      columns,
      rowKey,
      dataSource,
      expandable = false,
      readonly = false,
      className,
      loadingData = false
    } = this.props;

    return (
      <Spin spinning={ loadingData }>
        <Row>
          <Col xs md lg>
            <Table
              className={ className }
              rowKey={ rowKey }
              dataSource={ dataSource }
              size="small"
              pagination={ false }
              onExpand={ this.handleExpand }
              onExpandedRowsChange={ this.handleTest }
            >
              { columns.map(column =>
                <Column
                  key={ column.dataIndex }
                  title={ column.title }
                  width={ column.width }
                  dataIndex={ column.dataIndex }
                  render={ column.render ||
                          getColumnRender(
                            expandable,
                            readonly,
                            column.type,
                            column,
                            this.handleEditCell,
                            this.handleModalButtonClick
                          ) }
                />
              ) }
            </Table>
          </Col>
        </Row>
      </Spin>
    );
  }
}

GridTable.propTypes = {
  loadingData: PropTypes.bool,
  className: PropTypes.string,
  readonly: PropTypes.bool,
  expandable: PropTypes.bool,
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rowKey: PropTypes.string.isRequired,
  updateTableData: PropTypes.func.isRequired,
  handleModalButtonClick: PropTypes.func
};

export default GridTable;
