/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Table, Spin } from 'antd';
import {
  FormSelect,
  SkuAutocompleteField,
  Controls
} from 'components';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {
  skuWarehouseBinGetRequest,
  skuBatchesGetWithFilterRequest,
  adjustmentSaveRequest,
} from 'redux-base/actions';
import { getMenuItems } from 'utils';
import columns from './newAdjustmentHelpers';
import styles from './NewAdjustment.scss';

const selector = formValueSelector('newAdjustmentPageForm');

const mapStateToProps = state => ({
  loadingPage: state.adjustment.loadingPage,
  warehouses: state.adjustment.warehouses,
  bins: state.adjustment.bins,
  batches: state.adjustment.batches,
  adjustmentReasons: state.commonData.adjustmentReasons,
  activeWarehouse: selector(state, 'warehouse'),
  activeBin: selector(state, 'bin'),
  activeSkuId: selector(state, 'skuId')
});

const mapDispatchToProps = {
  skuWarehouseBinGetRequest,
  skuBatchesGetWithFilterRequest,
  adjustmentSaveRequest
};

const reduxFormConfig = {
  form: 'newAdjustmentPageForm',
  // validate: NumericsFormValidation
};

class NewAdjustment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batchesData: [],
      batchesModified: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.batches) {
      this.setState({
        batchesData: nextProps.batches
      });
    }

    if (nextProps.activeWarehouse !== this.props.activeWarehouse) {
      this.setState({
        warehouseId: nextProps.activeWarehouse
      }, () => {
        this.getSkuBatches();
      });
    }

    if (nextProps.activeBin !== this.props.activeBin) {
      this.setState({
        binId: nextProps.activeBin
      }, () => {
        this.getSkuBatches();
      });
    }
  }

  getSkuBatches = () => {
    if (this.state.warehouseId && this.state.binId) {
      this.props.skuBatchesGetWithFilterRequest({
        id: this.props.activeSkuId,
        payload: {
          binId: this.state.binId,
          warehouseId: this.state.warehouseId
        }
      });
    }
  }

  // updates batchesData and batchesModified
  updateState = (batchData, batchesData) => {
    const batch = this.state.batchesModified.findIndex(bm => bm.lotId === batchData.lotId);
    if (batch > -1) {
      const currentBatchesModified = this.state.batchesModified;
      currentBatchesModified[batch] = batchData;
      this.setState({
        batchesModified: currentBatchesModified,
        batchesData
      });
    } else {
      this.setState({
        batchesModified: this.state.batchesModified.concat(batchData),
        batchesData
      });
    }
  }

  // TODO move this logic to CWR
  handleSelectSkuSuggestion = (data) => {
    this.setState({
      selectedSkuId: data.id
    }, () => {
      this.props.skuWarehouseBinGetRequest({
        id: data.id
      });
    });
  }

  handleAdjustmentChange = (id, value) => {
    const index = this.state.batchesData.findIndex(item => item.lotId === id);
    const { stockInHand } = this.state.batchesData.find(item => item.lotId === id);
    const batchesData = this.state.batchesData;
    batchesData[index].newAdjustQty = stockInHand + value;
    this.updateState(batchesData[index], batchesData);
  }

  handleReasonChange = (id, value) => {
    const index = this.state.batchesData.findIndex(item => item.lotId === id);
    const batchesData = this.state.batchesData;
    batchesData[index].reasonId = value;
    this.updateState(batchesData[index], batchesData);
  }

  handleSave = () => {
    const batches = this.state.batchesModified.map(item => ({
      reasonId: item.reasonId,
      lotId: item.lotId,
      qty: item.newAdjustQty - item.stockInHand,
    }));
    this.props.adjustmentSaveRequest({
      payload: {
        details: batches,
        binId: this.state.binId,
        warehouseId: this.state.warehouseId,
        sku: this.props.activeSkuId,
      }
    });
  }

  render() {
    const {
      loadingPage,
      warehouses,
      bins,
      adjustmentReasons,
      handleSubmit
    } = this.props;

    const {
      batchesData
    } = this.state;

    return (
      <div>
        <Spin spinning={ loadingPage }>
          <form
            className={ styles.form }
            onSubmit={ handleSubmit(this.handleSave) }
          >
            <Row center="xs">
              <Col xs={ 12 } lg={ 6 }>
                <Row>
                  <Col xs={ 4 }>
                    <label>SKU/Variant</label>
                  </Col>
                  <Col xs={ 8 }>
                    <SkuAutocompleteField />
                  </Col>
                </Row>
                <Row>
                  <Col xs={ 4 }>
                    <label>Warehouse</label>
                  </Col>
                  <Col xs={ 8 }>
                    <Field
                      name="warehouse"
                      type="select"
                      menuItems={ getMenuItems(warehouses) }
                      component={ FormSelect }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={ 4 }>
                    <label>Bin</label>
                  </Col>
                  <Col xs={ 8 }>
                    <Field
                      name="bin"
                      type="select"
                      menuItems={ getMenuItems(bins) }
                      component={ FormSelect }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <Table
                  className={ styles.table }
                  rowKey="lotId"
                  size="small"
                  columns={
                    columns(
                      this.handleAdjustmentChange,
                      this.handleReasonChange,
                      adjustmentReasons
                    )
                  }
                  dataSource={ batchesData }
                  pagination={ false }
                />
              </Col>
            </Row>
            <Controls
              submit
              cancel={ false }
            />
          </form>
        </Spin>
      </div>
    );
  }
}

NewAdjustment.propTypes = {
  // triggers
  loadingAutoComplete: PropTypes.bool,
  loadingPage: PropTypes.bool,
  // data
  warehouses: PropTypes.string.isRequired,
  bins: PropTypes.string.isRequired,
  batches: PropTypes.string.isRequired,
  activeWarehouse: PropTypes.number,
  activeBin: PropTypes.number,
  activeSkuId: PropTypes.string,
  // static values
  adjustmentReasons: PropTypes.array.isRequired,
  // redux base
  skuWarehouseBinGetRequest: PropTypes.func.isRequired,
  skuBatchesGetWithFilterRequest: PropTypes.func.isRequired,
  adjustmentSaveRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(NewAdjustment));
