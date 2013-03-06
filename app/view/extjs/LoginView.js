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
 * The basic login view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("CafeTownsend.view.extjs.LoginView", {
    extend: 'Ext.Container',
    alias: "widget.extjsLoginView",
//    controller: "CafeTownsend.mediator.LoginMediator",

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },

    items: [
        {
            xtype: 'form',
            title: "Login",

            frame: true,
            bodyPadding: "5px 5px 0",
            width: 350,
//    height: 150,
            fieldDefaults: {
                labelWidth: 125,
                msgTarget: "side",
                autoFitErrors: false
            },
            defaults: {
                width: 300,
                inputType: "password"
            },
            defaultType: "textfield",

            items: [
                {
                    fieldLabel: "Username",
                    name: "usernameTextField",
                    inputType: "text"
                },
                {
                    fieldLabel: "Password",
                    name: "passwordTextField",
                    id: "passwordTextField"
                },
                {
                    xtype: "label",
                    html: "Hint: password"
                },
                {
                    xtype: "button",
                    itemId: "logInButton",
                    ui: "login",
                    action: "login",
                    padding: "10px",
                    formBind: true,
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

    ]
});


