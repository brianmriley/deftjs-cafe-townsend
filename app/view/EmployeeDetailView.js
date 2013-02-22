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
    },

//    populate: function(record) {
//        console.log("EmployeeListMediator.showEmployeeDetail: id = %s, employee = %s", record.get("id"), record.get("firstName"));
//        console.dir(record);
//
//        fieldset.setRecord(record);
//    }

//    config:{
//        scrollable:"vertical"
//    },
//
//    initialize: function () {
//
//        this.callParent(arguments);
//
//        var backButton = {
//            xtype: "button",
//            ui: "back",
//            text: "Home"
//        };
//
//        var saveButton = {
//            xtype: "button",
//            ui: "action",
//            text: "Save"
//        };
//
//        var topToolbar = {
//            xtype: "toolbar",
//            docked: "top",
//            title: "Edit Note",
//            items: [
//                backButton,
//                { xtype: "spacer" },
//                saveButton
//            ]
//        };
//
//        var deleteButton = {
//            xtype: "button",
//            iconCls: "trash",
//            iconMask: true,
//            scope: this
//        };
//
//        var bottomToolbar = {
//            xtype: "toolbar",
//            docked: "bottom",
//            items: [
//                deleteButton
//            ]
//        };
//
//        var firstNameInput = {
//            xtype: "textfield",
//            name: "firstName",
//            label: "First Name",
//            required: true
//        };
//
//        var lastNameInput = {
//            xtype: "textfield",
//            name: "lastName",
//            label: "Last Name",
//            required: true
//        };
//
//        this.add([
//            topToolbar,
//            { xtype: "fieldset",
//                items: [firstNameInput, lastNameInput]
//            },
//            bottomToolbar
//        ]);
//    }

});