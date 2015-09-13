Meteor.publish('preUser', function(userEmail){
    if(userEmail){
      return Meteor.users.find({"emails.address": userEmail});
    };
//    console.log("publish"+this);
//return this.ready;
});
