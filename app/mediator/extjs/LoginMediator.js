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
 * The login mediator essentially fulfills the passive view pattern for the login view.
 *
 * It is expected that different form factors may require a new mediator implementation as the events could be
 * different; eg, a login button on a desktop app could be click whereas mobile could be tap.
 */
Ext.define("CafeTownsend.mediator.extjs.LoginMediator", {
    extend: "SenchaExtensions.mvc.mediator.AbstractMediator",

    requires: [
        "CafeTownsend.view.extjs.LoginView",
        "CafeTownsend.event.AuthenticationEvent"
    ],

    // NOTE: Refs do not work when setting up event handlers in the control, but do create getters/setters so they
    // can be used to reference view sub-components in areas other than control
    refs: [
        {
            ref:        "loginView",
            selector:   "extjsLoginView"
        },
        {
            ref:        "logInButton",
            selector:   "extjsLoginView button[action=login]"
        },
        {
            ref:        "loginForm",
            selector:   "extjsLoginView.form"
        },
        {
            selector:   "extjsLoginView textfield[name=usernameTextField]",
            ref:        "usernameTextField"
        },
        {
            selector:   "extjsLoginView textfield[name=passwordTextField]",
            ref:        "passwordTextField"
        }
    ],

    // NOTE: this type of configuration only works in Sencha Touch 2.x
//    config: {
//
//        // create references to this mediator's views so we can listen to events and grab data from them
//        refs: {
//            loginView:              "loginView",
//            logInButton:            "loginView #logInButton",
//            usernameTextField:      "loginView #usernameTextField",
//            passwordTextField:      "loginView #passwordTextField"
//        },
//
        // set up view event to mediator mapping
//        control: {
//            logInButton: {
//                tap: "onLoginButtonClick"
//            }
//        }
//    },

    // NOTE: Using the control object in the object config in ExtJS does not work like it does in Touch 2.x
//    control: {
//        "extjsLoginView button[action=login]": {
//            click: this.onLoginButtonClick
//        }
//        logInButton: {
//            click: this.onLoginButtonClick
//        }
//    },

    ////////////////////////////////////////////////
    // FUNCTIONAL METHODS
    ////////////////////////////////////////////////

    /**
     * Sets up view component event handlers.
     */
    init: function() {
        this.callParent(arguments);
        console.log("LoginMediator.init");

        this.addEventListenerBySelector("extjsLoginView button[action=login]", "click", this.onLoginButtonClick);
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        console.log("LoginMediator.setupGlobalEventListeners");

        this.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);
        this.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN_FAILURE, this.onLoginFailure, this);
        this.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGOUT_SUCCESS, this.onLogoutSuccess, this);
    },

    /**
     * The functional, testable login method. Show a loading mask and dispatch the application-level login event.
     *
     * @param username      The username being passed to authenticate the user.
     * @param password      The password being passed to authenticate the user.
     */
    login: function(username, password) {
        console.log("LoginMediator.login: username = " + username + ", password = " + password);

        var view = this.getLoginView();

        this.reset();

        // TODO: wrap masking
        view.mask({
            xtype: "loadmask",
            message: "Signing In..."
        });
//        view.mask("Signing In...");

        var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGIN, username, password);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Shows the login failed label.
     *
     * @param message   The message string displayed for a failed login.
     */
    showSignInFailedMessage: function(message) {
        console.log("LoginMediator.showSignInFailedMessage: " + message);

        var label = this.getComponentById("signInFailedLabel", this.getLoginView());
        label.setText(message);
        label.show();
    },

    /**
     * Determines if the credentials are valid for login.
     *
     * @param username      The username being passed to authenticate the user.
     * @param password      The password being passed to authenticate the user.
     * @return {Boolean}    Flag indicating if the supplied username and password are valid.
     */
    areLoginCredentialsValid: function(username, password) {
        return (username.length !== 0 && password.length !== 0);
    },

    /**
     * Resets the view's login fields.
     */
    reset: function() {
        this.getUsernameTextField().setValue("");
        this.getPasswordTextField().setValue("");
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the login success event from the login controller. Removes the loading mask from the view.
     */
    onLoginSuccess: function() {
        console.log("LoginMediator.onLoginSuccess");

        var view = this.getLoginView();
        view.unmask();
    },

    /**
     * Handles the logout success event from the logout controller. Slide the login view
     * onto stage.
     */
    onLogoutSuccess: function() {
        console.log("LoginMediator.onLoginSuccess");

        var view = this.getLoginView();
        view.unmask();

        this.navigate(CafeTownsend.event.AuthenticationEvent.LOGOUT_SUCCESS);
    },

    /**
     * Handles the login failure event from the login controller. Removes the loading mask from the view.
     * Shows the faied login message.
     */
    onLoginFailure: function() {
        console.log("LoginMediator.onLoginFailure");

        var view = this.getLoginView();
        view.unmask();

        this.showSignInFailedMessage("Login failed. Incorrect username or password.");
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the simple tap event from the login view's submit button. Grabs the username and password
     * and passes them to the testable login method if the login credentials are valid.
     *
     * @param event The tap event from the login button on the login view.
     */
    onLoginButtonClick: function(event) {
        console.log("LoginMediator.onLoginButtonClick");

        var username = this.getUsernameTextField().getValue();
        var password = this.getPasswordTextField().getValue();

        // NOTE: if you don't reference a component multiple times you don't need to create a ref to it can simply
        // gain access to it with the method: getComponentById()
        var label = this.getComponentById("signInFailedLabel", this.getLoginView());
        var me = this;

        label.hide();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create("Ext.util.DelayedTask", function() {

            label.setText("");

            if(me.areLoginCredentialsValid(username, password)) {
                me.login(username, password);
            } else {
                me.showSignInFailedMessage("Please enter your username and password.")
            }
        });

        task.delay(250);
    }

});

