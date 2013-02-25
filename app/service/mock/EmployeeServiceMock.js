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
    },

    /**
     * The mock service call.
     */
    createEmployee: function(employee) {
        console.log("EmployeeServiceMock.createEmployee");

        var response = {
            success: true,
            employee: {
                id: this.getRandomInt(1000, 99999),
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                startDate: employee.startDate
            }
        };

        this.delayedSuccess(response);
    },

    /**
     * The mock service call.
     */
    updateEmployee: function(employee) {
        console.log("EmployeeServiceMock.updateEmployee: id = %s", employee.id);

        var response = {
            success: true,
            employee: {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                startDate: employee.startDate
            }
        };

        this.delayedSuccess(response);
    },

    /**
     * The mock service call.
     */
    deleteEmployee: function(employee) {
        console.log("EmployeeServiceMock.deleteEmployee: id = %s", employee.id);

        var response = {
            success: true,
            employee: {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                startDate: employee.startDate
            }
        };

        this.delayedSuccess(response);
    }
});

