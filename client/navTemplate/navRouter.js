Template.navRouter.helpers({
  routing: function(){
    if(Session.get("setSigninNav")){
      return true;
    } else{
      return false;
    };
  },
});
