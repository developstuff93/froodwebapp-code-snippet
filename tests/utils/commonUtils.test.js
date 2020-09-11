import {
  filterAutoCompleteSuggestions,
  addParamsToURL
} from 'utils';

const { test, expect } = global;

test('removes duplicates from autocomplete results', () => {
  const suggestionsBefore = [{
    name: 'devstuff93',
    orderNo: '008-TMC-222',
    status: 'Active'
  }, {
    name: 'devstuff93',
    orderNo: '008-TMC-220',
    status: 'Active'
  }];

  const suggestionsAfter = [{
    label: 'devstuff93',
    key: 'name',
    data: {
      name: 'devstuff93',
      orderNo: '008-TMC-222',
      status: 'Active'
    }
  }, {
    label: 'devstuff93',
    key: 'name',
    data: {
      name: 'devstuff93',
      orderNo: '008-TMC-220',
      status: 'Active'
    }
  }];

  expect(filterAutoCompleteSuggestions(suggestionsBefore, 'devstuff93')).toEqual(suggestionsAfter);
});

test('adds params to url', () => {
  const filter = { orderNo: '25', id: 10 };
  const urlBefore = 'sales/{orderNo}/{id}';
  const urlAfter = 'sales/25/10';

  const urlBeforeWithQuery = 'sales?orderNo={orderNo}&id={id}';
  const urlAfterWithQuery = 'sales?orderNo=25&id=10';

  expect(addParamsToURL(filter, urlBefore)).toBe(urlAfter);
  expect(addParamsToURL(filter, urlBeforeWithQuery)).toBe(urlAfterWithQuery);
});
