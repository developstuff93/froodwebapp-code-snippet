import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Card } from 'antd';
import { Field } from 'redux-form';
import { FormInput } from 'components';
import { card } from 'styles/common.scss';

const InfoCard = () => (
  <Col xs={ 12 } md={ 6 } lg={ 6 }>
    <Card title="Info" className={ card }>
      <Row middle="xs">
        <Col xs={ 12 } md={ 2 } lg={ 2 }>Code</Col>
        <Col xs={ 12 } md={ 6 } lg={ 6 }>
          <Field
            name="code"
            placeholder="Code"
            component={ FormInput }
          />
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs={ 12 } md={ 2 } lg={ 2 }>Title</Col>
        <Col xs={ 12 } md={ 6 } lg={ 6 }>
          <Field
            name="title"
            placeholder="Title"
            component={ FormInput }
          />
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs={ 12 } md={ 2 } lg={ 2 }>Description</Col>
        <Col xs={ 12 } md={ 6 } lg={ 6 }>
          <Field
            name="desc"
            placeholder="Description"
            component={ FormInput }
          />
        </Col>
      </Row>
    </Card>
  </Col>
);

export default InfoCard;
