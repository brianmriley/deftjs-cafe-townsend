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
     * Constructor. Allows the username and password for authentication to be set on the event.
     *
     * TODO
     */
    constructor: function(type, action, direction) {
        this.callParent(arguments);

        this.action = action;
        this.direction = direction;
    }
})