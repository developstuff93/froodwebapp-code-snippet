import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Transfer } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import styles from './ColumnsModal.scss';

const prepareDataSource = columns => (
  columns.map(col => ({
    key: col.id,
    title: col.displayName
  }))
);

class ColumnsModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTargetKeys: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const selectedTargetKeys = nextProps
      .columns
      .filter(col => col.isDefault === true)
      .map(col => col.id);
    this.setState({
      selectedTargetKeys
    });
  }

  handleSelectTargetKeys = (targetKeys) => {
    this.setState({ selectedTargetKeys: targetKeys });
  }

  handleUpdateDefaultColumns = () => {
    const defaultColumns = [];
    this.state.selectedTargetKeys.forEach((id) => {
      const column = this.props.columns.find(col => col.id === id);

      defaultColumns.push({
        id: column.id,
        order: column.order
      });
    });
    this.props.handleUpdateDefaultColumns(defaultColumns);
  }

  handleResetDefaultColumns = () => {
    const selectedTargetKeys = this.props.columns.filter(col => col.isDefault === true)
      .map(col => col.id);
    this.setState({ selectedTargetKeys },
      () => this.props.handleToggleColumnsModal());
  }

  render() {
    const {
      columns,
      visible
    } = this.props;

    const {
      selectedTargetKeys
    } = this.state;

    return (
      <Modal
        className={ styles.modal }
        title="Visible Columns Configuration"
        visible={ visible }
        closable={ false }
        okText="Update"
        cancelText="Close"
        onOk={ this.handleUpdateDefaultColumns }
        onCancel={ this.handleResetDefaultColumns }
      >
        <Row>
          <Col xs>
            <Transfer
              className={ styles.transfer }
              showSearch
              dataSource={ prepareDataSource(columns) }
              targetKeys={ selectedTargetKeys }
              onChange={ this.handleSelectTargetKeys }
              titles={ ['available', 'visible'] }
              operations={ ['Add', 'Remove'] }
              render={ record => record.title }
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

ColumnsModal.propTypes = {
  handleUpdateDefaultColumns: PropTypes.func.isRequired,
  handleToggleColumnsModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
};

export default ColumnsModal;
