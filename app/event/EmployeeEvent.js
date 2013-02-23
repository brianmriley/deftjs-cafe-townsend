/**
 * The employee event contains data and event types to perform CRUD operations on employees.
 */
Ext.define("CafeTownsend.event.EmployeeEvent", {
    extend: "CafeTownsend.event.AbstractEvent",
    
    statics: {
        GET_EMPLOYEE_LIST:          "CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST",
        GET_EMPLOYEE_LIST_SUCCESS:  "CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_SUCCESS",
        GET_EMPLOYEE_LIST_FAILURE:  "CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_FAILURE",

        GET_EMPLOYEE:               "CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE",
        GET_EMPLOYEE_SUCCESS:       "CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_SUCCESS",
        GET_EMPLOYEE_FAILURE:       "CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_FAILURE",

        CREATE_EMPLOYEE:            "CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE",
        CREATE_EMPLOYEE_SUCCESS:    "CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_SUCCESS",
        CREATE_EMPLOYEE_FAILURE:    "CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_FAILURE",

        UPDATE_EMPLOYEE:            "CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE",
        UPDATE_EMPLOYEE_SUCCESS:    "CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_SUCCESS",
        UPDATE_EMPLOYEE_FAILURE:    "CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_FAILURE",

        DELETE_EMPLOYEE:            "CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE",
        DELETE_EMPLOYEE_SUCCESS:    "CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE_SUCCESS",
        DELETE_EMPLOYEE_FAILURE:    "CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE_FAILURE"
    },

    id: "",
    employee: null,

    /**
     * Constructor. Allows the username and password for authentication to be set on the event.
     *
     * @param id      The id of the employee the CRUD operation is acting on.
     */
    constructor: function(type, id, employee) {
        this.callParent(arguments);

        this.id = id;
        this.employee = employee;
    }
})