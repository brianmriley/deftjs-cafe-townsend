/**
 * The login mediator essentially fulfills the passive view pattern for the login view.
 */
Ext.define("CafeTownsend.controller.mediator.LoginMediator", {
    extend: "CafeTownsend.controller.mediator.AbstractMediator",
    //    extend: "Ext.app.Controller",

    /*
     TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
     1)  Error: Error while resolving value to inject: no dependency provider found for "function() {
     return this.constructor.apply(this, arguments);
     }".
     2)  TypeError: "undefined" is not a function(evaluating "controller.getStores()")
     */
//    extend: "Deft.mvc.ViewController",

    config: {

        // create references to this mediator's views so we can listen to events and grab data from them
        refs: {
            loginView: "loginview"
        },

        // set up view event to mediator mapping
        control: {
            loginView: {
                loginEvent: "onLogin"
            }
        }
    },

    /**
     * Initializes the view mediator and sets up global event bus handlers.
     */
    init: function() {
        this.callParent();
        console.log("LoginMediator.init");

//        this.getApplication().on({
//            scope: this,
//            authenticateSuccessEvent: "onLoginSuccess"
//        });
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        console.log("LoginMediator.setupGlobalEventListeners");

        this.getApplication().on({
            scope: this,
            authenticateSuccessEvent: "onLoginSuccess"
        });

        this.getApplication().on({
            scope: this,
            authenticateFaultEvent: "onLoginFailure"
        });

        this.addGlobalEventListener({
            scope: this,
            logoutSuccessEvent: "onLogoutSuccess"
        });
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the login success event from the login controller. Currently doesn't do anything but
     * still here (for now) as a placeholder.
     */
    onLoginSuccess: function () {
        console.log("LoginMediator.onLoginSuccess");
    },

    /**
     * Handles the login failure event from the login controller.
     */
    onLoginFailure: function () {
        console.log("LoginMediator.onLoginFailure");

        var view = this.getLoginView();
        view.setMasked(false);
        view.showSignInFailedMessage("Login failed. Incorrect username or password.");
    },

    /**
     * Handles the logout success event from the logout controller. Slide the login view
     * onto stage.
     */
    onLogoutSuccess: function () {
        console.log("EmployeeListMediator.onLoginSuccess");

        var view = this.getLoginView();
        view.setMasked(false);
        Ext.Viewport.animateActiveItem(view, this.getSlideRightTransition());
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the simple login event from the login view. Grabs the username and password
     * and dispatches them to the LoginController.
     *
     * TODO: BMR: 01/16/13 Might consider using the view's API to get the username and password.
     *
     * @param view          Reference to the view that triggered this command.
     * @param username      The username being passed to authenticate the user.
     * @param password      The password being passed to authenticate the user.
     */
    onLogin: function(view, username, password) {
        console.log("LoginMediator.onLogin: username = " + username + ", password = " + password);

        var view = this.getLoginView();
        var model = Ext.create("CafeTownsend.model.UserModel");

        if (username.length === 0 || password.length === 0) {

            view.showSignInFailedMessage("Please enter your username and password.");
            return;
        }

        view.setMasked({
            xtype: "loadmask",
            message: "Signing In..."
        });

        model.set('username', username);
        model.set('password', password);

        // broadcast an event to perform authentication
        this.dispatchGlobalEvent("authenticateEvent", model);
    }

});

