WaitlistUsers = new Mongo.Collection("waitlistUsers");

/*
schema:
  waitlistEmail: email field
  waitlistZIP: 5 digits ZIP code of the current user,
  createAt: time of the email added,
  lastUpdatedAt: time of the current email used in login,
  logs: {
    {logTime: ...},
    {logTime: ...},
    {logTime: ...},
    {logTime: ...},
    ...
  },
  Referral: {
    {
      referredEmail: ...,
      referredTime: currentDate
    },
    {
      referredEmail: ...,
      referredTime: currentDate
    },
    {
      referredEmail: ...,
      referredTime: currentDate
    },
    ...
  },
*/

Meteor.methods({
   notCoverTheZIPWaitlisted : function(userEmail, userZIP) {
     var newDate= new Date();
     var currentDate = moment(newDate).format('ll');
     var checkEmailExist= WaitlistUsers.find({waitlistEmail:userEmail}).count()>0;
     console.log("checkEmailExist verification is .."+checkEmailExist);


     if(checkEmailExist){
      var waitlistUserId= WaitlistUsers.findOne({waitlistEmail:userEmail})._id;
      console.log("found the existing email");
      console.log(waitlistUserId);
      WaitlistUsers.update({_id:waitlistUserId}, {
        $set:{
          lastUpdatedAt: currentDate,
      }});
      WaitlistUsers.update({_id:waitlistUserId}, {
        $push: {
          logs: {logTime:currentDate}
        }});

     }else{

       WaitlistUsers.insert({
         waitlistEmail: userEmail,
         waitlistUserName: "N/A",
         waitlistZIP: userZIP,
         createAt: currentDate,
         lastUpdatedAt: currentDate,
         logs: [{logTime:currentDate}],

//         waitlistUserName: "N/A",
//         waitlistReferredEmail: "N/A",
       });
     };
    },

  referFriend: function(userName, friendEmail, userEmail){
    var newDate= new Date();
    var currentDate = moment(newDate).format('ll');
    console.log(userName);
    console.log(friendEmail);
    console.log(userEmail);
    var waitlistUserId= WaitlistUsers.findOne({waitlistEmail:userEmail})._id;

    WaitlistUsers.update({_id:waitlistUserId}, {
      $push:{
        referral:
          {
            referredEmail: friendEmail,
            referredTime: currentDate
          },
    }});
    WaitlistUsers.update({_id:waitlistUserId},{$set:{
      waitlistUserName: userName,
    }});
    console.log(waitlistUserId);

  },

});
