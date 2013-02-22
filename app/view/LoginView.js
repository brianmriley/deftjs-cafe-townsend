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
                html: "Password: password."
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
    }
});


