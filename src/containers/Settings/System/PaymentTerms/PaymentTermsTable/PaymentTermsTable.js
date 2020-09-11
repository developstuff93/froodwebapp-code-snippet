import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import {
  payTermsGetRequest,
  payTermsSaveRequest,
  payTermsUpdateRequest,
  payTermsDeleteRequest
} from 'redux-base/actions';
import { Table, Spin } from 'antd';
import { TopFormModal } from 'components';
import { table } from 'styles/common.scss';
import { columns, addStringsToDueDays } from './paymentTermsHelpers';
import fields from '../modalFields';

const mapStateToProps = state => ({
  needReloadPayTerms: state.paymentTerms.needReloadPayTerms,
  loadingPage: state.paymentTerms.loadingPage,
  paymentTerms: state.paymentTerms.data,
  fromFields: state.paymentTerms.from,
});

const mapDispatchToProps = {
  payTermsGetRequest,
  payTermsSaveRequest,
  payTermsUpdateRequest,
  payTermsDeleteRequest
};

class PaymentTermsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null,
    };
  }

  componentWillMount() {
    this.props.payTermsGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    // when we delete or update term
    if (nextProps.needReloadPayTerms) {
      this.setState({
        modalVisible: false,
      }, () => this.props.payTermsGetRequest());
      return;
    }

    // when we create term
    if (this.props.paymentTerms.length !== nextProps.paymentTerms.length) {
      this.setState({
        modalVisible: false,
        modalData: {}
      });
    }

    // add string to dueDays
    nextProps.paymentTerms.filter((item) => {
      const data = item;
      const { name } = nextProps.fromFields.find(field => field.id === Number(item.from));
      data.dueDaysString = `${data.dueDays} Days from ${name}`;
      return data;
    });
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: null
    });
  }

  handleSave = (term) => {
    if (this.state.modalData) {
      this.props.payTermsUpdateRequest({
        payload: {
          id: this.state.modalData.id,
          dueDays: term.dueDays,
          from: term.from
        }
      });
    } else {
      this.props.payTermsSaveRequest({
        payload: {
          name: term.name,
          dueDays: Number(term.dueDays),
          from: Number(term.from),
        }
      });
    }
  }

  handleActivate = (e) => {
    const termId = e.target.id;
    const { dueDays } = this.props.paymentTerms.find(term => term.id === Number(termId));
    this.props.payTermsUpdateRequest({
      payload: {
        id: termId,
        dueDays
      }
    });
  }

  handleDeactivate = (e) => {
    this.props.payTermsDeleteRequest({
      id: e.target.id
    });
  }

  handleEdit = (e) => {
    const payTermId = e.target.id;
    const { id, name, dueDays, from } = this.props.paymentTerms.find(pt => pt.id === Number(payTermId));
    this.setState({
      modalVisible: true,
      modalData: {
        id,
        name,
        dueDays,
        from
      }
    });
  }

  render() {
    const { modalData, modalVisible } = this.state;
    const { paymentTerms, fromFields, loadingPage } = this.props;
    const data = addStringsToDueDays(paymentTerms, fromFields);

    return (
      <Row>
        <Col lg>
          <TopFormModal
            loading={ loadingPage }
            title="New Term"
            buttonText="New Term"
            handleSave={ this.handleSave }
            handleToggleModal={ this.handleToggleModal }
            visible={ modalVisible }
            initialValues={ modalData }
            fields={ fields(fromFields) }
          />
          <Spin spinning={ loadingPage }>
            <Table
              className={ table }
              rowKey="id"
              size="small"
              columns={
                columns(
                  this.handleEdit,
                  this.handleDeactivate,
                  this.handleActivate) }
              dataSource={ data }
            />
          </Spin>
        </Col>
      </Row>
    );
  }
}

PaymentTermsTable.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadPayTerms: PropTypes.bool.isRequired,
  // data
  paymentTerms: PropTypes.array.isRequired,
  fromFields: PropTypes.array.isRequired,
  // redux-base
  payTermsGetRequest: PropTypes.func.isRequired,
  payTermsSaveRequest: PropTypes.func.isRequired,
  payTermsUpdateRequest: PropTypes.func.isRequired,
  payTermsDeleteRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTermsTable);
