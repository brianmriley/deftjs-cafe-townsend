/*
 Copyright (c) 2013 [Web App Solution, Inc.](mailto:admin@webappsolution.com)

 CafeTownsend Sencha Touch DeftJS PoC is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 CafeTownsend Sencha Touch DeftJS PoC is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with CafeTownsend Sencha Touch DeftJS PoC.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The employee event contains data and event types to perform CRUD operations on employees.
 */
Ext.define("CafeTownsend.event.EmployeeEvent", {
    extend: "SenchaExtensions.mvc.event.AbstractEvent",
    
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

    /**
     * The id of an employee.
     */
    id: "",

    /**
     * An employee to perform CRUD actions on.
     */
    employee: null,

    /**
     * Constructor. Allows the username and password for authentication to be set on the event.
     *
     * @param type          The event type.
     * @param id        The id of the employee the CRUD operation is acting on.
     * @param employee  The employee the CRUD operation is acting on.
     */
    constructor: function(type, id, employee) {
        this.callParent(arguments);

        this.id = id;
        this.employee = employee;
    }
})