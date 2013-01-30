/**
 * The employee list mediator essentially fulfills the passive view pattern for the employee list view.
 */
Ext.define("CafeTownsend.controller.mediator.EmployeeListMediator", {
    extend: "CafeTownsend.controller.mediator.AbstractMediator",
    //    extend: "Ext.app.Controller",

    /*
     TODO: BMR: 01/15/13: Extending Deft.mvc.ViewController blows up and throws the following errors
    1)  Error: Error while resolving value to inject: no dependency provider found for "function() {
        return this.constructor.apply(this, arguments);
        }".
    2)  TypeError: "undefined" is not a function(evaluating "controller.getStores()")
     */
//    extend: "Deft.mvc.ViewController",

    inject: [
        "employeeService"
    ],

    config: {

        // create references to this mediator's views so we can listen to events and grab data from them
        refs: {
            employeeListView: "employeelistview",
            employeeDetailView: "employeedetailview"
        },

        // set up view event to mediator mapping
        control: {
            employeeListView: {
                logoutEvent: "onLogout",
                newEmployeeEvent: "onNewEmployee",
                showEmployeeDetailEvent: "onShowEmployeeDetail"
            }
        }
    },

    /**
     * Initializes the view mediator and sets up global event bus handlers.
     */
    init: function() {
        this.callParent();
        console.log("EmployeeListMediator.init");
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        console.log("EmployeeListMediator.setupGlobalEventListeners");

        this.addGlobalEventListener({
            scope: this,
            authenticateSuccessEvent: "onLoginSuccess"
        });

//        this.addGlobalEventListener({
//            scope: this,
//            getEmployeeListSuccessEvent: "onGetEmployeeListSuccess"
//        });
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the login success event from the login controller. Slide the employee list view
     * onto stage.
     */
    onLoginSuccess: function () {
        console.log("EmployeeListMediator.onLoginSuccess");

//        this.getEmployeeListView().setMasked({
//            xtype: "loadmask",
//            message: "Loadng Employees..."
//        });

        // broadcast an event to get the list of employees
        this.dispatchGlobalEvent("getEmployeeListEvent");

        var employeeListView = this.getEmployeeListView();
        Ext.Viewport.animateActiveItem(employeeListView, this.getSlideLeftTransition());
    },

    /**
     * Handles the get employees success event from the login controller.
     */
    onGetEmployeeListSuccess: function () {
        console.log("EmployeeListMediator.onGetEmployeeListSuccess");

        this.getEmployeeListView().setMasked(false);
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the show employee detail event from the employee list view. Grab the data model
     * from the selected item in the list and set it as the data provider for the detail view.
     * Finally, slide the detial view onto stage.
     */
    onLogout: function() {
        console.log("EmployeeListMediator.onLogout");

        this.dispatchGlobalEvent("logoutEvent");
    },

    /**
     * Handles the show employee detail event from the employee list view. Grab the data model
     * from the selected item in the list and set it as the data provider for the detail view.
     * Finally, slide the detial view onto stage.
     *
     * @param view      Reference to the object that fired the event.
     * @param record    The record is the data model for the item in the list currently selected.
     */
    onShowEmployeeDetail: function(view, record) {
        console.log("EmployeeListMediator.onShowEmployeeDetail");

        var employeeDetailView = this.getEmployeeDetailView();
        employeeDetailView.setRecord(record);
        Ext.Viewport.animateActiveItem(employeeDetailView, this.getSlideLeftTransition());
    },

});

