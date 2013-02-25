/**
 * Contains the list of employee domain objects.
 */
Ext.define("CafeTownsend.store.EmployeeStore", {
//    extend: "Ext.data.Store",
    extend: "SenchaExtensions.mvc.store.AbstractStore",

    config: {
        model: "CafeTownsend.model.EmployeeModel",

        sorters: "lastName",

        autoSync: true,

        grouper: {
            groupFn: function(record) {
                try {
                    return record.get("lastName")[0];
                } catch(err) {

                }
            }
        }
    }
});