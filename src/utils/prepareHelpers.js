/**
 * Used for Main Container Filter Section
 * @param {array} filters
 * @param {number} defaultColumnId
 */
export const prepareFilterValue = (filters, defaultColumnId) => (
  filters.map(filter => ({
    relationalOpId: filter.relationalOpId,
    columnId: filter.columnId || defaultColumnId,
    logicalOpId: filter.logicalOpId,
    value: filter.value
  }))
);

/**
 * Used for Main Container Table Section
 * @param {array} columns
 */
export const prepareHeaders = columns => (
  columns.map(col => ({
    id: col.id,
    key: col.dataAlias,
    name: col.displayName,
    order: col.order,
    dataAlias: col.dataAlias,
    dataType: col.tableDataType,
    isEditable: col.isEditable,
    isSortable: col.isSortable
  }))
);
