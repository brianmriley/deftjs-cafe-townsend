/**
 * The employee list mediator essentially fulfills the passive view pattern for the employee list view.
 */
Ext.define("CafeTownsend.controller.mediator.EmployeeListMediator", {
    extend: "CafeTownsend.controller.mediator.AbstractMediator",

    requires: [
        "CafeTownsend.event.EmployeeEvent"
    ],

    config: {

        // create references to this mediator's views so we can listen to events and grab data from them
        refs: {
            employeeListView:   "employeelistview",
            logoutButton:       "employeelistview #logoutButton",
            employeeDetailView: "employeedetailview"
        },

        // set up view event to mediator mapping
        control: {
            employeeListView: {
                newEmployeeEvent:           "onNewEmployee",
                showEmployeeDetailEvent:    "onShowEmployeeDetail"
            },

            logoutButton: {
                tap: "onLogoutButtonTap"
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

        this.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);

        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_SUCCESS, this.onGetEmployeeListSuccess, this);
        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_FAILURE, this.onGetEmployeeListFailure, this);
    },

    /**
     * Dispatches the application event to get the list of employees.
     */
    getEmployeeList: function() {
        console.log("EmployeeListMediator.getEmployeeList");

        this.getEmployeeListView().setMasked({
            xtype: "loadmask",
            message: "Loadng Employees..."
        });

        var evt = new CafeTownsend.event.EmployeeEvent();
        this.dispatchGlobalEvent(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST, evt);
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

        Ext.Viewport.animateActiveItem(this.getEmployeeListView(), this.getSlideLeftTransition());
        this.getEmployeeList();
    },

    /**
     * Handles the get employees success event from the login controller.
     */
    onGetEmployeeListSuccess: function () {
        console.log("EmployeeListMediator.onGetEmployeeListSuccess");

        this.getEmployeeListView().setMasked(false);
    },

    /**
     * Handles the get employees failure event from the login controller.
     */
    onGetEmployeeListFailure: function () {
        console.log("EmployeeListMediator.onGetEmployeeListFailure");

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
    onLogoutButtonTap: function() {
        console.log("EmployeeListMediator.onLogoutButtonTap");

        this.dispatchGlobalEvent(CafeTownsend.event.AuthenticationEvent.LOGOUT);
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

