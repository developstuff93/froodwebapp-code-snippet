import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'components';
import { Tabs, MainTab } from './Tabs';

class Supplier extends Component {
  constructor(props) {
    super(props);
    const supplierId = props.location.state.id;
    const isNewSupplier = supplierId === 'new';

    this.state = {
      supplierId,
      isNewSupplier
    };
  }

  componentWillReceiveProps(nextProps) {
    const supplierId = nextProps.location.state.id;
    const isNewSupplier = supplierId === 'new';

    this.setState({
      supplierId,
      isNewSupplier
    });
  }

  render() {
    const {
      supplierId,
      isNewSupplier
    } = this.state;

    return (
      <div>
        { isNewSupplier &&
          <PageHeader
            bigText="Product Supplier"
            smallText="Enter your product name, type and other details to setup your product"
          />
        }
        { isNewSupplier &&
          <MainTab
            supplierId={ supplierId }
            isNewSupplier={ isNewSupplier }
          />
        }
        { !isNewSupplier &&
          <Tabs
            supplierId={ supplierId }
            isNewSupplier={ isNewSupplier }
          />
        }
      </div>
    );
  }
}

Supplier.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Supplier);
