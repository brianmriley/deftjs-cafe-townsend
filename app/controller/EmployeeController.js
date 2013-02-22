/**
 * The EmployeeController acts as the command with asynchronous callback methods for successful
 * and failed employee service calls.
 *
 * TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
 * 1)  Error: Error while resolving value to inject: no dependency provider found for "function() { return this.constructor.apply(this, arguments); }".
 * 2)  TypeError: "undefined" is not a function(evaluating "controller.getStores()")
 */
Ext.define("CafeTownsend.controller.EmployeeController", {
    extend: "CafeTownsend.controller.AbstractController",

    requires: [
        "CafeTownsend.event.EmployeeEvent",
        "CafeTownsend.service.rpc.Responder"
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
    },

    /**
     * Acts like a command object and performs authentication by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model updates.
     */
    getEmployeeListCommand: function() {
        console.log("EmployeeController.getEmployeeListCommand");

        var responder = new CafeTownsend.service.rpc.Responder(this.getEmployeeListSuccess, this.getEmployeeListFailure, this);
        var service = this.getEmployeeService();

        service.setResponder(responder);
        service.getEmployeeList();
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

        this.getEmployeeListCommand();
    }

});

