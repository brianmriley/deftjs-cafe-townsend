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
 * The authentication service object.
 */
Ext.define("CafeTownsend.service.AuthenticationService", {
    extend: "SenchaExtensions.mvc.service.AbstractService",

    config: {
    },

    /**
     * The login ajax service call. Hits a json service and handles the success and fault accordingly.
     *
     * @param username      The username being authenticated.
     * @param password      The password being authenticated.
     * @param responder     The responder (typically a controller) that handles the success and fault for the service.
     */
    authenticate: function(username, password) {
        console.log("AuthenticationService.authenticate: username = " + username + ", password = " + password);

        Ext.Ajax.request({
            url: "data/login-success.json",
            method: "post",
            params: {
                user: username,
                pwd: password
            },

            success: function(response) {
                console.log("AuthenticationService.authenticate.success");

                var response = Ext.JSON.decode(response.responseText);
                this.success(response);
            },

            failure: function(response) {
                console.log("AuthenticationService.authenticate.failure");
                this.failure(response);
            }
        });
    },

    /**
     * The logout ajax service call. Hits a json service and handles the success and fault accordingly.
     */
    logout: function() {
        console.log("AuthenticationService.logout");

        Ext.Ajax.request({
            url: "data/logout-success.json",
            method: "post",

            success: function(response) {
                console.log("AuthenticationService.logout.success");

                var response = Ext.JSON.decode(response.responseText);
                this.success(response);
            },

            failure: function(response) {
                console.log("AuthenticationService.logout.failure");
                this.failure(response);
            }
        });
    }

});

