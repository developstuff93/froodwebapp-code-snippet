/* eslint-disable arrow-parens, babel/arrow-parens */

/**
 *
 * @param {string} base
 */
export function createRequestTypes(base) {
  const res = {};
  ['REQUEST', 'SUCCESS', 'FAILURE'].forEach(type => { res[type] = `${base}_${type}`; });
  return res;
}

/**
 *
 * @param {string} actionType
 * @param {array} endpoints
 * @param {string} responseType
 */
export const createRequestFunc = (
  actionType,
  endpoint,
  responseType
) => (...props) => (
  Object.assign(
    ...props,
    {
      endpoint,
      responseType: responseType || null,
      type: actionType.REQUEST,
      successCb: (data) => ({
        data,
        type: actionType.SUCCESS
      })
    })
);

/**
 *
 * @param {string} actionType
 * @param {array} endpoints
 * @param {string} responseType
 */
export const createParallelRequestFunc = (
  actionType,
  endpoints,
  responseType
) => (...props) => (
  Object.assign(
    ...props,
    {
      endpoints,
      responseType: responseType || 'json',
      type: actionType.REQUEST,
      successCb: (data) => ({
        data,
        type: actionType.SUCCESS
      })
    })
);

export const updateCommonDataRequest =
  type =>
    ({ data, activeFilterId, totalRows, searchSectionFilters }) =>
      ({
        type,
        searchSectionFilters,
        activeFilterId,
        data,
        totalRows
      });
