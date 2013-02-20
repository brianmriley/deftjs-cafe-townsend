/**
 * The authentication event contains username and password information to login the user.
 * Contains event types for login and logout.
 */
Ext.define('CafeTownsend.event.AuthenticationEvent', {
    
    statics: {
        LOGIN:          'CafeTownsend.event.AuthenticationEvent.LOGIN',
        LOGIN_SUCCESS:  'CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS',
        LOGIN_FAILURE:  'CafeTownsend.event.AuthenticationEvent.LOGIN_FAILURE',

        LOGOUT:         'CafeTownsend.event.AuthenticationEvent.LOGOUT',
        LOGOUT_SUCCESS: 'CafeTownsend.event.AuthenticationEvent.LOGOUT_SUCCESS',
        LOGOUT_FAILURE: 'CafeTownsend.event.AuthenticationEvent.LOGOUT_FAILURE'
    },

    username: '',
    password: '',

    /**
     * Constructor. Allows the username and password for authentication to be set on the event.
     *
     * @param username      The username being passed to authenticate the user.
     * @param password      The password being passed to authenticate the user.
     */
    constructor: function(username, password)
    {
        this.username = username;
        this.password = password;
    }
})