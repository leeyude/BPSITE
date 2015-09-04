Template.mealPlan.helpers ({
  profileSummary: function(){
    var preId= Session.get("preUserLoggedIn");
    return Meteor.users.findOne({_id:preId});
  },

  monthCalculator: function(){
    var preId= Session.get("preUserLoggedIn");
    var userObject = Meteor.users.findOne({_id:preId});
    var birthday1 = userObject.profile.babyProfileOne.birthday;
    var birthday2 = userObject.profile.babyProfileTwo.birthday;
    var birthday3 = userObject.profile.babyProfileThree.birthday;
    var now = new Date();
    var Duration1 = moment(now,"DD/MM/YYYY").diff(moment(birthday1,"DD/MM/YYYY"));
    var Duration2 = moment(now,"DD/MM/YYYY").diff(moment(birthday2,"DD/MM/YYYY"));
    var Duration3 = moment(now,"DD/MM/YYYY").diff(moment(birthday3,"DD/MM/YYYY"));
    console.log(Duration1);
    return "";
  },
  dayCalculator: function(){
    var preId= Session.get("preUserLoggedIn");
    var userObject = Meteor.users.findOne({_id:preId});
    return "";
  }

});
