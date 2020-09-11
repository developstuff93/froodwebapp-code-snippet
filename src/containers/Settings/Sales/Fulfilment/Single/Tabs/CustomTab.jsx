import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { reduxForm, Field } from 'redux-form';
import { PageHeader, FormInput, Controls } from 'components';
import {
  extrasGetRequest,
  extrasUpdateRequest
} from 'redux-base/actions';
import { form } from 'styles/common.scss';

const mapStateToProps = state => ({
  initialValues: state.transporters.extras,
  needReloadExtras: state.transporters.needReloadExtras,
  loadingPage: state.transporters.loadingPage
});

const mapDispatchToProps = {
  extrasGetRequest,
  extrasUpdateRequest
};

const reduxFormConfig = {
  form: 'fulfilmentCustomTab',
  enableReinitialize: true
  // validate: fulfilmentCustomTabFormValidation
};

class CustomTab extends Component {

  componentWillMount() {
    this.props.extrasGetRequest({
      id: this.props.fulfilmentId
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReloadExtras) {
      this.props.extrasGetRequest({
        id: this.props.fulfilmentId
      });
    }
  }

  handleSave = (values) => {
    this.props.extrasUpdateRequest({
      id: this.props.fulfilmentId,
      payload: values
    });
  }

  render() {
    const {
      handleSubmit,
      loadingPage
    } = this.props;

    return (
      <div>
        <Spin spinning={ loadingPage }>
          <PageHeader
            bigText="Custom Text"
          />
          <form
            onSubmit={ handleSubmit(this.handleSave) }
            className={ form }
          >
            <Row>
              <Col lg>
                <strong>Label</strong>
              </Col>
            </Row>
            <Row>
              <Col lg={ 3 }>
                <Field
                  name="customNotes"
                  placeholder="Any text that will appear in shopping card"
                  component={ FormInput }
                />
              </Col>
            </Row>
            <Controls
              submit
              cancel={ false }
            />
          </form>
        </Spin>
      </div>
    );
  }
}

CustomTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadExtras: PropTypes.bool.isRequired,
  // data
  initialValues: PropTypes.object.isRequired,
  fulfilmentId: PropTypes.string.isRequired,
  // redux-base
  extrasGetRequest: PropTypes.func.isRequired,
  extrasUpdateRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(CustomTab));
