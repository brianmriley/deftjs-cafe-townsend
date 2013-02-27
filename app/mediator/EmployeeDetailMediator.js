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
 * The employee list mediator essentially fulfills the passive view pattern for the employee list view.
 */
Ext.define("CafeTownsend.mediator.EmployeeDetailMediator", {
    extend: "SenchaExtensions.mvc.controller.mediator.AbstractMediator",

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
            employeeDetailView: "employeeDetailView",
            backButton:         "employeeDetailView #backButton",
            saveEmployeeButton: "employeeDetailView #saveEmployeeButton",
            deleteButton:       "employeeDetailView #deleteButton"
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
     * Functional method to save an employee. Determines if the employee is new and it needs to be
     * created, or existing and needs to be updated and fires off the corresponding application-level event.
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
     * Functional method to delete an employee. Fires off the corresponding application-level event.
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

    /**
     * Simple navigation method used to navigate back to the employee list view.
     */
    backToEmployeeList: function() {
        console.log("EmployeeDetailMediator.backToEmployeeList");

        this.navigate(CafeTownsend.event.NavigationEvent.ACTION_BACK_SHOW_EMPLOYEE_LIST);
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the create employee success application-level event. Navigates back to the employee list view.
     */
    onCreateEmployeeSuccess: function() {
        console.log("EmployeeDetailMediator.onCreateEmployeeSuccess");

        this.getEmployeeDetailView().setMasked(false);
        this.backToEmployeeList();
    },

    /**
     * Handles the update employee success application-level event. Navigates back to the employee list view.
     */
    onUpdateEmployeeSuccess: function() {
        console.log("EmployeeDetailMediator.onUpdateEmployeeFailure");

        this.getEmployeeDetailView().setMasked(false);
        this.backToEmployeeList();
    },

    /**
     * Handles the delete employee success application-level event. Navigates back to the employee list view.
     */
    onDeleteEmployeeSuccess: function() {
        console.log("EmployeeDetailMediator.onDeleteEmployeeSuccess");

        this.getEmployeeDetailView().setMasked(false);
        this.backToEmployeeList();
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the back button tap event. Navigates back to the employee list view.
     */
    onBackButtonTap: function() {
        console.log("EmployeeDetailMediator.onBackButtonTap");

        this.backToEmployeeList();
    },

    /**
     * Handles the save button tap event. Grabs the view's current employee data and passes the record
     * to the functional save method.
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
     * Handles the delete button tap event. Grabs the view's current employee data and passes the record
     * to the functional delete method.
     */
    onDeleteButtonTap: function() {
        console.log("EmployeeDetailMediator.onDeleteButtonTap");

        var employee = this.getEmployeeDetailView().getRecord();

        this.deleteEmployee(employee.data);
    }

});

