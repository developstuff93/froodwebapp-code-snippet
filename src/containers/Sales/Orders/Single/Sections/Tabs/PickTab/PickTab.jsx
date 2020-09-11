import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PickTabSection from './PickTabSection';

const mapStateToProps = state => ({
  data: state.order.pickData,
});

const PickTab = ({ data, orderNo }) => (
  <div>
    { data && data.map((pickData, pickDataIndex) => (
      <PickTabSection
        key={ pickDataIndex }
        data={ pickData }
        orderNo={ orderNo }
      />
    ))}
  </div>
);

PickTab.propTypes = {
  data: PropTypes.array,
  orderNo: PropTypes.string
};

export default connect(mapStateToProps)(PickTab);
