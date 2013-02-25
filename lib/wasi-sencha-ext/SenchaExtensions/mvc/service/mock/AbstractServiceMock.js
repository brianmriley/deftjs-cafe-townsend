/**
 * The base class for mock services adds a delay to the asynchronous call in milliseconds.
 *
 * TODO: BMR: 01/17/13: the success and fault methods can be collapsed into 1 and just use refs.
 * TODO: BMR: 02/22/13: Consider moving this to a WASI package so it's not part of this project.
 */
Ext.define("SenchaExtensions.mvc.service.mock.AbstractServiceMock", {
    extend: "SenchaExtensions.mvc.service.AbstractService",

    statics: {
        DELAY_IN_MILLISECONDS: 1000
    },

    config: {
    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    delayedSuccess: function(response, delayInMilliSeconds) {
        console.log("AbstractServiceMock.delayedSuccess");
        var me = this;

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create("Ext.util.DelayedTask", function() {

            me.success(response);
        });

        delayInMilliSeconds = delayInMilliSeconds == null ? SenchaExtensions.mvc.service.mock.AbstractServiceMock.DELAY_IN_MILLISECONDS : delayInMilliSeconds;
        task.delay(delayInMilliSeconds);
    },

    delayedFailure: function(response, delayInMilliSeconds) {
        console.log("AbstractServiceMock.delayedFailure");
        var me = this;

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create("Ext.util.DelayedTask", function() {

            me.failure(response);
        });

        delayInMilliSeconds = delayInMilliSeconds == null ? CafeTownsend.service.mock.AbstractServiceMock.DELAY_IN_MILLISECONDS : delayInMilliSeconds;
        task.delay(delayInMilliSeconds);
    }
});

