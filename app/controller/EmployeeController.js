/**
 * The EmployeeController acts as the command with asynchronous callback methods for successful
 * and failed employee service calls.
 *
 * TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
 * 1)  Error: Error while resolving value to inject: no dependency provider found for "function() { return this.constructor.apply(this, arguments); }".
 * 2)  TypeError: "undefined" is not a function(evaluating "controller.getStores()")
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

        // create a public property so we can inject our service
        employeeService: null,

        // create a public property so we can inject our store
        employeeStore: null
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
     * Acts like a command object and performs authentication by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model updates.
     */
    getEmployeeList: function() {
        console.log("EmployeeController.getEmployeeList");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.getEmployeeListSuccess, this.getEmployeeListFailure, this);
        var service = this.getEmployeeService();

        service.setResponder(responder);
        service.getEmployeeList();
    },

    /**
     * Acts like a command object and performs authentication by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model updates.
     */
    createEmployee: function(employee) {
        console.log("EmployeeController.createEmployee");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.createEmployeeSuccess, this.createEmployeeFailure, this);
        var service = this.getEmployeeService();

        service.setResponder(responder);
        service.createEmployee(employee);
    },

    /**
     * Acts like a command object and performs authentication by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model creates.
     */
    updateEmployee: function(employee) {
        console.log("EmployeeController.updateEmployee");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.updateEmployeeSuccess, this.updateEmployeeFailure, this);
        var service = this.getEmployeeService();

        service.setResponder(responder);
        service.updateEmployee(employee);
    },

    /**
     * Acts like a command object and performs authentication by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model creates.
     */
    deleteEmployee: function(employee) {
        console.log("EmployeeController.deleteEmployee");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.deleteEmployeeSuccess, this.deleteEmployeeFailure, this);
        var service = this.getEmployeeService();

        service.setResponder(responder);
        service.deleteEmployee(employee);
    },

    ////////////////////////////////////////////////
    // SERVICE SUCCESS/FAULT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the successful service call and takes the response data packet as a parameter.
     *
     * <p>
     * Inspects the response for success and fires off the corresponding success event.
     * </p>
     *
     * @param response  The response data packet from the successful service call.
     */
    getEmployeeListSuccess: function(response) {
        console.log("EmployeeController.getEmployeeListSuccess");

        var store = this.getEmployeeStore();
        store.setData(response.employeeList);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed service call and takes the response data packet as a parameter.
     *
     * <p>
     * Fires off the corresponding fault event.
     * </p>
     *
     * @param response  The response data packet from the successful service call.
     */
    getEmployeeListFailure: function(response) {
        console.log("EmployeeController.getEmployeeListFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_FAILURE);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the successful service call and takes the response data packet as a parameter.
     *
     * <p>
     * Inspects the response for success and fires off the corresponding success event.
     * </p>
     *
     * @param response  The response data packet from the successful service call.
     */
    createEmployeeSuccess: function(response) {
        console.log("EmployeeController.createEmployeeSuccess");

        var store = this.getEmployeeStore();

        store.add(response.employee);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed service call and takes the response data packet as a parameter.
     *
     * <p>
     * Fires off the corresponding fault event.
     * </p>
     *
     * @param response  The response data packet from the successful service call.
     */
    createEmployeeFailure: function(response) {
        console.log("EmployeeController.createEmployeeFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_FAILURE);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the successful service call and takes the response data packet as a parameter.
     *
     * <p>
     * Inspects the response for success and fires off the corresponding success event.
     * </p>
     *
     * @param response  The response data packet from the successful service call.
     */
    updateEmployeeSuccess: function(response) {
        console.log("EmployeeController.updateEmployeeSuccess");

        var store = this.getEmployeeStore();
        store.update(response.employee);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed service call and takes the response data packet as a parameter.
     *
     * <p>
     * Fires off the corresponding fault event.
     * </p>
     *
     * @param response  The response data packet from the successful service call.
     */
    updateEmployeeFailure: function(response) {
        console.log("EmployeeController.updateEmployeeFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_FAILURE);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the successful service call and takes the response data packet as a parameter.
     *
     * <p>
     * Inspects the response for success and fires off the corresponding success event.
     * </p>
     *
     * @param response  The response data packet from the successful service call.
     */
    deleteEmployeeSuccess: function(response) {
        console.log("EmployeeController.deleteEmployeeSuccess");

        var store = this.getEmployeeStore();
        var employee = store.findRecord("id", response.employee.id);

        store.remove(employee);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed service call and takes the response data packet as a parameter.
     *
     * <p>
     * Fires off the corresponding fault event.
     * </p>
     *
     * @param response  The response data packet from the successful service call.
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
     * Handles the login event on the application-level event bus. Grabs the username and password
     * and calls a functional method that's more testable than this event handler.
     *
     * @param event Reference to the login event. Contains the username and password.
     */
    onGetEmployeeList: function(event) {
        console.log("EmployeeController.onGetEmployeeList");

        this.getEmployeeList();
    },

    /**
     * Handles the login event on the application-level event bus. Grabs the username and password
     * and calls a functional method that's more testable than this event handler.
     *
     * @param event Reference to the login event. Contains the username and password.
     */
    onCreateEmployee: function(event) {
        console.log("EmployeeController.onCreateEmployee");

        this.createEmployee(event.employee);
    },

    /**
     * Handles the login event on the application-level event bus. Grabs the username and password
     * and calls a functional method that's more testable than this event handler.
     *
     * @param event Reference to the login event. Contains the username and password.
     */
    onUpdateEmployee: function(event) {
        console.log("EmployeeController.onUpdateEmployee");

        this.updateEmployee(event.employee);
    },

    /**
     * Handles the login event on the application-level event bus. Grabs the username and password
     * and calls a functional method that's more testable than this event handler.
     *
     * @param event Reference to the login event. Contains the username and password.
     */
    onDeleteEmployee: function(event) {
        console.log("EmployeeController.onDeleteEmployee");

        this.deleteEmployee(event.employee);
    }

});

