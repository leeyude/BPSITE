// remember me

Session.setDefault("rememberMe", false);

Template.signin.helpers({
  rememberMe: function(){
    return Session.get("rememberMe");
  }
});

Template.signin.events({
  "click .rememberMeCheckboxIcon": function(event, template){
    var rememberMe = Session.get("rememberMe");
    if(rememberMe){
      Session.set("rememberMe", false);
    }else{
      Session.set("rememberMe", true);
    };
    console.log(rememberMe);
    return false;
  },
});
