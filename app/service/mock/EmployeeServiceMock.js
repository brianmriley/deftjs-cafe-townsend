/**
 * The mock authentication service object.
 */
Ext.define("CafeTownsend.service.mock.EmployeeServiceMock", {
    extend: "CafeTownsend.service.mock.AbstractServiceMock",

    config: {
    },

    /**
     * The mock service call.
     */
    getEmployeeList: function() {
        console.log("EmployeeServiceMock.getEmployeeList");

        var me = this;

        var response = {
            success: true,
            employeeList: [
                { id: 0,    firstName: "Tommy",   lastName: "Maintz"  },
                { id: 1,    firstName: "Rob",     lastName: "Dougan"  },
                { id: 2,    firstName: "Ed",      lastName: "Spencer" },
                { id: 3,    firstName: "Jamie",   lastName: "Avins"   },
                { id: 4,    firstName: "Aaron",   lastName: "Conran"  },
                { id: 5,    firstName: "Dave",    lastName: "Kaneda"  },
                { id: 6,    firstName: "Jacky",   lastName: "Nguyen"  },
                { id: 7,    firstName: "Abraham", lastName: "Elias"   },
                { id: 8,    firstName: "Jay",     lastName: "Robinson"},
                { id: 9,    firstName: "Nigel",   lastName: "White"   },
                { id: 10,   firstName: "Don",     lastName: "Griffin" },
                { id: 11,   firstName: "Nico",    lastName: "Ferrero" },
                { id: 12,   firstName: "Jason",   lastName: "Johnston"}
            ]
        };

        this.delayedSuccess(response);
    }
});

