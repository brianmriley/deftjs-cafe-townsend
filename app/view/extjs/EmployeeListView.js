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
 * The list of employees view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 *
 *  TODO: BMR: 02/22/13: Add support for search. The search input isn't currently in the view.
 */
Ext.define("CafeTownsend.view.extjs.EmployeeListView", {
    extend: "Ext.panel.Panel",
    alias: "widget.extjsEmployeeListView",

    title: "Employees",

    frame: true,
    bodyPadding: "5px 5px 0",
//    width: 350,
//    height: 150,
    fieldDefaults: {
        labelWidth: 125,
        msgTarget: "side",
        autoFitErrors: false
    },
//    defaults: {
//        width: 300,
//        inputType: "password"
//    },
//    defaultType: "textfield",

    items: [
//        {
//            xtype: "panel",
//            name: "usernameTextField",
//            id: "usernameTextField",
//            inputType: "text"
//        },
        {
            xtype: "grid",
            title: "Employees",
            itemId: "list",
            fullscreen: true,
            itemTpl: "<div class='contact'>{firstName} <strong>{lastName}</strong></div>",
            loadingText: "Loading Employees...",
            emptyText: "No Employees found.",
            grouped: true,
            onItemDisclosure: true,

            columns: [
                { text: 'Name',  dataIndex: 'name' }
            ]

//            items: [
//                {
//                    xtype: "titlebar" ,
//                    itemId:"titlebar",
//                    id:"titlebar",
//                    docked: 'top',
//
//                    items: [
//                        {
//                            xtype: "searchfield" ,
//                            itemId:"searchInput",
//                            id:"searchInput"
//                        }
//                    ]
//                }
//            ]
        }
    ]

//    requires: [
//        "Ext.TitleBar",
//        "Ext.dataview.List",
//        "Ext.field.Search"
//    ],
//
//    config: {
//
//        layout: {
//            type: "fit"
//        },
//
//        items: [
//            {
//                xtype: "titlebar",
//                title: "Employees",
//                docked: "top",
//                items: [
//                    {
//                        xtype: "button",
//                        itemId: "logoutButton",
//                        text: "Log Off",
//                        align: "left"
//                    },
//                    {
//                        xtype: "button",
//                        itemId: "newEmployeeButton",
//                        text: "New",
//                        align: "right",
//                        ui: "action"
//                    }
//                ]
//            },
//            {
//                xtype: "list",
//                itemId: "list",
//                fullscreen: true,
//                itemTpl: "<div class='contact'>{firstName} <strong>{lastName}</strong></div>",
//                loadingText: "Loading Employees...",
//                emptyText: "No Employees found.",
//                grouped: true,
//                onItemDisclosure: true,
//
//                items: [
//                    {
//                        xtype: "titlebar" ,
//                        itemId:"titlebar",
//                        id:"titlebar",
//                        docked: 'top',
//
//                        items: [
//                            {
//                                xtype: "searchfield" ,
//                                itemId:"searchInput",
//                                id:"searchInput"
//                            }
//                        ]
//                    }
//                ]
//            }
//        ]
//    }
});
