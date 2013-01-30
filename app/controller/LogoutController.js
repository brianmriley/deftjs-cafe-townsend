/**
 * The LogoutController acts as the command with asynchronous callback methods for successful
 * and failed authentication service calls.
 *
 * TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
 */
Ext.define("CafeTownsend.controller.LogoutController", {
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

    inject: ["authenticationService"],

    // TODO: BMR: 01/16/13: Need to inject this...would like to use Deft
//    requires: [
//        "CafeTownsend.service.AuthenticationService"
//    ],

    config: {

        // create a public property so we can inject our service
        authenticationService: null

    },

    /**
     * Sets up global event bus handlers.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        console.log("LogoutController.setupGlobalEventListeners");

        this.addGlobalEventListener({
            scope: this,
            logoutEvent: "logoutCommand"
        });
    },

    /**
     * Acts like a command object and performs authentication by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model updates.
     *
     * @param username      The username being passed to authenticate the user.
     * @param password      The password being passed to authenticate the user.
     */
    logoutCommand: function(username, password) {
        console.log("LogoutController.logoutCommand: username = " + username + ", password = " + password);

        var me = this;
        var service = this.getAuthenticationService();
        service.setResponder({
            success: me.logoutSuccess,
            failure: me.logoutFailure,
            scope: me
        });

        service.logout();

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
    logoutSuccess: function(response) {

        var me = this;

        if (response.success === true) {
            console.log("LogoutController.logoutSuccess");

            this.setSessionToken(null);
            this.dispatchGlobalEvent("logoutSuccessEvent");
        } else {
            me.logoutFailure(response.message);
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
    logoutFailure: function(response) {
        console.log("LogoutController.logoutFailure");

        this.setSessionToken(null);
        this.dispatchGlobalEvent("logoutFaultEvent");
    }

});

