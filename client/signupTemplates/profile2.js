// Get baby's name to show baby's name on the page
Session.setDefault("babyName2", null);
Session.setDefault("preUserLoggedInToProfile3", false);


Template.profile2.events({
  "change #babyName": function(event, template){
     var getBabyName2= template.find("#babyName").value;
     Session.set("babyName2", getBabyName2);
  }
});

Template.profile2.helpers({
  babyName: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile2 = Meteor.users.findOne({_id:preUserLoggedIn});
    var profileTwoExist = tempProfile2.profile.babyProfileTwo.babyStatus;
    if(profileTwoExist){
      Session.set("babyName2", tempProfile2.profile.babyProfileTwo.name);
      if(tempProfile2.profile.babyProfileTwo.gender===true){
        Session.set("gender2", true)
      }else{
        Session.set("gender2", false)
      };
      Session.set("defaultBirthday2", tempProfile2.profile.babyProfileTwo.birthday);

      if(tempProfile2.profile.babyProfileTwo.allergenWheat===true){
        Session.set("wheat2",true)
      }else{
        Session.set("wheat2",false)
      };
      if(tempProfile2.profile.babyProfileTwo.allergenShellfish===true){
        Session.set("shellfish2",true)
      }else{
        Session.set("shellfish2",false)
      };
      if(tempProfile2.profile.babyProfileTwo.allergenEggs===true){
        Session.set("eggs2",true)
      }else{
        Session.set("eggs2",false)
      };
      if(tempProfile2.profile.babyProfileTwo.allergenFish===true){
        Session.set("fish2",true)
      }else{
        Session.set("fish2",false)
      };
      if(tempProfile2.profile.babyProfileTwo.allergenPeanuts===true){
        Session.set("peanuts2",true)
      }else{
        Session.set("peanuts2",false)
      };
      if(tempProfile2.profile.babyProfileTwo.allergenMilk===true){
        Session.set("milk2",true)
      }else{
        Session.set("milk2",false)
      };
      if(tempProfile2.profile.babyProfileTwo.allergenTreeNuts===true){
        Session.set("treeNuts2",true)
      }else{
        Session.set("treeNuts2",false)
      };
      if(tempProfile2.profile.babyProfileTwo.allergenSoybeans===true){
        Session.set("soybeans2",true)
      }else{
        Session.set("soybeans2",false)
      };

      var otherAllergen = tempProfile2.profile.babyProfileTwo.otherAllergen;
      Session.set("otherAllergen2", otherAllergen);

      Session.set("mealFreq2", tempProfile2.profile.babyProfileTwo.mealsPerDay);
      Session.set("ouncePerMeal2", tempProfile2.profile.babyProfileTwo.ouncePerMeal);
      if(tempProfile2.profile.addressType==true){
        Session.set("addressTypeBusiness", false);
        Session.set("addressTypeResidential", true);
      }else {
              Session.set("addressTypeBusiness", true);
              Session.set("addressTypeResidential", false);
            };
            Session.set("babyName", tempProfile2.profile.babyProfileOne.name);
    };

    return Session.get("babyName");
  },

  babyName2: function(){
    return Session.get("babyName2");
  },
});

// Gender Selection starts here

Session.setDefault("gender2", true);

Template.profile2.events({
  "click #radioBoy": function(event, template){
    Session.set("gender2", true);
  },
  "click #radioGirl": function(event, template){
    Session.set("gender2", false);
  },
});

Template.profile2.helpers({
  gender2: function(){
    return Session.get("gender2");
  }
});

// Setting default birthday to be 6 months earlier than today

Template.profile2.helpers({
  defaultBirthday2: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile2 = Meteor.users.findOne({_id:preUserLoggedIn});
    var secondBabyCreated = tempProfile2.profile.babyProfileTwo.babyStatus;
    if(secondBabyCreated){
    }else {
      var defaultBirthday = moment().subtract(6, 'months').format('ll');
      Session.setDefault("defaultBirthday2", defaultBirthday);
    };
    return Session.get("defaultBirthday2");
  }
});

// Allergen Selection starts here

Session.setDefault("wheat2", false);
Session.setDefault("shelfish2", false);
Session.setDefault("eggs2", false);
Session.setDefault("fish2", false);
Session.setDefault("peanuts2", false);
Session.setDefault("milk2", false);
Session.setDefault("treeNuts2", false);
Session.setDefault("soybeans2", false);
Session.setDefault("otherAllergen2", false);


// control for wheat value

Template.profile2.events({
  "click #allergenWheat": function(event, template){
    var wheatValue= template.find("#allergenWheat").value; // change wheat value
    if(wheatValue==="true"){                               // change wheat value
      $('#allergenWheat').val(false);                      // change wheat value
      Session.set("wheat2", false);                         // change wheat value
    }else{
      $('#allergenWheat').val(true);                       // change wheat value
      Session.set("wheat2", true);                          // change wheat value
    };
  }
});

Template.profile2.helpers({
  wheat2: function(){                                      // change wheat value
    return Session.get("wheat2");                        // change wheat value
  },
});

// control for shelfish value

Template.profile2.events({
  "click #allergenShellfish": function(event, template){
    var shellfishValue= template.find("#allergenShellfish").value; // change shellfish value
    if(shellfishValue==="true"){                               // change shellfish value
      $('#allergenShellfish').val(false);                      // change shellfish value
      Session.set("shellfish2", false);                         // change shellfish value
    }else{
      $('#allergenShellfish').val(true);                       // change shellfish value
      Session.set("shellfish2", true);                          // change shellfish value
    };
  }
});

Template.profile2.helpers({
  shellfish2: function(){                                      // change shellfish value
    return Session.get("shellfish2");                        // change shellfish value
  },
});

// control for eggs value

Template.profile2.events({
  "click #allergenEggs": function(event, template){
    var eggsValue= template.find("#allergenEggs").value; // change eggs value
    if(eggsValue==="true"){                               // change eggs value
      $('#allergenEggs').val(false);                      // change eggs value
      Session.set("eggs2", false);                         // change eggs value
    }else{
      $('#allergenEggs').val(true);                       // change eggs value
      Session.set("eggs2", true);                          // change eggs value
    };
  }
});

Template.profile2.helpers({
  eggs2: function(){                                      // change eggs value
    return Session.get("eggs2");                        // change eggs value
  },
});

// control for fish value

Template.profile2.events({
  "click #allergenFish": function(event, template){       // change fish value
    var fishValue= template.find("#allergenFish").value;  // change fish value
    if(fishValue==="true"){                               // change fish value
      $('#allergenFish').val(false);                      // change fish value
      Session.set("fish2", false);                         // change fish value
    }else{
      $('#allergenFish').val(true);                       // change fish value
      Session.set("fish2", true);                          // change fish value
    };
  }
});

Template.profile2.helpers({
  fish2: function(){                                      // change fish value
    return Session.get("fish2");                        // change fish value
  },
});

// control for peanuts value

Template.profile2.events({
  "click #allergenPeanuts": function(event, template){       // change peanuts value
    var peanutsValue= template.find("#allergenPeanuts").value;  // change peanuts value
    if(peanutsValue==="true"){                               // change peanuts value
      $('#allergenPeanuts').val(false);                      // change peanuts value
      Session.set("peanuts2", false);                         // change peanuts value
    }else{
      $('#allergenPeanuts').val(true);                       // change peanuts value
      Session.set("peanuts2", true);                          // change peanuts value
    };
  }
});

Template.profile2.helpers({
  peanuts2: function(){                                      // change peanuts value
    return Session.get("peanuts2");                        // change peanuts value
  },
});


// control for milk value

Template.profile2.events({
  "click #allergenMilk": function(event, template){       // change milk value
    var milkValue= template.find("#allergenMilk").value;  // change milk value
    if(milkValue==="true"){                               // change milk value
      $('#allergenMilk').val(false);                      // change milk value
      Session.set("milk2", false);                         // change milk value
    }else{
      $('#milkValue').val(true);                          // change milk value
      Session.set("milk2", true);                          // change milk value
    };
  }
});

Template.profile2.helpers({
  milk2: function(){                                      // change milk value
      return Session.get("milk2");                        // change milk value
  },
});

// control for tree nuts value

Template.profile2.events({
  "click #allergenTreeNuts": function(event, template){       // change treeNuts value
    var treeNutsValue= template.find("#allergenTreeNuts").value;  // change treeNuts value
    if(treeNutsValue==="true"){                               // change treeNuts value
      $('#allergenTreeNuts').val(false);                      // change treeNuts value
      Session.set("treeNuts2", false);                         // change treeNuts value
    }else{
      $('#treeNutsValue').val(true);                          // change treeNuts value
      Session.set("treeNuts2", true);                          // change treeNuts value
    };
  }
});

Template.profile2.helpers({
  treeNuts2: function(){                                      // change treeNuts value
    return Session.get("treeNuts2");                        // change treeNuts value
  },
});

// control for soybeans value

Template.profile2.events({
  "click #allergenSoybeans": function(event, template){       // change soybeans value
    var soybeansValue= template.find("#allergenSoybeans").value;  // change soybeans value
    if(soybeansValue==="true"){                               // change soybeans value
      $('#allergenSoybeans').val(false);                      // change soybeans value
      Session.set("soybeans2", false);                         // change soybeans value
    }else{
      $('#allergenSoybeans').val(true);                          // change soybeans value
      Session.set("soybeans2", true);                          // change soybeans value
    };
  }
});

Template.profile2.helpers({
  soybeans2: function(){                                      // change soybeans value
    return Session.get("soybeans2");                        // change soybeans value
  },
});

// setting for other Allergens
Template.profile2.events({
  "click #otherAllergen": function(event, template){
    var otherAllergenText= template.find("#otherAllergen").value;
    Session.set("otherAllergen2", otherAllergenText);
  }
});

Template.profile2.helpers({
  otherAllergen2: function(){               // change  otherallergen value
    return Session.get("otherAllergen2");   // change  otherallergen value
  },
});


// Setting number of solid food a day

Session.setDefault("mealFreq2", 2);

Template.profile2.events({
  "click #hasNotStartedSolidFood": function(event, template){
    Session.set("mealFreq2", false);
    Session.set("ouncePerMeal2", false);
  },

  "click .freqIconPlus": function(event, template){
    var currentFreq= Session.get("mealFreq2");
    if(currentFreq=="6+"){
    }else{
      if(currentFreq==5){
        Session.set("mealFreq2", "6+");
        currentFreq="6+";
      }else if(currentFreq>0){
        currentFreq= currentFreq+1;
        Session.set("mealFreq2", currentFreq);
      }else{
        Session.set("mealFreq2", 1);
        Session.set("ouncePerMeal2", 4);
      };
    };
  },

  "click .freqIconMinus": function(event, template){
    var currentFreq= Session.get("mealFreq2");
    if(currentFreq){
      if(currentFreq==1){
        Session.set("mealFreq2", false);
        Session.set("ouncePerMeal2", false);
        currentFreq= false;
      }else if(currentFreq=="6+"){
        Session.set("mealFreq2", 5);
      }else{
        currentFreq= currentFreq-1;
        Session.set("mealFreq2", currentFreq);
      };
    }else{
    };
  },

});

Template.profile2.helpers({
  mealFreq2: function(){
    return Session.get("mealFreq2");
  }
});

// Setting number of Ounces of solid food per each meal

Session.setDefault("ouncePerMeal2", 4);

Template.profile2.events({
  "click .OunceIconMinus": function(event, template){
    var currentOunces = Session.get("ouncePerMeal2");
    if(currentOunces){
      if(currentOunces>1){
        if(currentOunces>8.5){
          currentOunces=currentOunces-1;
          Session.set("ouncePerMeal2", currentOunces);
        }else{
          currentOunces=currentOunces-0.5;
          Session.set("ouncePerMeal2", currentOunces);
        };
      };
    };
  },
  "click .OunceIconPlus": function(event, template){
    var currentOunces = Session.get("ouncePerMeal2");
    if(currentOunces){
      if(currentOunces>7.5){
        if(currentOunces>19){

        }else{
          currentOunces=currentOunces+1;
          Session.set("ouncePerMeal2", currentOunces);
        };
      }else{
        currentOunces=currentOunces+0.5;
        Session.set("ouncePerMeal2", currentOunces);
      };
    }else{
      Session.set("ouncePerMeal2", 1);
      Session.set("mealFreq2", 1);
    };
  },
});

Template.profile2.helpers({
  ouncePerMeal2: function(){
    return Session.get("ouncePerMeal2");
  }
});

// Setting address type

Template.profile2.events({
  "click #addressTypeBusiness": function(event, template){
     Session.set("addressTypeBusiness", true);
     Session.set("addressTypeResidential", false);
  },
  "click #addressTypeResidential": function(event, template){

     Session.set("addressTypeBusiness", false);
     Session.set("addressTypeResidential", true);
  },
});


Template.profile2.helpers({
  addressTypeBusiness: function(){
    return Session.get("addressTypeBusiness");
  },
  addressTypeResidential: function(){
    return Session.get("addressTypeResidential");
  },
});

// This section is for "continue" button and storing form data into collection.

Template.profile2.events({
  "click #continueArrow2": function(event, template){
    var preId= Session.get("preUserLoggedIn");
    var tempUserObject2 = Meteor.users.findOne({_id:preId});
    var thirdBabyStatus= tempUserObject2.profile.babyProfileThree.babyStatus;
    var babyName = template.find("#babyName").value;
    var babyGender = template.find(".gender").value=="true";
    var babyBirthday = template.find("#babyBirthday").value;
    var allergenWheat = template.find("#allergenWheat").value=="true";
    var allergenShellfish = template.find("#allergenShellfish").value=="true";
    var allergenEggs = template.find("#allergenEggs").value=="true";
    var allergenFish = template.find("#allergenFish").value=="true";
    var allergenPeanuts = template.find("#allergenPeanuts").value=="true";
    var allergenMilk = template.find("#allergenMilk").value=="true";
    var allergenTreeNuts = template.find("#allergenTreeNuts").value=="true";
    var allergenSoybeans = template.find("#allergenSoybeans").value=="true";
    var otherAllergen = template.find("#otherAllergen").value;

    var mealFreq = Session.get("mealFreq2");
    var mealOunces = Session.get("ouncePerMeal2");

    var eatingHabits = !mealFreq===""; //
    var addressType = template.find("#addressTypeResidential").value=="true";

    var tempUserObject2 = {
      profile: {
        addressType: addressType,
        babyProfileTwo:{
          babyStatus: true,
          name: babyName,
          gender: babyGender,
          birthday: babyBirthday,
          allergenWheat: allergenWheat,
          allergenShellfish: allergenShellfish,
          allergenEggs: allergenEggs,
          allergenFish: allergenFish,
          allergenPeanuts: allergenPeanuts,
          allergenMilk: allergenMilk,
          allergenTreeNuts: allergenTreeNuts,
          allergenSoybeans: allergenSoybeans,
          otherAllergen: otherAllergen,
          eatingHabits: eatingHabits,
          mealsPerDay: mealFreq,
          ouncePerMeal: mealOunces
        },
      }
    };

    var getDefaultMealOption = defaultMealOption(preId, babyBirthday,  mealFreq, mealOunces, 'babyTwo');
    
    if(babyName){
      var fieldCheckingWarning=false;
    }else{
      var fieldCheckingWarning=true;
    };

    if(thirdBabyStatus){
      if(fieldCheckingWarning){
        Session.set("fieldCheckingWarning", true);
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }else{
        Session.set("fieldCheckingWarning", false);
        Meteor.call("completeUpdate2", preId, tempUserObject2, getDefaultMealOption);
        Router.go('/mealPlan');
      };

    }else {
      if(fieldCheckingWarning){
        Session.set("fieldCheckingWarning", true);
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }else{
        Session.set("fieldCheckingWarning", false);
        Meteor.call("preUserContinue2", preId, tempUserObject2, getDefaultMealOption);
        Router.go('/mealPlan');

      };
    };
  },
});

Template.profile2.helpers({
  fieldCheckingWarning: function(){
    return Session.get("fieldCheckingWarning");
  }
});

// This section is for "Add Profile" button and storing form data into collection.

Template.profile2.events({
  "click #add3rdBaby": function(event, template){
    var preId= Session.get("preUserLoggedIn");
    var babyName = template.find("#babyName").value;
    var babyGender = template.find(".gender").value=="true";
    var babyBirthday = template.find("#babyBirthday").value;
    var allergenWheat = template.find("#allergenWheat").value=="true";
    var allergenShellfish = template.find("#allergenShellfish").value=="true";
    var allergenEggs = template.find("#allergenEggs").value=="true";
    var allergenFish = template.find("#allergenFish").value=="true";
    var allergenPeanuts = template.find("#allergenPeanuts").value=="true";
    var allergenMilk = template.find("#allergenMilk").value=="true";
    var allergenTreeNuts = template.find("#allergenTreeNuts").value=="true";
    var allergenSoybeans = template.find("#allergenSoybeans").value=="true";
    var otherAllergen = template.find("#otherAllergen").value;


    var mealFreq = Session.get("mealFreq2");
    var mealOunces = Session.get("ouncePerMeal2");

    var eatingHabits = !mealFreq===""; //
    var addressType = template.find("#addressTypeResidential").value=="true";

    var tempUserObject2 = {
      profile: {
        addressType: addressType,
        babyProfileTwo:{
          babyStatus: true,
          name: babyName,
          gender: babyGender,
          birthday: babyBirthday,
          allergenWheat: allergenWheat,
          allergenShellfish: allergenShellfish,
          allergenEggs: allergenEggs,
          allergenFish: allergenFish,
          allergenPeanuts: allergenPeanuts,
          allergenMilk: allergenMilk,
          allergenTreeNuts: allergenTreeNuts,
          allergenSoybeans: allergenSoybeans,
          otherAllergen: otherAllergen,
          eatingHabits: eatingHabits,
          mealsPerDay: mealFreq,
          ouncePerMeal: mealOunces
        },
      }
    };

var getDefaultMealOption = defaultMealOption(preId, babyBirthday,  mealFreq, mealOunces, 'babyTwo');

    if(babyName){
      var fieldCheckingWarning=false;
    }else{
      var fieldCheckingWarning=true;
    };

    if(fieldCheckingWarning){
      Session.set("fieldCheckingWarning", true);
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }else{
      Session.set("fieldCheckingWarning", false);
      Meteor.call("preUserContinue2", preId, tempUserObject2, getDefaultMealOption);
      Session.setPersistent("preUserLoggedInToProfile3", true);
      Router.go('/profile3');
    };

  },
});

// This section defines go to 3rd baby button, if 3rd baby is available

Template.profile2.events({
  "click #goTo3rdBaby": function(event, template){
    var preId= Session.get("preUserLoggedIn");
    var babyName = template.find("#babyName").value;
    var babyGender = template.find(".gender").value=="true";
    var babyBirthday = template.find("#babyBirthday").value;
    var allergenWheat = template.find("#allergenWheat").value=="true";
    var allergenShellfish = template.find("#allergenShellfish").value=="true";
    var allergenEggs = template.find("#allergenEggs").value=="true";
    var allergenFish = template.find("#allergenFish").value=="true";
    var allergenPeanuts = template.find("#allergenPeanuts").value=="true";
    var allergenMilk = template.find("#allergenMilk").value=="true";
    var allergenTreeNuts = template.find("#allergenTreeNuts").value=="true";
    var allergenSoybeans = template.find("#allergenSoybeans").value=="true";
    var otherAllergen = template.find("#otherAllergen").value;


    var mealFreq = Session.get("mealFreq2");
    var mealOunces = Session.get("ouncePerMeal2");

    var eatingHabits = !mealFreq===""; //
    var addressType = template.find("#addressTypeResidential").value=="true";

    var tempUserObject2 = {
      profile: {
        addressType: addressType,
        babyProfileTwo:{
          babyStatus: true,
          name: babyName,
          gender: babyGender,
          birthday: babyBirthday,
          allergenWheat: allergenWheat,
          allergenShellfish: allergenShellfish,
          allergenEggs: allergenEggs,
          allergenFish: allergenFish,
          allergenPeanuts: allergenPeanuts,
          allergenMilk: allergenMilk,
          allergenTreeNuts: allergenTreeNuts,
          allergenSoybeans: allergenSoybeans,
          otherAllergen: otherAllergen,
          eatingHabits: eatingHabits,
          mealsPerDay: mealFreq,
          ouncePerMeal: mealOunces
        },
      }
    };

    var getDefaultMealOption = defaultMealOption(preId, babyBirthday,  mealFreq, mealOunces, 'babyTwo');

    if(babyName){
      var fieldCheckingWarning=false;
    }else{
      var fieldCheckingWarning=true;
    };

    if(fieldCheckingWarning){
      Session.set("fieldCheckingWarning", true);
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }else{
      Session.set("fieldCheckingWarning", false);
      Meteor.call("completeUpdate2", preId, tempUserObject2, getDefaultMealOption);
      Session.setPersistent("preUserLoggedInToProfile3", true);
      Router.go('/profile3');
    };

  },
});

Session.setDefault("profile3rdBabyName", false);

Template.profile2.helpers({
  profile3rdBabyName: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile = Meteor.users.findOne({_id:preUserLoggedIn});
    var check3rdProfile = tempProfile.profile.babyProfileThree.babyStatus;
    var check3rdProfileBabyName = tempProfile.profile.babyProfileThree.name;
    if(check3rdProfile){
      Session.set("profile3rdBabyName",check3rdProfileBabyName);
    };
    return Session.get("profile3rdBabyName");
  },
});


// This section defines back and cancel button

Template.profile2.events({
  "click #backToFirst": function(event, template){
    Router.go('/profile');
  },
  "click #cancelTheSecond": function(event, template){
    var preId= Session.get("preUserLoggedIn");
    var babyBirthday = template.find("#babyBirthday").value;

    var getDefaultMealOption = defaultMealOption(preId, babyBirthday,  mealFreq, mealOunces, 'babyTwo');

    Meteor.call("cancel2", preId, getDefaultMealOption);

    Router.go('/mealPlan');
    Session.setPersistent("preUserLoggedInToProfile2", false);
    Session.setPersistent("preUserLoggedInToProfile3", false);
  },
});
