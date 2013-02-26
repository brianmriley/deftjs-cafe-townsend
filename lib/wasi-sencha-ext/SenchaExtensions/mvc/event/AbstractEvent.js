/**
 * The base event used for all application-level event bus messaging; the type property defines the event name
 * or type that drives the event dispatching.
 */
Ext.define("SenchaExtensions.mvc.event.AbstractEvent", {

    /**
     * The event type or string name of the event.
     */
    type: "",

    /**
     * A generic data property for any event.
     */
    data: null,

    /**
     * Constructor.
     *
     * @param type  The event type or string name of the event.
     */
    constructor: function(type) {
        if( (type == null) || (type == "") ) {
            throw new Error("the parameter 'type' cannot be null or an empty string.");
        }
        console.log("AbstractEvent.Constructor: type = %s", type);
        this.type = type;
    }
})