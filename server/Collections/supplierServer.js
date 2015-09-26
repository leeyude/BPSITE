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
  updateSuppliers: function(supplierId, supplierName, supplierMainContact, supplierPhoneNumber, supplierEmail, supplierAddressLine1, supplierAddressLine2, supplierZIP, supplierCity, supplierDescription, supplierProduce, isOrganic, isWinterActive, supplierProdReceipt){
      if(supplierId){
        var newDate= new Date();
        var currentDate = moment(newDate).format('ll');
        Suppliers.update({_id:supplierId}, {$set:{
          supplierName: supplierName,
          supplierMainContact: supplierMainContact,
          supplierPhoneNumber: supplierPhoneNumber,
          supplierEmail: supplierEmail,
          supplierAddressLine1: supplierAddressLine1,
          supplierAddressLine2: supplierAddressLine2,
          supplierZIP: supplierZIP,
          supplierCity: supplierCity,
          supplierDescription: supplierDescription,
          supplierProduce: supplierProduce,
          isOrganic: isOrganic,
          isWinterActive: isWinterActive,
          supplierProdReceipt: supplierProdReceipt
        }});
        console.log(supplierId);
      } else {
        var newDate= new Date();
        var currentDate = moment(newDate).format('ll');
        Suppliers.insert({
          supplierName: supplierName,
          supplierMainContact: supplierMainContact,
          supplierPhoneNumber: supplierPhoneNumber,
          supplierEmail: supplierEmail,
          supplierAddressLine1: supplierAddressLine1,
          supplierAddressLine2: supplierAddressLine2,
          supplierZIP: supplierZIP,
          supplierCity: supplierCity,
          supplierDescription: supplierDescription,
          supplierProduce: supplierProduce,
          isOrganic: isOrganic,
          isWinterActive: isWinterActive,
          supplierProdReceipt: supplierProdReceipt
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
    }
});
