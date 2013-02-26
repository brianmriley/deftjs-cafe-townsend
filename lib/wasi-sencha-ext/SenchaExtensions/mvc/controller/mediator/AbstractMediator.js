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
 * base controller (since we're really relying on Sencha MVC infrastructure where a controller knows how to
 * interact with a given view); the basic global event bus functionality is currently implemented in the
 * base, abstract controller as well.
 *
 * Consider using DeftJS here so a mediator is created and destroyed with it's accompanying view. The other issue
 * we'll run into without DeftJS view controller support is that currently the controller's (and hence all mediators)
 * are singletons -- we really want the ability to create a unique mediator instance for each view.
 *
 * TODO: BMR: 02/22/13: Find a way to bake the view into this class automatically.
 */
Ext.define("SenchaExtensions.mvc.controller.mediator.AbstractMediator", {
    extend: "SenchaExtensions.mvc.controller.AbstractController",

    /**
     * Simple utility method used to gain a reference to a view's sub-component by ID.
     *
     * @param {String} id The unique ID of the component to search for.
     * @param {Object} view The object to search for the component in.
     * @return {*} Reference to a component.
     */
    getComponentById: function(id, view) {
        return view.down("#" + id);
    },

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
    },

    /**
     * TODO: BMR: Consider moving this to a new base mediator for this project only.
     */
    navigate: function(action) {
        var evt = new CafeTownsend.event.NavigationEvent(CafeTownsend.event.NavigationEvent.NAVIGATE, action);
        this.dispatchGlobalEvent(evt);
    }

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

});

