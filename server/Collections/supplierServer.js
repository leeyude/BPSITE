Suppliers= new Mongo.Collection("suppliers");

SupplierImages = new FS.Collection("supplierImages", {
  stores: [new FS.Store.FileSystem("supplierImages")]
});

SupplierImages.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

SupplierImages.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
  });

Meteor.methods({
  updateSuppliers: function(updateObject){


      if(updateObject.supplierId){
        var supplierObject = Suppliers.findOne({_id: updateObject.supplierId});
        var imageId= supplierObject.imageId;

        var newDate= new Date();
        var currentDate = moment(newDate).format('ll');
        Suppliers.update({_id:updateObject.supplierId}, {$set:{
          supplierName: updateObject.supplierName,
          supplierMainContact: updateObject.supplierMainContact,
          supplierPhoneNumber: updateObject.supplierPhoneNumber,
          supplierEmail: updateObject.supplierEmail,
          supplierAddressLine1: updateObject.supplierAddressLine1,
          supplierAddressLine2: updateObject.supplierAddressLine2,
          supplierZIP: updateObject.supplierZIP,
          supplierCity: updateObject.supplierCity,
          supplierState: updateObject.supplierState,
          supplierDescription: updateObject.supplierDescription,
          supplierProduce: updateObject.supplierProduce,
          isOrganic: updateObject.isOrganic,
          isWinterActive: updateObject.isWinterActive,
          imageId: imageId,
          supplierProdReceipt: updateObject.supplierProdReceipt
        }});
      } else {
        var newDate= new Date();
        var currentDate = moment(newDate).format('ll');
        Suppliers.insert({
          supplierName: updateObject.supplierName,
          supplierMainContact: updateObject.supplierMainContact,
          supplierPhoneNumber: updateObject.supplierPhoneNumber,
          supplierEmail: updateObject.supplierEmail,
          supplierAddressLine1: updateObject.supplierAddressLine1,
          supplierAddressLine2: updateObject.supplierAddressLine2,
          supplierZIP: updateObject.supplierZIP,
          supplierCity: updateObject.supplierCity,
          supplierState: updateObject.supplierState,
          supplierDescription: updateObject.supplierDescription,
          supplierProduce: updateObject.supplierProduce,
          isOrganic: updateObject.isOrganic,
          isWinterActive: updateObject.isWinterActive,
          imageId: [],
          supplierProdReceipt: updateObject.supplierProdReceipt
        });
      };
    },

    deleteSuppliers:function(supplierId){
      var supplierObject = Suppliers.findOne({_id: supplierId});
      SupplierImages.remove({_id:{ $in: supplierObject.imageId}});
      Suppliers.remove({_id:supplierId});
      console.log('delete'+supplierObject);
      console.log('delete related image'+ supplierObject.imageId);
    },

    SupplierImages: function(supplierId, imageId){
      Suppliers.update({_id: supplierId}, {$push: {"imageId": imageId}});
      return false;
    },

    removeSupplierImage: function(supplierId, imageId){
      Suppliers.update(
        {_id: supplierId},
        { $pull: { imageId: imageId} },
        { multi: true }
      );
    },

    updatePubliclyDisplayPhoto: function(supplierId, imageId){
      Suppliers.update({_id: supplierId}, {$set: {publicPhoto: imageId}});
      return false;
    },
});
