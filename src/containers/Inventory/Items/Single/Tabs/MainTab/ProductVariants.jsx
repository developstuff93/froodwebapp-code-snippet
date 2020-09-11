/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Table } from 'antd';
import { uniq, last } from 'lodash';
import { NewTableRow } from 'components';
import {
  generateProductVariants,
  productVariantsColumns,
  productOptionsColumns
} from './mainTabHelpers';

class ProductVariants extends Component {
  handleAddProductOptionRow = () => {
    const productOptions = [...this.props.productOptions];
    const lastItem = last(productOptions);
    productOptions.push({
      id: (lastItem && lastItem.id + 1) || 1,
      key: '',
      values: []
    });

    this.props.handleUpdateProductData(productOptions, this.props.productVariants);
  }

  handleSaveOption = (key, rowIndex) => {
    const productOptions = [...this.props.productOptions];
    productOptions[rowIndex].key = key;

    const productVariants = generateProductVariants(productOptions);

    this.props.handleUpdateProductData(productOptions, productVariants);
  }

  handleDeleteOption = (e) => {
    const productOptions = [...this.props.productOptions];
    productOptions.splice(e.target.id, 1);

    const productVariants = generateProductVariants(productOptions);

    this.props.handleUpdateProductData(productOptions, productVariants);
  }

  handleAddProductValue = (value, rowIndex) => {
    const productOptions = [...this.props.productOptions];
    const { values } = { ...productOptions[rowIndex] };
    values.push(value);
    productOptions[rowIndex].values = uniq(values);

    const productVariants = generateProductVariants(productOptions);

    this.props.handleUpdateProductData(productOptions, productVariants);
  }

  handleDeleteProductValue = (rowIndex, tagIndex) => {
    const productOptions = [...this.props.productOptions];
    productOptions[rowIndex].values.splice(tagIndex, 1);
    const productVariants = generateProductVariants(productOptions);

    this.props.handleUpdateProductData(productOptions, productVariants);
  }

  handleSaveVariantSku = (value, rowIndex) => {
    const productVariants = [...this.props.productVariants];
    if (productVariants.find(pv => pv.sku === value)) {
      productVariants[rowIndex].sku = null;
    } else {
      productVariants[rowIndex].sku = value;
    }

    this.props.handleUpdateProductData(this.props.productOptions, productVariants);
  }

  render() {

    const {
      productOptions,
      productVariants
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs md lg>
            A product can have one or multiple variants, eg. multiple sizes or colors. Each variant has its own
            set of prices, stock levels, tax options, etc.
            Create variants by defining attributes
          </Col>
        </Row>
        <Row>
          <Col xs >
            <Table
              columns={
                productOptionsColumns(
                  this.handleSaveOption,
                  this.handleDeleteOption,
                  this.handleAddProductValue,
                  this.handleDeleteProductValue) }
              dataSource={ productOptions }
              size="middle"
              pagination={ false }
              rowKey="id"
            />
            { productOptions.length < 3 &&
              <NewTableRow
                hasData
                onClick={ this.handleAddProductOptionRow }
                addNewRowText="Add New Variant"
                addOtherRowText="Add One More Variant"
              />
            }
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Table
              columns={ productVariantsColumns(this.handleSaveVariantSku) }
              dataSource={ productVariants }
              size="middle"
              pagination={ false }
              rowKey="id"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

ProductVariants.propTypes = {
  // props
  productOptions: PropTypes.array.isRequired,
  productVariants: PropTypes.array.isRequired,
  handleUpdateProductData: PropTypes.func.isRequired,
};

export default ProductVariants;
