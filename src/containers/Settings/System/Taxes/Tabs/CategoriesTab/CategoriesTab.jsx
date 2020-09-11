import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  taxCategoriesGetRequest,
  taxCategoriesSaveRequest,
  taxCategoriesUpdateRequest,
  taxCategoriesDeleteRequest
} from 'redux-base/actions';
import { Table, Spin } from 'antd';
import { TopFormModal } from 'components';
import { table } from 'styles/common.scss';
import fields from '../../modalFields';
import columns from './categoriesTabHelpers';


const mapStateToProps = state => ({
  needReloadTaxCategories: state.taxes.needReloadTaxCategories,
  loadingPage: state.taxes.loadingPage,
  taxCategories: state.taxes.taxCategories,
  taxCodes: state.taxes.taxCodes,
});

const mapDispatchToProps = {
  taxCategoriesGetRequest,
  taxCategoriesSaveRequest,
  taxCategoriesUpdateRequest,
  taxCategoriesDeleteRequest
};

class TaxCodesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete or update category
    if (nextProps.needReloadTaxCategories) {
      this.setState({
        modalVisible: false,
      }, () => this.props.taxCategoriesGetRequest());
      return;
    }

    // when we create category
    if (this.props.taxCategories.length !== nextProps.taxCategories.length) {
      this.setState({
        modalVisible: false,
        modalData: {}
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: null
    });
  }

  handleSave = (taxCategory) => {
    if (this.state.modalData) {
      this.props.taxCategoriesUpdateRequest({
        payload: {
          id: this.state.modalData.id,
          buyRate: Number(taxCategory.buyRate),
          sellRate: Number(taxCategory.sellRate),
        }
      });
    } else {
      this.props.taxCategoriesSaveRequest({ payload: taxCategory });
    }
  }

  handleActivate = (e) => {
    const codeId = e.target.id;
    const { rate } = this.props.taxCategories.find(cde => cde.id === Number(codeId));
    this.props.taxCategoriesUpdateRequest({
      payload: {
        id: codeId,
        rate
      }
    });
  }

  handleDeactivate = (e) => {
    this.props.taxCategoriesDeleteRequest({
      id: e.target.id
    });
  }

  handleEdit = (e) => {
    const codeId = e.target.id;
    const { id, name, buyRate, sellRate } = this.props.taxCategories.find(cde => cde.id === Number(codeId));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        name,
        buyRate: buyRate.id,
        sellRate: sellRate.id
      }
    });
  }

  render() {
    const { modalData, modalVisible } = this.state;
    const { taxCategories, taxCodes, loadingPage } = this.props;
    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title="New Tax Category"
          buttonText="New Category"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(taxCodes).newCategory }
        />
        <Spin spinning={ loadingPage }>
          <Table
            className={ table }
            rowKey="id"
            size="small"
            columns={ columns(this.handleEdit, this.handleDeactivate, this.handleActivate) }
            dataSource={ taxCategories }
          />
        </Spin>
      </div>
    );
  }
}

TaxCodesTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadTaxCategories: PropTypes.bool.isRequired,
  // data
  taxCategories: PropTypes.array.isRequired,
  taxCodes: PropTypes.array.isRequired,
  // redux-base
  taxCategoriesGetRequest: PropTypes.func.isRequired,
  taxCategoriesSaveRequest: PropTypes.func.isRequired,
  taxCategoriesUpdateRequest: PropTypes.func.isRequired,
  taxCategoriesDeleteRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxCodesTab);
