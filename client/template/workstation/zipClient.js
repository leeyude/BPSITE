Zips= new Mongo.Collection("zips");
Session.setDefault("currentServing", false);
Session.setDefault("CurrentServingSelector", "Yes");
Session.setDefault("zipSelector", false);

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
  }
});

Template.zipUpdate.events({
  "click #zipUpdateButton": function(event, template){
    Session.set("editingZipcode", false);
    $('.zipcode').val(null);
    $('.cityName').val(null);
    $('.stateAbb').val(null);
    $('.currentServing').val(null);
  },

  "click .save": function(event, template){
    var zipcode= template.find(".zipcode").value;
    var cityName= template.find(".cityName").value;
    var stateAbb= template.find(".stateAbb").value;
    var currentServing= template.find(".currentServing").value;
    var zipId= Session.get('editingZipcode');
    Meteor.call('updateZips', zipcode, cityName, stateAbb, currentServing, zipId);
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
  }
});

Template.zipcodes.helpers({
  CurrentServingSelector: function(){
      return Session.get('CurrentServingSelector');
  },
  zipSelector: function(){
      return Session.get('zipSelector');
  },

});
