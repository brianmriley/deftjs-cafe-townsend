/**
 * The abstract store classes provides additional base functionality to update records in the store and
 * force auto syncs.
 */
Ext.define("SenchaExtensions.mvc.store.AbstractStore", {
    extend: "Ext.data.Store",

    /**
     * Updates Model instance to the Store. This method accepts either:
     *
     * - An array of Model instances or Model configuration objects.
     * - Any number of Model instance or Model configuration object arguments.
     *
     * The new Model instances will be added at the end of the existing collection.
     *
     * Sample usage:
     *
     *     myStore.add({some: 'data2'}, {some: 'other data2'});
     *
     * @param {Ext.data.Model[]/Ext.data.Model...} model An array of Model instances
     * or Model configuration objects, or variable number of Model instance or config arguments.
     * @param {String} The name of the ID property for the model.
     * @return {Ext.data.Model[]} The model instances that were updated.
     */
    update: function(newModel, idProperty) {

//        if (!Ext.isArray(newModels)) {
//            newModels = Array.prototype.slice.call(newModels);
//        }

        if(idProperty == null) {
            idProperty = "id";
        }

        if(newModel.id == null) {
            throw new Error(
                "The model being updated must have an 'id' property matching the provided parameter: '" +
                idProperty +
                "'.");
        }

        var id = newModel[idProperty];
        var record = this.findRecord(idProperty, id);
        record.setData(newModel);

        // seems like both the dirty flag and sync need to be manually called for the update to really take place
        if(this.getAutoSync()) {
            record.dirty = true;
            this.sync();
        }

        console.log("AbstractStore.update: updating item with id = %s", id);
        return record;
    }

});