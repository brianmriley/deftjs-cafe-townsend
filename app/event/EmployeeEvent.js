/**
 * The employee event contains CRUD event types for the employees.
 */
Ext.define('CafeTownsend.event.EmployeeEvent', {
    
    statics: {
        GET_EMPLOYEE_LIST:          'CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST',
        GET_EMPLOYEE_LIST_SUCCESS:  'CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_SUCCESS',
        GET_EMPLOYEE_LIST_FAILURE:  'CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_FAILURE'
    },

    constructor: function()
    {
    }
})