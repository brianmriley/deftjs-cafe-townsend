/*
 Copyright (c) 2013 [Sencha Extensions Contributors](mailto:admin@webappsolution.com)

 WASI Sencha Extensions is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 WASI Sencha Extensions is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with WASI Sencha Extensions.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The base class for services. Provides some helper methods for calling the successful and failed callbacks
 * provided by the client object using this service.
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
 * var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.logoutSuccess, this.logoutFailure, this);
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
 */
Ext.define("SenchaExtensions.mvc.service.AbstractService", {

    requires: [
        "SenchaExtensions.mvc.service.rpc.Responder",
        "SenchaExtensions.mvc.service.rpc.ResponderError",
        "SenchaExtensions.mvc.service.rpc.AsyncToken"
    ],

    statics: {
        NO_RESPONDER_DEFINED:
            "You must provide a responder object to the service that contains either a custom defined " +
            "success method that exists on the service's caller or a default 'success()' or 'failure()' callback." +
            "Set the responder on the object by doing:\n" +
            "var responder = new SenchaExtensions.mvc.service.rpc.Responder(this.myCustomSuccess, this.myCustomFailure, this);\n" +
            "service.setResponder(responder);\n" +
            "or\n" +
            "service.setResponder({ success: this.myCustomSuccess, fault: this.myCustomFailure, scope: this});"
    },

    config: {
        responder: null
    },

    // TODO: BMR: 02/26/13: not used and may not be...might just create a unique service instance so handlers are unique per service
//    _responder: null,
//
//    addResponder: function(responder) {
//        if(this._responder == null) {
//            _responder = {};
//        }
//
//        _responder[] = new SenchaExtensions.mvc.service.rpc.AsyncToken();
//    },

    /**
     * Examines the responder set for the service and attempts to execute the specified callback
     * function and pass it the response.
     *
     * @param response          The data packet from the service response.
     * @param responderMethod   The string property name of the responder's 'success' or 'failure' property.
     *                          Allows for hash lookup of custom defined callback methods.
     */
    applyResponderMethod: function(response, responderMethod) {
        console.log("AbstractService.applyResponderMethod: %s", responderMethod);

        var callbackFunction = null;

        if(this.getResponder() && this.getResponder().scope)
        {
            var scope = this.getResponder().scope;

            if(this.getResponder()[responderMethod]) {
                console.log("AbstractService.applyResponderMethod: using service caller's custom defined " + responderMethod + " callback");
                callbackFunction = this.getResponder()[responderMethod];
            } else if(typeof scope[responderMethod] === "function") {
                console.log("AbstractService.applyResponderMethod: using service caller's default " + responderMethod + " callback");
                callbackFunction = scope[responderMethod];
            } else {
//                throw new SenchaExtensions.mvc.service.rpc.ResponderError(SenchaExtensions.mvc.service.rpc.ResponderError.NO_RESPONDER_DEFINED);
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
//            throw new SenchaExtensions.mvc.service.rpc.ResponderError(SenchaExtensions.mvc.service.rpc.ResponderError.NO_RESPONDER_DEFINED);
            throw new Error(
                "["+ Ext.getDisplayName(arguments.callee) +"] " +
                CafeTownsend.service.AbstractService.NO_RESPONDER_DEFINED
            );

        }
    },

    /**
     * Default handler for service's successful execution. Relies on the applyResponderMethod() to
     * actually call the service's client object's (object that used the service) success handler.
     *
     * @param response  The data packet response from the successful service call.
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
    },

    /**
     * Default handler for service's failed execution. Relies on the applyResponderMethod() to
     * actually call the service's client object's (object that used the service) failure handler.
     *
     * @param response  The data packet response from the failed service call.
     */
    failure: function(response) {
        console.group("AbstractService.failure");

        this.applyResponderMethod(response, "failure");
        console.groupEnd();
        return;
    }
});

