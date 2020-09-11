/* eslint-disable import/prefer-default-export */

/**
 * Used in Sagas to automatically add params to urls
 * @param {object} filter
 * @param {string} url
 */
export const addParamsToURL = (filter, url) => {
  const params = [
    'orderNo',
    'id',
    'mapping_id',
    'slotId',
    'holidayId',
    'zoneId',
    'zoneType',
    'linkId',
    'addressId'
  ];
  let newUrl = url;

  if (filter.limit) {
    newUrl += `?limit=${filter.limit}&offset=${filter.offset}`;
  }

  params.forEach((param) => {
    if (filter[param] && url.includes(param)) {
      newUrl = newUrl.replace(`{${param}}`, filter[param]);
    } else if (filter[param]) {
      newUrl += `&${param}=${filter[param]}`;
    }
  });

  newUrl = newUrl.includes('filter') ? newUrl.replace('filter', filter.payload) : newUrl;

  return newUrl;
};
