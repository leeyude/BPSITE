Suppliers= new Mongo.Collection("suppliers");

Template.supplier.helpers ({
  supplierLine: function(){
    return Suppliers.find();
  },
  selectingSupplier: function(){
    var supplierId= Session.get("selectingSupplier");
    var supplierObject = Suppliers.findOne({_id: supplierId});
    return supplierObject;
  },
  supplierImages: function() {
    var supplierId= Session.get("selectingSupplier");
    var supplierObject = Suppliers.findOne({_id: supplierId});
    if(supplierObject.imageId.length>0){
      return SupplierImages.find({_id:{ $in: supplierObject.imageId}});
    }else{
      return false;
    };
  }
});

Template.supplierUpdate.helpers({
  editingSupplier: function(){
      return Session.get('editingSupplier');
  },
  isOrganic: function(){
      return Session.get('isOrganic');
  },
  isWinterActive: function(){
      return Session.get('isWinterActive');
  },
});

Template.supplierUpdate.events({
  "click #supplierUpdateButton": function(event, template){
    Session.set('editingSupplier', false);
    $('.supplierName').val(null);
    $('.supplierMainContact').val(null);
    $('.supplierPhoneNumber').val(null);
    $('.supplierEmail').val(null);
    $('.supplierAddressLine1').val(null);
    $('.supplierAddressLine2').val(null);
    $('.supplierZIP').val(null);
    $('.supplierCity').val(null);
    $('.supplierState').val(null);
    $('.supplierDescription').val(null);
    $('.supplierProduce').val(null);
    $('.supplierProdReceipt').val(null);
    Session.set('isOrganic', false);
    Session.set('isWinterActive', false);
    Session.set('editingZipcode', false);
  },

  "change .supplierZIP": function(event, template){
    var supplierZIP= template.find(".supplierZIP").value;
    var zipReady = Meteor.subscribe('zipsSearch', supplierZIP);
    Tracker.autorun(function(){
      if(zipReady.ready()){
        var zipObject = Zips.findOne({zipcode:supplierZIP});
        var supplierCity = zipObject.cityName;
        var supplierState= zipObject.stateAbb;
        $('.supplierCity').val(supplierCity);
        $('.supplierState').val(supplierState);
      };
    });


  },

  "click .save": function(event, template){
    var supplierId= Session.get('editingSupplier');
    var supplierName= template.find(".supplierName").value;
    var supplierMainContact= template.find(".supplierMainContact").value;
    var supplierPhoneNumber= template.find(".supplierPhoneNumber").value;
    var supplierEmail= template.find(".supplierEmail").value;
    var supplierAddressLine1= template.find(".supplierAddressLine1").value;
    var supplierAddressLine2= template.find(".supplierAddressLine2").value;
    var supplierZIP= template.find(".supplierZIP").value;
    var supplierCity= template.find(".supplierCity").value;
    var supplierState= template.find(".supplierState").value;
    var supplierDescription= template.find(".supplierDescription").value;
    var supplierProduce= template.find(".supplierProduce").value;
    var isOrganic= Session.get("isOrganic");
    var isWinterActive= Session.get("isWinterActive");
    var supplierProdReceipt= template.find(".supplierProdReceipt").value;

    var updateObject = {
      supplierId: supplierId,
      supplierName: supplierName,
      supplierMainContact: supplierMainContact,
      supplierPhoneNumber: supplierPhoneNumber,
      supplierEmail: supplierEmail,
      supplierAddressLine1: supplierAddressLine1,
      supplierAddressLine2: supplierAddressLine2,
      supplierZIP: supplierZIP,
      supplierCity: supplierCity,
      supplierState: supplierState,
      supplierDescription: supplierDescription,
      supplierProduce: supplierProduce,
      isOrganic: isOrganic,
      isWinterActive: isWinterActive,
      supplierProdReceipt: supplierProdReceipt
    };

    console.log(supplierState);

    Meteor.call('updateSuppliers', updateObject); // skipped photo for now
  },

  "click .delete": function(event, template){
    var supplierId= Session.get('editingSupplier');
    Meteor.call('deleteSuppliers', supplierId);
  },

  "click .isOrganic": function(event, template){
    var sessionValue = Session.get("isOrganic");
    if(sessionValue){
      Session.set("isOrganic",false);
    }else{
      Session.set("isOrganic",true);
    };
  },

  "click .isWinterActive": function(event, template){
    var sessionValue = Session.get("isWinterActive");
    if(sessionValue){
      Session.set("isWinterActive",false);
    }else{
      Session.set("isWinterActive",true);
    };
  },
  'dropped #supplierImageDropZone': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      SupplierImages.insert(file, function (err, fileObj) {
        if (err){
          toastr.error("Upload failed... please try again.");
        } else {
          toastr.success('Upload succeeded!');
          var supplierId = Session.get('editingSupplier');
          var imageId = fileObj._id;
          Meteor.call("SupplierImages", supplierId, imageId);
        }
      });
    });
  },
});


Template.supplierSummary.events({
  "dblclick .supplierSummary": function(event, template){
    $("#supplierUpdateButton").click();
    Session.set("editingSupplier", this._id);
    $('.supplierName').val(this.supplierName);
    $('.supplierMainContact').val(this.supplierMainContact);
    $('.supplierPhoneNumber').val(this.supplierPhoneNumber);
    $('.supplierEmail').val(this.supplierEmail);
    $('.supplierAddressLine1').val(this.supplierAddressLine1);
    $('.supplierAddressLine2').val(this.supplierAddressLine2);
    $('.supplierZIP').val(this.supplierZIP);
    $('.supplierCity').val(this.supplierCity);
    $('.supplierState').val(this.supplierState);

    $('.supplierDescription').val(this.supplierDescription);
    $('.supplierProduce').val(this.supplierProduce);
    $('.supplierAddressLine2').val(this.supplierAddressLine2);
    Session.set("isOrganic", this.isOrganic);
    Session.set("isWinterActive", this.isWinterActive);
    $('.supplierProdReceipt').val(this.supplierProdReceipt);

  },

  "click .supplierSummary": function(event, template){
    Session.set("selectingSupplier", this._id);
  },


});

Session.setDefault("selectingSupplier", false);


// below section handle's supplier's photo image upload;

SupplierImages = new FS.Collection("supplierImages", {
  stores: [new FS.Store.FileSystem("supplierImages")]
});

// Setting publicly displayed image

Template.supplier.events({
  'click .deleteSupplierImage': function(event, template) {
    var supplierId= Session.get("selectingSupplier");
    var imageId = this._id;

    Meteor.call("removeSupplierImage", supplierId, imageId);
  },

  "click .supplierPhotoUnit": function(event, template){
    var supplierId= Session.get("selectingSupplier");
    var photoId = '#'+this._id;
    if($(photoId).hasClass('selected')){
      $(photoId).removeClass('selected');
      Meteor.call("updatePubliclyDisplayPhoto", supplierId, false, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          return false;
        }
      });
    }else{
      $('.supplierPhotoUnit').removeClass('selected');
      $(photoId).addClass('selected');
      Meteor.call("updatePubliclyDisplayPhoto", supplierId, this._id, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          return false;
        }
      });
    };

  }
});

Template.supplierImage.helpers({
  publiclyDisplay: function(){
    var supplierId= Session.get("selectingSupplier");
    var supplierObject = Suppliers.findOne({_id: supplierId});
    if(this._id==supplierObject.publicPhoto){
      return true;
    }else{
      return false;
    };
  }
});
