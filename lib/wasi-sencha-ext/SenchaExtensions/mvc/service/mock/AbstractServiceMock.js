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
 * The base class for mock services adds a delay to the mock asynchronous network call in milliseconds.
 */
Ext.define("SenchaExtensions.mvc.service.mock.AbstractServiceMock", {
    extend: "SenchaExtensions.mvc.service.AbstractService",

    statics: {
        DELAY_IN_MILLISECONDS: 1000
    },

    config: {
    },

    /**
     * Used by mock services to call a successful mock service callback with a time delay to mimic network traffic.
     *
     * @param {*} response Contains the data packet from the successful service response.
     * @param {Number} delayInMilliSeconds The number of milliseconds to delay the mock service callback.
     */
    delayedSuccess: function(response, delayInMilliSeconds) {
        console.log("AbstractServiceMock.delayedSuccess");
        var me = this;

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create("Ext.util.DelayedTask", function() {

            me.success(response);
        });

        delayInMilliSeconds = this.getDelayInMilliSeconds(delayInMilliSeconds);
        task.delay(delayInMilliSeconds);
    },

    /**
     * Used by mock services to call a failed mock service callback with a time delay to mimic network traffic.
     *
     * @param {*} response Contains the data packet from the failed service response.
     * @param {Number} delayInMilliSeconds The number of milliseconds to delay the mock service callback.
     */
    delayedFailure: function(response, delayInMilliSeconds) {
        console.log("AbstractServiceMock.delayedFailure");
        var me = this;

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create("Ext.util.DelayedTask", function() {

            me.failure(response);
        });

        delayInMilliSeconds = this.getDelayInMilliSeconds(delayInMilliSeconds);
        task.delay(delayInMilliSeconds);
    },

    /**
     * Helper method used to get the number of milliseconds to delay the mock service callback.
     *
     * @param {Number} delayInMilliSeconds The number of milliseconds to delay the mock service callback.
     * @return {Number} The number of milliseconds to delay the mock service callback.
     */
    getDelayInMilliSeconds: function(delayInMilliSeconds) {
        console.log("AbstractServiceMock.getDelayInMilliSeconds");

        return (delayInMilliSeconds == null) ? SenchaExtensions.mvc.service.mock.AbstractServiceMock.DELAY_IN_MILLISECONDS : delayInMilliSeconds;
    },

    /**
     * Helper method to create random numbers within a given range. Helpful for mocking data.
     *
     * @param {Number} min The minimum or low end of the range.
     * @param {Number} max The maximum or high end of the range.
     * @return {Number} The random generated number.
     */
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});

