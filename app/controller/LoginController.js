/**
 * The LoginController acts as the command with asynchronous callback methods for successful
 * and failed authentication service calls.
 *
 * TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
 */
Ext.define("CafeTownsend.controller.LoginController", {
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
        console.log("LoginController.setupGlobalEventListeners");

        this.addGlobalEventListener({
            scope: this,
            authenticateEvent: "loginCommand"
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
    loginCommand: function(model) {
        var username = model.get('username');
        var password = model.get('password');
        console.log("LoginController.loginCommand: username = " + username + ", password = " + password);

        var me = this;

        var service = this.getAuthenticationService();
        service.setResponder({
            success: me.loginSuccess,
            failure: me.loginFailure,
            scope: me
        });

        service.authenticate(username, password);
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
    loginSuccess: function(response) {

        var me = this;
//        console.dir(me);

        if (response.success === true) {
            console.log("LoginController.loginSuccess");

            // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
            me.setSessionToken(response.sessionToken);

            // broadcast an event to perform authentication
            this.dispatchGlobalEvent("authenticateSuccessEvent");
        } else {
            me.loginFailure(response.message);
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
    loginFailure: function(response) {
        console.log("LoginController.loginFailure");

        this.setSessionToken(null);
        this.dispatchGlobalEvent("authenticateFaultEvent");
    }

});

