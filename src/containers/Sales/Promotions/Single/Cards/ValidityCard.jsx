import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Card, Checkbox } from 'antd';
import { Field } from 'redux-form';
import { FormDatePicker } from 'components';
import { card } from 'styles/common.scss';

const ValidityCard = ({ noEndDate, setNoEndDate }) => (
  <Col xs={ 12 } md={ 6 } lg={ 6 }>
    <Card title="Validity" className={ card }>
      <Row middle="xs">
        <Col xs={ 12 } md={ 2 } lg={ 2 }>Start Date</Col>
        <Col xs={ 12 } md={ 4 } lg={ 4 }>
          <Field
            name="startDate"
            component={ FormDatePicker }
          />
        </Col>
      </Row>
      { !noEndDate &&
        <Row middle="xs">
          <Col xs={ 12 } md={ 2 } lg={ 2 }>End Date</Col>
          <Col xs={ 12 } md={ 4 } lg={ 4 }>
            <Field
              name="endDate"
              component={ FormDatePicker }
            />
          </Col>
        </Row>
      }
      <Row middle="xs">
        <Col xs md lg>
          <Checkbox onChange={ setNoEndDate }>No End Date</Checkbox>
        </Col>
      </Row>
    </Card>
  </Col>
);

ValidityCard.propTypes = {
  noEndDate: PropTypes.bool.isRequired,
  setNoEndDate: PropTypes.func.isRequired,
};

export default ValidityCard;
