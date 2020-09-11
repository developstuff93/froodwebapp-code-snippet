import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Card } from 'antd';
import { Field } from 'redux-form';
import { FormRadioGroup, FormInput, FormCheckbox } from 'components';
import { card } from 'styles/common.scss';

const RedemptionCard = ({ isLimited }) => (
  <Col xs={ 12 } md={ 6 } lg={ 6 }>
    <Card title="Redemption" className={ card }>
      <Row bottom="xs">
        <Col xs={ 4 } sm={ 2 } md={ 3 } lg={ 3 }>
          <Field
            name="isLimited"
            component={ FormRadioGroup }
            radioButtonValues={ [{
              value: false,
              text: 'Unlimited'
            }, {
              value: true,
              text: 'Limited Use',
            }] }
          />
        </Col>
        <Col xs={ 3 } sm={ 1 } md={ 2 } lg={ 2 }>
          <Field
            name="qualifyingOrder"
            placeholder="Number"
            type="number"
            component={ FormInput }
            disabled={ !isLimited }
          />
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs md lg>
          <Field
            name="forSingleTime"
            text="Single Time Use Per Customer"
            component={ FormCheckbox }
          />
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs md lg>
          <Field
            name="forFirstPurchase"
            text="First Time Use Only"
            component={ FormCheckbox }
          />
        </Col>
      </Row>
    </Card>
  </Col>
);

RedemptionCard.propTypes = {
  isLimited: PropTypes.bool,
};

export default RedemptionCard;
