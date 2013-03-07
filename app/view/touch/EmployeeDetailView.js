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
 * The employee details view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("CafeTownsend.view.touch.EmployeeDetailView", {
    extend: "Ext.form.Panel",
    alias: "widget.touchEmployeeDetailView",

    requires: [
        "Ext.form.FieldSet",
        "Ext.Toolbar"
    ],

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