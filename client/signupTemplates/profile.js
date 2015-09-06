// Get baby's name to show baby's name on the page
Session.setDefault("babyName", null);
Session.setDefault("preUserLoggedInToProfile2", false);
Session.setDefault("preUserforMealPlan", false);


Template.profile.events({
  "change #babyName": function(event, template){
     var getBabyName= template.find("#babyName").value;
     Session.set("babyName", getBabyName);
  }
});

Template.profile.helpers({
  babyName: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile1 = Meteor.users.findOne({_id:preUserLoggedIn});
    var firstBabyCreated = tempProfile1.profile.babyProfileOne.babyStatus;
    if(firstBabyCreated){
      Session.set("babyName", tempProfile1.profile.babyProfileOne.name);
      if(tempProfile1.profile.babyProfileOne.gender===true){
        Session.set("gender", true)
      }else{
        Session.set("gender", false)
      };
      Session.set("defaultBirthday", tempProfile1.profile.babyProfileOne.birthday);

      if(tempProfile1.profile.babyProfileOne.allergenWheat===true){
        Session.set("wheat",true)
      }else{
        Session.set("wheat",false)
      };
      if(tempProfile1.profile.babyProfileOne.allergenShellfish===true){
        Session.set("shellfish",true)
      }else{
        Session.set("shellfish",false)
      };
      if(tempProfile1.profile.babyProfileOne.allergenEggs===true){
        Session.set("eggs",true)
      }else{
        Session.set("eggs",false)
      };
      if(tempProfile1.profile.babyProfileOne.allergenFish===true){
        Session.set("fish",true)
      }else{
        Session.set("fish",false)
      };
      if(tempProfile1.profile.babyProfileOne.allergenPeanuts===true){
        Session.set("peanuts",true)
      }else{
        Session.set("peanuts",false)
      };
      if(tempProfile1.profile.babyProfileOne.allergenMilk===true){
        Session.set("milk",true)
      }else{
        Session.set("milk",false)
      };
      if(tempProfile1.profile.babyProfileOne.allergenTreeNuts===true){
        Session.set("treeNuts",true)
      }else{
        Session.set("treeNuts",false)

      };
      if(tempProfile1.profile.babyProfileOne.allergenSoybeans===true){
        Session.set("soybeans",true)
      }else{
        Session.set("soybeans",false)
      };
      var otherAllergen = tempProfile1.profile.babyProfileOne.otherAllergen;
      Session.set("otherAllergen", otherAllergen);

      Session.set("mealFreq", tempProfile1.profile.babyProfileOne.mealsPerDay);
      Session.set("ouncePerMeal", tempProfile1.profile.babyProfileOne.ouncePerMeal);
      if(tempProfile1.profile.addressType==true){
        Session.set("addressTypeBusiness", false);
        Session.set("addressTypeResidential", true);
      }else {
        Session.set("addressTypeBusiness", true);
        Session.set("addressTypeResidential", false);
      };
    };

    return Session.get("babyName");
  }
});

// Gender Selection starts here

Session.setDefault("gender", null);

Template.profile.events({
  "click #radioBoy": function(event, template){
    Session.set("gender", true);

  },
  "click #radioGirl": function(event, template){
    Session.set("gender", false);
  },
});

Template.profile.helpers({
  gender: function(){
    return Session.get("gender");
  }
});

// Setting default birthday to be 6 months earlier than today

Template.profile.helpers({
  defaultBirthday: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile1 = Meteor.users.findOne({_id:preUserLoggedIn});
    var firstBabyCreated = tempProfile1.profile.babyProfileOne.babyStatus;
    if(firstBabyCreated){
    }else {
      var defaultBirthday = moment().subtract(6, 'months').format('ll');
      Session.setDefault("defaultBirthday", defaultBirthday);
    };
    return Session.get("defaultBirthday");
  }
});

// Allergen Selection starts here

Session.setDefault("wheat", false);
Session.setDefault("shelfish", false);
Session.setDefault("eggs", false);
Session.setDefault("fish", false);
Session.setDefault("peanuts", false);
Session.setDefault("milk", false);
Session.setDefault("treeNuts", false);
Session.setDefault("soybeans", false);
Session.setDefault("otherAllergen", false);

// control for wheat value

Template.profile.events({
  "click #allergenWheat": function(event, template){
    var wheatValue= template.find("#allergenWheat").value; // change wheat value
    if(wheatValue==="true"){                               // change wheat value
      $('#allergenWheat').val(false);                      // change wheat value
      Session.set("wheat", false);                         // change wheat value
    }else{
      $('#allergenWheat').val(true);                       // change wheat value
      Session.set("wheat", true);                          // change wheat value
    };
  }
});

Template.profile.helpers({
  wheat: function(){                                      // change wheat value
    return Session.get("wheat");                        // change wheat value
  },
});

// control for shelfish value

Template.profile.events({
  "click #allergenShellfish": function(event, template){
    var shellfishValue= template.find("#allergenShellfish").value; // change shellfish value
    if(shellfishValue==="true"){                               // change shellfish value
      $('#allergenShellfish').val(false);                      // change shellfish value
      Session.set("shellfish", false);                         // change shellfish value
    }else{
      $('#allergenShellfish').val(true);                       // change shellfish value
      Session.set("shellfish", true);                          // change shellfish value
    };
  }
});

Template.profile.helpers({
  shellfish: function(){                                      // change shellfish value
    return Session.get("shellfish");                        // change shellfish value
  },
});

// control for eggs value

Template.profile.events({
  "click #allergenEggs": function(event, template){
    var eggsValue= template.find("#allergenEggs").value; // change eggs value
    if(eggsValue==="true"){                               // change eggs value
      $('#allergenEggs').val(false);                      // change eggs value
      Session.set("eggs", false);                         // change eggs value
    }else{
      $('#allergenEggs').val(true);                       // change eggs value
      Session.set("eggs", true);                          // change eggs value
    };
  }
});

Template.profile.helpers({
  eggs: function(){                                      // change eggs value
    return Session.get("eggs");                        // change eggs value
  },
});

// control for fish value

Template.profile.events({
  "click #allergenFish": function(event, template){       // change fish value
    var fishValue= template.find("#allergenFish").value;  // change fish value
    if(fishValue==="true"){                               // change fish value
      $('#allergenFish').val(false);                      // change fish value
      Session.set("fish", false);                         // change fish value
    }else{
      $('#allergenFish').val(true);                       // change fish value
      Session.set("fish", true);                          // change fish value
    };
  }
});

Template.profile.helpers({
  fish: function(){                                      // change fish value
    return Session.get("fish");                        // change fish value
  },
});

// control for peanuts value

Template.profile.events({
  "click #allergenPeanuts": function(event, template){       // change peanuts value
    var peanutsValue= template.find("#allergenPeanuts").value;  // change peanuts value
    if(peanutsValue==="true"){                               // change peanuts value
      $('#allergenPeanuts').val(false);                      // change peanuts value
      Session.set("peanuts", false);                         // change peanuts value
    }else{
      $('#allergenPeanuts').val(true);                       // change peanuts value
      Session.set("peanuts", true);                          // change peanuts value
    };
  }
});

Template.profile.helpers({
  peanuts: function(){                                      // change peanuts value
    return Session.get("peanuts");                        // change peanuts value
  },
});


// control for milk value

Template.profile.events({
  "click #allergenMilk": function(event, template){       // change milk value
    var milkValue= template.find("#allergenMilk").value;  // change milk value
    if(milkValue==="true"){                               // change milk value
      $('#allergenMilk').val(false);                      // change milk value
      Session.set("milk", false);                         // change milk value
    }else{
      $('#milkValue').val(true);                          // change milk value
      Session.set("milk", true);                          // change milk value
    };
  }
});

Template.profile.helpers({
  milk: function(){                                      // change milk value
      return Session.get("milk");                        // change milk value
  },
});

// control for tree nuts value

Template.profile.events({
  "click #allergenTreeNuts": function(event, template){       // change treeNuts value
    var treeNutsValue= template.find("#allergenTreeNuts").value;  // change treeNuts value
    if(treeNutsValue==="true"){                               // change treeNuts value
      $('#allergenTreeNuts').val(false);                      // change treeNuts value
      Session.set("treeNuts", false);                         // change treeNuts value
    }else{
      $('#treeNutsValue').val(true);                          // change treeNuts value
      Session.set("treeNuts", true);                          // change treeNuts value
    };
  }
});

Template.profile.helpers({
  treeNuts: function(){                                      // change treeNuts value
    return Session.get("treeNuts");                        // change treeNuts value
  },
});

// control for soybeans value

Template.profile.events({
  "click #allergenSoybeans": function(event, template){       // change soybeans value
    var soybeansValue= template.find("#allergenSoybeans").value;  // change soybeans value
    if(soybeansValue==="true"){                               // change soybeans value
      $('#allergenSoybeans').val(false);                      // change soybeans value
      Session.set("soybeans", false);                         // change soybeans value
    }else{
      $('#allergenSoybeans').val(true);                          // change soybeans value
      Session.set("soybeans", true);                          // change soybeans value
    };
  }
});

Template.profile.helpers({
  soybeans: function(){                                      // change soybeans value
    return Session.get("soybeans");                        // change soybeans value
  },
});

// setting for other Allergens
Template.profile.events({
  "click #otherAllergen": function(event, template){
    var otherAllergenText= template.find("#otherAllergen").value;
    Session.set("otherAllergen", otherAllergenText);
  }
});

Template.profile.helpers({
  otherAllergen: function(){               // change  otherallergen value
    return Session.get("otherAllergen");   // change  otherallergen value
  },
});


// Setting number of solid food a day

Session.setDefault("mealFreq", 2);

Template.profile.events({
  "click #hasNotStartedSolidFood": function(event, template){
    Session.set("mealFreq", false);
    Session.set("ouncePerMeal", false);
  },

  "click .freqIconPlus": function(event, template){
    var currentFreq= Session.get("mealFreq");
    if(currentFreq=="6+"){
    }else{
      if(currentFreq==5){
        Session.set("mealFreq", "6+");
        currentFreq="6+";
      }else if(currentFreq>0){
        currentFreq= currentFreq+1;
        Session.set("mealFreq", currentFreq);
      }else{
        Session.set("mealFreq", 1);
        Session.set("ouncePerMeal", 4);
      };
    };
  },

  "click .freqIconMinus": function(event, template){
    var currentFreq= Session.get("mealFreq");
    if(currentFreq){
      if(currentFreq==1){
        Session.set("mealFreq", false);
        Session.set("ouncePerMeal", false);
        currentFreq= false;
      }else if(currentFreq=="6+"){
        Session.set("mealFreq", 5);
      }else{
        currentFreq= currentFreq-1;
        Session.set("mealFreq", currentFreq);
      };
    }else{
    };
  },

});

Template.profile.helpers({
  mealFreq: function(){
    return Session.get("mealFreq");
  }
});

// Setting number of Ounces of solid food per each meal

Session.setDefault("ouncePerMeal", 4);

Template.profile.events({
  "click .OunceIconMinus": function(event, template){
    var currentOunces = Session.get("ouncePerMeal");
    if(currentOunces){
      if(currentOunces>1){
        if(currentOunces>8.5){
          currentOunces=currentOunces-1;
          Session.set("ouncePerMeal", currentOunces);
        }else{
          currentOunces=currentOunces-0.5;
          Session.set("ouncePerMeal", currentOunces);
        };
      };
    };
  },
  "click .OunceIconPlus": function(event, template){
    var currentOunces = Session.get("ouncePerMeal");
    if(currentOunces){
      if(currentOunces>7.5){
        if(currentOunces>19){

        }else{
          currentOunces=currentOunces+1;
          Session.set("ouncePerMeal", currentOunces);
        };
      }else{
        currentOunces=currentOunces+0.5;
        Session.set("ouncePerMeal", currentOunces);
      };
    }else{
      Session.set("ouncePerMeal", 1);
      Session.set("mealFreq", 1);
    };
  },
});

Template.profile.helpers({
  ouncePerMeal: function(){
    return Session.get("ouncePerMeal");
  }
});

// Setting address type
Session.setDefault("addressTypeBusiness", false);
Session.setDefault("addressTypeResidential", true);

Template.profile.events({
  "click #addressTypeBusiness": function(event, template){
     Session.set("addressTypeBusiness", true);
     Session.set("addressTypeResidential", false);
  },
  "click #addressTypeResidential": function(event, template){

     Session.set("addressTypeBusiness", false);
     Session.set("addressTypeResidential", true);
  },
});


Template.profile.helpers({
  addressTypeBusiness: function(){
    return Session.get("addressTypeBusiness");
  },
  addressTypeResidential: function(){
    return Session.get("addressTypeResidential");
  },
});

// This section is for "continue" button and storing form data into collection.

Template.profile.events({
  "click #continueArrow1": function(event, template){
    var preId= Session.get("preUserLoggedIn");
    var tempUserObject1 = Meteor.users.findOne({_id:preId});
    var secondBabyStatus= tempUserObject1.profile.babyProfileTwo.babyStatus;

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

    var mealFreq = Session.get("mealFreq");
    var mealOunces = Session.get("ouncePerMeal");

    var eatingHabits = !mealFreq===""; //
    var addressType = template.find("#addressTypeResidential").value=="true";

    var tempUserObject1 = {
      profile: {
        addressType: addressType,
        babyProfileOne:{
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

    var getDefaultMealOption = defaultMealOption(preId, babyBirthday);
    console.log(preId);
    console.log(getDefaultMealOption);

    if(babyName){
      var fieldCheckingWarning=false;
    }else{
      var fieldCheckingWarning=true;
    };

    if(secondBabyStatus){

      if(fieldCheckingWarning){
        Session.set("fieldCheckingWarning", true);
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }else{
        Session.set("fieldCheckingWarning", false);
        Meteor.call("completeUpdate1", preId, tempUserObject1, getDefaultMealOption);
        Router.go('/mealPlan');
      };


    }else{
      if(fieldCheckingWarning){
        Session.set("fieldCheckingWarning", true);
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }else{
        Session.set("fieldCheckingWarning", false);
        Meteor.call("preUserContinue1", preId, tempUserObject1, getDefaultMealOption);
        Router.go('/mealPlan');
      };

    };
  },
});

Template.profile.helpers({
  fieldCheckingWarning: function(){
    return Session.get("fieldCheckingWarning");
  }
});

// This section is for "Add Profile" button and storing form data into collection.

Template.profile.events({
  "click #add2ndBaby": function(event, template){
    var preId= Session.get("preUserLoggedIn");
    var tempUserObject1 = Meteor.users.findOne({_id:preId});
    var secondBabyStatus= tempUserObject1.profile.babyProfileTwo.babyStatus;

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

    var mealFreq = Session.get("mealFreq");
    var mealOunces = Session.get("ouncePerMeal");

    var eatingHabits = !mealFreq===""; //
    var addressType = template.find("#addressTypeResidential").value=="true";

    var tempUserObject1 = {
      profile: {
        addressType: addressType,
        babyProfileOne:{
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

    var getDefaultMealOption = defaultMealOption(preId, babyBirthday);

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
      Meteor.call("preUserContinue1", preId, tempUserObject1, getDefaultMealOption);
      Session.setPersistent("preUserLoggedInToProfile2", true);
      Session.setPersistent("preUserforMealPlan", true);
      Router.go('/profile2');
    };

  },
});

// If 2nd baby profile exists, change button setting

Template.profile.events({
  "click #goTo2ndBaby": function(event, template){
    var preId= Session.get("preUserLoggedIn");
    var tempUserObject1 = Meteor.users.findOne({_id:preId});
    var secondBabyStatus= tempUserObject1.profile.babyProfileTwo.babyStatus;

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

    var mealFreq = Session.get("mealFreq");
    var mealOunces = Session.get("ouncePerMeal");

    var eatingHabits = !mealFreq===""; //
    var addressType = template.find("#addressTypeResidential").value=="true";

    var tempUserObject1 = {
      profile: {
        addressType: addressType,
        babyProfileOne:{
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

    var getDefaultMealOption = defaultMealOption(preId, babyBirthday);

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
      Meteor.call("completeUpdate1", preId, tempUserObject1, getDefaultMealOption);
      Session.setPersistent("preUserLoggedInToProfile2", true);
      Session.setPersistent("preUserforMealPlan", true);

      Router.go('/profile2');
    };

  },
});

Session.setDefault("profile2ndBabyName", false);

Template.profile.helpers({
  profile2ndBabyName: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile = Meteor.users.findOne({_id:preUserLoggedIn});
    var check2ndProfile = tempProfile.profile.babyProfileTwo.babyStatus;
    var check2ndProfileBabyName = tempProfile.profile.babyProfileTwo.name;
    if(check2ndProfile){
      Session.set("profile2ndBabyName",check2ndProfileBabyName);
    };
    return Session.get("profile2ndBabyName");
  },
});
