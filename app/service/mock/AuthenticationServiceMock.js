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
 * The mock authentication service object.
 */
Ext.define("CafeTownsend.service.mock.AuthenticationServiceMock", {
    extend: "SenchaExtensions.mvc.service.mock.AbstractServiceMock",

    config: {
    },

    /**
     * The mock service call.
     *
     * @param username      The username being authenticated.
     * @param password      The password being authenticated.
     * @param responder     The responder (typically a controller) that handles the success and fault for the service.
     */
    authenticate: function(username, password) {
        console.log("AuthenticationServiceMock.authenticate: username = " + username + ", password = " + password);

        var me = this;

        if(
            (password == "a") ||
            (password == "deftjs") ||
            (password == "password") ||
            (password == "qwerty")
            ) {

            var response = {
                success: true,
                sessionToken: "qwerty1234567890",
                user: {
                    firstName:"Brian",
                    lastName:"Riley"
                }
            };

            this.delayedSuccess(response);
        }
        else {
            this.delayedFailure(response);
        }
    },

    /**
     * The mock service call.
     *
     * @param responder     The responder (typically a controller) that handles the success and fault for the service.
     */
    logout: function() {
        console.log("AuthenticationServiceMock.logout");

        var response = {
            success: true
        };

        this.delayedSuccess(response, 0);
    }
});

