/**
 * The base event used for all application-level event bus messaging.
 *
 * TODO: BMR: 02/22/13: Consider moving this to a WASI package so it's not part of this project.
 */
Ext.define("CafeTownsend.event.AbstractEvent", {

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