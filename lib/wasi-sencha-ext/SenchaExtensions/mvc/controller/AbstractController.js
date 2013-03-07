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
 * The abstract controller class provides base functionality for all application controllers. The main purpose
 * of this class is to simplify inter-controller communication by wrapping the application-level event
 * bus using simple, helper methods for adding, removing, and dispatching events:
 *
 * setupGlobalEventListeners()
 * addGlobalEventListener(type, handler, scope)
 * dispatchGlobalEvent(event, args)
 * removeGlobalEventListener()
 *
 * NOTE: removeGlobalEventListener() isn't currently implemented.
 *
 * In addition, the abstract controller provides some convenience methods that simplify service calls that use custom
 * success and failure handlers:
 *
 * executeServiceCall(service, method, args, success, failure, scope)
 *
 * The abstract controller is also the base class for all view mediators; we're really relying on Sencha
 * MVC design where a controller knows how to interact with a given view, so the base, abstract mediator extends
 * this abstract controller.
 *
 * TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
 * 1)  Error: Error while resolving value to inject: no dependency provider found for "function() { return this.constructor.apply(this, arguments); }".
 * 2)  TypeError: "undefined" is not a function(evaluating "controller.getStores()")
 *
 * TODO: BMR: 02/26/13: Implement removeGlobalEventListener()
 */
Ext.define("SenchaExtensions.mvc.controller.AbstractController", {
    extend: "Ext.app.Controller",

    statics: {

        /**
         * TODO
         */
        ROOT_APPLICATION: null
    },

    config: {

        /**
         * @cfg {String} sessionToken The session token for the Application. This should be a single string without
         * spaces or periods because it is used as the Application's global namespace.
         * @accessor
         */
        sessionToken: null
    },

    /**
     * Sets up simple accessor method shortcuts for the global event bus.
     */
    init: function() {
        console.log("AbstractController.init");

        // TODO: BMR: 01/15/13: this has bombed because this.getApplication() can == null. haven't seen since initial development
        try {
            this.setupGlobalEventListeners();
        } catch(err) {
            console.log("[ERROR] AbstractController.init: " +
                "\n\t " +
                "Can't get access to the application property in the Controller because its undefined. " +
                "\n\t " +
                "If a concrete controller class extends this, why is this.getApplication() undefined in " +
                "AbstractController.init() ???");
        }
    },

    /**
     * Marker method. Concrete subclasses can implement to setup listeners to the global event bus with
     * confidence that it exists. This is called during the initialization phase of the controller to ensure
     * the reference to the application exists when adding event listeners to it.
     */
    setupGlobalEventListeners: function() {
        console.log("AbstractController.setupGlobalEventListeners");
    },

    /**
     * Allows for inter-controller communication by dispatching events on the application-level event bus.
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

        console.log("AbstractController.dispatchGlobalEvent: " + eventName);
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
        console.log("AbstractController.addGlobalEventListener");

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
        console.log("AbstractController.removeGlobalEventListener");

//        this.addGlobalEventListener = this.getMVCApplication().on(eventName);
    },

    /**
     * Simplifies the process of executing a service call that requires custom asynchronous success and failure
     * handlers; create a responder object and add it to the service before making the actual service call.
     *
     * Note that the service call isn't passed in as a function that actually executes the service; it's passed
     * in via a reference to the service object, the actual service method, and the service method's parameters.
     * This is done to prevent the service call from being executed before the responder is being set on it.
     *
     * ## Example
     *
     * var service = this.getAuthenticationService();
     * this.executeServiceCall(service, service.authenticate, [username, password], this.loginSuccess, this.loginFailure, this);
     *
     * @param {Object} service Reference to the actual service.
     * @param {Function} method Reference to the method on the service object that makes the call.
     * @param {Array} args Array of parameters used in the service calls method.
     * @param success
     * @param failure
     * @param scope
     *
     * TODO: BMR: 02/26/13: Currently each service can only have 1 responder at a time since the injected service is a singleton within each controller...need to fix this.
     */
    executeServiceCall: function(service, method, args, success, failure, scope) {
        console.log("AbstractController.executeServiceCall");

        var responder = new SenchaExtensions.mvc.service.rpc.Responder(success, failure, scope);

        // set the responder on the service before executing the call
        service.setResponder(responder);
        method.apply(service, args);
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
//        console.log("AbstractController.getMVCApplication: ROOT_APPLICATION = " + SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION);
        if(SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION == null) {
            // this is if you're using ExtJS
//        if (Ext.getVersion("extjs") && Ext.getVersion("core").isLessThan("4.2.0")) {
            if (Ext.getVersion("extjs")) {
                console.warn("AbstractController.getMVCApplication: using 'this.application' because ExtJS 4.1 and below doesn't use a getter for the root application.");
                SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION = this.application;
                // this is if you're using Touch
                // TODO: BMR: 02/26/13: Might need to check for touch vr 2.0+
//        } else if(Ext.getVersion('touch')) {
            } else {
                console.info("AbstractController.getMVCApplication: using 'this.getApplication()'");
                SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION = this.getApplication();
            }
        }

        return SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION;
    },

    /**
     * TODO
     */
    getService: function(className) {
        if(className) {
            className = (className.value != null) ? className.value : className;
        }
        console.log("AbstractController.getService: using '%s'", className);
        var clazz = Ext.ClassManager.get(className);
        return new clazz();
    }

});

