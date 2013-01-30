// Set up the Loader and specify the path to the application files.
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

//        authenticationService: "CafeTownsend.service.AuthenticationService",

        authenticationService: "CafeTownsend.service.mock.AuthenticationServiceMock",
        employeeService: "CafeTownsend.service.mock.EmployeeServiceMock",
        employeeStore: "CafeTownsend.store.EmployeeStore"
    });
});

Ext.application({

    name: "CafeTownsend",

    models: [
        "EmployeeModel"
    ],

    views: [
        "LoginView",
        "EmployeeListView",
        "EmployeeDetailView"
    ],

    // list all of the controllers and view mediators for the application
    controllers:[

        //////////////////////////////////
        // CONTROLLERS
        //////////////////////////////////
        "LoginController",
        "LogoutController",
        "EmployeeController",

        //////////////////////////////////
        // MEDIATORS
        //////////////////////////////////
        "mediator.LoginMediator",
        "mediator.EmployeeListMediator"
    ],

    /**
     * Add the views to the stage. Not optional since we don't need them all upfront, but it'll get the
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