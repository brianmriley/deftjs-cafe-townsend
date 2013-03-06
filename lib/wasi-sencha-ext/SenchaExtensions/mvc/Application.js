/*
 Copyright (c) 2013 [Sencha Extensions Contributors](mailto:admin@webappsolution.com)

 WASI Sencha Extensions is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 WASI Sencha Extensions is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with WASI Sencha Extensions.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * TODO
 */
Ext.define("SenchaExtensions.mvc.Application", {
    extend: "Ext.app.Application",
    alternateClassName: ["SenchaExtensions.Application"],

    config: {
        appEventDispatcher: null
    },

    /**
     * TODO
     */
    instantiateControllers: function() {
        this.callParent(arguments);
        console.log("Application.instantiateControllers");

        Ext.create("SenchaExtensions.mvc.event.EventDispatcher", {
            application: this
        });
    }

});

