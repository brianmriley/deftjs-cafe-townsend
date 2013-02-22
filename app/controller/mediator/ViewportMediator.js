/**
 * The viewport mediator essentially fulfills the passive view pattern for the login view.
 *
 * It is expected that different form factors may require a new mediator implementation as the events could be
 * different; eg, a login button on a desktop app could be click whereas mobile could be tap.
 *
 * TODO: BMR: 02/22/13: Don't add all the views to the stage at once. Do it on demand.
 */
Ext.define("CafeTownsend.controller.mediator.ViewportMediator", {
    extend: "CafeTownsend.controller.mediator.AbstractMediator",

    requires: [
        "CafeTownsend.event.AuthenticationEvent",
        "CafeTownsend.event.NavigationEvent"
    ],

    config: {

        // create references to this mediator's views so we can listen to events and grab data from them
        refs: {
            loginView:              "loginview",
            employeeListView:       "employeelistview",
            employeeDetailView:     "employeedetailview"
        }
    },

    ////////////////////////////////////////////////
    // FUNCTIONAL METHODS
    ////////////////////////////////////////////////

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        console.log("ViewportMediator.setupGlobalEventListeners");

        this.addGlobalEventListener(CafeTownsend.event.NavigationEvent.NAVIGATE, this.onNavigate, this);
    },

    /**
     * TODO
     *
     * @param action
     */
    navigate: function(action) {
        console.log("ViewportMediator.navigate: action = %s", action);

        var view;
        var direction;

        switch(action) {
            case CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS:
                view = this.getEmployeeListView();
                direction = this.getSlideLeftTransition();
                break;

            case CafeTownsend.event.AuthenticationEvent.LOGOUT_SUCCESS:
                view = this.getLoginView();
                direction = this.getSlideRightTransition();
                break;

            // TODO: constant
            case CafeTownsend.event.NavigationEvent.ACTION_SHOW_EMPLOYEE_DETAIL:
                view = this.getEmployeeDetailView();
                direction = this.getSlideLeftTransition();
                break;

            // TODO: constant
            case CafeTownsend.event.NavigationEvent.ACTION_BACK_SHOW_EMPLOYEE_LIST:
                view = this.getEmployeeListView();
                direction = this.getSlideRightTransition();
                break;
        }

        // only navigate to the screen if the view exist
        if(view != null) {
            Ext.Viewport.animateActiveItem(view, direction);
        } else {
            console.warn("ViewportMediator.navigate: couldn't map navigation to action = %s", action);
        }

    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * TODO
     */
    onNavigate: function(event) {
        console.log("ViewportMediator.onNavigate");

        this.navigate(event.action)
    }

});

