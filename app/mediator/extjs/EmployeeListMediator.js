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
Ext.define("CafeTownsend.mediator.extjs.EmployeeListMediator", {
    extend: "SenchaExtensions.mvc.mediator.AbstractMediator",

    requires: [
        "CafeTownsend.event.EmployeeEvent"
    ],

    inject: [
        "employeeStore"
    ],

    // NOTE: Refs do not work when setting up event handlers in the control, but do create getters/setters so they
    // can be used to reference view sub-components in areas other than control
    refs: [
        {
            ref:        "employeeListView",
            selector:   "extjsEmployeeListView"
        },
        {
            ref:        "logoutButton",
            selector:   "extjsEmployeeListView button[action=logout]"
        },
        {
            ref:        "list",
            selector:   "extjsEmployeeListView #list"
        },
    ],

//    config: {
//
//        /**
//         * @cfg {Ext.data.Store} employeeStore The injected employee store service from DeftJS.
//         * @accessor
//         */
//        employeeStore: null,
//
//        // create references to this mediator's views so we can listen to events and grab data from them
//        refs: {
//            employeeListView:   "employeeListView",
//            logoutButton:       "employeeListView #logoutButton",
//            newEmployeeButton:  "employeeListView #newEmployeeButton",
//            list:               "employeeListView #list",
//            searchInput:        "employeeListView #searchInput",
//
//            employeeDetailView: "employeeDetailView"
//        },
//
//        // set up view event to mediator mapping
//        control: {
//            logoutButton: {
//                tap: "onLogoutButtonTap"
//            },
//
//            newEmployeeButton: {
//                tap: "onNewEmployeeButtonTap"
//            },
//
//            searchInput :{
//                keyup:          "onSearchKeyUp",
//                clearicontap:   "onSearchClearIconTap"
//            },
//
//            list: {
//                disclose: "onListDisclose"
//            }
//        }
//    },

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

        this.getEmployeeListView().mask({
            xtype: "loadmask",
            message: "Loadng Employees..."
        });

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the show employee detail event from the employee list view. Grab the data model
     * from the selected item in the list and set it as the data provider for the detail view.
     * Finally, slide the detail view onto stage.
     *
     * @param record    The record is the data model for the item in the list currently selected.
     */
    showEmployeeDetail: function(record) {
        var logMsg = (record != null)
            ? ": id = " + record.get("id") + ", employee = " + record.get("firstName")
            : "";
        console.log("EmployeeListMediator.showEmployeeDetail %s", logMsg);

        this.navigate(CafeTownsend.event.NavigationEvent.ACTION_SHOW_EMPLOYEE_DETAIL);

        var employeeDetailView = this.getEmployeeDetailView();
        if(record != null) {
            employeeDetailView.setRecord(record);
        } else {
            employeeDetailView.reset();
        }
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the login success application-level event. Slide the employee list view
     * onto stage.
     */
    onLoginSuccess: function() {
        console.log("EmployeeListMediator.onLoginSuccess");

        this.navigate(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS);

        this.getEmployeeListData();
    },

    /**
     * Handles the get employees application-level event.
     */
    onGetEmployeeListSuccess: function() {
        console.log("EmployeeListMediator.onGetEmployeeListSuccess");

        this.getEmployeeListView().mask(false);
        this.getList().setStore(this.employeeStore);
//        this.getList().setStore(this.getEmployeeStore());
    },

    /**
     * Handles the get employees failure event from the login controller.
     */
    onGetEmployeeListFailure: function() {
        console.log("EmployeeListMediator.onGetEmployeeListFailure");

        this.getEmployeeListView().mask(false);
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the tap of the logout button. Dispatches the logout application-level event.
     */
    onLogoutButtonTap: function() {
        console.log("EmployeeListMediator.onLogoutButtonTap");

        var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGOUT);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the tap of the new employee button. Shows the employee detail view.
     */
    onNewEmployeeButtonTap: function() {
        console.log("EmployeeListMediator.onNewEmployeeButtonTap");

        this.showEmployeeDetail();
    },

    /**
     * Handles the list disclose of an employee list item. Shows the employee detail view passing in a reference to
     * the selected item in the list.
     *
     * @param {Ext.dataview.List} list  Reference to the visual list component.
     * @param {Object/Ext.data.Model} record Reference to the selected item in the list.
     * @param {Object} target The item in the list that's selected.
     * @param {Integer} index The index of the selected item.
     * @param {Object/Event} evt the event that triggered the handler.
     * @param {Object} options ???
     */
    onListDisclose: function(list, record, target, index, evt, options) {
        console.log("EmployeeListMediator.onListDisclose");

        this.showEmployeeDetail(record);
    },

    /**
     * Handles the clear icon tap event on the search field. Clears all filter on the list's store.
     */
    onSearchClearIconTap: function() {
        console.log("EmployeeListMediator.onSearchClearIconTap");

        var store = this.getList().getStore();
        store.clearFilter();
    },

    /**
     * Handles the key up event on the search field. Filters the list component's store by the value in the
     * search field and determining if it matches the first or last name elements of each record in the list.
     *
     * @param {Ext.field.Search} field Reference to the search field.
     *
     * TODO: BMR: 02/28/13: clean this up. pulled directly from another example with minor changes: http://www.phs4j.com/2012/05/add-a-searchfield-to-a-sencha-touch-2-list-mvc/
     */
    onSearchKeyUp: function(field) {
        console.log("EmployeeListMediator.onSearchKeyUp");

        //get the store and the value of the field
        var value = field.getValue();
        var store = this.getList().getStore();

        //first clear any current filters on the store
        store.clearFilter();

        //check if a value is set first, as if it isn't we don't have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(' '),
                regexps = [],
                i;


            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;


                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(searches[i], 'i'));
            }


            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];


                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('firstName').match(search) ||
                            record.get('lastName').match(search);


                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }


                //if nothing was found, return false (dont so in the store)
                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    //else true true (show in the store)
                    return matched[0];
                }
            });
        }
    },

});

