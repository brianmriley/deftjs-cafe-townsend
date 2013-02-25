/**
 * The mock authentication service object.
 */
Ext.define("CafeTownsend.service.mock.AuthenticationServiceMock", {
    extend: "SenchaExtensions.mvc.service.mock.AbstractServiceMock",

    config: {
    },

    /**
     * The mock service call.
     *
     * @param username      The username being authenticated.
     * @param password      The password being authenticated.
     * @param responder     The responder (typically a controller) that handles the success and fault for the service.
     */
    authenticate: function(username, password) {
        console.log("AuthenticationServiceMock.authenticate: username = " + username + ", password = " + password);

        var me = this;

        if(
            (password == "a") ||
            (password == "deftjs") ||
            (password == "password") ||
            (password == "qwerty")
            ) {

            var response = {
                success: true,
                sessionToken: "qwerty1234567890",
                user: {
                    firstName:"Brian",
                    lastName:"Riley"
                }
            };

            this.delayedSuccess(response);
        }
        else {
            this.delayedFailure(response);
        }
    },

    /**
     * The mock service call.
     *
     * @param responder     The responder (typically a controller) that handles the success and fault for the service.
     */
    logout: function() {
        console.log("AuthenticationServiceMock.logout");

        var response = {
            success: true
        };

        this.delayedSuccess(response, 0);
    }
});

