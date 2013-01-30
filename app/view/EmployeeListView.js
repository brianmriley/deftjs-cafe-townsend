/**
 * The list of employees view for the application.
 */
Ext.define("CafeTownsend.view.EmployeeListView", {
    extend: "Ext.Panel",

    requires: [
        "Ext.TitleBar",
        "Ext.dataview.List",
        "Ext.data.Store"
    ],

    alias: "widget.employeelistview",

    inject: [
        "employeeStore"
    ],

    config: {

        list: null,

        // create a public property so we can inject our store
        employeeStore: null,

        layout: {
            type: "fit"
        },

        items: [
            {
                xtype: "titlebar",
                title: "Employees",
                docked: "top",
                items: [
                    {
                        xtype: "button",
                        itemId: "logOffButton",
                        text: "Log Off",
                        align: "left"
                    },
                    {
                        xtype: "button",
                        itemId: "newEmployeeButton",
                        text: "New",
                        align: "right",
                        ui: "action"
                    }
                ]
            }
//            {
//                xtype: "list",
//                itemId: "employeesList",
//                loadingText: "Loading Employees...",
//                emptyText: "No Employees found.",
//                onItemDisclosure: true,
//                itemTpl: "<div class="contact">{firstName} <strong>{lastName}</strong></div>"
//            }
        ],

        listeners: [
            {
                delegate: "#newEmployeeButton",
                event: "tap",
                fn: "onNewEmployeeButtonTap"
            },
            {
                delegate: "#logOffButton",
                event: "tap",
                fn: "onLogOffButtonTap"
            }
        ]
    },

    /**
     * Builds the list component and sets the injected data store as the data provider for it.
     */
    initialize: function() {
        console.log("EmployeeListView.initialize");

        this.setList(Ext.create("Ext.List", {
            fullscreen: true,
            itemTpl: "<div class='contact'>{firstName} <strong>{lastName}</strong></div>",
            store: this.getEmployeeStore(),
            loadingText: "Loading Employees...",
            emptyText: "No Employees found.",
            grouped: true,
            onItemDisclosure: true,
            listeners: {
                disclose: { fn: this.onNotesListDisclose, scope: this }
            }
        }));

        this.add([
            this.getList()
        ]);
    },

    ////////////////////////////////////////////////
    // EVENT HANDLERS
    ////////////////////////////////////////////////

    onNewEmployeeButtonTap: function() {
        console.log("EmployeeListView.onNewEmployeeButtonTap");
        this.fireEvent("newEmployeeEvent");
    },

    onLogOffButtonTap: function() {
        console.log("EmployeeListView.onLogOffButtonTap");
        this.fireEvent("logoutEvent");
    },

    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("EmployeeListView.onNotesListDisclose");
        this.fireEvent("showEmployeeDetailEvent", this, record);
    }

});
