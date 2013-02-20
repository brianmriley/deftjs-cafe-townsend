/**
 * The basic login view for the application.
 */
Ext.define("CafeTownsend.view.LoginView", {
    extend: "Ext.form.Panel",
    alias: "widget.loginview",

    requires: [
        "Ext.form.FieldSet",
        "Ext.form.Password",
        "Ext.Label",
        "Ext.Img",
        "Ext.util.DelayedTask"
    ],

    config: {
        title: "Login",
        items: [
//            {
//                xtype: "image",
//                src: Ext.Viewport.getOrientation() == "portrait" ? "../../../img/login.png" : "../../../img/login-small.png",
//                style: Ext.Viewport.getOrientation() == "portrait" ? "width:80px;height:80px;margin:auto" : "width:40px;height:40px;margin:auto"
//            },
            {
                xtype: "fieldset",
                title: "Cafe Townsend",
                items: [
                    {
                        xtype: "textfield",
                        placeHolder: "Username",
                        itemId: "usernameTextField",
                        name: "usernameTextField",
                        required: true
                    },
                    {
                        xtype: "passwordfield",
                        placeHolder: "Password",
                        itemId: "passwordTextField",
                        name: "passwordTextField",
                        required: true
                    }
                ]
            },
            {
                xtype: "label",
                html: "Password: deftjs."
            },
            {
                xtype: "button",
                itemId: "logInButton",
                ui: "action",
                padding: "10px",
                text: "Log In"
            },
            {
                xtype: "label",
                html: "Login failed. Please enter the correct credentials.",
                itemId: "signInFailedLabel",
                hidden: true,
                hideAnimation: "fadeOut",
                showAnimation: "fadeIn",
                style: "color:#990000;margin:5px 0px;"
            }
        ]

//        listeners: [{
//            delegate: "#logInButton",
//            event: "tap",
//            fn: "onLogInButtonTap"
//        }]
    }

    ////////////////////////////////////////////////
    // FUNCTIONAL METHODS
    ////////////////////////////////////////////////

//    /**
//     * Sets the
//     * @param message
//     */
//    showSignInFailedMessage: function(message) {
//        console.log("LoginView.showSignInFailedMessage: " + message);
//        var label = this.down("#signInFailedLabel");
//        label.setHtml(message);
//        label.show();
//    },

    ////////////////////////////////////////////////
    // EVENT HANDLERS
    ////////////////////////////////////////////////

//    /**
//     * Handles the the tap event from the login button.
//     *
//     * TODO: BMR: 01/15/13: Can most likely move most of this to the LoginMediator after firing the "loginEvent"
//     */
//    onLogInButtonTap: function() {
//        console.log("LoginView.onLogInButtonTap");
//
//        var me = this;
//
//        var usernameField = me.down("#usernameTextField"),
//            passwordField = me.down("#passwordTextField"),
//            label = me.down("#signInFailedLabel");
//
//        label.hide();
//
//        var username = usernameField.getValue(),
//            password = passwordField.getValue();
//
//        // Using a delayed task in order to give the hide animation above
//        // time to finish before executing the next steps.
//        var task = Ext.create("Ext.util.DelayedTask", function() {
//
//            label.setHtml("");
//
////            me.fireEvent("loginEvent", me, username, password);
////            me.fireEvent(CafeTownsend.view.LoginView.LOGIN);
//
//            usernameField.setValue("");
//            passwordField.setValue("");
//        });
//
//        task.delay(250);
//    }


});


