/**
 * The employee list mediator essentially fulfills the passive view pattern for the employee list view.
 */
Ext.define("CafeTownsend.controller.mediator.EmployeeDetailMediator", {
    extend: "CafeTownsend.controller.mediator.AbstractMediator",

    requires: [
        "CafeTownsend.event.EmployeeEvent",
        "CafeTownsend.event.NavigationEvent"
    ],

    inject: [
        "employeeStore"
    ],

    config: {

        // create a public property so we can inject our store
        employeeStore: null,

        // create references to this mediator's views so we can listen to events and grab data from them
        refs: {
            employeeDetailView: "employeedetailview",
            backButton:         "employeedetailview #backButton",
            saveEmployeeButton: "employeedetailview #saveEmployeeButton",
            deleteButton:       "employeedetailview #deleteButton"
        },

        // set up view event to mediator mapping
        control: {
            backButton: {
                tap: "onBackButtonTap"
            },

            saveEmployeeButton: {
                tap: "onSaveEmployeeButtonTap"
            },

            deleteButton: {
                tap: "onDeleteButtonTap"
            }
        }
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        console.log("EmployeeDetailMediator.setupGlobalEventListeners");

        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_SUCCESS, this.onCreateEmployeeSuccess, this);
        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_SUCCESS, this.onUpdateEmployeeSuccess, this);
        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE_SUCCESS, this.onDeleteEmployeeSuccess, this);
    },

    /**
     * TODO
     *
     * @param employee    The employee is the data model for the item in the list currently selected.
     */
    saveEmployee: function(employee) {
        console.log("EmployeeDetailMediator.saveEmployee");

        var evt;
        var msg;

        if(employee != null) {

            var id = employee.id;

            if( (id != null) && (id != "") ) {
                evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE);
                msg = "Updating Employee...";
            } else {
                evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE);
                msg = "Creating Employee...";
            }

            this.getEmployeeDetailView().setMasked({
                xtype: "loadmask",
                message: msg
            });

            evt.employee = employee;
            this.dispatchGlobalEvent(evt);
        }
    },

    /**
     * TODO
     *
     * @param employee    The employee is the data model for the item in the list currently selected.
     */
    deleteEmployee: function(employee) {
        console.log("EmployeeDetailMediator.deleteEmployee");

        if(employee != null) {

            this.getEmployeeDetailView().setMasked({
                xtype: "loadmask",
                message: "Deleting Employee..."
            });

            var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE);
            evt.employee = employee;

            this.dispatchGlobalEvent(evt);
        }
    },

    backToEmployeeList: function() {
        console.log("EmployeeDetailMediator.backToEmployeeList");

        this.navigate(CafeTownsend.event.NavigationEvent.ACTION_BACK_SHOW_EMPLOYEE_LIST);
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the get employees success event from the login controller.
     */
    onCreateEmployeeSuccess: function () {
        console.log("EmployeeDetailMediator.onCreateEmployeeSuccess");

        this.getEmployeeDetailView().setMasked(false);
        this.backToEmployeeList();
    },

    /**
     * Handles the get employees failure event from the login controller.
     */
    onUpdateEmployeeSuccess: function () {
        console.log("EmployeeDetailMediator.onUpdateEmployeeFailure");

        this.getEmployeeDetailView().setMasked(false);
        this.backToEmployeeList();
    },

    /**
     * Handles the get employees failure event from the login controller.
     */
    onDeleteEmployeeSuccess: function () {
        console.log("EmployeeDetailMediator.onDeleteEmployeeSuccess");

        this.getEmployeeDetailView().setMasked(false);
        this.backToEmployeeList();
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * TODO
     */
    onBackButtonTap: function() {
        console.log("EmployeeDetailMediator.onBackButtonTap");

        this.backToEmployeeList();
    },

    /**
     * TODO
     */
    onSaveEmployeeButtonTap: function() {
        console.log("EmployeeDetailMediator.onSaveEmployeeButtonTap");

        var employee = this.getEmployeeDetailView().getRecord();
        var newEmployee = this.getEmployeeDetailView().getValues();

        // if this is a new employee record, there's no id available
        if(employee != null) {
            newEmployee.id = employee.data.id;
        }

        this.saveEmployee(newEmployee);
    },

    /**
     * TODO
     */
    onDeleteButtonTap: function() {
        console.log("EmployeeDetailMediator.onDeleteButtonTap");

        var employee = this.getEmployeeDetailView().getRecord();

        this.deleteEmployee(employee.data);
    }

});

