import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm, Field } from 'redux-form';
import { FormInput, Controls, NewTableRow } from 'components';
import { Icon, Table } from 'antd';
import styles from '../Item.scss';

const reduxFormConfig = {
  form: 'inventorySPForm',
  // validate: CustomersNewFormValidation
};

const columns = [{
  title: 'Vendor',
  dataIndex: 'vn'
}, {
  title: 'Vendor SKU',
  dataIndex: 'vsku'
}, {
  title: 'Supplier Price',
  dataIndex: 'sp'
}, {
  title: 'Currency',
  dataIndex: 'c'
}];

const dataMock = [{
  key: '1',
  vn: 'ABC Merchants Inc.',
  vsku: '',
  sp: '',
  c: ''
}];

class SuppliersTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: dataMock
    };
  }

  handleAddRow = () => {
    const newData = [...this.state.data];
    newData.push({
      key: '2',
      vn: 'Test',
      vsku: '',
      sp: '',
      c: ''
    });
    this.setState({ data: newData });
  }

  handleDeleteRow = (e) => {
    const newData = [...this.state.data];
    const rowId = e.target.id;
    newData.splice(rowId, 1);
    this.setState({ data: newData.map((f, i) => i) });
  }

  handleSave = () => {

  }

  render() {
    const { data } = this.state;
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleSave) }>
        <Row start="xs">
          <Col xs>
            <strong className={ styles.infoHeader }>Product Suppliers</strong>
          </Col>
        </Row>
        <Row key="pricetaxes" middle="xs" center="xs" className={ styles.row }>
          <Col xs={ 12 } md={ 2 } lg={ 2 }>
            <strong>Default Purchase Price</strong>
          </Col>
          <Col xs={ 12 } md={ 6 } lg={ 2 }>
            <Field
              name="defaultPrice"
              placeholder="SGD 0.00"
              type="text"
              component={ FormInput }
            />
          </Col>
          <Col xs={ 12 } md={ 2 } lg={ 1 } />
          <Col xs={ 12 } md={ 2 } lg={ 2 }>
            <strong>Default Purchase Tax</strong>
          </Col>
          <Col xs={ 12 } md={ 6 } lg={ 2 }>
            <Field
              name="defaultTax"
              placeholder="% Tax"
              type="text"
              component={ FormInput }
            />
          </Col>
        </Row>
        <Row middle="xs" className={ styles.addNewVendorRow }>
          <Col>
            <Icon
              type="plus-circle-o"
              className={ styles.addIcon }
              // onClick={ this.handleAddRow }
            />
          </Col>
          <Col xs md lg>
            <span>
              Quick Add New Vendor
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Table
              className={ styles.table }
              columns={ columns }
              dataSource={ data }
              size="middle"
              pagination={ false }
            />
            <NewTableRow
              addOtherRowText="Add New Row"
              onClick={ this.handleAddRow }
            />
          </Col>
        </Row>
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

SuppliersTab.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm(reduxFormConfig)(SuppliersTab);
