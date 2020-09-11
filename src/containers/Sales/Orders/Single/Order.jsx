import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, Modal } from 'antd';
import TopButtons from 'containers/Common/MainContainer/MainContainerSections/TopButtons/TopButtons';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, formValueSelector } from 'redux-form';
import {
  orderSaveRequest,
  orderUpdateRequest,
  orderInfoGetRequest,
} from 'redux-base/actions';
import { Tabs, OrderTab, OrderInfo } from './Sections';
import { getOrderNo, prepareOrder, canBeEditedUntilAllocated } from './orderHelpers';
import confirmationHelper from './confirmationHelper';

// redux configs
const selector = formValueSelector('newSalesOrderForm');

const mapStateToProps = state => ({
  loadingPage: state.order.loadingPage,
  initialValues: state.order.initialValues,
  status: selector(state, 'status'),
});

const mapDispatchToProps = {
  orderSaveRequest,
  orderUpdateRequest,
  orderInfoGetRequest,
  push
};

const reduxFormConfig = {
  form: 'newSalesOrderForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
};

// component
class Order extends Component {
  constructor(props) {
    super(props);
    const orderNo = getOrderNo(this.props.location.pathname);
    const isNewOrder = orderNo === 'new';

    this.state = {
      orderNo,
      isNewOrder,
      canceled: false,
      verifyOrderModalVisible: false
    };
  }

  componentWillMount() {
    if (!this.state.isNewOrder) {
      this.props.orderInfoGetRequest({
        orderNo: this.state.orderNo
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const orderNo = getOrderNo(nextProps.location.pathname);
    const isNewOrder = orderNo === 'new';

    this.setState({
      orderNo,
      isNewOrder,
      canceled: nextProps.status === 'Cancel',
    });
  }

  handleSubmitClick = (formValues) => {
    const modalData = confirmationHelper(formValues, this.props.initialValues);

    this.setState({
      modalData,
      formValues,
      verifyOrderModalVisible: true
    });
  }

  handleSaveOrder = () => {
    const { formValues, isNewOrder, modalData } = this.state;

    // TODO Change to pristine
    if (modalData.length === 0) { // no changes
      this.setState({
        verifyOrderModalVisible: false
      });
      return;
    }

    if (isNewOrder) {
      this.props.orderSaveRequest({
        payload: prepareOrder(formValues)
      });
    } else {
      this.props.orderUpdateRequest({
        payload: prepareOrder(formValues)
      });
    }
  }

  handleCancel = () => {
    this.props.push('/sales/orders');
  }

  handleCancelModal = () => {
    this.setState({
      verifyOrderModalVisible: false
    });
  }

  render() {
    const {
      modalData,
      isNewOrder,
      orderNo,
      canceled,
      verifyOrderModalVisible,
    } = this.state;

    const {
      // data
      status,
      // trigger
      loadingPage,
      // form
      change,
      handleSubmit
    } = this.props;

    const canBeEditedUntilAllocation = canBeEditedUntilAllocated(status);

    return (
      <div>
        <Modal
          title="Verify Order Changes"
          visible={ verifyOrderModalVisible }
          onOk={ this.handleSaveOrder }
          onCancel={ this.handleCancelModal }
        >
          { modalData && modalData.length === 0 ? 'No Changes Have Been Made' : modalData }
        </Modal>
        <TopButtons
          printButton
          printButtonText="Print Order"
          onPrintButtonClick={ () => {} }
        />
        <Spin
          spinning={ loadingPage }
        >
          <form onSubmit={ handleSubmit(this.handleSubmitClick) }>
            <OrderInfo
              isNewOrder={ isNewOrder }
              change={ change }
              readonly={ canceled }
            />
            { isNewOrder &&
              <OrderTab
                isNewOrder={ isNewOrder }
                readonly={ canceled }
              />
            }
            { !isNewOrder &&
              <Tabs
                // common data
                isNewOrder={ isNewOrder }
                readonly={ canceled || !canBeEditedUntilAllocation }
                orderNo={ orderNo }
              />
            }
          </form>
        </Spin>
      </div>
    );
  }
}

Order.propTypes = {
  loadingPage: PropTypes.bool.isRequired,
  // redux-base
  orderInfoGetRequest: PropTypes.func.isRequired,
  orderSaveRequest: PropTypes.func.isRequired,
  orderUpdateRequest: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  // form
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  // data
  status: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Order)));
