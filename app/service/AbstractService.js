/**
 * The base class for services. Provides some helper methods for calling the successful and failed callbacks
 * provided by the object using this service.
 *
 * In order to use this object and ensure the callbacks work correctly, please follow these steps:
 *
 * Get a reference to your service and set the responder on it like:
 *
 * var service = this.getAuthenticationService();
 * or
 * var service = Ext.create("CafeTownsend.service.AuthenticationService");
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
 */
Ext.define("CafeTownsend.service.AbstractService", {

    config: {
        responder: null
    },

    /**
     * Examines the responder set for the service and attempts to execute the success callback
     * function and pass it the response.
     *
     * @param response  The data packet from the service response.
     */
    success: function(response) {
//        console.log("AbstractService.success");

        if(this.getResponder() && this.getResponder().scope)
        {
//            console.dir(response);
            var scope = this.getResponder().scope;

            if(this.getResponder().success) {
                console.log("AbstractService.success: using service caller's custom defined success callback");
                var fn = this.getResponder().success;
            } else if(typeof this.getResponder().scope.success === "function") {
                console.log("AbstractService.success: using service caller's default 'success()' callback");
                var fn = this.getResponder().scope.success;
            } else {
                throw new Error(
                    "["+ Ext.getDisplayName(arguments.callee) +"] " +
                        "You must provide a responder object to the service that contains either a custom defined " +
                        "success method that exists on the service's caller or a default 'success()' callback.\n" +
                        "Set the responder on the object by doing: " +
                        "service.setResponder({ success: me.mySuccess, fault: me.myFailure, scope: me});"
                );
            }

            // execute the callback
            fn.call(scope, response);

            this.setResponder(null);

        } else {
            throw new Error(
                "["+ Ext.getDisplayName(arguments.callee) +"] " +
                "You must provide a responder object in order to execute callbacks from this service.\n" +
                "Set the responder on the object by doing: " +
                "service.setResponder({ success: me.mySuccess, fault: me.myFailure, scope: me});"
            );
        }
    },

    /**
     * Examines the responder set for the service and attempts to execute the fault callback
     * function and pass it the fault data.
     *
     * @param response  The data packet from the service response.
     */
    failure: function(response) {
//        console.log("AbstractService.failure");

        if(this.getResponder() && this.getResponder().scope)
        {
//            console.dir(response);
            var scope = this.getResponder().scope;

            if(this.getResponder().failure) {
                console.log("AbstractService.failure: using service caller's custom defined failure callback");
                var fn = this.getResponder().failure;
            } else if(typeof this.getResponder().scope.failure === "function") {
                console.log("AbstractService.failure: using service caller's default 'failure()' callback");
                var fn = this.getResponder().scope.failure;
            } else {
                throw new Error(
                    "["+ Ext.getDisplayName(arguments.callee) +"] " +
                        "You must provide a responder object to the service that contains either a custom defined " +
                        "failure method that exists on the service's caller or a default 'failure()' callback.\n" +
                        "Set the responder on the object by doing: " +
                        "service.setResponder({ failure: me.mySuccess, failure: me.myFailure, scope: me});"
                );
            }

            // execute the callback
            fn.call(scope, response);

            this.setResponder(null);

        } else {
            throw new Error(
                "["+ Ext.getDisplayName(arguments.callee) +"] " +
                    "You must provide a responder object in order to execute callbacks from this service.\n" +
                    "Set the responder on the object by doing: " +
                    "service.setResponder({ failure: me.mySuccess, fault: me.myFailure, scope: me});"
            );
        }
    }
});

