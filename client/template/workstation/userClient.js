
// User page displays two types of sytstem users.
// Admin user display when session value is set to false, which is default;
// consumer user display when session value is set to true.

Session.setDefault("userTypeSelection", false);

Template.userManagement.events({
  "click #userTypeBPAdminButton": function(event, template){
    Session.set("userTypeSelection", false);
    var userTypeSelection = Session.get("userTypeSelection");
    return Session.get("userTypeSelection");
  },
  "click #userTypeConsumerButton": function(event, template){
    Session.set("userTypeSelection", true);
    var userTypeSelection = Session.get("userTypeSelection");
    return Session.get("userTypeSelection");
  },
});


UserAdmins= new Mongo.Collection("userAdmins");

Template.userManagement.helpers({
  BPadminLine: function(){
    return UserAdmins.find({},{limit : 100});
  },
  userTypeSelection: function(){
    return Session.get("userTypeSelection");
  },
});
