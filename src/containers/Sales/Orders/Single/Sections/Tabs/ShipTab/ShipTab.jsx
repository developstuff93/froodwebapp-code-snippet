import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShipTabSection from './ShipTabSection';

const mapStateToProps = state => ({
  data: state.order.shipData,
});

const ShipTab = ({ data, orderNo }) => (
  <div>
    { data && data.map((shipData, shipDataIndex) => (
      <ShipTabSection
        key={ shipDataIndex }
        data={ shipData }
        orderNo={ orderNo }
      />
    ))}
  </div>
);

ShipTab.propTypes = {
  data: PropTypes.array,
  orderNo: PropTypes.string
};

export default connect(mapStateToProps)(ShipTab);
