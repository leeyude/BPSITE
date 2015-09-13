Zips= new Mongo.Collection("zips");
Session.setDefault("currentServing", false);
Session.setDefault("CurrentServingSelector", "Yes");
Session.setDefault("zipSelector", false);
Session.setDefault("zipServingMO", false);
Session.setDefault("zipServingTU", false);
Session.setDefault("zipServingWE", false);
Session.setDefault("zipServingTH", false);
Session.setDefault("zipServingFR", false);
Session.setDefault("zipServingSA", false);
Session.setDefault("zipServingSU", false);



Template.zipcodes.helpers ({
  zipLine: function(){
    return Zips.find();
  },
});

Template.zipcodes.events({
  'click #readCSV': function(event) {
    event.preventDefault();
    var reader = new FileReader();
    var loadedFile = document.getElementById('readZipCSV').files[0];
    console.log(loadedFile);
    readFile(loadedFile, function(content) {
      Meteor.call('upload',content);
    })
  }
});

readFile = function(loadedFile,onLoadCallback) {
//When the file is loaded the callback is called with the contents as a string
  var reader = new FileReader();
  reader.onload = function (event){
    var contents=event.target.result;
    onLoadCallback(contents);
  }
  reader.readAsText(loadedFile);
};

Template.zipUpdate.helpers({
  editingZipcode: function(){
      return Session.get('editingZipcode');
  },
  zipServingMO: function(){
      return Session.get('zipServingMO');
  },
  zipServingTU: function(){
      return Session.get('zipServingTU');
  },
  zipServingWE: function(){
      return Session.get('zipServingWE');
  },
  zipServingTH: function(){
      return Session.get('zipServingTH');
  },
  zipServingFR: function(){
      return Session.get('zipServingFR');
  },
  zipServingSA: function(){
      return Session.get('zipServingSA');
  },
  zipServingSU: function(){
      return Session.get('zipServingSU');
  },


});

Template.zipUpdate.events({
  "click #zipUpdateButton": function(event, template){
    Session.set("editingZipcode", false);
    $('.zipcode').val(null);
    $('.cityName').val(null);
    $('.stateAbb').val(null);
    $('.currentServing').val(null);
    Session.set("zipServingMO",false);
    Session.set("zipServingTU",false);
    Session.set("zipServingWE",false);
    Session.set("zipServingTH",false);
    Session.set("zipServingFR",false);
    Session.set("zipServingSA",false);
    Session.set("zipServingSU",false);
  },

  "click #zipServingMO": function(event, template) {
    var servingValue = Session.get("zipServingMO");
    if(servingValue){
      Session.set("zipServingMO",false);
    }else{
      Session.set("zipServingMO",true);
    };
  },

  "click #zipServingTU": function(event, template) {
    var servingValue = Session.get("zipServingTU");
    if(servingValue){
      Session.set("zipServingTU",false);
    }else{
      Session.set("zipServingTU",true);
    };
  },

  "click #zipServingWE": function(event, template) {
    var servingValue = Session.get("zipServingWE");
    if(servingValue){
      Session.set("zipServingWE",false);
    }else{
      Session.set("zipServingWE",true);
    };
  },

  "click #zipServingTH": function(event, template) {
    var servingValue = Session.get("zipServingTH");
    if(servingValue){
      Session.set("zipServingTH",false);
    }else{
      Session.set("zipServingTH",true);
    };

  },

  "click #zipServingFR": function(event, template) {
    var servingValue = Session.get("zipServingFR");
    if(servingValue){
      Session.set("zipServingFR",false);
    }else{
      Session.set("zipServingFR",true);
    };
  },

  "click #zipServingSA": function(event, template) {
    var servingValue = Session.get("zipServingSA");
    if(servingValue){
      Session.set("zipServingSA",false);
    }else{
      Session.set("zipServingSA",true);
    };
  },

  "click #zipServingSU": function(event, template) {
    var servingValue = Session.get("zipServingSU");
    if(servingValue){
      Session.set("zipServingSU",false);
    }else{
      Session.set("zipServingSU",true);
    };
  },

  "click .save": function(event, template){
    var zipcode= template.find(".zipcode").value;
    var cityName= template.find(".cityName").value;
    var stateAbb= template.find(".stateAbb").value;
    var currentServing= template.find(".currentServing").value;
    var zipId= Session.get('editingZipcode');
    var MO= Session.get("zipServingMO");
    var TU= Session.get("zipServingTU");
    var WE= Session.get("zipServingWE");
    var TH= Session.get("zipServingTH");
    var FR= Session.get("zipServingFR");
    var SA= Session.get("zipServingSA");
    var SU= Session.get("zipServingSU");
    Meteor.call('updateZips', zipcode, cityName, stateAbb, currentServing, zipId, MO, TU, WE, TH, FR, SA, SU);
  },

  "click .delete": function(event, template){
    var zipId= Session.get('editingZipcode');
    Meteor.call('deleteZips', ingreId);
  },

  "click #zipCurrentServingYes": function(event, template){
    $('.zipcodeSearch').val(null);
    Session.set("CurrentServingSelector", "Yes");
  },

  "click #zipCurrentServingNo": function(event, template){
    $('.zipcodeSearch').val(null);
    Session.set("CurrentServingSelector", "No");
  },
  "click #zipCurrentServingAll": function(event, template){
    $('.zipcodeSearch').val(null);
    Session.set("zipSelector", false);
    Session.set("CurrentServingSelector", false);
  },


  "click #zipcodeSearchInput": function(event, template){
    var zipcodeSearch= template.find(".zipcodeSearch").value;
    if (zipcodeSearch.length !==5){
      alert("Your ZIP code input should be 5 digits.");
      $('.zipcodeSearch').val(null);
    } else {
        $("#zipCurrentServingAll").click();
        Session.set("zipSelector", zipcodeSearch);
    };
  },

});

Template.zipLines.events({
  "dblclick .zipLines": function(event, template){
    $("#zipUpdateButton").click();
    Session.set("editingZipcode", this._id);
    $('.zipcode').val(this.zipcode);
    $('.cityName').val(this.cityName);
    $('.stateAbb').val(this.stateAbb);
    $('.currentServing').val(this.currentServing);
    Session.set("zipServingMO", this.MO);
    Session.set("zipServingTU", this.TU);
    Session.set("zipServingWE", this.WE);
    Session.set("zipServingTH", this.TH);
    Session.set("zipServingFR", this.FR);
    Session.set("zipServingSA", this.SA);
    Session.set("zipServingSU", this.SU);

  },


});

Template.zipcodes.helpers({
  CurrentServingSelector: function(){
      return Session.get('CurrentServingSelector');
  },
  zipSelector: function(){
      return Session.get('zipSelector');
  },

});
