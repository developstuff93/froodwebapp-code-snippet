// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import {
  ActionButton,
  FormInput,
  FormSelect,
  FormAutocomplete,
  FormCheckbox,
  FormTimePicker,
  FormDatePicker,
  SkuAutocompleteField
} from 'components';
import { Field, reduxForm } from 'redux-form';
import { filterAutoCompleteSuggestions } from 'utils';
import { topFormButton, modal, fieldsContainer } from './TopFormModal.scss';

type TopFormModalProps = {
  // triggers
  loading?: boolean,
  loadingAutocomplete?: boolean,
  // text
  title: string,
  buttonVisible?: boolean,
  buttonText?: string,
  okText?: string,
  // redux-form
  handleSubmit: Function,
  change: Function,
  // handlers
  handleSave: Function,
  handleToggleModal: Function,
  // form Container
  fields: Array<{
    name: string,
    header: string,
    editableOnInitialization: boolean,
    // autocompete props
    renderAutocompleteItem?: Function,
    placeholder?: string,
    handleAutocompleteChange?: Function,
    formatter?: Function,
    parser?: Function,
    // select props
    menuItems?: Array<{
      key: string,
      value: string
    }>
  }>,
  initialValues: Object,
  // autocomplete data
  autocompleteData: Object,
  // triggers
  visible: boolean,
}

const reduxFormConfig = {
  form: 'topFormModal',
  enableReinitialize: true
};

class TopFormModal extends Component<TopFormModalProps> {
  handleSave = (values: Object) => {
    this.props.handleSave(values);
  }

  handleCancel = () => {
    this.props.handleToggleModal();
  }

  handleFormatter = (value, field) => {
    if (field.formatter) {
      return field.formatter(value);
    }
    return value;
  }

  handleParser = (value, field) => {
    if (field.parser) {
      return field.parser(value);
    }
    return value;
  }

  render() {
    const {
      title,
      buttonVisible = true,
      buttonText,
      okText = 'Save',
      fields,
      handleSubmit,
      initialized,
      visible,
      loading,
    } = this.props;

    return (
      <div>
        { buttonVisible &&
          <ActionButton
            className={ topFormButton }
            onClick={ this.props.handleToggleModal }
          >
            { buttonText }
          </ActionButton>
        }
        <Modal
          className={ modal }
          confirmLoading={ loading }
          visible={ visible }
          title={ title }
          okText={ okText }
          onOk={ handleSubmit(this.handleSave) }
          onCancel={ this.handleCancel }
        >
          <form>
            { fields.map(field =>
              <Row key={ field.name }>
                <Col lg>
                  <div>
                    { field.type === 'checkbox' ? (
                      <Field
                        name={ field.name }
                        disabled={ initialized && !field.editableOnInitialization }
                        text={ field.header }
                        component={ FormCheckbox }
                      />
                    ) : (
                      <strong>
                        { field.header }
                      </strong>
                    )}
                  </div>
                  <div className={ fieldsContainer }>
                    { field.type === 'text' &&
                      <Field
                        name={ field.name }
                        disabled={ initialized && !field.editableOnInitialization }
                        component={ FormInput }
                      />
                    }
                    { field.type === 'number' &&
                      <Field
                        name={ field.name }
                        type="number"
                        formatter={ this.handleFormatter }
                        parser={ this.handleParser }
                        disabled={ initialized && !field.editableOnInitialization }
                        component={ FormInput }
                      />
                    }
                    { field.type === 'select' &&
                      <Field
                        name={ field.name }
                        disabled={ initialized && !field.editableOnInitialization }
                        menuItems={ field.menuItems }
                        component={ FormSelect }
                      />
                    }
                    { field.type === 'timePicker' &&
                      <Field
                        name={ field.name }
                        timeFormat="HH:mm"
                        disabled={ initialized && !field.editableOnInitialization }
                        component={ FormTimePicker }
                      />
                    }
                    { field.type === 'datePicker' &&
                      <Field
                        name={ field.name }
                        readonly={ initialized && !field.editableOnInitialization }
                        component={ FormDatePicker }
                      />
                    }
                    { field.type === 'autocomplete' &&
                      <Field
                        name={ field.name }
                        placeholder={ field.placeholder }
                        component={ FormAutocomplete }
                        disabled={ initialized && !field.editableOnInitialization }
                        autocomplete={ filterAutoCompleteSuggestions(field.autocompleteData, field.autocompleteKeyword) }
                        onChange={ field.handleAutocompleteChange }
                        renderItem={ field.renderAutocompleteItem }
                        loadingAutoComplete={ this.props.loadingAutoComplete }
                      />
                    }
                    { field.type === 'skuAutocomplete' &&
                      <SkuAutocompleteField
                        disabled={ initialized && !field.editableOnInitialization }
                      />
                    }
                  </div>
                </Col>
              </Row>
            )}
          </form>
        </Modal>
      </div>
    );
  }
}

TopFormModal.propTypes = {
  // triggers
  loading: PropTypes.bool.isRequired,
  loadingAutoComplete: PropTypes.bool,
  // props
  title: PropTypes.string.isRequired,
  buttonVisible: PropTypes.bool,
  buttonText: PropTypes.string,
  okText: PropTypes.string,
  fields: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  // handlers
  handleSave: PropTypes.func.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
  // redux-form
  handleSubmit: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
};

export default reduxForm(reduxFormConfig)(TopFormModal);
