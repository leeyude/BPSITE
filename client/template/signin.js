Template.signin.events({
  "click #logInButton": function(event, template){
    var accountEmail = $('#signInEmail').val();
    var accountPassword = $('#signInPassword').val();
    Meteor.loginWithPassword(accountEmail, accountPassword, function(err){
      if (err){
        toastr.error('Login failed. Please try again.');
      }else{
        toastr.success('Log-In successful.');
      };
    });
     return false;

  },
});
