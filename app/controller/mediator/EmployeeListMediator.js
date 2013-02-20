/**
 * The employee list mediator essentially fulfills the passive view pattern for the employee list view.
 */
Ext.define("CafeTownsend.controller.mediator.EmployeeListMediator", {
    extend: "CafeTownsend.controller.mediator.AbstractMediator",

    requires: [
        "CafeTownsend.event.EmployeeEvent"
    ],

    inject: [
        "employeeStore"
    ],

    config: {

        // create a public property so we can inject our store
        employeeStore: null,

        // create references to this mediator's views so we can listen to events and grab data from them
        refs: {
            employeeListView:   "employeelistview",
            logoutButton:       "employeelistview #logoutButton",
            list:               "employeelistview #list",
            employeeDetailView: "employeedetailview"
        },

        // set up view event to mediator mapping
        control: {
            employeeListView: {
                newEmployeeEvent:           "onNewEmployee"
            },

            logoutButton: {
                tap: "onLogoutButtonTap"
            },

            list: {
                disclose: "onListDisclose"
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
    getEmployeeListData: function() {
        console.log("EmployeeListMediator.getEmployeeListData");

        this.getEmployeeListView().setMasked({
            xtype: "loadmask",
            message: "Loadng Employees..."
        });

        var evt = new CafeTownsend.event.EmployeeEvent();
        this.dispatchGlobalEvent(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST, evt);
    },

    /**
     * Handles the show employee detail event from the employee list view. Grab the data model
     * from the selected item in the list and set it as the data provider for the detail view.
     * Finally, slide the detail view onto stage.
     *
     * @param record    The record is the data model for the item in the list currently selected.
     */
    showEmployeeDetail: function(record) {
        console.log("EmployeeListMediator.showEmployeeDetail");

        var employeeDetailView = this.getEmployeeDetailView();

        employeeDetailView.setRecord(record);
        Ext.Viewport.animateActiveItem(employeeDetailView, this.getSlideLeftTransition());
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
        this.getEmployeeListData();
    },

    /**
     * Handles the get employees success event from the login controller.
     */
    onGetEmployeeListSuccess: function () {
        console.log("EmployeeListMediator.onGetEmployeeListSuccess");

        this.getEmployeeListView().setMasked(false);
        this.getList().setStore(this.getEmployeeStore());
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
     * TODO
     */
    onLogoutButtonTap: function() {
        console.log("EmployeeListMediator.onLogoutButtonTap");

        this.dispatchGlobalEvent(CafeTownsend.event.AuthenticationEvent.LOGOUT);
    },

    /**
     * TODO:
     *
     * @param list
     * @param record
     * @param target
     * @param index
     * @param evt
     * @param options
     */
    onListDisclose: function (list, record, target, index, evt, options) {
        console.log("EmployeeListMediator.onListDisclose");

        this.showEmployeeDetail(record);
    }

});

