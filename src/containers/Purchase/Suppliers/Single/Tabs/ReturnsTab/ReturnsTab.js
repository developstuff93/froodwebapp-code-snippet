import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  taxCategoriesGetRequest,
} from 'redux-base/actions';
// import fields from '../../modalFields';
// import styles from '../../Supplier.scss';

const mapStateToProps = state => ({
  needReloadTaxCategories: state.taxes.needReloadTaxCategories,
  loadingPage: state.taxes.loadingPage,
  taxCategories: state.taxes.taxCategories,
  taxCodes: state.taxes.taxCodes,
});

const mapDispatchToProps = {
  taxCategoriesGetRequest,
};

class ReturnsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: null
    };
  }

  render() {
    return (
      <div>
        <h1>Orders</h1>
      </div>
    );
  }
}

ReturnsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadTaxCategories: PropTypes.bool.isRequired,
  // data
  taxCategories: PropTypes.array.isRequired,
  taxCodes: PropTypes.array.isRequired,
  // redux-base
  taxCategoriesGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnsTab);
