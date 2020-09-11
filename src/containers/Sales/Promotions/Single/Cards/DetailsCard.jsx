import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Card } from 'antd';
import { Field } from 'redux-form';
import { FormSelect, FormInput } from 'components';
import { card } from 'styles/common.scss';

const DetailsCard = ({ selectValues, type, condition }) => (
  <Col xs={ 12 } md={ 6 } lg={ 6 }>
    <Card title="Details" className={ card }>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Promotion Type</Col>
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="type"
            component={ FormSelect }
            props={ {
              menuItems: selectValues.find(fld => fld.displayName === 'Promotion Type').availableValues
            } }
          />
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 } />
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="value"
            placeholder={ type !== 2 ? 'Number' : 'Value' }
            type={ type !== 2 ? 'number' : 'text' }
            component={ FormInput }
          />
        </Col>
      </Row>
      { type === 2 && // Free Item
        <Row middle="xs">
          <Col xs={ 12 } md={ 4 } lg={ 4 } />
          <Col xs={ 12 } md={ 5 } lg={ 5 }>
            <Field
              name="qty"
              placeholder="Number"
              type="number"
              component={ FormInput }
            />
          </Col>
        </Row>
      }
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>On</Col>
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="condition"
            component={ FormSelect }
            props={ {
              menuItems: selectValues.find(fld => fld.displayName === 'On').availableValues
            } }
          />
        </Col>
      </Row>
      { condition !== 1 && // All Orders
        <Row middle="xs">
          <Col xs={ 12 } md={ 4 } lg={ 4 } />
          <Col xs={ 12 } md={ 5 } lg={ 5 }>
            <Field
              name="conditionValue"
              placeholder={ (condition === 3 || condition === 4) ? 'Value' : 'Number' }
              type={ (condition === 3 || condition === 4) ? 'text' : 'number' }
              component={ FormInput }
            />
          </Col>
        </Row>
      }
      { (condition === 3 || condition === 4) && // Bundle Item / Single Item
        <Row middle="xs">
          <Col xs={ 12 } md={ 4 } lg={ 4 } />
          <Col xs={ 12 } md={ 5 } lg={ 5 }>
            <Field
              name="conditionQty"
              placeholder="Number"
              type="number"
              component={ FormInput }
            />
          </Col>
        </Row>
      }
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Apply to Order Type</Col>
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="orderType"
            component={ FormSelect }
            props={ {
              menuItems: selectValues.find(fld => fld.displayName === 'Apply to order type').availableValues,
            } }
          />
        </Col>
      </Row>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Qualifier</Col>
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="domains"
            placeholder="Qualifier"
            component={ FormInput }
          />
        </Col>
      </Row>
    </Card>
  </Col>
);

DetailsCard.propTypes = {
  selectValues: PropTypes.array.isRequired,
  type: PropTypes.number,
  condition: PropTypes.number,
};

export default DetailsCard;
