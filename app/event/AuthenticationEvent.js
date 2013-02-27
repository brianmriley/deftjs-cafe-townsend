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
 * The authentication event contains data and event types to login/out the user.
 */
Ext.define("CafeTownsend.event.AuthenticationEvent", {
    extend: "SenchaExtensions.mvc.event.AbstractEvent",

    statics: {
        LOGIN:          "CafeTownsend.event.AuthenticationEvent.LOGIN",
        LOGIN_SUCCESS:  "CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS",
        LOGIN_FAILURE:  "CafeTownsend.event.AuthenticationEvent.LOGIN_FAILURE",

        LOGOUT:         "CafeTownsend.event.AuthenticationEvent.LOGOUT",
        LOGOUT_SUCCESS: "CafeTownsend.event.AuthenticationEvent.LOGOUT_SUCCESS",
        LOGOUT_FAILURE: "CafeTownsend.event.AuthenticationEvent.LOGOUT_FAILURE"
    },

    /**
     * The username property usually associated with user login.
     */
    username: "",

    /**
     * The password property usually associated with user login.
     */
    password: "",

    /**
     * Constructor. Allows the username and password for authentication to be set on the event.
     *
     * @param type          The event type.
     * @param username      The username being passed to authenticate the user.
     * @param password      The password being passed to authenticate the user.
     */
    constructor: function(type, username, password) {
        this.callParent(arguments);

        this.username = username;
        this.password = password;
    }
})