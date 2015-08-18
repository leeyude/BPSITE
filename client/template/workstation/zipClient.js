Zips= new Mongo.Collection("zips");
Session.setDefault("currentServing", false);
Session.setDefault("CurrentServingSelector", "Yes");


Template.zipcodes.helpers ({
  zipLine: function(){
    console.log("helper update"+Session.get("CurrentServingSelector"));
    return Zips.find({},{limit : 50}, {$or: [{ currentServing: Session.get("CurrentServingSelector") }]});
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
    Session.set("CurrentServingSelector", "Yes");
    console.log(Session.get("CurrentServingSelector"));
  },

  "click #zipCurrentServingNo": function(event, template){
    Session.set("CurrentServingSelector", "No");
    console.log(Session.get("CurrentServingSelector"));
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
  }
});
