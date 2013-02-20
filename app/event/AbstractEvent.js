/**
 * The authentication event contains username and password information to login the user.
 * Contains event types for login and logout.
 */
Ext.define('CafeTownsend.event.AbstractEvent', {
    
    type: '',

    constructor: function(type, password)
    {
        this.type = type;
    }
})