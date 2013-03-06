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
 * The EmployeeController acts as the command with asynchronous callback methods for successful
 * and failed employee service calls.eError: "undefined" is not a function(evaluating "controller.getStores()")
 */
Ext.define("CafeTownsend.controller.EmployeeController", {
    extend: "SenchaExtensions.mvc.controller.AbstractController",

    requires: [
        "CafeTownsend.event.EmployeeEvent",
        "SenchaExtensions.mvc.service.rpc.Responder"
    ],

    inject: [
        "employeeService",
        "employeeStore"
    ],

    config: {

        /**
         * @cfg {Object} employeeService The injected employee service from DeftJS.
         * @accessor
         */
//        employeeService: null,

        /**
         * @cfg {Object} employeeStore The injected employee store from DeftJS.
         * @accessor
         */
//        employeeStore: null
    },

    /**
     * Sets up global event bus handlers.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        console.log("EmployeeController.setupGlobalEventListeners");

        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST, this.onGetEmployeeList, this);
        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE, this.onCreateEmployee, this);
        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE, this.onUpdateEmployee, this);
        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE, this.onDeleteEmployee, this);
    },

    /**
     * Acts like a command object and performs get employees by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model updates.
     */
    getEmployeeList: function() {
        console.log("EmployeeController.getEmployeeList");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.getEmployeeListSuccess, this.getEmployeeListFailure, this);
        var service = this.employeeService;
//        var service = this.getEmployeeService();

        service.setResponder(responder);
        service.getEmployeeList();
    },

    /**
     * Acts like a command object and performs create employee by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model updates.
     */
    createEmployee: function(employee) {
        console.log("EmployeeController.createEmployee");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.createEmployeeSuccess, this.createEmployeeFailure, this);
        var service = this.employeeService;
//        var service = this.getEmployeeService();

        service.setResponder(responder);
        service.createEmployee(employee);
    },

    /**
     * Acts like a command object and performs update employee by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model creates.
     */
    updateEmployee: function(employee) {
        console.log("EmployeeController.updateEmployee");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.updateEmployeeSuccess, this.updateEmployeeFailure, this);
        var service = this.employeeService;
//        var service = this.getEmployeeService();

        service.setResponder(responder);
        service.updateEmployee(employee);
    },

    /**
     * Acts like a command object and performs delete employee by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model creates.
     */
    deleteEmployee: function(employee) {
        console.log("EmployeeController.deleteEmployee");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.deleteEmployeeSuccess, this.deleteEmployeeFailure, this);
        var service = this.employeeService;
//        var service = this.getEmployeeService();

        service.setResponder(responder);
        service.deleteEmployee(employee);
    },

    ////////////////////////////////////////////////
    // SERVICE SUCCESS/FAULT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the successful get employees service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
     *
     * @param response  The response data packet from the successful service call.
     */
    getEmployeeListSuccess: function(response) {
        console.log("EmployeeController.getEmployeeListSuccess");

        // var store = this.getEmployeeStore();
        var store = this.employeeStore;
        store.setData(response.employeeList);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed get employees service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
     *
     * @param response  The response data packet from the failed service call.
     */
    getEmployeeListFailure: function(response) {
        console.log("EmployeeController.getEmployeeListFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_FAILURE);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the successful create employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
     *
     * @param response  The response data packet from the successful service call.
     */
    createEmployeeSuccess: function(response) {
        console.log("EmployeeController.createEmployeeSuccess");

        // var store = this.getEmployeeStore();
        var store = this.employeeStore;
        store.add(response.employee);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed create employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
     *
     * @param response  The response data packet from the failed service call.
     */
    createEmployeeFailure: function(response) {
        console.log("EmployeeController.createEmployeeFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_FAILURE);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the successful update employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
     *
     * @param response  The response data packet from the successful service call.
     */
    updateEmployeeSuccess: function(response) {
        console.log("EmployeeController.updateEmployeeSuccess");

        // var store = this.getEmployeeStore();
        var store = this.employeeStore;
        store.update(response.employee);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed update employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
     *
     * @param response  The response data packet from the failed service call.
     */
    updateEmployeeFailure: function(response) {
        console.log("EmployeeController.updateEmployeeFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_FAILURE);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the successful delete employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
     *
     * @param response  The response data packet from the successful service call.
     */
    deleteEmployeeSuccess: function(response) {
        console.log("EmployeeController.deleteEmployeeSuccess");

        // var store = this.getEmployeeStore();
        var store = this.employeeStore;
        var employee = store.findRecord("id", response.employee.id);

        store.remove(employee);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed delete employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
     *
     * @param response  The response data packet from the failed service call.
     */
    deleteEmployeeFailure: function(response) {
        console.log("EmployeeController.deleteEmployeeFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE_FAILURE);
        this.dispatchGlobalEvent(evt);
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the get employee event on the application-level event bus. Calls a functional method that's more
     * testable than this event handler.
     *
     * @param event Reference to the employee event.
     */
    onGetEmployeeList: function(event) {
        console.log("EmployeeController.onGetEmployeeList");

        this.getEmployeeList();
    },

    /**
     * Handles the create employee event on the application-level event bus. Calls a functional method that's more
     * testable than this event handler.
     *
     * @param event Reference to the employee event.
     */
    onCreateEmployee: function(event) {
        console.log("EmployeeController.onCreateEmployee");

        this.createEmployee(event.employee);
    },

    /**
     * Handles the update employee event on the application-level event bus. Calls a functional method that's more
     * testable than this event handler.
     *
     * @param event Reference to the employee event.
     */
    onUpdateEmployee: function(event) {
        console.log("EmployeeController.onUpdateEmployee");

        this.updateEmployee(event.employee);
    },

    /**
     * Handles the delete employee event on the application-level event bus. Calls a functional method that's more
     * testable than this event handler.
     *
     * @param event Reference to the employee event.
     */
    onDeleteEmployee: function(event) {
        console.log("EmployeeController.onDeleteEmployee");

        this.deleteEmployee(event.employee);
    }

});

