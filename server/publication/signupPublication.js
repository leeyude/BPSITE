Meteor.publish('preUser', function(userEmail){
    if(userEmail){
      return Meteor.users.find({email: userEmail});
    };
//    console.log("publish"+this);
//return this.ready;
});
