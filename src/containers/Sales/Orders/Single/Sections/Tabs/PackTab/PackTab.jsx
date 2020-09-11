import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PackTabSection from './PackTabSection';

const mapStateToProps = state => ({
  data: state.order.packData,
});

const PackTab = ({ data, orderNo }) => (
  <div>
    { data && data.map((packData, packDataIndex) => (
      <PackTabSection
        key={ packDataIndex }
        data={ packData }
        orderNo={ orderNo }
      />
    ))}
  </div>
);

PackTab.propTypes = {
  data: PropTypes.array,
  orderNo: PropTypes.string
};

export default connect(mapStateToProps)(PackTab);
