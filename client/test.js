Template.test.events({
  "click #testButton": function(event, template){
    var userId = Meteor.userId();
     console.log('call createDefaultDeliveryLog');
     Meteor.call("createDefaultDeliveryLog", userId);
     return false;
  }
});
