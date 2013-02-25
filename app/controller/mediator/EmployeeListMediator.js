/**
 * The employee list mediator essentially fulfills the passive view pattern for the employee list view.
 */
Ext.define("CafeTownsend.controller.mediator.EmployeeListMediator", {
    extend: "SenchaExtensions.mvc.controller.mediator.AbstractMediator",

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
            employeeListView:   "employeeListView",
            logoutButton:       "employeeListView #logoutButton",
            newEmployeeButton:  "employeeListView #newEmployeeButton",
            list:               "employeeListView #list",
            searchInput:        "employeeListView #searchInput",

            employeeDetailView: "employeeDetailView"
        },

        // set up view event to mediator mapping
        control: {
            logoutButton: {
                tap: "onLogoutButtonTap"
            },

            newEmployeeButton: {
                tap: "onNewEmployeeButtonTap"
            },

            searchInput :{
                keyup: "onSearchKeyUp"
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
     * Handles the login success event from the login controller. Slide the employee list view
     * onto stage.
     */
    onLoginSuccess: function () {
        console.log("EmployeeListMediator.onLoginSuccess");

        this.navigate(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS);

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

        var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGOUT);
        this.dispatchGlobalEvent(evt);
    },

    /**
     * TODO
     */
    onNewEmployeeButtonTap: function() {
        console.log("EmployeeListMediator.onNewEmployeeButtonTap");

        this.showEmployeeDetail();
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
    },

    /**
     * TODO
     *
     * @param field
     */
    onSearchKeyUp: function(field) {
        console.log("EmployeeListMediator.onSearchKeyUp");

        //get the store and the value of the field
        var value = field.getValue(),
            store = this.getList().getStore();

        //first clear any current filters on thes tore
        store.clearFilter();


        //check if a value is set first, as if it isnt we dont have to do anything
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
            store.filter(function (record) {
                var matched = [];


                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('name').match(search) ;


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

