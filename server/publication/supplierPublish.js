Meteor.publish('supplierPublish', function(){
    return Suppliers.find();
});

Meteor.publish("supplierImages", function(){
  return SupplierImages.find();
});
