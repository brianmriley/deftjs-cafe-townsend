/**
 * The main application class sets up the following:
 *
 * <ul>
 * <li>Sets up loaders and class loader dependencies</li>
 * <li>Sencha MVC infrastructure (listing out the models, views, and controllers)</li>
 * <li>DeftJS IoC and dependencies</li>
 * <li>dds the views to the main Viewport when the application launches</li>
 * </ul>
 */
Ext.Loader.setConfig({
    enabled: true,
    disableCaching:true,
    paths: {
        "Deft": "lib/deft-0.8.8/Deft/"
    }
});

Ext.syncRequire([
    // DEftJS core classes
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

        ////////////////////////////////////////////
        // MOCKS
        ////////////////////////////////////////////
        authenticationService:  "CafeTownsend.service.mock.AuthenticationServiceMock",
        employeeService:        "CafeTownsend.service.mock.EmployeeServiceMock",
        employeeStore:          "CafeTownsend.store.EmployeeStore"
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
        "LogoutController",
        "EmployeeController",

        ////////////////////////////////////////////
        // MEDIATORS
        ////////////////////////////////////////////
        "mediator.LoginMediator",
        "mediator.EmployeeListMediator"
    ],

    /**
     * Add the views to the stage. Not optimal since we don't need them all upfront, but it'll get the
     * ball rolling in the right direction for a PoC.
     */
    launch: function () {
        console.log("app.launch");

        Ext.Viewport.add([
            { xtype: "loginview" },
            { xtype: "employeelistview" },
            { xtype: "employeedetailview" }
        ]);
    }
});