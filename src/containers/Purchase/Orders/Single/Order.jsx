import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, Modal } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, formValueSelector } from 'redux-form';
import TopButtons from 'containers/Common/MainContainer/MainContainerSections/TopButtons/TopButtons';
import {
  purchaseOrderGetRequest,
  purchaseOrderSaveRequest,
  purchaseOrderUpdateRequest,
  purchaseOrderFieldsGetRequest
} from 'redux-base/actions';
import { Tabs, OrderTab, OrderInfo } from './Sections';
import { prepareOrder, canBeEditedUntilAllocated } from './orderHelpers';
import confirmationHelper from './confirmationHelper';

// redux configs
const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  loadingPage: state.purchaseOrder.loadingPage,
  initialValues: state.purchaseOrder.initialValues,
  status: selector(state, 'status'),
  contactUserId: selector(state, 'contactUserId'),
  currentUser: state.login.user,
});

const mapDispatchToProps = {
  purchaseOrderGetRequest,
  purchaseOrderSaveRequest,
  purchaseOrderUpdateRequest,
  purchaseOrderFieldsGetRequest,
  push
};

const reduxFormConfig = {
  form: 'newPurchaseOrderForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
};

// component
class Order extends Component {
  constructor(props) {
    super(props);
    const orderId = this.props.match.params.id;
    const isNewOrder = orderId === 'new';

    this.state = {
      orderId,
      isNewOrder,
      canceled: false,
      verifyOrderModalVisible: false
    };
  }

  componentWillMount() {
    if (this.state.isNewOrder) {
      this.props.purchaseOrderFieldsGetRequest();
    } else {
      this.props.purchaseOrderGetRequest({
        params: [{
          id: this.state.orderId
        }]
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const orderId = nextProps.match.params.id;
    const isNewOrder = orderId === 'new';

    this.setState({
      orderId,
      isNewOrder,
      canceled: nextProps.status === 'Cancel',
    });

    if (isNewOrder && nextProps.currentUser) {
      this.props.change('billToCompany.id', nextProps.currentUser.companyId);
      this.props.change('shipToCompany.id', nextProps.currentUser.companyId);
      this.props.change('contactUserId', nextProps.currentUser.userId);
    }
  }

  handleSubmitClick = (formValues) => {
    if (this.state.isNewOrder) {
      return;
    }

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

    console.log('**********', prepareOrder(formValues));

    if (isNewOrder) {
      this.props.purchaseOrderSaveRequest({
        payload: prepareOrder(formValues)
      });
    } else {
      this.props.purchaseOrderUpdateRequest({
        payload: prepareOrder(formValues)
      });
    }
  }

  handleCancel = () => {
    this.props.push('/purchase/orders');
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
      orderId,
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
                orderId={ orderId }
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
  purchaseOrderGetRequest: PropTypes.func.isRequired,
  purchaseOrderSaveRequest: PropTypes.func.isRequired,
  purchaseOrderUpdateRequest: PropTypes.func.isRequired,
  purchaseOrderFieldsGetRequest: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    })
  }),
  // form
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  // data
  status: PropTypes.string,
  currentUser: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Order)));
