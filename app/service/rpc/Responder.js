/**
 * Contains references to the success and failure methods of an object making a service call.
 * It also contains a reference to the object using the Responder (which has the success and failure methods).
 */
Ext.define("CafeTownsend.service.rpc.Responder", {

    success:    null,
    failure:    null,
    scope:      null,

    /**
     * The constructor creates a Responder object with a success and failure method reference, as well as
     * scope reference to the object that creates it.
     *
     * @param success   Reference to a method that handles a successful service.
     * @param failure   Reference to a method that handles a failed service.
     * @param scope     Reference to the object that has the success and failure handler methods.
     */
    constructor: function(success, failure, scope)
    {
        this.success = success;
        this.failure = failure;
        this.scope = scope;
    }

});

