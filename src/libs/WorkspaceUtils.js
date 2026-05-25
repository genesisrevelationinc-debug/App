import lodashGet from 'lodash/get';
import lodashOrderBy from 'lodash/orderBy';

/**
 * Sort workspaces by different criteria
 * @param {Array} workspaces
 * @param {String} sortBy - the field to sort by
 * @param {String} sortOrder - 'asc' or 'desc'
 * @returns {Array} sorted workspaces
 */
function sortWorkspaces(workspaces, sortBy, sortOrder) {
    if (!workspaces || workspaces.length === 0) {
        return workspaces;
    }
    
    // Default to ascending order if not specified
    const order = sortOrder || 'asc';
    
    return lodashOrderBy(
        workspaces,
        [sortBy],
        [order]
    );
}

/**
 * Get workspace name for sorting
 * @param {Object} workspace
 * @returns {String}
 */
function getWorkspaceName(workspace) {
    return lodashGet(workspace, 'name', '');
}

/**
 * Get billing owner for sorting
 * @param {Object} workspace
 * @returns {String}
 */
function getBillingOwner(workspace) {
    return lodashGet(workspace, 'billingOwner', '');
}

/**
 * Sort workspaces by name
 * @param {Array} workspaces
 * @param {String} sortOrder
 * @returns {Array} sorted workspaces
 */
function sortWorkspacesByName(workspaces, sortOrder) {
    return sortWorkspaces(workspaces, getWorkspaceName, sortOrder);
}

/**
 * Sort workspaces by billing owner
 * @param {Array} workspaces
 * @param {String} sortOrder
 * @returns {Array} sorted workspaces
 */
function sortWorkspacesByBillingOwner(workspaces, sortOrder) {
    return sortWorkspaces(workspaces, getBillingOwner, sortOrder);
}

/**
 * Get sortable workspace value
 * @param {Object} workspace
 * @param {String} sortBy - field to sort by
 * @returns {String|Number} value to sort by
 */
function getSortableValue(workspace, sortBy) {
    switch (sortBy) {
        case 'name':
            return lodashGet(workspace, 'name', '').toLowerCase();
        case 'billingOwner':
            return lodashGet(workspace, 'billingOwner', '').toLowerCase();
        default:
            return lodashGet(workspace, sortBy, '', '').toLowerCase();
    }
}

/**
 * Toggle sort order
 * @param {String} currentOrder
 * @returns {String} toggled sort order
 */
function toggleSortOrder(currentOrder) {
    return currentOrder === 'asc' ? 'desc' : 'asc';
}

/**
 * Compare two workspace names for sorting
 * @param {String} a - first string to compare
 * @param {String} b - second string to compare
 * @returns {Number} comparison result
 */
function compare(a, b) {
    return a.localeCompare(b);
}

/**
 * Sort workspaces with multiple criteria
 * @param {Array} workspaces
 * @param {Object} sortConfig
 * @returns {Array} sorted workspaces
 */
function sortWorkspacesMultiple(workspaces, sortConfig) {
    const {sortBy, sortOrder} = sortConfig;
    return lodashOrderBy(workspaces, [sortBy], [sortOrder]);
}

export {
    sortWorkspaces,
    sortWorkspacesByName,
    sortWorkspacesByBillingOwner,
    sortWorkspacesMultiple,
    getSortableValue,
    toggleSortOrder,
    compare
};