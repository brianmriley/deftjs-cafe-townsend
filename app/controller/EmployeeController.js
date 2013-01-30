/**
 * The EmployeeController acts as the command with asynchronous callback methods for successful
 * and failed employee service calls.
 *
 * TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
 */
Ext.define("CafeTownsend.controller.EmployeeController", {
    extend: "CafeTownsend.controller.AbstractController",
//    extend: "Ext.app.Controller",

    /*
     TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
    1)  Error: Error while resolving value to inject: no dependency provider found for "function() {
        return this.constructor.apply(this, arguments);
        }".
    2)  TypeError: "undefined" is not a function(evaluating "controller.getStores()")
     */
//    extend: "Deft.mvc.ViewController",

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

        this.addGlobalEventListener({
            scope: this,
            getEmployeeListEvent: "getEmployeeListCommand"
        });
    },

    /**
     * Acts like a command object and performs authentication by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model updates.
     */
    getEmployeeListCommand: function() {
        console.log("EmployeeController.getEmployeeListCommand");

        var me = this;

        var service = this.getEmployeeService();
        service.setResponder({
            success: me.getEmployeeListSuccess,
            failure: me.getEmployeeListFailure,
            scope: me
        });

        service.getEmployeeList();
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
    getEmployeeListSuccess: function(response) {

        if (response.success === true) {
            console.log("EmployeeController.getEmployeeListSuccess");

            var store = this.getEmployeeStore();
            store.setData(response.employeeList);

            this.dispatchGlobalEvent("getEmployeeListSuccessEvent");

        } else {
            this.getEmployeeListFailure(response.message);
        }
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

        this.dispatchGlobalEvent("getEmployeeListFaultEvent");
    }

});

