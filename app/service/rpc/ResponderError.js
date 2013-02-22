/**
 * The authentication event contains username and password information to login the user.
 * Contains event types for login and logout.
 *
 * TODO: BMR: 02/20/2013: Need to make this work. Not being used right now.
 * TODO: BMR: 02/22/13: Consider moving this to a WASI package so it's not part of this project.
 */
Ext.define("CafeTownsend.service.rpc.ResponderError", {

    extend: "Error",

    statics: {
        NO_RESPONDER_DEFINED:
                "You must provide a responder object to the service that contains either a custom defined " +
                "success method that exists on the service's caller or a default 'success()' callback.\n" +
                "Set the responder on the object by doing:\n" +
                "var responder = new CafeTownsend.service.rpc.Responder(this.logoutSuccess, this.logoutFailure, this);\n" +
                "service.setResponder(responder);" +
                "or\n" +
                "service.setResponder({ success: me.mySuccess, fault: me.myFailure, scope: me});",
    },

    constructor: function(msg)
    {
        var msg =
            "["+ Ext.getDisplayName(arguments.callee) +"] " +
            msg;

        this.callParent(msg);


    }
})