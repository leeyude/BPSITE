Template.mealPlan.helpers ({
  profileSummary: function(){
    var preId= Session.get("preUserLoggedIn");
    return Meteor.users.findOne({_id:preId});
  },

  monthCalculator: function(){
    // assumption is that birthday input
    var preId= Session.get("preUserLoggedIn");
    var result = BDDifferenceResults(preId, "N/A");  // a global function of BDDifferenceResults.
    return result;
  },

});

// This section helps handle summary of alergens.
Template.mealPlan.helpers({
  allergenStatementOne: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile = Meteor.users.findOne({_id:preUserLoggedIn});
    var profileOneAllergen = [
      tempProfile.profile.babyProfileOne.allergenWheat,
      tempProfile.profile.babyProfileOne.allergenShellfish,
      tempProfile.profile.babyProfileOne.allergenEggs,
      tempProfile.profile.babyProfileOne.allergenFish,
      tempProfile.profile.babyProfileOne.allergenPeanuts,
      tempProfile.profile.babyProfileOne.allergenMilk,
      tempProfile.profile.babyProfileOne.allergenTreeNuts,
      tempProfile.profile.babyProfileOne.allergenSoybeans,
    ];

    statementSummary= getAllergenStatement(profileOneAllergen);

    return statementSummary;
  },
  allergenStatementTwo: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile = Meteor.users.findOne({_id:preUserLoggedIn});
    var statementFactor = 0;
    var statementContent = [];
    var profileTwoAllergen = [
      tempProfile.profile.babyProfileTwo.allergenWheat,
      tempProfile.profile.babyProfileTwo.allergenShellfish,
      tempProfile.profile.babyProfileTwo.allergenEggs,
      tempProfile.profile.babyProfileTwo.allergenFish,
      tempProfile.profile.babyProfileTwo.allergenPeanuts,
      tempProfile.profile.babyProfileTwo.allergenMilk,
      tempProfile.profile.babyProfileTwo.allergenTreeNuts,
      tempProfile.profile.babyProfileTwo.allergenSoybeans,
    ];

    statementSummary= getAllergenStatement(profileTwoAllergen);

    return statementSummary;
  },
  allergenStatementThree: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile = Meteor.users.findOne({_id:preUserLoggedIn});
    var statementFactor = 0;
    var statementContent = [];
    var profileThreeAllergen = [
      tempProfile.profile.babyProfileThree.allergenWheat,
      tempProfile.profile.babyProfileThree.allergenShellfish,
      tempProfile.profile.babyProfileThree.allergenEggs,
      tempProfile.profile.babyProfileThree.allergenFish,
      tempProfile.profile.babyProfileThree.allergenPeanuts,
      tempProfile.profile.babyProfileThree.allergenMilk,
      tempProfile.profile.babyProfileThree.allergenTreeNuts,
      tempProfile.profile.babyProfileThree.allergenSoybeans,
    ];

    statementSummary= getAllergenStatement(profileThreeAllergen);

    return statementSummary;
  },
});


// This section helps handle summary of puree options.
Session.setDefault("emptyWarning1", false);
Session.setDefault("emptyWarning2", false);
Session.setDefault("emptyWarning3", false);

Template.mealPlan.helpers({
  pureeStatementOne: function(){
    var getPuree1 = Session.get("singlePuree1")
    var getPuree2 = Session.get("yummyPairs1")
    var getPuree3 = Session.get("tastyTrio1")
    var getPuree = [getPuree1, getPuree2, getPuree3];

    var statementSummary = getPureeStatement(getPuree);

    return statementSummary;
  },
  pureeStatementTwo: function(){
    var getPuree1 = Session.get("singlePuree2")
    var getPuree2 = Session.get("yummyPairs2")
    var getPuree3 = Session.get("tastyTrio2")
    var getPuree = [getPuree1, getPuree2, getPuree3];
    var statementSummary = getPureeStatement(getPuree);
    return statementSummary;
  },
  pureeStatementThree: function(){
    var getPuree1 = Session.get("singlePuree3")
    var getPuree2 = Session.get("yummyPairs3")
    var getPuree3 = Session.get("tastyTrio3")
    var getPuree = [getPuree1, getPuree2, getPuree3];
    var statementSummary = getPureeStatement(getPuree);
    return statementSummary;
  },
  emptyWarning1: function(){
    return Session.get("emptyWarning1");
  },
  emptyWarning2: function(){
    return Session.get("emptyWarning2");
  },
  emptyWarning3: function(){
    return Session.get("emptyWarning3");
  },
});


// edit profile buttons

Template.mealPlan.events({
  "click #edit1stBaby": function(event, template){
    Router.go('/profile');
  },
  "click #edit2ndBaby": function(event, template){
    Router.go('/profile2');
  },
  "click #edit3rdBaby": function(event, template){
    Router.go('/profile3');
  }
});

// thie section includes helpers and events for puree types for three profiles.
Session.setDefault("singlePuree1", false);
Session.setDefault("yummyPairs1", false);
Session.setDefault("tastyTrio1", false);
Session.setDefault("singlePuree2", false);
Session.setDefault("yummyPairs2", false);
Session.setDefault("tastyTrio2", false);
Session.setDefault("singlePuree3", false);
Session.setDefault("yummyPairs3", false);
Session.setDefault("tastyTrio3", false);


Template.mealPlan.helpers({
  singlePuree1: function(){
    return Session.get("singlePuree1");
  },
  yummyPairs1: function(){
    return Session.get("yummyPairs1");
  },
  tastyTrio1: function(){
    return Session.get("tastyTrio1");
  },
  singlePuree2: function(){
    return Session.get("singlePuree2");
  },
  yummyPairs2: function(){
    return Session.get("yummyPairs2");
  },
  tastyTrio2: function(){
    return Session.get("tastyTrio2");
  },
  singlePuree3: function(){
    return Session.get("singlePuree3");
  },
  yummyPairs3: function(){
    return Session.get("yummyPairs3");
  },
  tastyTrio3: function(){
    return Session.get("tastyTrio3");
  },
});

Template.mealPlan.events({
  "click #singlePuree1": function(event, template){       //change singlePuree
    var getValue= template.find("#singlePuree1").value;   //change singlePuree
    if(getValue==="true"){
      Session.set("singlePuree1", false);                 //change singlePuree
    }else{
      Session.set("singlePuree1", true);                  //change singlePuree
    };
  },
  "click #yummyPairs1": function(event, template){       //change yummyPaires1
    var getValue= template.find("#yummyPairs1").value;   //change yummyPaires1
    if(getValue==="true"){
      Session.set("yummyPairs1", false);                 //change yummyPaires1
    }else{
      Session.set("yummyPairs1", true);                  //change yummyPaires1
    };
  },
  "click #tastyTrio1": function(event, template){       //change tastyTrio1
    var getValue= template.find("#tastyTrio1").value;   //change tastyTrio1
    if(getValue==="true"){
      Session.set("tastyTrio1", false);                 //change tastyTrio1
    }else{
      Session.set("tastyTrio1", true);                  //change tastyTrio1
    };
  },
  "click #singlePuree2": function(event, template){       //change singlePuree2
    var getValue= template.find("#singlePuree2").value;   //change singlePuree2
    if(getValue==="true"){
      Session.set("singlePuree2", false);                 //change singlePuree2
    }else{
      Session.set("singlePuree2", true);                  //change singlePuree2
    };
  },
  "click #yummyPairs2": function(event, template){       //change yummyPaires2
    var getValue= template.find("#yummyPairs2").value;   //change yummyPaires2
    if(getValue==="true"){
      Session.set("yummyPairs2", false);                 //change yummyPaires2
    }else{
      Session.set("yummyPairs2", true);                  //change yummyPaires2
    };
  },
  "click #tastyTrio2": function(event, template){       //change tastyTrio2
    var getValue= template.find("#tastyTrio2").value;   //change tastyTrio2
    if(getValue==="true"){
      Session.set("tastyTrio2", false);                 //change tastyTrio2
    }else{
      Session.set("tastyTrio2", true);                  //change tastyTrio2
    };
  },
  "click #singlePuree3": function(event, template){       //change singlePuree
    var getValue= template.find("#singlePuree3").value;   //change singlePuree
    if(getValue==="true"){
      Session.set("singlePuree3", false);                 //change singlePuree
    }else{
      Session.set("singlePuree3", true);                  //change singlePuree
    };
  },
  "click #yummyPairs3": function(event, template){       //change yummyPaires3
    var getValue= template.find("#yummyPairs3").value;   //change yummyPaires3
    if(getValue==="true"){
      Session.set("yummyPairs3", false);                 //change yummyPaires3
    }else{
      Session.set("yummyPairs3", true);                  //change yummyPaires3
    };
  },
  "click #tastyTrio3": function(event, template){       //change tastyTrio3
    var getValue= template.find("#tastyTrio3").value;   //change tastyTrio3
    if(getValue==="true"){
      Session.set("tastyTrio3", false);                 //change tastyTrio3
    }else{
      Session.set("tastyTrio3", true);                  //change tastyTrio3
    };
  },
});

// thie section includes helpers and events for BOX OPTIONS for three profiles.

Session.setDefault("boxOptionSmallOne", false);
Session.setDefault("boxOptionSmallTwo", false);
Session.setDefault("boxOptionSmallThree", false);
Session.setDefault("boxOptionMediumOne", true);
Session.setDefault("boxOptionMediumTwo", true);
Session.setDefault("boxOptionMediumThree", true);
Session.setDefault("boxOptionLargeOne", false);
Session.setDefault("boxOptionLargeTwo", false);
Session.setDefault("boxOptionLargeThree", false);

Template.mealPlan.helpers({
  boxOptionSmallOne: function(){
    return Session.get("boxOptionSmallOne");
  },
  boxOptionSmallTwo: function(){
    return Session.get("boxOptionSmallTwo");
  },
  boxOptionSmallThree: function(){
    return Session.get("boxOptionSmallThree");
  },
  boxOptionMediumOne: function(){
    return Session.get("boxOptionMediumOne");
  },
  boxOptionMediumTwo: function(){
    return Session.get("boxOptionMediumTwo");
  },
  boxOptionMediumThree: function(){
    return Session.get("boxOptionMediumThree");
  },
  boxOptionLargeOne: function(){
    return Session.get("boxOptionLargeOne");
  },
  boxOptionLargeTwo: function(){
    return Session.get("boxOptionLargeTwo");
  },
  boxOptionLargeThree: function(){
    return Session.get("boxOptionLargeThree");
  },
});

Template.mealPlan.events({
  "click #small-box-1": function(event, template){
    Session.set("boxOptionSmallOne", true);
    Session.set("boxOptionMediumOne", false);
    Session.set("boxOptionLargeOne", false);
  },
  "click #medium-box-1": function(event, template){
    Session.set("boxOptionSmallOne", false);
    Session.set("boxOptionMediumOne", true);
    Session.set("boxOptionLargeOne", false);
  },
  "click #large-box-1 ": function(event, template){
    Session.set("boxOptionSmallOne", false);
    Session.set("boxOptionMediumOne", false);
    Session.set("boxOptionLargeOne", true);
  },
  "click #small-box-2": function(event, template){
    Session.set("boxOptionSmallTwo", true);
    Session.set("boxOptionMediumTwo", false);
    Session.set("boxOptionLargeTwo", false);
  },
  "click #medium-box-2": function(event, template){
    Session.set("boxOptionSmallTwo", false);
    Session.set("boxOptionMediumTwo", true);
    Session.set("boxOptionLargeTwo", false);
  },
  "click #large-box-2": function(event, template){
    Session.set("boxOptionSmallTwo", false);
    Session.set("boxOptionMediumTwo", false);
    Session.set("boxOptionLargeTwo", true);
  },
  "click #small-box-3": function(event, template){
    Session.set("boxOptionSmallThree", true);
    Session.set("boxOptionMediumThree", false);
    Session.set("boxOptionLargeThree", false);
  },
  "click #medium-box-3": function(event, template){
    Session.set("boxOptionSmallThree", false);
    Session.set("boxOptionMediumThree", true);
    Session.set("boxOptionLargeThree", false);
  },
  "click #large-box-3": function(event, template){
    Session.set("boxOptionSmallThree", false);
    Session.set("boxOptionMediumThree", false);
    Session.set("boxOptionLargeThree", true);
  },
});

Template.mealPlan.helpers({
  setMealPlan: function(){
    var userId= Session.get("preUserLoggedIn");
    var getDefaultMealOption =  defaultMealOption(userId);
    var getMealVolume = mealVolume(userId);
console.log(getDefaultMealOption);

// below section sets default of puree options
    if(getDefaultMealOption[0].singlePuree){
      Session.set("singlePuree1", true);
    }else{
      Session.set("singlePuree1", false);
    };
    if(getDefaultMealOption[0].yummyPairs){
      Session.set("yummyPairs1", true);
    }else{
      Session.set("yummyPairs1", false);
    };
    if(getDefaultMealOption[0].tastyTrio){
      Session.set("tastyTrio1", true);
    }else{
      Session.set("tastyTrio1", false);
    };
    if(getDefaultMealOption[1].singlePuree){
      Session.set("singlePuree2", true);
    }else{
      Session.set("singlePuree2", false);
    };
    if(getDefaultMealOption[1].yummyPairs){
      Session.set("yummyPairs2", true);
    }else{
      Session.set("yummyPairs2", false);
    };
    if(getDefaultMealOption[1].tastyTrio){
      Session.set("tastyTrio2", true);
    }else{
      Session.set("tastyTrio2", false);
    };
    if(getDefaultMealOption[2].singlePuree){
      Session.set("singlePuree3", true);
    }else{
      Session.set("singlePuree3", false);
    };
    if(getDefaultMealOption[2].yummyPairs){
      Session.set("yummyPairs3", true);
    }else{
      Session.set("yummyPairs3", false);
    };
    if(getDefaultMealOption[2].tastyTrio){
      Session.set("tastyTrio3", true);
    }else{
      Session.set("tastyTrio3", false);
    };
    if(getDefaultMealOption[0].boxSmall){
      Session.set("boxOptionSmallOne", true);
    }else{
      Session.set("boxOptionSmallOne", false);
    };
    if(getDefaultMealOption[0].boxMedium){
      Session.set("boxOptionMediumOne", true);
    }else{
      Session.set("boxOptionMediumOne", false);
    };
    if(getDefaultMealOption[0].boxLarge){
      Session.set("boxOptionLargeOne", true);
    }else{
      Session.set("boxOptionLargeOne", false);
    };
    if(getDefaultMealOption[1].boxSmall){
      Session.set("boxOptionSmallTwo", true);
    }else{
      Session.set("boxOptionSmallTwo", false);
    };
    if(getDefaultMealOption[1].boxMedium){
      Session.set("boxOptionMediumTwo", true);
    }else{
      Session.set("boxOptionMediumTwo", false);
    };
    if(getDefaultMealOption[1].boxLarge){
      Session.set("boxOptionLargeTwo", true);
    }else{
      Session.set("boxOptionLargeTwo", false);
    };
    if(getDefaultMealOption[2].boxSmall){
      Session.set("boxOptionSmallThree", true);
    }else{
      Session.set("boxOptionSmallThree", false);
    };
    if(getDefaultMealOption[2].boxMedium){
      Session.set("boxOptionMediumThree", true);
    }else{
      Session.set("boxOptionMediumThree", false);
    };
    if(getDefaultMealOption[2].boxLarge){
      Session.set("boxOptionLargeThree", true);
    }else{
      Session.set("boxOptionLargeThree", false);
    };

    return false;
  },
});

// meal plan continue buttons
Session.setDefault("fieldCheckingWarning", false);

Template.mealPlan.events({
  "click #mealPlanContinue": function(event, template){
    var userId= Session.get("preUserLoggedIn");
    var userObject = Meteor.users.findOne({_id:userId});
    var babyStatus = [
      userObject.profile.babyProfileOne.babyStatus,
      userObject.profile.babyProfileTwo.babyStatus,
      userObject.profile.babyProfileThree.babyStatus
    ];
    var mealOption = [{},{},{}];
    var singlePuree = [];
    var yummyPairs = [];
    var tastyTrio = [];
    var boxSmall = [];
    var boxMedium = [];
    var boxLarge= [];
    var verifyEmpty = [0,0,0];


    singlePuree[0]= Session.get("singlePuree1");
    singlePuree[1]= Session.get("singlePuree2");
    singlePuree[2]= Session.get("singlePuree3");
    yummyPairs[0]= Session.get("yummyPairs1");
    yummyPairs[1]= Session.get("yummyPairs2");
    yummyPairs[2]= Session.get("yummyPairs3");
    tastyTrio[0]= Session.get("tastyTrio1");
    tastyTrio[1]= Session.get("tastyTrio2");
    tastyTrio[2]= Session.get("tastyTrio3");

    boxSmall[0]= Session.get("boxOptionSmallOne");
    boxSmall[1]= Session.get("boxOptionSmallTwo");
    boxSmall[2]= Session.get("boxOptionSmallThree");
    boxMedium[0]= Session.get("boxOptionMediumOne");
    boxMedium[1]= Session.get("boxOptionMediumTwo");
    boxMedium[2]= Session.get("boxOptionMediumThree");
    boxLarge[0]= Session.get("boxOptionLargeOne");
    boxLarge[1]= Session.get("boxOptionLargeTwo");
    boxLarge[2]= Session.get("boxOptionLargeThree");

    for (var i = 0; i < 3; i++) {
      if(babyStatus[i]){
        mealOption[i]={
          singlePuree: singlePuree[i],
          yummyPairs: yummyPairs[i],
          tastyTrio: tastyTrio[i],
          boxSmall: boxSmall[i],
          boxMedium: boxMedium[i],
          boxLarge: boxLarge[i],
        };
      }else{
        mealOption[i]={
          singlePuree: true,
          yummyPairs: false,
          tastyTrio: false,
          boxSmall: true,
          boxMedium: false,
          boxLarge: false,
        };
      };
    };

    if(singlePuree[0]==false&&yummyPairs[0]==false&&tastyTrio[0]==false){
      Session.set("fieldCheckingWarning", true);
    }else if(singlePuree[1]==false&&yummyPairs[1]==false&&tastyTrio[1]==false){
      Session.set("fieldCheckingWarning", true);
      console.log("2nd baby needs selection");
    }else if(singlePuree[2]==false&&yummyPairs[2]==false&&tastyTrio[2]==false){
      Session.set("fieldCheckingWarning", true);
      console.log("3rd baby needs selection");
    }else{
      Session.set("fieldCheckingWarning", false);
      Meteor.call("mealPlanContinue", userId, mealOption);
      console.log("puree selections are fine");
      Router.go('/delivery');
    };


  },
  fieldCheckingWarning: function(){
    return Session.get('fieldCheckingWarning');
  },
});
