/*
 Copyright (c) 2013 [Web App Solution, Inc.](mailto:admin@webappsolution.com)

 CafeTownsend Sencha Touch DeftJS PoC is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 CafeTownsend Sencha Touch DeftJS PoC is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with CafeTownsend Sencha Touch DeftJS PoC.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The main application class sets up the following:
 *
 * <ul>
 * <li>Sets up loaders and class loader dependencies</li>
 * <li>Sencha MVC infrastructure (listing out the models, views, and controllers)</li>
 * <li>WASI Sencha Extensions library</li>
 * <li>DeftJS IoC and dependencies</li>
 * <li>Adds the views to the main Viewport when the application launches</li>
 * </ul>
 *
 * TODO: BMR: 02/02/13: Add unit tests.
 * TODO: BMR: 02/22/13: Add localization.
 * TODO: BMR: 02/22/13: Add support for unique mediator instance (non-singleton) to view mapping with; bake the view into this class automatically; add support for dynamic view to mediator wiring;
 * TODO: BMR: 02/25/13: Add support for multiple responders to 1 service. AsyncToken for unique service calls so success/fault handlers are based on unique call and not overwritten.
 * TODO: BMR: 02/26/13: Build support.
 * TODO: BMR: 02/27/13: Refactor application-level event bus to it"s own object; move out of base controller. Can then inject this like in Swiz.
 * TODO: BMR: 03/04/13: Refactor executeServiceCall() method to it"s own object; move out of base controller. Can then inject this like in Swiz.
 * TODO: BMR: 03/04/13: ExtJS 4.1 and Touch 2.1 set up properties with getters/setters diff; Touch uses config, ExtJS uses
 * TODO: BMR: 03/04/13: Generate documentation with JSDuck
 * TODO: BMR: 03/04/13: Inject logger and use something other than console.log() which bombs in browsers like IE6
 */

/**
 * Set up the loader paths to the libraries. ExtJS 4.1.1.a requires us to put in an explicit path to the
 * application so the classes can be loaded correctly.
 */
Ext.Loader.setConfig({
    enabled: true,
    disableCaching:true,
    paths: {
        "CafeTownsend": "app"
    }
});


Ext.onReady(function () {
    console.log("app.onReady");

    // pull all of this in so they can be injected
    Ext.syncRequire([
        "CafeTownsend.service.AuthenticationService",
        "CafeTownsend.service.mock.AuthenticationServiceMock",
        "CafeTownsend.service.mock.EmployeeServiceMock",
        "CafeTownsend.store.EmployeeStore"
    ]);

    // Configure the DeftJS IoC container
    Deft.Injector.configure({

        authenticationServiceClass: {
            value: "CafeTownsend.service.mock.AuthenticationServiceMock"
        },

        ////////////////////////////////////////////
        // IMPL
        ////////////////////////////////////////////
//        authenticationService: "CafeTownsend.service.AuthenticationService",
        employeeStore:          "CafeTownsend.store.EmployeeStore",

        ////////////////////////////////////////////
        // MOCKS
        ////////////////////////////////////////////
        authenticationService:  "CafeTownsend.service.mock.AuthenticationServiceMock",
        employeeService:        "CafeTownsend.service.mock.EmployeeServiceMock"
    });
});

Ext.application({

    name: "CafeTownsend",

    ////////////////////////////////////////////
    // MODELS
    ////////////////////////////////////////////
    models: [
        "EmployeeModel"
    ],

    ////////////////////////////////////////////
    // VIEWS
    ////////////////////////////////////////////
    views: [
        "CafeTownsend.view.extjs.Viewport",
        "CafeTownsend.view.extjs.LoginView",
        "CafeTownsend.view.extjs.EmployeeListView",
//        "CafeTownsend.view.extjs.EmployeeDetailView"
    ],

    // list all of the controllers and view mediators for the application
    controllers:[

        ////////////////////////////////////////////
        // CONTROLLERS
        ////////////////////////////////////////////
        "AuthenticationController",
        "EmployeeController",

        ////////////////////////////////////////////
        // MEDIATORS
        ////////////////////////////////////////////
        "CafeTownsend.mediator.extjs.ViewportMediator",
        "CafeTownsend.mediator.extjs.LoginMediator",
        "CafeTownsend.mediator.extjs.EmployeeListMediator",
//        "CafeTownsend.mediator.EmployeeDetailMediator"
    ],

    /**
     * Add the views to the stage. Not optimal since we don"t need them all upfront, but it"ll get the
     * ball rolling in the right direction for a PoC.
     *
     * TODO: BMR: 02/22/13: Don"t add all the views to the stage at once. Do it on demand.
     */
    launch: function () {
        console.log("app.launch");

        // Set up QuickTips and create the Viewport
        Ext.tip.QuickTipManager.init();
        Ext.create("CafeTownsend.view.extjs.Viewport");
    }
});all upfront, but it"ll get the
     * ball rolling in the right direction for a PoC.
     *
     * TODO: BMR: 02/22/13: Don"t add all the views to the stage at once. Do it on demand.
     */
    launch: function () {
        console.log("app.launch");

        // Set up QuickTips and create the Viewport
        Ext.tip.QuickTipManager.init();
        Ext.create("CafeTownsend.view.extjs.Viewport");
    }
});