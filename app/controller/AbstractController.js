/**
 * The abstract controller classes provides base functionality for all application controllers. The main purpose
 * of this class is to simplify inter-controller communication by wrapping the application-level event
 * bus in simple, helper methods for adding, removing, and dispatching events.
 *
 * The abstract controller is also the base class for all view mediators; we're really relying on Sencha Touch's
 * MVC design where a controller knows how to interact with a given view, so the base, abstract mediator extends
 * this abstract controller.
 */
Ext.define("CafeTownsend.controller.AbstractController", {
    extend: "Ext.app.Controller",

    /*
     TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
    1)  Error: Error while resolving value to inject: no dependency provider found for "function() {
        return this.constructor.apply(this, arguments);
        }".
    2)  TypeError: "undefined" is not a function(evaluating "controller.getStores()")
     */
//    extend: "Deft.mvc.ViewController",

    config: {
        sessionToken: null
    },

    /**
     * Sets up simple accessor method shortcuts for the global event bus.
     */
    init: function() {
        console.log("AbstractController.init");

        // TODO: BMR: 01/15/13: these bomb because this.getApplication() == null. why???
        try {
//            this.addGlobalEventListener = this.getApplication().on;
//            this.dispatchGlobalEvent = this.getApplication().fireEvent;
            this.setupGlobalEventListeners();
        } catch(err) {
            console.log("[ERROR] AbstractController.init: " +
                "\n\t " +
                "Can't get access the application property in the Controller because its undefined. " +
                "\n\t " +
                "If a concrete controller class extends this, why is this.getApplication() undefined in " +
                "AbstractController.init() ???");
        }
    },

    /**
     * Allows for inter-controller communication by dispatching events on the application-level event bus.
     *
     * Wrapper method for <code>this.getApplication().fireEvent(eventName, args);</code>
     *
     * @param {String} eventName The name of the event to fire.
     * @param {Object...} args Variable number of parameters are passed to handlers.
     * @return {Boolean} Returns `false` if any of the handlers return `false`, otherwise it returns `true`.
     */
    dispatchGlobalEvent: function(eventName, args) {
        console.log("AbstractController.dispatchGlobalEvent");

        return this.getApplication().fireEvent(eventName, args);
    },

    /**
     * Creates an event handler for a given event dispatched on the application-level event bus. Facilitates
     * inter-controller communication.
     *
     * Wrapper method for <code>this.getApplication().on(eventName);</code>
     *
     * @param {String/String[]/Object} eventName The name of the event to listen for. May also be an object who's property names are
     * event names.
     *
     * The parameter should take the form of a generic object:
     * {
     *      scope: this, // this one is important so the handler fires in the correct scope
     *      eventName: "handlerFunction" // the 'eventName' property must match the event name fired
     * }
     *
     * TODO: BMR: 01/15/13: make passing in the scope and arguments easier?
     */
    addGlobalEventListener: function(eventName) {
        console.log("AbstractController.addGlobalEventListener");

        this.addGlobalEventListener = this.getApplication().on(eventName);
    },

    /**
     * Removes an event handler for a given event dispatched on the application-level event bus.
     *
     * TODO: BMR: 01/15/13: Remove event listeners
     */
    removeGlobalEventListener: function(eventName) {
        console.log("AbstractController.removeGlobalEventListener");

//        this.addGlobalEventListener = this.getApplication().on(eventName);
    },

    /**
     * Marker method. Concrete subclasses can implement to setup listeners to the global event bus with
     * confidence that it exists.
     */
    setupGlobalEventListeners: function() {
        console.log("AbstractController.setupGlobalEventListeners");
    }

});

