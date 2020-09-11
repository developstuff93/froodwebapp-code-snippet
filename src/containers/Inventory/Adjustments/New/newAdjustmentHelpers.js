import React from 'react';
import {
  FroodInputNumber,
  FroodSelect
} from 'components';

export default (handleAdjustmentChange, handleReasonChange, reason) => [{
  title: 'BATCH',
  dataIndex: 'batch',
}, {
  title: 'EXPIRY',
  dataIndex: 'expiry',
}, {
  title: 'Stock in hand',
  dataIndex: 'stockInHand',
}, {
  title: 'Adjustment',
  render: (text, record) => (
    <FroodInputNumber
      id={ record.lotId }
      max={ 0 }
      defaultValue={ 0 }
      onChange={ handleAdjustmentChange }
    />
  )
}, {
  title: 'New adjusted qty',
  dataIndex: 'newAdjustQty',
}, {
  title: 'Adjustment Reason',
  render: (text, record) => (
    <FroodSelect
      id={ record.lotId }
      menuItems={ reason }
      onChange={ handleReasonChange }
    />
  )
}];
