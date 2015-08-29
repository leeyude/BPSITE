Template.zipNotCovered.helpers({
  getNotCoveredZIP: function(){
    return Session.get("getNotCoveredZIP");
  },
  waitListUserEmail: function(){
    return Session.get("waitListUserEmail");
  }
});

Template.zipNotCovered.events({
  "click #sign-up-button": function(event, template){
    var userName= template.find("#userName").value;
    var friendEmail= template.find("#friend_email").value;
    var userEmail= Session.get("waitListUserEmail");
    Meteor.call("referFriend", userName, friendEmail, userEmail);
    $('#userName').val(null);
    $('#friend_email').val(null);
  }
});
