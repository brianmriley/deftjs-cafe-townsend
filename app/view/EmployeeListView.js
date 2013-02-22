/**
 * The list of employees view for the application.
 */
Ext.define("CafeTownsend.view.EmployeeListView", {
    extend: "Ext.Panel",

    requires: [
        "Ext.TitleBar",
        "Ext.dataview.List",
        "Ext.field.Search"
    ],

    alias: "widget.employeelistview",

    config: {

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
                        itemId: "logoutButton",
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
            },
            {
                xtype: "searchfield" ,
                itemId:"searchInput",
                id:"searchInput"
            },
            {
                xtype: "list",
                itemId: "list",
                fullscreen: true,
                itemTpl: "<div class='contact'>{firstName} <strong>{lastName}</strong></div>",
                loadingText: "Loading Employees...",
                emptyText: "No Employees found.",
                grouped: true,
                onItemDisclosure: true
            }
        ]
    }
});
