import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  supplierNotesGetRequest,
  supplierNotesSaveRequest,
} from 'redux-base/actions';
import { Table, Spin } from 'antd';
import { TopFormModal } from 'components';
import fields from './modalFields';
import columns from './notesTabHelpers';
import styles from '../../Supplier.scss';

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  notes: state.supplier.notes,
});

const mapDispatchToProps = {
  supplierNotesGetRequest,
  supplierNotesSaveRequest,
};

class NotesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we create note
    if (this.props.notes.length !== nextProps.notes.length) {
      this.setState({
        modalVisible: false,
        modalData: {}
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: null
    });
  }

  handleSave = (payload) => {
    this.props.supplierNotesSaveRequest({
      id: this.props.supplierId,
      payload
    });
  }

  render() {
    const {
      modalData,
      modalVisible
    } = this.state;

    const {
      notes,
      loadingPage
    } = this.props;

    return (
      <div>
        <TopFormModal
          loading={ loadingPage }
          title="Add Note"
          buttonText="Add Note"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields }
        />
        <Spin spinning={ loadingPage }>
          <Table
            className={ styles.table }
            rowKey="id"
            size="middle"
            columns={ columns() }
            dataSource={ notes }
          />
        </Spin>
      </div>
    );
  }
}

NotesTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  supplierId: PropTypes.number.isRequired,
  notes: PropTypes.array.isRequired,
  // redux-base
  supplierNotesGetRequest: PropTypes.func.isRequired,
  supplierNotesSaveRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesTab);
