/**
 * The domain object representing a user.
 */
Ext.define("CafeTownsend.model.UserModel", {
    extend: "Ext.data.Model",

    config: {

        idProperty: "id",

        fields: [
            { name: "id",           type: "int" },
            { name: "username",     type: "string" },
            { name: "password",     type: "string" },
            { name: "firstName",    type: "string" },
            { name: "lastName",     type: "string" },
            { name: "email",        type: "string" }
        ]
    }
});
