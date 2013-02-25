/**
 * The AuthenticationController acts as the command with asynchronous callback methods for successful
 * and failed authentication service calls.
 *
 * TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
 * 1)  Error: Error while resolving value to inject: no dependency provider found for "function() { return this.constructor.apply(this, arguments); }".
 * 2)  TypeError: "undefined" is not a function(evaluating "controller.getStores()")
 */
Ext.define("CafeTownsend.controller.AuthenticationController", {
    extend: "SenchaExtensions.mvc.controller.AbstractController",

    requires: [
        "CafeTownsend.event.AuthenticationEvent",
        "SenchaExtensions.mvc.service.rpc.Responder"
    ],

    inject: [
        "authenticationService",
        "employeeStore"
    ],

    config: {
        // create a public property so we can inject our service
        authenticationService: null,

        // create a public property so we can inject our store
        employeeStore: null
    },

    /**
     * Sets up global event bus handlers.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        console.log("AuthenticationController.setupGlobalEventListeners");

        this.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN, this.onLogin, this);
        this.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGOUT, this.onLogout, this);
    },

    /**
     * Acts like a command object and performs authentication by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model updates.
     *
     * @param username      The username being passed to authenticate the user.
     * @param password      The password being passed to authenticate the user.
     */
    login: function(username, password) {
        console.log("AuthenticationController.login: username = " + username + ", password = " + password);

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.loginSuccess, this.loginFailure, this);
        var service = this.getAuthenticationService();

        service.setResponder(responder);
        service.authenticate(username, password);
    },

    /**
     * Acts like a command object and performs logout by using the referenced service.
     * Handles successful and failed service calls and broadcasts global events reflecting thus
     * upon service completion and model updates.
     */
    logout: function() {
        console.log("AuthenticationController.logout");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.logoutSuccess, this.logoutFailure, this);
        var service = this.getAuthenticationService();

        service.setResponder(responder);
        service.logout();

    },

    resetSessionData: function() {
        console.info("AuthenticationController.resetSessionData");

        this.setSessionToken(null);
        this.getEmployeeStore().setData(null);
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
    loginSuccess: function(response) {
        console.info("AuthenticationController.loginSuccess");

        // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
        this.setSessionToken(response.sessionToken);

        var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed service call and takes the response data packet as a parameter.
     *
     * <p>
     * Fires off the corresponding fault event.
     * </p>
     *
     * @param response  The response data packet from the failed service call.
     */
    loginFailure: function(response) {
        console.warn("AuthenticationController.loginFailure");

        this.resetSessionData();

        var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGIN_FAILURE);
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
    logoutSuccess: function(response) {
        console.info("AuthenticationController.logoutSuccess");

        this.resetSessionData();

        var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGOUT_SUCCESS);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed service call and takes the response data packet as a parameter.
     *
     * <p>
     * Fires off the corresponding fault event.
     * </p>
     *
     * @param response  The response data packet from the failed service call.
     */
    logoutFailure: function(response) {
        console.warn("AuthenticationController.logoutFailure");

        this.resetSessionData();

        var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGOUT_FAILURE);
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
    onLogin: function(event) {
        var username = event.username;
        var password = event.password;
        console.log("AuthenticationController.onLogin: username = %s, password = %s", username, password);

        this.login(username, password);
    },

    /**
     * Handles the simple logout event on the application-level event bus and calls a functional method that's more
     * testable than this event handler.
     *
     * @param event Reference to the logout event.
     */
    onLogout: function(event) {
        console.log("AuthenticationController.onLogout");

        this.logout();
    }

});

