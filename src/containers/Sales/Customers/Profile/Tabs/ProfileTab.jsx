import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Card } from 'antd';
import {
  FormDatePicker,
  FormInput,
  FormCheckbox,
  Controls
} from 'components';
import {
  customerProfileGetRequest,
  customerProfileUpdateRequest
} from 'redux-base/actions';
import styles from '../Tabs.scss';

const mapStateToProps = state => ({
  initialValues: state.customerProfile.customerData,
  loadingPage: state.customerProfile.loadingPage
});

const mapDispatchToProps = {
  customerProfileGetRequest,
  customerProfileUpdateRequest
};

const reduxFormConfig = {
  form: 'customerProfileForm',
  enableReinitialize: true
  // validate: CustomerProfileFormValidation
};

class ProfileTab extends Component {

  componentWillMount() {
    this.props.customerProfileGetRequest({
      id: this.props.customerId
    });
  }

  handleUpdateCustomerProfile = (values) => {
    this.props.customerProfileUpdateRequest({
      payload: values
    });
  }


  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleUpdateCustomerProfile) }>
        <Row>
          <Col xs={ 12 } md={ 4 } mdOffset={ 2 } lgOffset={ 2 } lg={ 4 }>
            <Card title="Details" className={ styles.card }>
              <Row middle="xs" start="xs">
                <Col xs={ 12 }>First Name</Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <Field
                    name="firstName"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row middle="xs" start="xs">
                <Col xs={ 12 }>Last Name</Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <Field
                    name="lastName"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row middle="xs" start="xs">
                <Col xs={ 12 }>Email</Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <Field
                    name="email"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row middle="xs" start="xs">
                <Col xs={ 12 }>Phone</Col>
              </Row>
              <Row>
                <Col xs={ 12 }>
                  <Field
                    name="phone"
                    component={ FormInput }
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={ 12 } md={ 4 } lg={ 4 }>
            <Card title="Personal" className={ styles.card }>
              <Row middle="xs" end="xs">
                <Col xs />
                <Col xs={ 4 }>
                  <span>Date Of Birth</span>
                </Col>
                <Col xs={ 6 }>
                  <Field
                    name="dob"
                    component={ FormDatePicker }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 6 } />
                <Col xs={ 3 }>
                  <span>Adults</span>
                </Col>
                <Col xs={ 3 }>
                  <span>Children</span>
                </Col>
              </Row>
              <Row middle="xs" end="xs">
                <Col xs={ 6 }>
                  <span>No Of People In Household</span>
                </Col>
                <Col xs={ 3 }>
                  <Field
                    name="adults"
                    type="number"
                    min={ 0 }
                    component={ FormInput }
                  />
                </Col>
                <Col xs={ 3 }>
                  <Field
                    name="children"
                    type="number"
                    min={ 0 }
                    component={ FormInput }
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={ 12 } md={ 4 } mdOffset={ 2 } lgOffset={ 2 } lg={ 4 }>
            <Card title="Marketing" className={ styles.card }>
              <Row middle="xs">
                <Col>
                  <span>Newsletter Subscription</span>
                </Col>
                <Col xs>
                  <Field
                    name="newsLetterSubscription"
                    component={ FormCheckbox }
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={ 12 } md={ 4 } lg={ 4 } >
            <Card title="Delivery" className={ styles.card }>
              <Row middle="xs" start="xs">
                <Col xs={ 6 } md={ 5 } lg={ 5 }>
                  <span>Delivery Preferences</span>
                </Col>
                <Col xs={ 6 }>
                  <Field
                    name="deliveryPreferences"
                    type="number"
                    min={ 0 }
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row middle="xs" start="xs">
                <Col xs={ 6 } md={ 4 } lg={ 4 }>Weekend Delivery</Col>
                <Col xs>
                  <Field
                    name="weekendDelivery"
                    component={ FormCheckbox }
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Controls
          submit
          submitText={ 'Save' }
          cancel={ false }
        />
      </form>
    );
  }
}

ProfileTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  initialValues: PropTypes.object.isRequired,
  customerId: PropTypes.string.isRequired,
  // redux-base
  customerProfileGetRequest: PropTypes.func.isRequired,
  customerProfileUpdateRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(ProfileTab));
