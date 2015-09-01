// Get baby's name to show baby's name on the page
Session.setDefault("babyName", null);

Template.profile.events({
  "change #babyName": function(event, template){
     var getBabyName= template.find("#babyName").value;
     Session.set("babyName", getBabyName);
     console.log(getBabyName);
  }
});

Template.profile.helpers({
  babyName: function(){
    return Session.get("babyName");
  }
});

// Gender Selection starts here

Session.setDefault("gender", null);

Template.profile.events({
  "click #radioBoy": function(event, template){
    Session.set("gender", true);
    console.log(Session.get("gender"));

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
    var defaultBirthday = moment().subtract(6, 'months').format('ll');
    Session.set("defaultBirthday", defaultBirthday);

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
    var checkSession= Session.get("wheat");               // change wheat value
    if(checkSession){
      return Session.get("wheat");                        // change wheat value
    }else{
      return Session.get("wheat");                        // change wheat value
    };
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
    var checkSession= Session.get("shellfish");               // change shellfish value
    if(checkSession){
      return Session.get("shellfish");                        // change shellfish value
    }else{
      return Session.get("shellfish");                        // change shellfish value
    };
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
    var checkSession= Session.get("eggs");               // change eggs value
    if(checkSession){
      return Session.get("eggs");                        // change eggs value
    }else{
      return Session.get("eggs");                        // change eggs value
    };
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
    var checkSession= Session.get("fish");               // change fish value
    if(checkSession){
      return Session.get("fish");                        // change fish value
    }else{
      return Session.get("fish");                        // change fish value
    };
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
    var checkSession= Session.get("peanuts");               // change peanuts value
    if(checkSession){
      return Session.get("peanuts");                        // change peanuts value
    }else{
      return Session.get("peanuts");                        // change peanuts value
    };
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
    var checkSession= Session.get("treeNuts");               // change treeNuts value
    if(checkSession){
      return Session.get("treeNuts");                        // change treeNuts value
    }else{
      return Session.get("treeNuts");                        // change treeNuts value
    };
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
    var checkSession= Session.get("soybeans");               // change soybeans value
    if(checkSession){
      return Session.get("soybeans");                        // change soybeans value
    }else{
      return Session.get("soybeans");                        // change soybeans value
    };
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


Template.profile.helpers({
  addressTypeBusiness: function(){
    return Session.get("addressTypeBusiness");
  },
  addressTypeResidential: function(){
    return Session.get("addressTypeResidential");
  },
});
