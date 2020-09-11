const relOperators = [
  {
    description: 'Is equal to',
    id: 1,
    operator: '=',
    type: '1'
  },
  {
    description: 'Is greater than',
    id: 2,
    operator: '>',
    type: '1'
  },
  {
    description: 'Is less than',
    id: 3,
    operator: '<',
    type: '1'
  },
  {
    description: 'Is greater than equal to',
    id: 4,
    operator: '>=',
    type: '1'
  },
  {
    description: 'Is less than equal to',
    id: 5,
    operator: '<=',
    type: '1'
  },
  {
    description: 'Not equal to',
    id: 6,
    operator: '!=',
    type: '1'
  }
];

const logicOperators = [
  {
    description: 'And',
    id: 7,
    operator: 'and',
    type: '2'
  },
  {
    description: 'Or',
    id: 8,
    operator: 'or',
    type: '2'
  },
];

const searchSectionFilters = [{
  id: 0,
  relationalOpId: 1, // Is Equal
  columnId: null, // Would be first filter column in array
  logicalOpId: null, // no logical operator for the first row
  value: null, // Would be default components value
}];

export { relOperators, logicOperators, searchSectionFilters };
