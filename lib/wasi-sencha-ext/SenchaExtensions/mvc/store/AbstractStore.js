/*
 Copyright (c) 2013 [Sencha Extensions Contributors](mailto:admin@webappsolution.com)

 WASI Sencha Extensions is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 WASI Sencha Extensions is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with WASI Sencha Extensions.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The abstract store classes provides additional base functionality to update records in the store and
 * force auto syncs.
 * 
 * This file is part of WASI Sencha Extensions.
 */
Ext.define("SenchaExtensions.mvc.store.AbstractStore", {
    extend: "Ext.data.Store",

    /**
     * TODO
     *
     * @param data
     */
    setData: function(data) {
        console.log("AbstractStore.setData");

        if (Ext.getVersion("extjs")) {
            console.warn("AbstractController.setData: using 'store.removeAll() and store.add(data)' because ExtJS 4.1 doesn't support store.setData().");
            this.removeAll();
//            this.add(data);

            this.data = data;
            // this is if you're using Touch
            // TODO: BMR: 02/26/13: Might need to check for touch vr 2.0+
//        } else if(Ext.getVersion('touch')) {
        } else {
            console.info("AbstractController.setData");
            this.callParent(arguments);
        }
    },

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