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
 * The AuthenticationController acts like a service controller with asynchronous callback methods for successful
 * and failed authentication service calls.
 */
Ext.define("CafeTownsend.controller.AuthenticationController", {
    extend: "SenchaExtensions.mvc.controller.AbstractController",

    requires: [
        "CafeTownsend.event.AuthenticationEvent",
        "SenchaExtensions.mvc.service.rpc.Responder"
    ],

    inject: [
        "authenticationService",
        "employeeStore",
        "authenticationServiceClass"
    ],

    config: {
        /**
         * @cfg {Object} authenticationService The injected authentication service from DeftJS.
         * @accessor
         */
        authenticationService: null,

        /**
         * @cfg {Object} employeeStore The injected employee store from DeftJS.
         * @accessor
         */
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

        // NOTE: You can set up the service call either using the longhand way where you need to know about the
        // use of the Responder object or you can use the framework method that does this behind the scenes: executeServiceCall()
//        var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.loginSuccess, this.loginFailure, this);
//        var service = this.getAuthenticationService();
//
//        service.setResponder(responder);
//        service.authenticate(username, password);

        var service = this.getAuthenticationService();
        this.executeServiceCall(service, service.authenticate, [username, password], this.loginSuccess, this.loginFailure, this);
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

    /**
     * Resets the session data.
     */
    resetSessionData: function() {
        console.info("AuthenticationController.resetSessionData");

        this.setSessionToken(null);
        this.getEmployeeStore().setData(null);
    },

    ////////////////////////////////////////////////
    // SERVICE SUCCESS/FAULT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the successful login service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
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
     * Handles the failed login service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
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
     * Handles the successful logout service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus. Resets the session data.
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
     * Handles the failed logout service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
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

