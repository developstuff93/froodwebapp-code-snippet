import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm, Field } from 'redux-form';
import { FormInput, Controls } from 'components';
import { Switch, Icon } from 'antd';
import styles from '../Item.scss';

const reduxFormConfig = {
  form: 'inventoryAttributesForm',
  initialValues: {
    type: 0
  }
  // validate: CustomersNewFormValidation
};
class AttributesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProducts: false
    };
  }

  handleSave = () => {
    // something
  }

  handleCancel = () => {
    // something
  }

  handleChange = () => {
  }

  handleOpen = () => {
    this.setState({
      showProducts: !this.state.showProducts
    });
  }

  render() {
    const { showProducts } = this.state;
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={ handleSubmit(this.handleSave) }>
          <Row className={ styles.inventoryInfo }>
            <Col xs={ 12 } md={ 3 } lg={ 3 } className={ styles.infoText }>
              <strong className={ styles.infoHeader }>Product Attributes</strong>
            </Col>
          </Row>
          <Row middle="xs" className={ styles.switchRow }>
            <Col xs={ 5 } md={ 5 } lg={ 4 } />
            <Col xs={ 3 } md={ 2 } lg={ 2 }>
              <strong>
                Refrigerated Storage
              </strong>
            </Col>
            <Col xs={ 1 } md={ 1 } lg={ 1 }>
              <div className={ styles.switchWrap }>
                <Switch checkedChildren="ON" unCheckedChildren="OFF" className={ styles.switch } onChange={ this.handleChange } />
              </div>
            </Col>
          </Row>
          <Row middle="xs" className={ styles.switchRow }>
            <Col xs={ 5 } md={ 5 } lg={ 4 } />
            <Col xs={ 2 } md={ 2 } lg={ 2 }>
              <strong>
                Can be frozen
              </strong>
            </Col>
            <Col xs={ 1 } md={ 1 } lg={ 1 }>
              <div className={ styles.switchWrap }>
                <Switch checkedChildren="ON" unCheckedChildren="OFF" className={ styles.switch } />
              </div>
            </Col>
            <Col xs={ 4 } md={ 2 } lg={ 2 }>
              <Row middle="xs">
                <Col xs>
                  <Row end="xs">
                    After
                  </Row>
                </Col>
                <Col xs>
                  <Field
                    name="days"
                    placeholder="15"
                    type="text"
                    component={ FormInput }
                  />
                </Col>
                <Col xs>
                  <Row start="xs">
                    Days
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row middle="xs" className={ styles.switchRow }>
            <Col xs={ 5 } md={ 5 } lg={ 4 } />
            <Col xs={ 3 } md={ 2 } lg={ 2 }>
              <strong>
                Can be bundled
              </strong>
            </Col>
            <Col xs={ 1 } md={ 1 } lg={ 1 }>
              <div className={ styles.switchWrap }>
                <Switch checkedChildren="ON" unCheckedChildren="OFF" className={ styles.switch } />
              </div>
            </Col>
          </Row>
          <Row middle="xs" className={ styles.switchRow }>
            <Col xs={ 5 } md={ 5 } lg={ 4 } />
            <Col xs={ 3 } md={ 2 } lg={ 2 }>
              <strong>
                Expiry Tracking
              </strong>
            </Col>
            <Col xs={ 1 } md={ 1 } lg={ 1 }>
              <div className={ styles.switchWrap }>
                <Switch checkedChildren="ON" unCheckedChildren="OFF" className={ styles.switch } />
              </div>
            </Col>
          </Row>
          <Row middle="xs" className={ styles.switchRow }>
            <Col xs={ 5 } md={ 5 } lg={ 4 } />
            <Col xs={ 3 } md={ 2 } lg={ 2 }>
              <strong>
                Best Before Tracking
              </strong>
            </Col>
            <Col xs={ 1 } md={ 1 } lg={ 1 }>
              <div className={ styles.switchWrap }>
                <Switch checkedChildren="ON" unCheckedChildren="OFF" className={ styles.switch } />
              </div>
            </Col>
          </Row>
          <Row middle="xs" className={ styles.switchRow }>
            <Col xs={ 5 } md={ 5 } lg={ 4 } />
            <Col xs={ 3 } md={ 2 } lg={ 2 }>
              <strong>
                Serialized
              </strong>
            </Col>
            <Col xs={ 1 } md={ 1 } lg={ 1 }>
              <div className={ styles.switchWrap }>
                <Switch checkedChildren="ON" unCheckedChildren="OFF" className={ styles.switch } />
              </div>
            </Col>
          </Row>
          <Row middle="xs" className={ styles.switchRow }>
            <Col xs={ 5 } md={ 5 } lg={ 4 } />
            <Col xs={ 3 } md={ 2 } lg={ 2 }>
              <strong>
                Batch Tracking
              </strong>
            </Col>
            <Col xs={ 1 } md={ 1 } lg={ 1 }>
              <div className={ styles.switchWrap }>
                <Switch checkedChildren="ON" unCheckedChildren="OFF" className={ styles.switch } />
              </div>
            </Col>
          </Row>
          <Row start="xs" top="xs" className={ styles.productTitleRow }>
            <Col xs={ 12 } md={ 12 } lg={ 12 } className={ styles.productText }>
              { showProducts ? (
                <Icon type="close-circle-o" className={ styles.closeIcon } onClick={ this.handleOpen } />
              ) : (
                <Icon type="plus-circle-o" className={ styles.addIcon } onClick={ this.handleOpen } />
              ) }
              <span className={ styles.productTitle }>Product Dimensions</span>
            </Col>
          </Row>
          { showProducts ? (
            <div>
              <Row center="xs" middle="xs" className={ styles.productInputs }>
                <Col xs={ 4 } md={ 2 } lg={ 2 }>
                  <Row end="xs">
                    <strong>Pack Size</strong>
                  </Row>
                </Col>
                <Col xs={ 8 } md={ 3 } lg={ 3 }>
                  <Field
                    name="size"
                    placeholder="Any text"
                    type="text"
                    component={ FormInput }
                  />
                </Col>
                <Col xs={ 4 } md={ 2 } lg={ 2 }>
                  <Row end="xs">
                    <strong>Pack Width</strong>
                  </Row>
                </Col>
                <Col xs={ 8 } md={ 3 } lg={ 3 }>
                  <Field
                    name="width"
                    placeholder="Any text"
                    type="text"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row center="xs" middle="xs" className={ styles.productInputs }>
                <Col xs={ 4 } md={ 2 } lg={ 2 }>
                  <Row end="xs">
                    <strong>Pack Weights</strong>
                  </Row>
                </Col>
                <Col xs={ 8 } md={ 3 } lg={ 3 }>
                  <Field
                    name="weights"
                    placeholder="Any text"
                    type="text"
                    component={ FormInput }
                  />
                </Col>
                <Col xs={ 4 } md={ 2 } lg={ 2 }>
                  <Row end="xs">
                    <strong>Pack Height</strong>
                  </Row>
                </Col>
                <Col xs={ 8 } md={ 3 } lg={ 3 }>
                  <Field
                    name="height"
                    placeholder="Any text"
                    type="text"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row center="xs" middle="xs" className={ styles.productInputs }>
                <Col xs={ 4 } md={ 2 } lg={ 2 }>
                  <Row end="xs">
                    <strong>Pack Cubic Capacity</strong>
                  </Row>
                </Col>
                <Col xs={ 8 } md={ 3 } lg={ 3 }>
                  <Field
                    name="capacity"
                    placeholder="Any text"
                    type="text"
                    component={ FormInput }
                  />
                </Col>
                <Col xs={ 4 } md={ 2 } lg={ 2 }>
                  <Row end="xs">
                    <strong>Pack Depth</strong>
                  </Row>
                </Col>
                <Col xs={ 8 } md={ 3 } lg={ 3 }>
                  <Field
                    name="depth"
                    placeholder="Any text"
                    type="text"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row>
                <Col xs>
                  <Controls
                    submit
                    submitText="Create"
                    onCancel={ this.handleCancel }
                  />
                </Col>
              </Row>
            </div>
          ) : (
            <span />
          ) }
        </form>
      </div>
    );
  }
}

AttributesTab.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm(reduxFormConfig)(AttributesTab);
