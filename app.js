/**
 * The main application class sets up the following:
 *
 * <ul>
 * <li>Sets up loaders and class loader dependencies</li>
 * <li>Sencha MVC infrastructure (listing out the models, views, and controllers)</li>
 * <li>DeftJS IoC and dependencies</li>
 * <li>Adds the views to the main Viewport when the application launches</li>
 * </ul>
 *
 * TODO: BMR: 02/02/13: Add unit tests.
 * TODO: BMR: 02/22/13: Add localization.
 * TODO: BMR: 02/25/13: Wrap the store for CRUD methods.
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

    Ext.syncRequire([
        "CafeTownsend.service.AuthenticationService",
        "CafeTownsend.service.mock.AuthenticationServiceMock",
        "CafeTownsend.service.mock.EmployeeServiceMock",
        "CafeTownsend.store.EmployeeStore"
    ]);

    // Configure the DeftJS IoC container
    Deft.Injector.configure({

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
        "mediator.ViewportMediator",
        "mediator.LoginMediator",
        "mediator.EmployeeListMediator",
        "mediator.EmployeeDetailMediator"
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