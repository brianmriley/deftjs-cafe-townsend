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
 */
Ext.Loader.setConfig({
    enabled: true,
    disableCaching:true,
    paths: {
        "SenchaExtensions": "lib/wasi-sencha-ext/SenchaExtensions/",
        "Deft": "lib/deft-0.8.8/Deft/"
    }
});

Ext.syncRequire([
    // DeftJS core classes
    "Deft.core.Class",
    "Deft.mixin.Controllable",
    "Deft.mixin.Injectable"
]);

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
            value: Ext.ClassManager.get("CafeTownsend.service.mock.AuthenticationServiceMock")
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
        "LoginView",
        "EmployeeListView",
        "EmployeeDetailView"
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
        "CafeTownsend.mediator.ViewportMediator",
        "CafeTownsend.mediator.LoginMediator",
        "CafeTownsend.mediator.EmployeeListMediator",
        "CafeTownsend.mediator.EmployeeDetailMediator"
    ],

    /**
     * Add the views to the stage. Not optimal since we don't need them all upfront, but it'll get the
     * ball rolling in the right direction for a PoC.
     *
     * TODO: BMR: 02/22/13: Don't add all the views to the stage at once. Do it on demand.
     */
    launch: function () {
        console.log("app.launch");

        Ext.Viewport.add([
            { xtype: "loginView" },
            { xtype: "employeeListView" },
            { xtype: "employeeDetailView" }
        ]);
    }
});