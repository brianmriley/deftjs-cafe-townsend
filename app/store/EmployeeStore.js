/**
 * Contains the list of employee domain objects.
 */
Ext.define('CafeTownsend.store.EmployeeStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'CafeTownsend.model.EmployeeModel',

        sorters: "lastName",

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