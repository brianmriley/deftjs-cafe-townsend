/**
 * The base class for services. Provides some helper methods for calling the successful and failed callbacks
 * provided by the object using this service.
 *
 * In order to use this object and ensure the callbacks work correctly, please follow these steps:
 *
 * Get a reference to your service and set the responder on it like:
 *
 * var service = this.getAuthenticationService(); // DeftJS injection
 *
 * or
 *
 * var service = Ext.create("CafeTownsend.service.AuthenticationService"); // traditional instance creation
 *
 * var responder = new CafeTownsend.service.rpc.Responder(this.logoutSuccess, this.logoutFailure, this);
 * service.setResponder(responder);
 *
 * or
 *
 * service.setResponder({
 *      success: me.loginSuccess,
 *      fault: me.loginFailure,
 *      scope: me
 * });
 *
 * Where "me" is usually this in the object using the service.
 *
 * TODO: BMR: 01/17/13: the success and fault methods can be collapsed into 1 and just use refs.
 * TODO: BMR: 02/22/13: Consider moving this to a WASI package so it's not part of this project.
 */
Ext.define("CafeTownsend.service.AbstractService", {

    requires: [
        "CafeTownsend.service.rpc.ResponderError"
    ],

    statics: {
        NO_RESPONDER_DEFINED:
            "You must provide a responder object to the service that contains either a custom defined " +
            "success method that exists on the service's caller or a default 'success()' or 'failure()' callback." +
            "Set the responder on the object by doing:\n" +
            "var responder = new CafeTownsend.service.rpc.Responder(this.logoutSuccess, this.logoutFailure, this);\n" +
            "service.setResponder(responder);\n" +
            "or\n" +
            "service.setResponder({ success: me.mySuccess, fault: me.myFailure, scope: me});"
    },

    config: {
        responder: null
    },

    /**
     * Examines the responder set for the service and attempts to execute the success callback
     * function and pass it the response.
     *
     * @param response  The data packet from the service response.
     */
    applyResponderMethod: function(response, responderMethod) {
        console.log("AbstractService.applyResponderMethod: %s", responderMethod);

        var callbackFunction = null;

        if(this.getResponder() && this.getResponder().scope)
        {
            var scope = this.getResponder().scope;

            if(this.getResponder()[responderMethod]) {
                console.log("AbstractService.success: using service caller's custom defined success callback");
                callbackFunction = this.getResponder()[responderMethod];
            } else if(typeof this.getResponder().scope[responderMethod] === "function") {
                console.log("AbstractService.success: using service caller's default 'success()' callback");
                callbackFunction = this.getResponder().scope[responderMethod];
            } else {
//                throw new CafeTownsend.service.rpc.ResponderError(CafeTownsend.service.rpc.ResponderError.NO_RESPONDER_DEFINED);
                throw new Error(
                    "["+ Ext.getDisplayName(arguments.callee) +"] " +
                    CafeTownsend.service.AbstractService.NO_RESPONDER_DEFINED
                );
            }

            console.groupEnd();

            // execute the callback
            callbackFunction.call(scope, response);

            this.setResponder(null);

        } else {
//            throw new CafeTownsend.service.rpc.ResponderError(CafeTownsend.service.rpc.ResponderError.NO_RESPONDER_DEFINED);
            throw new Error(
                "["+ Ext.getDisplayName(arguments.callee) +"] " +
                CafeTownsend.service.AbstractService.NO_RESPONDER_DEFINED
            );

        }
    },

    /**
     * Examines the responder set for the service and attempts to execute the success callback
     * function and pass it the response.
     *
     * @param response  The data packet from the service response.
     */
    success: function(response) {
        console.group("AbstractService.success");
        console.dir(response);

        // if the service response isn't successful just kick this over to the fault handler
        if((response.success != null) && (response.success !== true)) {
//            console.info("AbstractService.success: success != true so kick to fault handler");
            this.failure(response);
            return;
        }

        this.applyResponderMethod(response, "success");
        console.groupEnd();
        return;

//        if(this.getResponder() && this.getResponder().scope)
//        {
//            var scope = this.getResponder().scope;
//
//            if(this.getResponder().success) {
//                console.log("AbstractService.success: using service caller's custom defined success callback");
//                var fn = this.getResponder().success;
//            } else if(typeof this.getResponder().scope.success === "function") {
//                console.log("AbstractService.success: using service caller's default 'success()' callback");
//                var fn = this.getResponder().scope.success;
//            } else {
//                throw new Error(
//                    "["+ Ext.getDisplayName(arguments.callee) +"] " +
//                        "You must provide a responder object to the service that contains either a custom defined " +
//                        "success method that exists on the service's caller or a default 'success()' callback.\n" +
//                        "Set the responder on the object by doing: " +
//                        "service.setResponder({ success: me.mySuccess, fault: me.myFailure, scope: me});"
//                );
//            }
//
//            console.groupEnd();
//
//            // execute the callback
//            fn.call(scope, response);
//
//            this.setResponder(null);
//
//        } else {
//            throw new Error(
//                "["+ Ext.getDisplayName(arguments.callee) +"] " +
//                "You must provide a responder object in order to execute callbacks from this service.\n" +
//                "Set the responder on the object by doing: " +
//                "service.setResponder({ success: me.mySuccess, fault: me.myFailure, scope: me});"
//            );
//
//        }
    },

    /**
     * Examines the responder set for the service and attempts to execute the fault callback
     * function and pass it the fault data.
     *
     * @param response  The data packet from the service response.
     */
    failure: function(response) {
        console.group("AbstractService.failure");

        this.applyResponderMethod(response, "failure");
        console.groupEnd();
        return;

//        if(this.getResponder() && this.getResponder().scope)
//        {
//            var scope = this.getResponder().scope;
//
//            if(this.getResponder().failure) {
//                console.log("AbstractService.failure: using service caller's custom defined failure callback");
//                var fn = this.getResponder().failure;
//            } else if(typeof this.getResponder().scope.failure === "function") {
//                console.log("AbstractService.failure: using service caller's default 'failure()' callback");
//                var fn = this.getResponder().scope.failure;
//            } else {
//                throw new Error(
//                    "["+ Ext.getDisplayName(arguments.callee) +"] " +
//                        "You must provide a responder object to the service that contains either a custom defined " +
//                        "failure method that exists on the service's caller or a default 'failure()' callback.\n" +
//                        "Set the responder on the object by doing: " +
//                        "service.setResponder({ failure: me.mySuccess, failure: me.myFailure, scope: me});"
//                );
//            }
//
//            console.groupEnd();
//
//            // execute the callback
//            fn.call(scope, response);
//
//            this.setResponder(null);
//
//        } else {
//            throw new Error(
//                "["+ Ext.getDisplayName(arguments.callee) +"] " +
//                    "You must provide a responder object in order to execute callbacks from this service.\n" +
//                    "Set the responder on the object by doing: " +
//                    "service.setResponder({ failure: me.mySuccess, fault: me.myFailure, scope: me});"
//            );
//        }
//
//        console.groupEnd();
    }
});

