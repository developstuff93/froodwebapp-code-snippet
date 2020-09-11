/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import { Table, Spin, Input } from 'antd';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  TopFormModal,
  ActionButton
} from 'components';
import {
  priceListGetRequest,
  priceListSkuSaveRequest,
  priceListSkuUpdateRequest,
  skuDataGetRequest
} from 'redux-base/actions';
import { table } from 'styles/common.scss';
import columns from './priceListHelpers';
import fields from './modalFields';
import PriceListForm from './PriceListForm';

const Search = Input.Search;

const topFormSelector = formValueSelector('topFormModal');
const selector = formValueSelector('priceListForm');

const mapStateToProps = state => ({
  loadingPage: state.priceList.loadingPage,
  priceList: state.priceList.priceList,
  priceListSKUs: state.priceList.priceListSKUs,
  skuData: state.priceList.skuData,
  currencies: state.commonData.currencies,
  skusAutocomplete: state.autocomplete.skus,
  skuId: topFormSelector(state, 'skuId'),
  skuPrice: topFormSelector(state, 'price'),
  currencyId: selector(state, 'currency.id')
});

const mapDispatchToProps = {
  priceListGetRequest,
  priceListSkuSaveRequest,
  priceListSkuUpdateRequest,
  skuDataGetRequest
};

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null,
      searchValue: '',
      isNewSku: true,
      isPriceUpdating: false
    };
  }

  componentWillMount = () => {
    if (!this.props.isNewPriceList) {
      this.props.priceListGetRequest({
        id: this.props.priceListId
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // when we add or update sku
    if (nextProps.priceListSKUs.length !== this.props.priceListSKUs.length) {
      this.setState({
        modalVisible: false,
        modalData: {
          skuId: '',
          uomName: '',
          currencyName: '',
          price: ''
        }
      });
    }

    // if modal is open and we edit existing sku
    if (this.state.modalVisible && !this.state.isNewSku && !this.state.isPriceUpdating) {

      const { priceListSKUs } = nextProps;

      const { skuPrice } = this.props;

      const updatedSku = priceListSKUs.find(pls => pls.sku === nextProps.skuId);

      // when we update price we need to hide modal
      if (updatedSku
      && updatedSku.price !== skuPrice) { // when price for current sku in modal is not equal to its next price
        this.setState({
          modalVisible: false,
          isPriceUpdating: false,
          modalData: {
            skuId: '',
            uomName: '',
            currencyName: '',
            price: ''
          }
        });
      }
    }

    // if modal is open and we edit new sku
    if (this.state.modalVisible && this.state.isNewSku) {

      const { skusAutocomplete } = nextProps;

      const selectedSku = skusAutocomplete.find(sku => sku.id === nextProps.skuId); // if selected sku exists on autocomplete data

      if (selectedSku && nextProps.skuId !== this.props.skuId) {
        // when we change sku in modal - load its corresponding data
        this.props.skuDataGetRequest({
          id: nextProps.skuId
        });
      } else if (nextProps.skuData.id && nextProps.skuData.id !== this.props.skuData.id) {
        // when sku data is loaded - update modal data
        this.setState({
          modalData: {
            skuId: nextProps.skuData.id,
            uomName: nextProps.skuData.uomName,
            currencyName: nextProps.currencies.find(cur => cur.id === this.props.currencyId).name,
            price: ''
          }
        });
      }
    }
  }

  handleToggleModal = () => {
    this.setState({
      isNewSku: true,
      isPriceUpdating: true,
      modalVisible: !this.state.modalVisible,
      modalData: {
        skuId: '',
        uomName: '',
        currencyName: '',
        price: ''
      }
    });
  }

  handleSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleEdit = (e) => {
    const rowId = e.target.id;
    const {
      sku,
      uomName,
      currencyName,
      price
    } = this.props.priceListSKUs.find(item => item.id === Number(rowId));

    this.setState({
      isNewSku: false,
      isPriceUpdating: true,
      modalVisible: true,
      modalData: {
        skuId: sku,
        uomName,
        currencyName,
        price
      }
    });
  }

  handleSaveSKU = (modalData) => {
    const sku = this.props.priceListSKUs.find(pls => pls.sku === modalData.skuId);
    if (sku) {
      this.setState({
        isPriceUpdating: false,
      }, () =>
        this.props.priceListSkuUpdateRequest({
          id: this.props.priceListId,
          payload: {
            id: sku.id,
            price: modalData.price,
          }
        }));
    } else {
      this.props.priceListSkuSaveRequest({
        id: this.props.priceListId,
        payload: {
          sku: modalData.skuId,
          price: modalData.price,
        }
      });
    }
  }

  render() {
    const {
      modalVisible,
      modalData,
      searchValue,
      isNewSku
    } = this.state;

    const {
      // trigger
      loadingPage,
      priceList: { isDefault },
      isNewPriceList,
    } = this.props;

    const data = this.props.priceListSKUs.filter(item =>
      item && item.sku.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title="Add SKU in Price List"
          buttonVisible={ false }
          handleSave={ this.handleSaveSKU }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(isNewSku) }
        />
        <Spin spinning={ loadingPage }>
          <Row>
            <Col lg>
              <PriceListForm
                isNewPriceList={ isNewPriceList }
              />
            </Col>
          </Row>
          { (!isDefault && !isNewPriceList) &&
          <Row end="lg" style={ { marginTop: '1rem', marginBottom: '1rem' } }>
            <Col lg={ 4 }>
              <Search
                placeholder="Type to search SKU/Variant"
                onChange={ this.handleSearchChange }
              />
            </Col>
            <Col lg>
              <ActionButton
                onClick={ this.handleToggleModal }
              >
                Add SKU
              </ActionButton>
            </Col>
          </Row>
          }
          { !isNewPriceList &&
            <Row>
              <Col xs>
                <Table
                  className={ table }
                  columns={ columns(this.handleEdit) }
                  rowKey="id"
                  dataSource={ data }
                  size="small"
                  pagination={ false }
                />
              </Col>
            </Row>
          }
        </Spin>
      </div>
    );
  }
}

PriceList.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  priceList: PropTypes.object.isRequired,
  priceListSKUs: PropTypes.array.isRequired,
  skusAutocomplete: PropTypes.array.isRequired,
  skuData: PropTypes.object,
  skuId: PropTypes.string,
  skuPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  currencyId: PropTypes.number,
  // static data
  currencies: PropTypes.array.isRequired,
  // props
  priceListId: PropTypes.string.isRequired,
  isNewPriceList: PropTypes.bool.isRequired,
  // redux base
  priceListGetRequest: PropTypes.func.isRequired,
  priceListSkuSaveRequest: PropTypes.func.isRequired,
  priceListSkuUpdateRequest: PropTypes.func.isRequired,
  skuDataGetRequest: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PriceList));
