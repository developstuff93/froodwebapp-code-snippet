/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'react-flexbox-grid';
import { Spin } from 'antd';
import moment from 'moment';
import { Controls } from 'components';
import { reduxForm, formValueSelector } from 'redux-form';
import {
  promotionGetRequest,
  promotionSaveRequest,
  promotionUpdateRequest,
} from 'redux-base/actions';
import { form } from 'styles/common.scss';
import {
  InfoCard,
  ValidityCard,
  DetailsCard,
  RedemptionCard
} from './Cards';


const selector = formValueSelector('promotionNewForm');

const mapStateToProps = state => ({
  loadingPage: state.promotion.loadingPage,
  initialValues: state.promotion.initialValues,
  selectValues: state.commonData.promotionFields,
  successSave: state.promotion.successSave,
  condition: selector(state, 'condition'),
  type: selector(state, 'type'),
  isLimited: selector(state, 'isLimited'),
});

const mapDispatchToProps = {
  promotionGetRequest,
  promotionSaveRequest,
  promotionUpdateRequest,
  push
};

const promotion = {
  condition: 1, // 'All Orders',
  orderType: 1, // 'Single Purchase'
  type: 3,
  qty: null,
  conditionQty: null,
  isLimited: true,
  forFirstPurchase: false,
  forSingleTime: false,
  value: '',
  startDate: new Date(),
  endDate: new Date(),
  qualifyingOrder: null
};

const reduxFormConfig = {
  form: 'promotionNewForm',
  enableReinitialize: true,
  initialValues: {
    ...promotion
  }
  // validate: validate
};

class Promotion extends Component {
  constructor(props) {
    super(props);

    const id = props.match.params.id;
    const isNewPromotion = id === 'new';

    this.state = {
      noEndDate: false,
      id,
      isNewPromotion
    };
  }

  componentWillMount() {
    const { id, isNewPromotion } = this.state;

    if (!isNewPromotion) {
      this.props.promotionGetRequest({ id });
    }
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id;
    const isNewPromotion = id === 'new';

    this.setState({
      id,
      isNewPromotion
    });
  }

  setNoEndDate = () => {
    this.setState({
      noEndDate: !this.state.noEndDate
    });
  }

  handleSave = (values) => {
    const newPromotion = values;
    newPromotion.startDate = moment(newPromotion.startDate).format('DD-MMMM-YYYY');
    newPromotion.endDate = moment(newPromotion.endDate).format('DD-MMMM-YYYY');

    if (this.state.noEndDate) {
      newPromotion.endDate = null;
    }

    if (this.state.isNewPromotion) {
      this.props.promotionSaveRequest({
        payload: newPromotion
      });
    } else {
      this.props.promotionUpdateRequest({
        payload: newPromotion
      });
    }
  }

  render() {
    const {
      selectValues,
      handleSubmit,
      condition,
      type,
      isLimited,
      loadingPage
    } = this.props;

    const { noEndDate, isNewPromotion } = this.state;

    return (
      <Spin spinning={ loadingPage }>
        <form
          className={ form }
          onSubmit={ handleSubmit(this.handleSave) }
        >
          <Row>
            <InfoCard />
            <ValidityCard
              noEndDate={ noEndDate }
              setNoEndDate={ this.setNoEndDate }
            />
          </Row>
          <Row>
            <DetailsCard
              selectValues={ selectValues }
              type={ type }
              condition={ condition }
            />
            <RedemptionCard
              isLimited={ isLimited }
            />
          </Row>
          <Controls
            submit
            submitText={ isNewPromotion ? 'Save' : 'Update' }
          />
        </form>
      </Spin>
    );
  }
}

Promotion.propTypes = {
  // redux-base
  promotionGetRequest: PropTypes.func.isRequired,
  promotionSaveRequest: PropTypes.func.isRequired,
  promotionUpdateRequest: PropTypes.func.isRequired,

  // data
  loadingPage: PropTypes.bool.isRequired,
  selectValues: PropTypes.array.isRequired,
  successSave: PropTypes.bool,
  condition: PropTypes.number,
  type: PropTypes.number,
  isLimited: PropTypes.bool,

  // form
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  // router
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Promotion)));
