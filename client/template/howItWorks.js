Template.howItWorks.rendered = function() {
  $('#carousel').slick({
    dots: true,
    arrows: true,
    dotsClass: 'farmDots',
  });
};

Template.howItWorks.helpers({
  farmerIntro:function(){
    return Suppliers.find({publicPhoto: { $exists: true }});
  },
});


Template.farmerIntroduction.helpers({
  supplierImages: function(){
    var supplierId= $(this);
    console.log(supplierId[0].publicPhoto);
    return SupplierImages.findOne({_id: supplierId[0].publicPhoto});
  }
});
