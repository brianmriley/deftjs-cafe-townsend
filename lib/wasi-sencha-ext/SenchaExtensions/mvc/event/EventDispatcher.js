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
 * The main purpose of this class is to provide application and business layers of the client communication by wrapping
 * the application-level event bus using simple, helper methods for adding, removing, and dispatching events:
 *
 * setupGlobalEventListeners()
 * addGlobalEventListener(type, handler, scope)
 * dispatchGlobalEvent(event, args)
 * removeGlobalEventListener()
 *
 * NOTE: removeGlobalEventListener() isn't currently implemented.
 *
 * TODO: BMR: 02/26/13: Implement removeGlobalEventListener()
 */
Ext.define("SenchaExtensions.mvc.event.EventDispatcher", {
//    extend: "Ext.app.Controller",

    statics: {

        /**
         * TODO
         */
        ROOT_APPLICATION: null
    },

    /**
     * Allows for application and business layer communication by dispatching events on the application-level event bus.
     *
     * Wrapper method for <code>this.getApplication().fireEvent(eventName, args);</code>
     *
     * ## Example
     *
     * var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGIN, username, password);
     * this.dispatchGlobalEvent(evt);
     *
     * @param {SenchaExtensions.mvc.event.AbstractEvent/Object/String} event The event object to fire containing
     * a property called 'type' or a string representing the event name or type.
     * @param {Object...} args Variable number of parameters are passed to handlers. Optional and not usually used if
     * dispatching an event that subclasses SenchaExtensions.mvc.event.AbstractEvent.
     * @return {Boolean} Returns `false` if any of the handlers return `false`, otherwise it returns `true`.
     */
    dispatchGlobalEvent: function(event, args) {

        if(event.type != null) {
            eventName = event.type;
            args = event;
        } else {
            eventName = event;
        }

        console.log("EventDispatcher.dispatchGlobalEvent: " + eventName);
        return this.getMVCApplication().fireEvent(eventName, args);
    },

    /**
     * Creates an event handler for a given event dispatched on the application-level event bus. Facilitates
     * inter-controller communication.
     *
     * Wrapper method for <code>this.getApplication().on(eventName);</code>
     *
     * ## Example
     *
     * this.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN, this.onLogin, this);
     *
     * @param {String/String[]/Object} type The name or type of the event to listen for. May also be an object who's property names are
     * event names. If the event being dispatched extends SenchaExtensions.mvc.event.AbstractEvent, the types for the event
     * should be defined as static properties of the event itself.
     * @param {Function} handler The name or type of the event to listen for. May also be an object who's property names are
     * event names.
     * @param {Object} scope This one is important so the handler fires in the correct scope
     */
    addGlobalEventListener: function(type, handler, scope) {
        console.log("EventDispatcher.addGlobalEventListener");

        this.getMVCApplication().addListener(type, handler, scope);

        // both of these work as well
//      this.getMVCApplication().addListener(type, handler, scope);
//      this.getMVCApplication().on(eventName);
    },

    /**
     * Removes an event handler for a given event dispatched on the application-level event bus.
     *
     * TODO: BMR: 01/15/13: Remove event listeners...how?
     */
    removeGlobalEventListener: function(type, handler, scope) {
        console.log("EventDispatcher.removeGlobalEventListener");

//        this.addGlobalEventListener = this.getMVCApplication().on(eventName);
    },

    /**
     * Sencha ExtJS and Touch access the reference to the application in the controller differently; in ExtJS, it's
     * this.application because it's not setup in the config object where getters/setters are automatically generated
     * whereas in Touch, it's this.getApplication(). This method aims to abstract that difference.
     *
     * @return Ext.app.Application} The Application instance this Controller is attached to. This is
     * automatically provided when using the MVC architecture so should rarely need to be set directly.
     */
    getMVCApplication: function() {

//        console.log("AbstractController.getMVCApplication: ROOT_APPLICATION = " + SenchaExtensions.mvc.event.EventDispatcher.ROOT_APPLICATION);
        if(SenchaExtensions.mvc.event.EventDispatcher.ROOT_APPLICATION == null) {
            // this is if you're using ExtJS
//        if (Ext.getVersion("extjs") && Ext.getVersion("core").isLessThan("4.2.0")) {
            if (Ext.getVersion("extjs")) {
                console.warn("AbstractController.getMVCApplication: using 'this.application' because ExtJS 4.1 and below doesn't use a getter for the root application.");
                SenchaExtensions.mvc.event.EventDispatcher.ROOT_APPLICATION = this.application;
                // this is if you're using Touch
                // TODO: BMR: 02/26/13: Might need to check for touch vr 2.0+
//        } else if(Ext.getVersion('touch')) {
            } else {
                console.info("AbstractController.getMVCApplication: using 'this.getApplication()'");
                SenchaExtensions.mvc.event.EventDispatcher.ROOT_APPLICATION = this.getApplication();
            }
        }

        return SenchaExtensions.mvc.event.EventDispatcher.ROOT_APPLICATION;
    }

});

