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

    config: {

        items: [
            {
                xtype: "titlebar",
                title: "Employee",
                docked: "top",
                items: [
                    {
                        xtype: "button",
                        itemId: "backButton",
                        text: "Back",
                        align: "left"
                    },
                    {
                        xtype: "button",
                        itemId: "saveEmployeeButton",
                        text: "Save",
                        align: "right",
                        ui: "action"
                    }
                ]
            },
            {
                xtype: "fieldset",
                itemId: "fieldset",
                items: [
                    {
                        xtype: "textfield",
                        placeHolder: "First Name",
                        itemId: "firstNameTextField",
                        name: "firstName",
                        required: true
                    },
                    {
                        xtype: "textfield",
                        placeHolder: "Last Name",
                        itemId: "lastNameTextField",
                        name: "lastName",
                        required: true
                    },
                    {
                        xtype: "textfield",
                        placeHolder: "Phone #",
                        itemId: "phoneNumberTextField",
                        name: "phoneNumber",
                        required: true
                    }
                ]
            },
            {
                xtype: "button",
                itemId: "deleteButton",
                text: "Delete",
                align: "center",
                ui: "action"
            }
        ]
    }
});