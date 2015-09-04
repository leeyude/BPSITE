// Get baby's name to show baby's name on the page
Session.setDefault("babyName3", null);

Template.profile3.events({
  "change #babyName": function(event, template){
     var getBabyName= template.find("#babyName").value;
     Session.set("babyName3", getBabyName);
     console.log(getBabyName);
  }
});

Template.profile3.helpers({
  babyName2: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile3 = Meteor.users.findOne({_id:preUserLoggedIn});

      Session.set("babyName3", tempProfile3.profile.babyProfileThree.name);
      if(tempProfile3.profile.babyProfileThree.gender==="true"){
        Session.set("gender2", true)
      }else{
        Session.set("gender2", false)
      };
      $('#babyBirthday').val(tempProfile3.profile.babyProfileThree.birthday);

      if(tempProfile3.profile.babyProfileThree.allergenWheat==="true"){
        Session.set("wheat3",true)
      }else{
        Session.set("wheat3",false)
      };
      if(tempProfile3.profile.babyProfileThree.allergenShellfish==="true"){
        Session.set("shellfish3",true)
      }else{
        Session.set("shellfish3",false)
      };
      if(tempProfile3.profile.babyProfileThree.allergenEggs==="true"){
        Session.set("eggs3",true)
      }else{
        Session.set("eggs3",false)
      };
      if(tempProfile3.profile.babyProfileThree.allergenFish==="true"){
        Session.set("fish3",true)
      }else{
        Session.set("fish3",false)
      };
      if(tempProfile3.profile.babyProfileThree.allergenPeanuts==="true"){
        Session.set("peanuts3",true)
      }else{
        Session.set("peanuts3",false)
      };
      if(tempProfile3.profile.babyProfileThree.allergenMilk==="true"){
        Session.set("milk3",true)
      }else{
        Session.set("milk3",false)
      };
      if(tempProfile3.profile.babyProfileThree.allergenTreeNuts==="true"){
        Session.set("treeNuts3",true)
      }else{
        Session.set("treeNuts3",false)

      };
      if(tempProfile3.profile.babyProfileThree.allergenSoybeans==="true"){
        Session.set("soybeans3",true)
      }else{
        Session.set("soybeans3",false)
      };

      var otherAllergen = tempProfile3.profile.babyProfileThree.otherAllergen;
      Session.set("otherAllergen3", otherAllergen);

      Session.set("mealFreq3", tempProfile3.profile.babyProfileThree.mealsPerDay);
      Session.set("ouncePerMeal3", tempProfile3.profile.babyProfileThree.ouncePerMeal);
      if(tempProfile3.profile.addressType=="true"){
        Session.set("addressTypeBusiness", false);
        Session.set("addressTypeResidential", true);
      }else {
        Session.set("addressTypeBusiness", true);
        Session.set("addressTypeResidential", false);
      };
      Session.set("babyName2", tempProfile3.profile.babyProfileTwo.name);

    return Session.get("babyName2");
  },

  babyName3: function(){
    return Session.get("babyName3");
  },
});

// Gender Selection starts here

Session.setDefault("gender3", true);

Template.profile3.events({
  "click #radioBoy": function(event, template){
    Session.set("gender3", true);
  },
  "click #radioGirl": function(event, template){
    Session.set("gender3", false);
  },
});

Template.profile3.helpers({
  gender3: function(){
    return Session.get("gender3");
  }
});

// Setting default birthday to be 6 months earlier than today

Template.profile3.helpers({
  defaultBirthday3: function(){
    var preUserLoggedIn = Session.get("preUserLoggedIn");
    var tempProfile2 = Meteor.users.findOne({_id:preUserLoggedIn});
    var defaultBirthday = tempProfile2.profile.babyProfileTwo.birthday;
    Session.set("defaultBirthday3", defaultBirthday);

    return Session.get("defaultBirthday3");
  }
});

// Allergen Selection starts here

Session.setDefault("wheat3", false);
Session.setDefault("shelfish3", false);
Session.setDefault("eggs3", false);
Session.setDefault("fish3", false);
Session.setDefault("peanuts3", false);
Session.setDefault("milk3", false);
Session.setDefault("treeNuts3", false);
Session.setDefault("soybeans3", false);
Session.setDefault("otherAllergen3", false);


// control for wheat value

Template.profile3.events({
  "click #allergenWheat": function(event, template){
    var wheatValue= template.find("#allergenWheat").value; // change wheat value
    if(wheatValue==="true"){                               // change wheat value
      $('#allergenWheat').val(false);                      // change wheat value
      Session.set("wheat3", false);                         // change wheat value
    }else{
      $('#allergenWheat').val(true);                       // change wheat value
      Session.set("wheat3", true);                          // change wheat value
    };
  }
});

Template.profile3.helpers({
  wheat3: function(){                                      // change wheat value
    return Session.get("wheat3");                        // change wheat value
  },
});

// control for shelfish value

Template.profile3.events({
  "click #allergenShellfish": function(event, template){
    var shellfishValue= template.find("#allergenShellfish").value; // change shellfish value
    if(shellfishValue==="true"){                               // change shellfish value
      $('#allergenShellfish').val(false);                      // change shellfish value
      Session.set("shellfish3", false);                         // change shellfish value
    }else{
      $('#allergenShellfish').val(true);                       // change shellfish value
      Session.set("shellfish3", true);                          // change shellfish value
    };
  }
});

Template.profile3.helpers({
  shellfish3: function(){                                      // change shellfish value
    return Session.get("shellfish3");                        // change shellfish value
  },
});

// control for eggs value

Template.profile3.events({
  "click #allergenEggs": function(event, template){
    var eggsValue= template.find("#allergenEggs").value; // change eggs value
    if(eggsValue==="true"){                               // change eggs value
      $('#allergenEggs').val(false);                      // change eggs value
      Session.set("eggs3", false);                         // change eggs value
    }else{
      $('#allergenEggs').val(true);                       // change eggs value
      Session.set("eggs3", true);                          // change eggs value
    };
  }
});

Template.profile3.helpers({
  eggs3: function(){                                      // change eggs value
    return Session.get("eggs3");                        // change eggs value
  },
});

// control for fish value

Template.profile3.events({
  "click #allergenFish": function(event, template){       // change fish value
    var fishValue= template.find("#allergenFish").value;  // change fish value
    if(fishValue==="true"){                               // change fish value
      $('#allergenFish').val(false);                      // change fish value
      Session.set("fish3", false);                         // change fish value
    }else{
      $('#allergenFish').val(true);                       // change fish value
      Session.set("fish3", true);                          // change fish value
    };
  }
});

Template.profile3.helpers({
  fish3: function(){                                      // change fish value
    return Session.get("fish3");                        // change fish value
  },
});

// control for peanuts value

Template.profile3.events({
  "click #allergenPeanuts": function(event, template){       // change peanuts value
    var peanutsValue= template.find("#allergenPeanuts").value;  // change peanuts value
    if(peanutsValue==="true"){                               // change peanuts value
      $('#allergenPeanuts').val(false);                      // change peanuts value
      Session.set("peanuts3", false);                         // change peanuts value
    }else{
      $('#allergenPeanuts').val(true);                       // change peanuts value
      Session.set("peanuts3", true);                          // change peanuts value
    };
  }
});

Template.profile3.helpers({
  peanuts3: function(){                                      // change peanuts value
    return Session.get("peanuts3");                        // change peanuts value
  },
});


// control for milk value

Template.profile3.events({
  "click #allergenMilk": function(event, template){       // change milk value
    var milkValue= template.find("#allergenMilk").value;  // change milk value
    if(milkValue==="true"){                               // change milk value
      $('#allergenMilk').val(false);                      // change milk value
      Session.set("milk3", false);                         // change milk value
    }else{
      $('#milkValue').val(true);                          // change milk value
      Session.set("milk3", true);                          // change milk value
    };
  }
});

Template.profile3.helpers({
  milk3: function(){                                      // change milk value
      return Session.get("milk3");                        // change milk value
  },
});

// control for tree nuts value

Template.profile3.events({
  "click #allergenTreeNuts": function(event, template){       // change treeNuts value
    var treeNutsValue= template.find("#allergenTreeNuts").value;  // change treeNuts value
    if(treeNutsValue==="true"){                               // change treeNuts value
      $('#allergenTreeNuts').val(false);                      // change treeNuts value
      Session.set("treeNuts3", false);                         // change treeNuts value
    }else{
      $('#treeNutsValue').val(true);                          // change treeNuts value
      Session.set("treeNuts3", true);                          // change treeNuts value
    };
  }
});

Template.profile3.helpers({
  treeNuts3: function(){                                      // change treeNuts value
    return Session.get("treeNuts3");                        // change treeNuts value
  },
});

// control for soybeans value

Template.profile3.events({
  "click #allergenSoybeans": function(event, template){       // change soybeans value
    var soybeansValue= template.find("#allergenSoybeans").value;  // change soybeans value
    if(soybeansValue==="true"){                               // change soybeans value
      $('#allergenSoybeans').val(false);                      // change soybeans value
      Session.set("soybeans3", false);                         // change soybeans value
    }else{
      $('#allergenSoybeans').val(true);                          // change soybeans value
      Session.set("soybeans3", true);                          // change soybeans value
    };
  }
});

Template.profile3.helpers({
  soybeans3: function(){                                      // change soybeans value
    return Session.get("soybeans3");                        // change soybeans value
  },
});

// setting for other Allergens
Template.profile3.events({
  "click #otherAllergen": function(event, template){
    var otherAllergenText= template.find("#otherAllergen").value;
    Session.set("otherAllergen3", otherAllergenText);
  }
});

Template.profile3.helpers({
  otherAllergen3: function(){               // change  otherallergen value
    return Session.get("otherAllergen3");   // change  otherallergen value
  },
});


// Setting number of solid food a day

Session.setDefault("mealFreq3", 2);

Template.profile3.events({
  "click #hasNotStartedSolidFood": function(event, template){
    Session.set("mealFreq3", false);
    Session.set("ouncePerMeal3", false);
  },

  "click .freqIconPlus": function(event, template){
    var currentFreq= Session.get("mealFreq3");
    if(currentFreq=="6+"){
    }else{
      if(currentFreq==5){
        Session.set("mealFreq3", "6+");
        currentFreq="6+";
      }else if(currentFreq>0){
        currentFreq= currentFreq+1;
        Session.set("mealFreq3", currentFreq);
      }else{
        Session.set("mealFreq3", 1);
        Session.set("ouncePerMeal3", 4);
      };
    };
  },

  "click .freqIconMinus": function(event, template){
    var currentFreq= Session.get("mealFreq3");
    if(currentFreq){
      if(currentFreq==1){
        Session.set("mealFreq3", false);
        Session.set("ouncePerMeal3", false);
        currentFreq= false;
      }else if(currentFreq=="6+"){
        Session.set("mealFreq3", 5);
      }else{
        currentFreq= currentFreq-1;
        Session.set("mealFreq3", currentFreq);
      };
    }else{
    };
  },

});

Template.profile3.helpers({
  mealFreq3: function(){
    return Session.get("mealFreq3");
  }
});

// Setting number of Ounces of solid food per each meal

Session.setDefault("ouncePerMeal3", 4);

Template.profile3.events({
  "click .OunceIconMinus": function(event, template){
    var currentOunces = Session.get("ouncePerMeal3");
    if(currentOunces){
      if(currentOunces>1){
        if(currentOunces>8.5){
          currentOunces=currentOunces-1;
          Session.set("ouncePerMeal3", currentOunces);
        }else{
          currentOunces=currentOunces-0.5;
          Session.set("ouncePerMeal3", currentOunces);
        };
      };
    };
  },
  "click .OunceIconPlus": function(event, template){
    var currentOunces = Session.get("ouncePerMeal3");
    if(currentOunces){
      if(currentOunces>7.5){
        if(currentOunces>19){

        }else{
          currentOunces=currentOunces+1;
          Session.set("ouncePerMeal3", currentOunces);
        };
      }else{
        currentOunces=currentOunces+0.5;
        Session.set("ouncePerMeal3", currentOunces);
      };
    }else{
      Session.set("ouncePerMeal3", 1);
      Session.set("mealFreq3", 1);
    };
  },
});

Template.profile3.helpers({
  ouncePerMeal3: function(){
    return Session.get("ouncePerMeal3");
  }
});

// Setting address type

Template.profile3.events({
  "click #addressTypeBusiness": function(event, template){
    console.log("click Business");
     Session.set("addressTypeBusiness", true);
     Session.set("addressTypeResidential", false);
  },
  "click #addressTypeResidential": function(event, template){
    console.log("click Residential");

     Session.set("addressTypeBusiness", false);
     Session.set("addressTypeResidential", true);
  },
});


Template.profile3.helpers({
  addressTypeBusiness: function(){
    return Session.get("addressTypeBusiness");
  },
  addressTypeResidential: function(){
    return Session.get("addressTypeResidential");
  },
});

// This section is for "continue" button and storing form data into collection.

Template.profile3.events({
  "click #continueArrow3": function(event, template){
    var preId= Session.get("preUserLoggedIn");
    var tempUserObject3 = Meteor.users.findOne({_id:preId});
    var thirdBabyStatus= tempUserObject3.profile.babyProfileTwo.babyStatus;
    var babyName = template.find("#babyName").value;
    var babyGender = template.find(".gender").value;
    var babyBirthday = template.find("#babyBirthday").value;
    var allergenWheat = template.find("#allergenWheat").value;
    var allergenShellfish = template.find("#allergenShellfish").value;
    var allergenEggs = template.find("#allergenEggs").value;
    var allergenFish = template.find("#allergenFish").value;
    var allergenPeanuts = template.find("#allergenPeanuts").value;
    var allergenMilk = template.find("#allergenMilk").value;
    var allergenTreeNuts = template.find("#allergenTreeNuts").value;
    var allergenSoybeans = template.find("#allergenSoybeans").value;
    var otherAllergen = template.find("#otherAllergen").value;


    var mealFreq = Session.get("mealFreq3");
    var mealOunces = Session.get("ouncePerMeal3");

    var eatingHabits = !mealFreq===""; //
    var addressType = template.find("#addressTypeResidential").value;

    var tempUserObject3 = {
      profile: {
        addressType: addressType,
        babyProfileThree:{
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
    var fieldCheckingWarning = babyName==="";
    if(fieldCheckingWarning){
      Session.set("fieldCheckingWarning", true);
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }else{
      Session.set("fieldCheckingWarning", false);
      Meteor.call("completeUpdate3", preId, tempUserObject3);
    };
    Router.go('/mealPlan');
  },
});

Template.profile3.helpers({
  fieldCheckingWarning: function(){
    return Session.get("fieldCheckingWarning");
  }
});

// This section defines back and cancel button

Template.profile3.events({
  "click #backToSecond": function(event, template){
    Router.go('/profile2');
  },
  "click #cancelTheThird": function(event, template){
    Session.setPersistent("preUserLoggedInToProfile3", false);
    var preId= Session.get("preUserLoggedIn");
    Meteor.call("cancel3", preId);
    Router.go('/mealPlan');
  },
});
