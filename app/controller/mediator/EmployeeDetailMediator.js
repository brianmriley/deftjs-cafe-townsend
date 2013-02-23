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

//        this.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);
//
//        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_SUCCESS, this.onGetEmployeeDetailSuccess, this);
//        this.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_FAILURE, this.onGetEmployeeDetailFailure, this);
    },

    /**
     * Handles the show employee detail event from the employee list view. Grab the data model
     * from the selected item in the list and set it as the data provider for the detail view.
     * Finally, slide the detail view onto stage.
     *
     * @param employee    The employee is the data model for the item in the list currently selected.
     */
    saveEmployee: function(employee) {
        console.log("EmployeeDetailMediator.saveEmployee");

        if(employee != null) {
            var id = employee.id;
            if( (id != null) && (id != "") ) {
                var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE);
            } else {
                var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE);
            }

            evt.employee = employee;
            this.dispatchGlobalEvent(evt);
        }
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

//    /**
//     * Handles the login success event from the login controller. Slide the employee list view
//     * onto stage.
//     */
//    onLoginSuccess: function () {
//        console.log("EmployeeDetailMediator.onLoginSuccess");
//
//        this.navigate("showEmployeeDetail");
//        Ext.Viewport.animateActiveItem(this.getEmployeeDetailView(), this.getSlideLeftTransition());
//        this.getEmployeeDetailData();
//    },
//
//    /**
//     * Handles the get employees success event from the login controller.
//     */
//    onGetEmployeeDetailSuccess: function () {
//        console.log("EmployeeDetailMediator.onGetEmployeeDetailSuccess");
//
//        this.getEmployeeDetailView().setMasked(false);
//        this.getList().setStore(this.getEmployeeStore());
//    },
//
//    /**
//     * Handles the get employees failure event from the login controller.
//     */
//    onGetEmployeeDetailFailure: function () {
//        console.log("EmployeeDetailMediator.onGetEmployeeDetailFailure");
//
//        this.getEmployeeDetailView().setMasked(false);
//    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * TODO
     */
    onBackButtonTap: function() {
        console.log("EmployeeDetailMediator.onBackButtonTap");

        this.navigate(CafeTownsend.event.NavigationEvent.ACTION_BACK_SHOW_EMPLOYEE_LIST);
    },

    /**
     * TODO
     */
    onSaveEmployeeButtonTap: function() {
        console.log("EmployeeDetailMediator.onSaveEmployeeButtonTap");

        var employee = this.getEmployeeDetailView().getRecord();
        var newEmployee = this.getEmployeeDetailView().getValues();
        newEmployee.id = employee.internalId;
        this.saveEmployee(newEmployee);
    }
//
//    /**
//     * TODO
//     */
//    onDeleteButtonTap: function() {
//        console.log("EmployeeDetailMediator.onDeleteButtonTap");
//
//        this.showEmployeeDetail();
//    }

});

