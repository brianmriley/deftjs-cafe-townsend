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
 * The abstract mediator provides base functionality for all CafeTownsend mediators.
 */
Ext.define("CafeTownsend.mediator.AbstractMediator", {
    extend: "SenchaExtensions.mvc.mediator.AbstractMediator",

    /**
     * Broadcasts a navigate event on application-level event bus.
     *
     * @param {String} action   The action used to map the next navigation sequence.
     */
    navigate: function(action) {
        console.log("AbstractMediator.navigate");
        var evt = new CafeTownsend.event.NavigationEvent(CafeTownsend.event.NavigationEvent.NAVIGATE, action);
        this.dispatchGlobalEvent(evt);
    }

});

