/**
 * The mediator essentially fulfills the passive view pattern for a given view -- acts like a view controller,
 * but chose to use the suffix Mediator simply to distinguish it from application controllers that interact with
 * services and models.
 *
 * Handles view events, typically generated from user gestures, manipulates the view with animations, transitions,
 * and/or dynamically building components within the view, and works with the views  API (again with events)
 * but also by way of getters and setters in order to bind data to and from the view.
 *
 * Currently the abstract mediator doesn't provide much in terms of base functionality as it extends from the
 * base controller (since we're really relying on Sencha Touch's MVC design where a controller knows how to
 * interact with a given view); the basic global event bus functionality is currently implemented in the
 * base, abstract controller.
 *
 * Consider using DeftJS here so a mediator is created and destroyed with it's accompanying view. The other issue
 * we'll run into without DeftJS is that currently the controller's (and hence all mediators) are singletons -- we
 * really want the ability to create a unique mediator instance for each view; again, DeftJS can help us here.
 */
Ext.define("CafeTownsend.controller.mediator.AbstractMediator", {
    extend: "CafeTownsend.controller.AbstractController",
    //    extend: "Ext.app.Controller",

    /*
     TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
    1)  Error: Error while resolving value to inject: no dependency provider found for "function() {
        return this.constructor.apply(this, arguments);
        }".
    2)  TypeError: "undefined" is not a function(evaluating "controller.getStores()")
     */
//    extend: "Deft.mvc.ViewController",

    config: {
    },

    getComponentById: function(id, view) {
        return view.down("#" + id);
    },

//    /**
//     * Provides a simple helper method to show masks on the view.
//     *
//     * @param arg
//     * @param message
//     * @param view
//     */
//    setMasked: function(arg, message, view) {
//        if(message === null) {
//            message = "Loadng...";
//        }
//
//        if(arg !== false) {
//            arg = {
//                xtype: "loadmask",
//                message: message
//            };
//        }
//
//        if(view === null) {
//            view = Ext.Viewport;
//        }
//
//        view.setMasked(arg);
//    },

    /**
     * Provides a simple slide left animation for our views.
     *
     * @return {Object} The transition object.
     */
    getSlideLeftTransition: function() {
        return { type: "slide", direction: "left" };
    },

    /**
     * Provides a simple slide right animation for our views.
     *
     * @return {Object} The transition object.
     */
    getSlideRightTransition: function() {
        return { type: "slide", direction: "right" };
    }

});

