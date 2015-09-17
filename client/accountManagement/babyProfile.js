Template.babyProfile.events({
  "click #testForLogUpdate": function(event, template){
    console.log("click button");
    var userId = Meteor.userId();
    Meteor.call("createDefaultDeliveryLog", userId, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  }
});
