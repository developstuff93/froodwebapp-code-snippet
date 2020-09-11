import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'components';
import { Tabs, MainTab } from './Tabs';

class Item extends Component {
  constructor(props) {
    super(props);
    const skuItemId = props.location.state.id;
    const isNewSkuItem = skuItemId === 'new';

    this.state = {
      skuItemId,
      isNewSkuItem
    };
  }

  componentWillReceiveProps(nextProps) {
    const skuItemId = nextProps.location.state.id;
    const isNewSkuItem = skuItemId === 'new';

    this.setState({
      skuItemId,
      isNewSkuItem
    });
  }

  render() {
    const {
      skuItemId,
      isNewSkuItem
    } = this.state;

    return (
      <div>
        { isNewSkuItem &&
          <PageHeader
            bigText="Product Details"
            smallText="Enter your product name, type and other details to setup your product"
          />
        }
        { isNewSkuItem &&
          <MainTab
            isNewSkuItem={ isNewSkuItem }
          />
        }
        { !isNewSkuItem &&
          <Tabs
            skuItemId={ skuItemId }
            isNewSkuItem={ isNewSkuItem }
          />
        }
      </div>
    );
  }
}

Item.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Item);
