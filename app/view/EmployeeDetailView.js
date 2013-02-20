/**
 * The employee details view for the application.
 */
Ext.define("CafeTownsend.view.EmployeeDetailView", {
    extend: "Ext.form.Panel",

    requires: [
        "Ext.form.FieldSet",
        "Ext.Toolbar"
    ],

    alias: "widget.employeedetailview",

    config:{
        scrollable:'vertical'
    },

    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype: "button",
            ui: "back",
            text: "Home"
        };

        var saveButton = {
            xtype: "button",
            ui: "action",
            text: "Save"
        };

        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Edit Note",
            items: [
                backButton,
                { xtype: "spacer" },
                saveButton
            ]
        };

        var deleteButton = {
            xtype: "button",
            iconCls: "trash",
            iconMask: true,
            scope: this
        };

        var bottomToolbar = {
            xtype: "toolbar",
            docked: "bottom",
            items: [
                deleteButton
            ]
        };

        var firstNameInput = {
            xtype: 'textfield',
            name: 'firstName',
            label: 'First Name',
            required: true
        };

        var lastNameInput = {
            xtype: 'textfield',
            name: 'lastName',
            label: 'Last Name',
            required: true
        };

        this.add([
            topToolbar,
            { xtype: "fieldset",
                items: [firstNameInput, lastNameInput]
            },
            bottomToolbar
        ]);
    }

});