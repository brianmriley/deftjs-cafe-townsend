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
Ext.define("CafeTownsend.event.NavigationEvent", {
    extend: "SenchaExtensions.mvc.event.AbstractEvent",

    statics: {
        NAVIGATE:                           "CafeTownsend.event.NavigationEvent.NAVIGATE",

        RIGHT:                              "CafeTownsend.event.NavigationEvent.RIGHT",
        LEFT:                               "CafeTownsend.event.NavigationEvent.LEFT",

        ACTION_BACK_SHOW_EMPLOYEE_LIST:     "CafeTownsend.event.NavigationEvent.ACTION_BACK_SHOW_EMPLOYEE_LIST",
        ACTION_SHOW_EMPLOYEE_DETAIL:        "CafeTownsend.event.NavigationEvent.ACTION_SHOW_EMPLOYEE_DETAIL"
    },

    action: "",
    direction: "",

    /**
     *
     * @param type          The event type.
     * @param action        The string action that maps to the navigation.
     * @param direction     An optional direction property for navigation.
     */
    constructor: function(type, action, direction) {
        this.callParent(arguments);

        this.action = action;
        this.direction = direction;
    }
})