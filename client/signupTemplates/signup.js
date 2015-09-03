Session.setDefault("preUserLoggedIn", false);

Template.signup.events({
  "change #user_email": function(event, template) {
    var userEmail= template.find("#user_email").value;
    Meteor.subscribe('preUser',userEmail)
  },
  "click #sign-up-button": function(event, template){

    var userEmail= template.find("#user_email").value;
    var userZip= template.find("#user_zip").value;
    Session.set("validZIP", userZip);
    Session.set("userEmail", userEmail);
    // Gets value from the two input boxes of signup page

    if(userZip.length!==5){
      // if zipcode is not 5 digits, throw an error to user.
      alert("Please enter 5-digit ZIP code.");
      $('#user_zip').val(null);
    }else{
      /* if zipcode is 5-digit, proceed to check two things.
      First, check the 5-digit input exists in database.
      Second, check whether the email input exist in database*/
      $('#user_email').val(null);
      $('#user_zip').val(null);

      Meteor.call("emailExist", userEmail, userZip, function(error, result){
        if(error){
          alert("Please enter a valid 5-digit ZIP Code.");
        }
        if(result){
          // when result is true, proceed with signup session.
          if(result==="proceed"){
            Session.setPersistent("validZIP", userZip);
            Session.setPersistent("userEmail", userEmail);
            Session.setPersistent("preUserLoggedIn", true);
            console.log(result);
          }else if(result==="notCovered"){
            Meteor.call("notCoverTheZIPWaitlisted", userEmail, userZip);
            Session.setPersistent("getNotCoveredZIP", userZip);
            Session.setPersistent("waitListUserEmail", userEmail);
            Router.go('/zipNotCovered');
          };

          Session.setPersistent("preUserLoggedIn", Meteor.users.findOne({email:userEmail})._id);
          console.log("useraccount id is......."+Session.get("preUserLoggedIn"));
          Router.go('/profile');

        }else{
          alert('This Email has already been taken. Please revise email entry.');
          // when result is false, show that email has been taken.
        };
      });
    };
  }
});
