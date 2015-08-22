Template.signup.events({
  "click #sign-up-button": function(event, template){

    var userEmail= template.find("#user_email").value;
    var userZip= template.find("#user_zip").value;
    // Gets value from the two input boxes of signup page

    if(userZip.length!==5){
      // if zipcode is not 5 digits, throw an error to user.
      alert("Please enter 5-digit ZIP code.");
      $('#user_zip').val(null);
    }else{
      /* if zipcode is 5-digit, proceed to check two things.
      First, check the 5-digit input exists in database.
      Second, check whether the email input exist in database*/
      console.log(userEmail);
      console.log(userZip);
      $('#user_email').val(null);
      $('#user_zip').val(null);

      Meteor.call("emailExist", userEmail, userZip, function(error, result){
        if(error){
          alert("Please enter a valid 5-digit ZIP Code.");
        }
        if(result){
          // when result is true, proceed with signup session.
          if(result==="proceed"){
            console.log(result);
            Router.go('/profile');
          }else if(result==="notCovered"){
            console.log(result);
            Session.set("getNotCoveredZIP", userZip);
            Router.go('/zipNotCovered');
          };



        }else{
          alert('This Email has already been taken. Please revise email entry.');
          // when result is false, show that email has been taken.

        };
      });


    };



  }
});
