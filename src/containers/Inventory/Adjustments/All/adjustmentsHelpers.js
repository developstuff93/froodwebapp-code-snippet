import { renderAutocompleteItem } from 'utils';

export const getStatisticsColumns = () => ([
  {
    value: 300,
    description: 'Adjustments'
  }, {
    value: 20,
    description: 'Since Yesterday',
    dynamic: true
  }, {
    value: 290,
    description: 'Active'
  }, {
    value: 20,
    description: 'Since Yesterday',
    dynamic: true
  }, {
    value: 290,
    description: 'Recurring'
  }, {
    value: 15,
    description: 'Since Yesterday',
    dynamic: true
  }]
);

export const renderItem = renderAutocompleteItem(['binName', 'skuName', 'warehouseName'], 'Adjustment');
