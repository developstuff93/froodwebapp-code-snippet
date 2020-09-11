/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm, Field } from 'redux-form';
import { FormInput, FormSelect, Controls } from 'components';
import { Icon } from 'antd';
import styles from '../Item.scss';

const reduxFormConfig = {
  form: 'inventoryUDForm',
  // validate: CustomersNewFormValidation
};

const fieldMock = [0, 1];

class UserDefinedTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fields: fieldMock
    };
  }

  handleAddRow = () => {
    const newFields = [...this.state.fields];
    newFields.push(newFields.length);
    this.setState({ fields: newFields });
  }

  handleDeleteRow = (e) => {
    const newFields = [...this.state.fields];
    const fieldId = e.target.id;
    newFields.splice(fieldId, 1);
    this.setState({ fields: newFields.map((f, i) => i) });
  }

  handleSave = () => {

  }

  render() {
    const { fields } = this.state;
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleSave) }>
        <Row start="xs">
          <Col xs>
            <strong className={ styles.infoHeader }>User Defined Fields</strong>
          </Col>
        </Row>
        { fields.map((fieldId, index) =>
          <Row key={ `field${index}` } middle="xs" center="xs" className={ styles.row }>
            <Col xs={ 12 } md={ 2 } lg={ 1 }>
              <strong>Field Name</strong>
            </Col>
            <Col xs={ 12 } md={ 6 } lg={ 3 }>
              <Field
                name={ `field${fieldId}` }
                placeholder="Any text"
                type="text"
                component={ FormInput }
              />
            </Col>
            <Col xs={ 12 } md={ 2 } lg={ 1 } />
            <Col xs={ 12 } md={ 2 } lg={ 1 }>
              <strong>Field Value</strong>
            </Col>
            <Col xs={ 12 } md={ 6 } lg={ 3 }>
              <Field
                name={ `value${fieldId}` }
                component={ FormSelect }
                // props={ {
                //  menuItems: selectValues.find(fld => fld.displayName === 'Promotion Type').availableValues
                // } }
              />
            </Col>
            <Col xs={ 1 } md={ 1 } lg={ 1 }>
              { fieldId + 1 !== fields.length &&
                <Icon
                  type="close-circle-o"
                  id={ fieldId }
                  className={ styles.closeIcon }
                  onClick={ this.handleDeleteRow }
                />
              }
              { fieldId === fields[fields.length - 1] &&
                <Icon
                  type="plus-circle-o"
                  className={ styles.addIcon }
                  onClick={ this.handleAddRow }
                />
              }
            </Col>
          </Row>
        )}
        <Row>
          <Col xs>
            <Controls
              submit
            />
          </Col>
        </Row>
      </form>
    );
  }
}

UserDefinedTab.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm(reduxFormConfig)(UserDefinedTab);
