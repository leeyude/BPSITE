Template.babyProfile.helpers({
  babyProfileMealPlan: function(){
    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var deliveryDays = getDeliveryDays(userObject.profile.deliveryDay);
    $('#accountDeliveryDays').text(deliveryDays);

    var babyName = [];
    var babyPlanType = [];
    var babyRecipeType= [[],[],[]];
    var babyStatus = [userObject.profile.babyProfileOne.babyStatus, userObject.profile.babyProfileTwo.babyStatus, userObject.profile.babyProfileThree.babyStatus];

    if(userObject.profile.babyProfileOne.babyStatus){
      babyName[0] = userObject.profile.babyProfileOne.name;
      if(userObject.profile.babyProfileOne.boxSmall){
        babyPlanType[0] = 'Small Box';
      }else if(userObject.profile.babyProfileOne.boxMedium){
        babyPlanType[0] = 'Medium Box';
      }else{
        babyPlanType[0] = 'Large Box';
      };

      if(userObject.profile.babyProfileOne.singlePuree){
        babyRecipeType[0]='Single Puree';
      };
      if(userObject.profile.babyProfileOne.yummyPairs){
        if(babyRecipeType[0]!=''){
          babyRecipeType[0]=babyRecipeType[0]+", Yummy Pairs";
        }else{
          babyRecipeType[0]='Yummy Pairs';
        };
      };
      if(userObject.profile.babyProfileOne.tastyTrio){
        if(babyRecipeType[0]!=''){
          babyRecipeType[0]=babyRecipeType[0]+", Tasty Trio";
        }else{
          babyRecipeType[0]='Tasty Trio';
        };
      };
    };

    if(userObject.profile.babyProfileTwo.babyStatus){
      $('#babyTwo').removeClass('invisible');

      babyName[1] = userObject.profile.babyProfileTwo.name;
      if(userObject.profile.babyProfileTwo.boxSmall){
        babyPlanType[1] = 'Small Box';
      }else if(userObject.profile.babyProfileTwo.boxMedium){
        babyPlanType[1] = 'Medium Box';
      }else{
        babyPlanType[1] = 'Large Box';
      };

      if(userObject.profile.babyProfileTwo.singlePuree){
        babyRecipeType[1]='Single Puree';
      };
      if(userObject.profile.babyProfileTwo.yummyPairs){
        if(babyRecipeType[1]!=''){
          babyRecipeType[1]=babyRecipeType[1]+", Yummy Pairs";
        }else{
          babyRecipeType[1]='Yummy Pairs';
        };
      };
      if(userObject.profile.babyProfileTwo.tastyTrio){
        if(babyRecipeType[1]!=''){
          babyRecipeType[1]=babyRecipeType[1]+", Tasty Trio";
        }else{
          babyRecipeType[1]='Tasty Trio';
        };
      };
    };

    if(userObject.profile.babyProfileThree.babyStatus){
      babyName[2] = userObject.profile.babyProfileThree.name;
      if(userObject.profile.babyProfileThree.boxSmall){
        babyPlanType[2] = 'Small Box';
      }else if(userObject.profile.babyProfileThree.boxMedium){
        babyPlanType[2] = 'Medium Box';
      }else{
        babyPlanType[2] = 'Large Box';
      };

      if(userObject.profile.babyProfileThree.singlePuree){
        babyRecipeType[2]='Single Puree';
      };
      if(userObject.profile.babyProfileThree.yummyPairs){
        if(babyRecipeType[2]!=''){
          babyRecipeType[2]=babyRecipeType[2]+", Yummy Pairs";
        }else{
          babyRecipeType[2]='Yummy Pairs';
        };
      };
      if(userObject.profile.babyProfileThree.tastyTrio){
        if(babyRecipeType[2]!=''){
          babyRecipeType[2]=babyRecipeType[2]+", Tasty Trio";
        }else{
          babyRecipeType[2]='Tasty Trio';
        };
      };
    };

    var setBabyProfileMealPlanObject = {
      babyStatus: babyStatus,
      babyName: babyName,
      babyPlanType: babyPlanType,
      babyRecipeType: babyRecipeType,
      deliveryDays: deliveryDays
    };

    Session.set('babyProfileMealPlan', setBabyProfileMealPlanObject);

    return Session.get('babyProfileMealPlan');
  },

  getAgesbyBirthdays: function(){
    var userId = Meteor.userId();
    var result = BDDifferenceResults(userId);  // a global function of BDDifferenceResults.
    Session.set('babyBirthdays', result);
    return Session.get('babyBirthdays');
  }
});

Template.babyProfile.events({
  "click #babyProfileSelectionMealPlan": function(event, template){


// changing webform classes
    $('#babyProfileMealPlans').removeClass('hidden');
    $('#babyProfileBasics').addClass('hidden');
    $('#babyProfileAllergenNotes').addClass('hidden');

    $('.babyProfileItem').removeClass('active');
    $('#babyProfileSelectionMealPlan').addClass('active');
    return false;
  },

  "click #babyProfileSelectionBasics": function(event, template){


// changing webform classes
    $('#babyProfileMealPlans').addClass('hidden');
    $('#babyProfileBasics').removeClass('hidden');
    $('#babyProfileAllergenNotes').addClass('hidden');

    $('.babyProfileItem').removeClass('active');
    $('#babyProfileSelectionBasics').addClass('active');

    var targetHeight = $('#babyProfileBasics > .babyProfileDisplayBlock > .profileInfoBlock').height();
    $('#babyProfileBasics.babyProfileContentWrap').css('minHeight', targetHeight);
    return false;
  },

  "click #babyProfileSelectionAllergenNotes": function(event, template){

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var babyStatus = [userObject.profile.babyProfileOne.babyStatus, userObject.profile.babyProfileTwo.babyStatus, userObject.profile.babyProfileThree.babyStatus];

    var allergenWheat = [
      userObject.profile.babyProfileOne.allergenWheat, userObject.profile.babyProfileTwo.allergenWheat,
      userObject.profile.babyProfileThree.allergenWheat
    ];
    if(!allergenWheat[0]&&!allergenWheat[1]&&!allergenWheat[2]){
      $('.allergenWheat').addClass('hidden');
    }else{
      $('.allergenWheat').removeClass('hidden');
    };

    var allergenShellfish = [
      userObject.profile.babyProfileOne.allergenShellfish,
      userObject.profile.babyProfileTwo.allergenShellfish,
      userObject.profile.babyProfileThree.allergenShellfish
    ];
    if(!allergenShellfish[0]&&!allergenShellfish[1]&&!allergenShellfish[2]){
      $('.allergenShellfish').addClass('hidden');
    }else{
      $('.allergenShellfish').removeClass('hidden');
    };

    var allergenEggs = [
      userObject.profile.babyProfileOne.allergenEggs,
      userObject.profile.babyProfileTwo.allergenEggs,
      userObject.profile.babyProfileThree.allergenEggs
    ];
    if(!allergenEggs[0]&&!allergenEggs[1]&&!allergenEggs[2]){
      $('.allergenEggs').addClass('hidden');
    }else{
      $('.allergenEggs').removeClass('hidden');
    };

    var allergenFish = [
      userObject.profile.babyProfileOne.allergenFish,
      userObject.profile.babyProfileTwo.allergenFish,
      userObject.profile.babyProfileThree.allergenFish
    ];
    if(!allergenFish[0]&&!allergenFish[1]&&!allergenFish[2]){
      $('.allergenFish').addClass('hidden');
    }else{
      $('.allergenFish').removeClass('hidden');
    };

    var allergenPeanuts = [
      userObject.profile.babyProfileOne.allergenPeanuts,
      userObject.profile.babyProfileTwo.allergenPeanuts,
      userObject.profile.babyProfileThree.allergenPeanuts
    ];
    if(!allergenPeanuts[0]&&!allergenPeanuts[1]&&!allergenPeanuts[2]){
      $('.allergenPeanuts').addClass('hidden');
    }else{
      $('.allergenPeanuts').removeClass('hidden');
    };

    var allergenMilk = [
      userObject.profile.babyProfileOne.allergenMilk,
      userObject.profile.babyProfileTwo.allergenMilk,
      userObject.profile.babyProfileThree.allergenMilk
    ];
    if(!allergenMilk[0]&&!allergenMilk[1]&&!allergenMilk[2]){
      $('.allergenMilk').addClass('hidden');
    }else{
      $('.allergenMilk').removeClass('hidden');
    };

    var allergenTreeNuts = [
      userObject.profile.babyProfileOne.allergenTreeNuts,
      userObject.profile.babyProfileTwo.allergenTreeNuts,
      userObject.profile.babyProfileThree.allergenTreeNuts
    ];
    if(!allergenTreeNuts[0]&&!allergenTreeNuts[1]&&!allergenTreeNuts[2]){
      $('.allergenTreeNuts').addClass('hidden');
    }else{
      $('.allergenTreeNuts').removeClass('hidden');
    };

    var allergenSoybeans = [
      userObject.profile.babyProfileOne.allergenSoybeans,
      userObject.profile.babyProfileTwo.allergenSoybeans,
      userObject.profile.babyProfileThree.allergenSoybeans
    ];
    if(!allergenSoybeans[0]&&!allergenSoybeans[1]&&!allergenSoybeans[2]){
      $('.allergenSoybeans').addClass('hidden');
    }else{
      $('.allergenSoybeans').removeClass('hidden');
    };

    var otherAllergen = [
      userObject.profile.babyProfileOne.otherAllergen,
      userObject.profile.babyProfileTwo.otherAllergen,
      userObject.profile.babyProfileThree.otherAllergen
    ];
    if(!otherAllergen[0]&&!otherAllergen[1]&&!otherAllergen[2]){
      $('.otherAllergen').addClass('hidden');
    }else{
      $('.otherAllergen').removeClass('hidden');
    };

// changing webform classes
    $('#babyProfileMealPlans').addClass('hidden');
    $('#babyProfileBasics').addClass('hidden');
    $('#babyProfileAllergenNotes').removeClass('hidden');

    $('.babyProfileItem').removeClass('active');
    $('#babyProfileSelectionAllergenNotes').addClass('active');

    var targetHeight = $('#babyProfileAllergenNotes > .babyProfileDisplayBlock > .profileInfoBlock').height();
    $('#babyProfileAllergenNotes.babyProfileContentWrap').css('minHeight', targetHeight);

    return false;
  },

// four sections of editing
  "click #babyProfileEditMealPlan": function(event, template){
    Session.set("mealPlanFieldCheckingWarning", false);

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
// set delivery days
    var deliveryDays = getDeliveryDays(userObject.profile.deliveryDay);
    $('#profileEditMealPlan_deliveryDays').val(userObject.profile.deliveryDay);

    var babyPlanType = [];
    var babyRecipeType= [[],[],[]];
    var babyStatus = [userObject.profile.babyProfileOne.babyStatus, userObject.profile.babyProfileTwo.babyStatus, userObject.profile.babyProfileThree.babyStatus];

    if(userObject.profile.babyProfileOne.babyStatus){

      if(userObject.profile.babyProfileOne.boxSmall){
        $('#profileEditMealPlan_planType_1').val('SM');
      }else if(userObject.profile.babyProfileOne.boxMedium){
        $('#profileEditMealPlan_planType_1').val('ME');
      }else{
        $('#profileEditMealPlan_planType_1').val('LG');
      };

      if(userObject.profile.babyProfileOne.singlePuree){
        $('#profileEditMealPlan_singlePuree_1').addClass('active');
      }else{
        $('#profileEditMealPlan_singlePuree_1').removeClass('active');
      };
      if(userObject.profile.babyProfileOne.yummyPairs){
        $('#profileEditMealPlan_yummyPairs_1').addClass('active');
      }else{
        $('#profileEditMealPlan_yummyPairs_1').removeClass('active');
      };
      if(userObject.profile.babyProfileOne.tastyTrio){
        $('#profileEditMealPlan_tastyTrio_1').addClass('active');
      }else{
        $('#profileEditMealPlan_tastyTrio_1').removeClass('active');
      };
    };

    if(userObject.profile.babyProfileTwo.babyStatus){

      if(userObject.profile.babyProfileTwo.boxSmall){
        $('#profileEditMealPlan_planType_2').val('SM');
      }else if(userObject.profile.babyProfileTwo.boxMedium){
        $('#profileEditMealPlan_planType_2').val('ME');
      }else{
        $('#profileEditMealPlan_planType_2').val('LG');
      };

      if(userObject.profile.babyProfileTwo.singlePuree){
        $('#profileEditMealPlan_singlePuree_2').addClass('active');
      }else{
        $('#profileEditMealPlan_singlePuree_2').removeClass('active');
      };
      if(userObject.profile.babyProfileTwo.yummyPairs){
        $('#profileEditMealPlan_yummyPairs_2').addClass('active');
      }else{
        $('#profileEditMealPlan_yummyPairs_2').removeClass('active');
      };
      if(userObject.profile.babyProfileTwo.tastyTrio){
        $('#profileEditMealPlan_tastyTrio_2').addClass('active');
      }else{
        $('#profileEditMealPlan_tastyTrio_2').removeClass('active');
      };
    };

    if(userObject.profile.babyProfileThree.babyStatus){

      if(userObject.profile.babyProfileThree.boxSmall){
        $('#profileEditMealPlan_planType_3').val('SM');
      }else if(userObject.profile.babyProfileThree.boxMedium){
        $('#profileEditMealPlan_planType_3').val('ME');
      }else{
        $('#profileEditMealPlan_planType_3').val('LG');
      };

      if(userObject.profile.babyProfileThree.singlePuree){
        $('#profileEditMealPlan_singlePuree_3').addClass('active');
      }else{
        $('#profileEditMealPlan_singlePuree_3').removeClass('active');
      };
      if(userObject.profile.babyProfileThree.yummyPairs){
        $('#profileEditMealPlan_yummyPairs_3').addClass('active');
      }else{
        $('#profileEditMealPlan_yummyPairs_3').removeClass('active');
      };
      if(userObject.profile.babyProfileThree.tastyTrio){
        $('#profileEditMealPlan_tastyTrio_3').addClass('active');
      }else{
        $('#profileEditMealPlan_tastyTrio_3').removeClass('active');
      };
    };

    var userZip = userObject.profile.addressZIP;
    var zipObject = zipData(userZip);
    if(!zipObject.SU){
      $('#profileEditMealPlan_deliveryDays option[value="SU"]').remove();
    };
    if(!zipObject.MO){
      $('#profileEditMealPlan_deliveryDays option[value="MO"]').remove();
    };
    if(!zipObject.TU){
      $('#profileEditMealPlan_deliveryDays option[value="TU"]').remove();
    };
    if(!zipObject.WE){
      $('#profileEditMealPlan_deliveryDays option[value="WE"]').remove();
    };
    if(!zipObject.TH){
      $('#profileEditMealPlan_deliveryDays option[value="TH"]').remove();
    };
    if(!zipObject.FR){
      $('#profileEditMealPlan_deliveryDays option[value="FR"]').remove();
    };
    if(!zipObject.SA){
      $('#profileEditMealPlan_deliveryDays option[value="SA"]').remove();
    };

    $('.overlay-dark').removeClass('closed');

    $("#babyProfileMealPlans>.profileEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;

  },
});
// click meal plan buttons

Template.babyProfile.events({
  "click #profileEditMealPlan_singlePuree_1": function(event, template){
    if($('#profileEditMealPlan_singlePuree_1').hasClass('active')){
      $('#profileEditMealPlan_singlePuree_1').removeClass('active')
    }else{
      $('#profileEditMealPlan_singlePuree_1').addClass('active')
    };
    return false;
  },

  "click #profileEditMealPlan_singlePuree_2": function(event, template){
    if($('#profileEditMealPlan_singlePuree_2').hasClass('active')){
      $('#profileEditMealPlan_singlePuree_2').removeClass('active')
    }else{
      $('#profileEditMealPlan_singlePuree_2').addClass('active')
    };
    return false;
  },
  "click #profileEditMealPlan_singlePuree_3": function(event, template){
    if($('#profileEditMealPlan_singlePuree_3').hasClass('active')){
      $('#profileEditMealPlan_singlePuree_3').removeClass('active')
    }else{
      $('#profileEditMealPlan_singlePuree_3').addClass('active')
    };
    return false;
  },
  "click #profileEditMealPlan_yummyPairs_1": function(event, template){
    if($('#profileEditMealPlan_yummyPairs_1').hasClass('active')){
      $('#profileEditMealPlan_yummyPairs_1').removeClass('active')
    }else{
      $('#profileEditMealPlan_yummyPairs_1').addClass('active')
    };
    return false;
  },
  "click #profileEditMealPlan_yummyPairs_2": function(event, template){
    if($('#profileEditMealPlan_yummyPairs_2').hasClass('active')){
      $('#profileEditMealPlan_yummyPairs_2').removeClass('active')
    }else{
      $('#profileEditMealPlan_yummyPairs_2').addClass('active')
    };
    return false;
  },
  "click #profileEditMealPlan_yummyPairs_3": function(event, template){
    if($('#profileEditMealPlan_yummyPairs_3').hasClass('active')){
      $('#profileEditMealPlan_yummyPairs_3').removeClass('active')
    }else{
      $('#profileEditMealPlan_yummyPairs_3').addClass('active')
    };
    return false;
  },
  "click #profileEditMealPlan_tastyTrio_1": function(event, template){
    if($('#profileEditMealPlan_tastyTrio_1').hasClass('active')){
      $('#profileEditMealPlan_tastyTrio_1').removeClass('active')
    }else{
      $('#profileEditMealPlan_tastyTrio_1').addClass('active')
    };
    return false;
  },
  "click #profileEditMealPlan_tastyTrio_2": function(event, template){
    if($('#profileEditMealPlan_tastyTrio_2').hasClass('active')){
      $('#profileEditMealPlan_tastyTrio_2').removeClass('active')
    }else{
      $('#profileEditMealPlan_tastyTrio_2').addClass('active')
    };
    return false;
  },
  "click #profileEditMealPlan_tastyTrio_3": function(event, template){
    if($('#profileEditMealPlan_tastyTrio_3').hasClass('active')){
      $('#profileEditMealPlan_tastyTrio_3').removeClass('active')
    }else{
      $('#profileEditMealPlan_tastyTrio_3').addClass('active')
    };
    return false;
  },
  "click #accountEditDelivery_typeResidential": function(event, template){
    if($('#accountEditDelivery_typeResidential').hasClass('active')){
    }else{
      $('#accountEditDelivery_typeResidential').addClass('active')
      $('#accountEditDelivery_typeBusiness').removeClass('active')
    };
    return false;
  },
  "click #accountEditDelivery_typeBusiness": function(event, template){
    if($('#accountEditDelivery_typeBusiness').hasClass('active')){
    }else{
      $('#accountEditDelivery_typeResidential').removeClass('active')
      $('#accountEditDelivery_typeBusiness').addClass('active')
    };
    return false;
  },
});


// save meal plan
Template.babyProfile.events({
"click #profileEditMealPlanSave": function(event, template){
  var userId = Meteor.userId();
  var userObject = Meteor.users.findOne({_id: userId});

  var planType = [{
    boxSmall: false,
    boxMedium: false,
    boxLarge: false
  },{
    boxSmall: false,
    boxMedium: false,
    boxLarge: false
  },{
    boxSmall: false,
    boxMedium: false,
    boxLarge: false
  }];
  var pureeType = [{
    singlePuree: false,
    yummyPairs: false,
    tastyTrio: false
  },{
    singlePuree: false,
    yummyPairs: false,
    tastyTrio: false
  },{
    singlePuree: false,
    yummyPairs: false,
    tastyTrio: false
  }];

  console.log($('.pureeTypeCheck1').hasClass('active'));
  console.log($('.pureeTypeCheck2').hasClass('active'));
  console.log($('.pureeTypeCheck3').hasClass('active'));

  if(userObject.profile.babyProfileTwo.babyStatus){
    if(userObject.profile.babyProfileThree.babyStatus){
      if($('.pureeTypeCheck1').hasClass('active')&&$('.pureeTypeCheck2').hasClass('active')&&$('.pureeTypeCheck3').hasClass('active')){
        var validteDataEntry= true; // true means data entry is complete
      }else{
        var validteDataEntry= false; // true means data entry is complete
      }
    }else{
      if($('.pureeTypeCheck1').hasClass('active')&&$('.pureeTypeCheck2').hasClass('active')){
        var validteDataEntry= true; // true means data entry is complete
      }else{
        var validteDataEntry= false; // true means data entry is complete
      }
    }
  }else{
    if($('.pureeTypeCheck1').hasClass('active')){
      var validteDataEntry= true; // true means data entry is complete
    }else{
      var validteDataEntry= false; // true means data entry is complete
    }
  };

  if(validteDataEntry){
    Session.set("mealPlanFieldCheckingWarning", false);
    if(userObject.profile.babyProfileOne.babyStatus){
      if($('#profileEditMealPlan_planType_1').val()=='SM'){
        planType[0] = {
          boxSmall: true,
          boxMedium: false,
          boxLarge: false
        }
      };
      if($('#profileEditMealPlan_planType_1').val()=='ME'){
        planType[0] = {
          boxSmall: false,
          boxMedium: true,
          boxLarge: false
        }
      };
      if($('#profileEditMealPlan_planType_1').val()=='LG'){
        planType[0] = {
          boxSmall: false,
          boxMedium: false,
          boxLarge: true
        }
      };

      if($('#profileEditMealPlan_singlePuree_1').hasClass('active')){
        pureeType[0].singlePuree = true;
      }else{
        pureeType[0].singlePuree = false;
      };
      if($('#profileEditMealPlan_yummyPairs_1').hasClass('active')){
        pureeType[0].yummyPairs = true;
      }else{
        pureeType[0].yummyPairs = false;
      };
      if($('#profileEditMealPlan_tastyTrio_1').hasClass('active')){
        pureeType[0].tastyTrio = true;
      }else{
        pureeType[0].tastyTrio = false;
      };
    };

    if(userObject.profile.babyProfileTwo.babyStatus){
      if($('#profileEditMealPlan_planType_2').val()=='SM'){
        planType[1] = {
          boxSmall: true,
          boxMedium: false,
          boxLarge: false
        }
      };
      if($('#profileEditMealPlan_planType_2').val()=='ME'){
        planType[1] = {
          boxSmall: false,
          boxMedium: true,
          boxLarge: false
        }
      };
      if($('#profileEditMealPlan_planType_2').val()=='LG'){
        planType[1] = {
          boxSmall: false,
          boxMedium: false,
          boxLarge: true
        }
      };
      if($('#profileEditMealPlan_singlePuree_2').hasClass('active')){
        pureeType[1].singlePuree = true;
      }else{
        pureeType[1].singlePuree = false;
      };
      if($('#profileEditMealPlan_yummyPairs_2').hasClass('active')){
        pureeType[1].yummyPairs = true;
      }else{
        pureeType[1].yummyPairs = false;
      };
      if($('#profileEditMealPlan_tastyTrio_2').hasClass('active')){
        pureeType[1].tastyTrio = true;
      }else{
        pureeType[1].tastyTrio = false;
      };
    };

    if(userObject.profile.babyProfileThree.babyStatus){
      if($('#profileEditMealPlan_planType_3').val()=='SM'){
        planType[2] = {
          boxSmall: true,
          boxMedium: false,
          boxLarge: false
        }
      };
      if($('#profileEditMealPlan_planType_3').val()=='ME'){
        planType[2] = {
          boxSmall: false,
          boxMedium: true,
          boxLarge: false
        }
      };
      if($('#profileEditMealPlan_planType_3').val()=='LG'){
        planType[2] = {
          boxSmall: false,
          boxMedium: false,
          boxLarge: true
        }
      };
      if($('#profileEditMealPlan_singlePuree_3').hasClass('active')){
        pureeType[2].singlePuree = true;
      }else{
        pureeType[2].singlePuree = false;
      };
      if($('#profileEditMealPlan_yummyPairs_3').hasClass('active')){
        pureeType[2].yummyPairs = true;
      }else{
        pureeType[2].yummyPairs = false;
      };
      if($('#profileEditMealPlan_tastyTrio_3').hasClass('active')){
        pureeType[2].tastyTrio = true;
      }else{
        pureeType[2].tastyTrio = false;
      };
    };

    var deliveryDays = $('#profileEditMealPlan_deliveryDays').val();

    Meteor.call("babyProfileSaveMyMealPlan", userId, deliveryDays, planType, pureeType, function(error, result){
      if(error){
        console.log("error", error);
        toastr.error('Your choice cannot be saved at this moment. Please try again later.');
      }
      if(result){
        toastr.success('Meal plans are updated.');
      }
    });
    $('.overlay-dark').addClass('closed');
    $("#babyProfileMealPlans>.profileEditBlock").addClass("closed");

    return false;

  }else{
    Session.set("mealPlanFieldCheckingWarning", true);
    console.log(Session.get('mealPlanFieldCheckingWarning'));
    toastr.error('Please choose at least one puree type.');
    return false;
  };
},

});
// display basic profileEditBasicsSave

Template.babyProfile.helpers({
  babyProfileBasics: function(){
    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});

    var name = [userObject.profile.babyProfileOne.name, userObject.profile.babyProfileTwo.name, userObject.profile.babyProfileThree.name];
    var birthday = [userObject.profile.babyProfileOne.birthday, userObject.profile.babyProfileTwo.birthday, userObject.profile.babyProfileThree.birthday];
    var gender= [userObject.profile.babyProfileOne.gender, userObject.profile.babyProfileTwo.gender, userObject.profile.babyProfileThree.gender];
    var mealsPerDay= [userObject.profile.babyProfileOne.mealsPerDay, userObject.profile.babyProfileTwo.mealsPerDay, userObject.profile.babyProfileThree.mealsPerDay];
    var ouncePerMeal = [userObject.profile.babyProfileOne.ouncePerMeal, userObject.profile.babyProfileTwo.ouncePerMeal, userObject.profile.babyProfileThree.ouncePerMeal];
    var babyStatus = [userObject.profile.babyProfileOne.babyStatus, userObject.profile.babyProfileTwo.babyStatus, userObject.profile.babyProfileThree.babyStatus];

    var babyProfileBasics = {
      name: name,
      birthday: birthday,
      gender: gender,
      mealsPerDay: mealsPerDay,
      ouncePerMeal: ouncePerMeal
    };

    Session.set("babyProfileBasics", babyProfileBasics);

    return Session.get('babyProfileBasics')
  }
});


// edit basic profiles
Template.babyProfile.events({
  "click #babyProfileEditBasics_1": function(event, template){
    Session.set("basicsFieldCheckingWarning", false);

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var currentBabyInfo = {
      sequence: 1,
      name: userObject.profile.babyProfileOne.name
    };

    Session.set('currentBaby', currentBabyInfo);

    var name = userObject.profile.babyProfileOne.name;
    var birthday = userObject.profile.babyProfileOne.birthday;
    var gender = userObject.profile.babyProfileOne.gender;
    var mealsPerDay = userObject.profile.babyProfileOne.mealsPerDay;
    var ouncePerMeal = userObject.profile.babyProfileOne.ouncePerMeal;

    $('#babyNameInput').val(name);
    $('#babyProfileBirthdayInput').val(birthday);
    if(gender){
      $('#babyProfileRadioBoy').addClass('active');
      $('#babyProfileRadioGirl').removeClass('active');

    }else{
      $('#babyProfileRadioGirl').addClass('active');
      $('#babyProfileRadioBoy').removeClass('active');
    };

    Session.set('mealFreq', mealsPerDay);
    Session.set('ouncePerMeal', ouncePerMeal);

    $('.overlay-dark').removeClass('closed');

    $("#babyProfileBasics>.profileEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;
  },

  "click #babyProfileEditBasics_2": function(event, template){
    Session.set("basicsFieldCheckingWarning", false);

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var currentBabyInfo = {
      sequence: 2,
      name: userObject.profile.babyProfileTwo.name
    };

    Session.set('currentBaby', currentBabyInfo);

    var name = userObject.profile.babyProfileTwo.name;
    var birthday = userObject.profile.babyProfileTwo.birthday;
    var gender = userObject.profile.babyProfileTwo.gender;
    var mealsPerDay = userObject.profile.babyProfileTwo.mealsPerDay;
    var ouncePerMeal = userObject.profile.babyProfileTwo.ouncePerMeal;

    $('#babyNameInput').val(name);
    $('#babyProfileBirthdayInput').val(birthday);
    if(gender){
      $('#babyProfileRadioBoy').addClass('active');
      $('#babyProfileRadioGirl').removeClass('active');

    }else{
      $('#babyProfileRadioGirl').addClass('active');
      $('#babyProfileRadioBoy').removeClass('active');
    };

    Session.set('mealFreq', mealsPerDay);
    Session.set('ouncePerMeal', ouncePerMeal);

    $('.overlay-dark').removeClass('closed');

    $("#babyProfileBasics>.profileEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;
  },

  "click #babyProfileEditBasics_3": function(event, template){
    Session.set("basicsFieldCheckingWarning", false);

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var currentBabyInfo = {
      sequence: 3,
      name: userObject.profile.babyProfileThree.name
    };

    Session.set('currentBaby', currentBabyInfo);

    var name = userObject.profile.babyProfileThree.name;
    var birthday = userObject.profile.babyProfileThree.birthday;
    var gender = userObject.profile.babyProfileThree.gender;
    var mealsPerDay = userObject.profile.babyProfileThree.mealsPerDay;
    var ouncePerMeal = userObject.profile.babyProfileThree.ouncePerMeal;

    $('#babyNameInput').val(name);
    $('#babyProfileBirthdayInput').val(birthday);
    if(gender){
      $('#babyProfileRadioBoy').addClass('active');
      $('#babyProfileRadioGirl').removeClass('active');

    }else{
      $('#babyProfileRadioGirl').addClass('active');
      $('#babyProfileRadioBoy').removeClass('active');
    };

    Session.set('mealFreq', mealsPerDay);
    Session.set('ouncePerMeal', ouncePerMeal);

    $('.overlay-dark').removeClass('closed');

    $("#babyProfileBasics>.profileEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;
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
      }else if(currentFreq=="6+"){
        Session.set("mealFreq", 5);
      }else{
        currentFreq= currentFreq-1;
        Session.set("mealFreq", currentFreq);
      };
    }else{
    };
  },

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

Template.babyProfile.helpers({
  mealFreq: function(){
    return Session.get('mealFreq');
  },

  ouncePerMeal: function(){
    return Session.get('ouncePerMeal');
  },

});

// save basic Profile

Template.babyProfile.events({
  "click #profileEditBasicsSave": function(event, template){
    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});

    var name = $('#babyNameInput').val();
    var birthday = $('#babyProfileBirthdayInput').val();
    if($('#babyProfileRadioBoy').hasClass('active')){
      var gender = true;
    }else{
      var gender = false;
    };
    var mealsPerDay = Session.get('mealFreq');
    var ouncePerMeal = Session.get('ouncePerMeal');
    var currentBaby = Session.get('currentBaby');

    var basicsFieldCheckingWarning = {
      name: false,
      birthday: false,
    };

    if(name==''||birthday==''){
      if(name==''){
        basicsFieldCheckingWarning.name = true;
      };
      if(birthday==''){
        basicsFieldCheckingWarning.birthday = true;
      };
      Session.set('basicsFieldCheckingWarning', basicsFieldCheckingWarning);
      toastr.error('Please ensure filling these fields.');
      return false;
    }else{
      var babyBasics = {
        currentBaby: currentBaby.sequence,
        name: name,
        birthday: birthday,
        gender: gender,
        mealsPerDay: mealsPerDay,
        ouncePerMeal: ouncePerMeal
      };

      Meteor.call("babyProfileSaveBasics", userId, babyBasics, function(error, result){
        if(error){
          console.log("error", error);
          toastr.error("Baby's profile cannot be saved at this moment. Please try again later.")
        }
        if(result){
          Session.set('accountInfoFieldCheckingWarning', false);
          toastr.success('Account information is updated.');
          $('#babyProfileSelectionBasics').click();
        }
      });

      $('.overlay-dark').addClass('closed');
      $("#babyProfileBasics>.profileEditBlock").addClass("closed");

      return false;
    };
  },
  "click #babyProfileRadioBoy": function(){
    $('#babyProfileRadioBoy').addClass('active');
    $('#babyProfileRadioGirl').removeClass('active');
  },
  "click #babyProfileRadioGirl": function(){
    $('#babyProfileRadioBoy').removeClass('active');
    $('#babyProfileRadioGirl').addClass('active');
  },

});


// display allergens

Template.babyProfile.helpers({
  babyProfileAllergens: function(){
    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var babyStatus = [userObject.profile.babyProfileOne.babyStatus, userObject.profile.babyProfileTwo.babyStatus, userObject.profile.babyProfileThree.babyStatus];

    var allergenWheat = [
      userObject.profile.babyProfileOne.allergenWheat, userObject.profile.babyProfileTwo.allergenWheat,
      userObject.profile.babyProfileThree.allergenWheat
    ];
    var allergenShellfish = [
      userObject.profile.babyProfileOne.allergenShellfish,
      userObject.profile.babyProfileTwo.allergenShellfish,
      userObject.profile.babyProfileThree.allergenShellfish
    ];
    var allergenEggs = [
      userObject.profile.babyProfileOne.allergenEggs,
      userObject.profile.babyProfileTwo.allergenEggs,
      userObject.profile.babyProfileThree.allergenEggs
    ];
    var allergenFish = [
      userObject.profile.babyProfileOne.allergenFish,
      userObject.profile.babyProfileTwo.allergenFish,
      userObject.profile.babyProfileThree.allergenFish
    ];
    var allergenPeanuts = [
      userObject.profile.babyProfileOne.allergenPeanuts,
      userObject.profile.babyProfileTwo.allergenPeanuts,
      userObject.profile.babyProfileThree.allergenPeanuts
    ];
    var allergenMilk = [
      userObject.profile.babyProfileOne.allergenMilk,
      userObject.profile.babyProfileTwo.allergenMilk,
      userObject.profile.babyProfileThree.allergenMilk
    ];
    var allergenTreeNuts = [
      userObject.profile.babyProfileOne.allergenTreeNuts,
      userObject.profile.babyProfileTwo.allergenTreeNuts,
      userObject.profile.babyProfileThree.allergenTreeNuts
    ];
    var allergenSoybeans = [
      userObject.profile.babyProfileOne.allergenSoybeans,
      userObject.profile.babyProfileTwo.allergenSoybeans,
      userObject.profile.babyProfileThree.allergenSoybeans
    ];
    var otherAllergen = [
      userObject.profile.babyProfileOne.otherAllergen,
      userObject.profile.babyProfileTwo.otherAllergen,
      userObject.profile.babyProfileThree.otherAllergen
    ];

    var babyProfileAllergens = {
      babyStatus: babyStatus,
      allergenWheat: allergenWheat,
      allergenShellfish: allergenShellfish,
      allergenEggs: allergenEggs,
      allergenFish: allergenFish,
      allergenPeanuts: allergenPeanuts,
      allergenMilk: allergenMilk,
      allergenTreeNuts: allergenTreeNuts,
      allergenSoybeans: allergenSoybeans,
      otherAllergen: otherAllergen
    };

    Session.set('babyProfileAllergens', babyProfileAllergens)
    return Session.get('babyProfileAllergens')
  }
});

// edit allergens

Template.babyProfile.events({
  "click #babyProfileEditAllergenNotes_1": function(event, template){
    Session.set("allergenNotesFieldCheckingWarning", false);

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var currentBabyInfo = {
      sequence: 1,
      name: userObject.profile.babyProfileOne.name
    };

    Session.set('currentBaby', currentBabyInfo);

    var allergenWheat = userObject.profile.babyProfileOne.allergenWheat;
    var allergenShellfish = userObject.profile.babyProfileOne.allergenShellfish;
    var allergenEggs = userObject.profile.babyProfileOne.allergenEggs;
    var allergenFish = userObject.profile.babyProfileOne.allergenFish;
    var allergenPeanuts = userObject.profile.babyProfileOne.allergenPeanuts;
    var allergenMilk = userObject.profile.babyProfileOne.allergenMilk;
    var allergenTreeNuts = userObject.profile.babyProfileOne.allergenTreeNuts;
    var allergenSoybeans = userObject.profile.babyProfileOne.allergenSoybeans;
    var otherAllergen = userObject.profile.babyProfileOne.otherAllergen;

    if(allergenWheat){
      $('#babyProfileEditAllergenWheatAvoid').addClass('active');
      $('#babyProfileEditAllergenWheatOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenWheatAvoid').removeClass('active');
      $('#babyProfileEditAllergenWheatOk').addClass('active');
    };
    if(allergenShellfish){
      $('#babyProfileEditAllergenShellfishAvoid').addClass('active');
      $('#babyProfileEditAllergenShellfishOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenShellfishAvoid').removeClass('active');
      $('#babyProfileEditAllergenShellfishOk').addClass('active');
    };
    if(allergenEggs){
      $('#babyProfileEditAllergenEggsAvoid').addClass('active');
      $('#babyProfileEditAllergenEggsOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenEggsAvoid').removeClass('active');
      $('#babyProfileEditAllergenEggsOk').addClass('active');
    };
    if(allergenFish){
      $('#babyProfileEditAllergenFishAvoid').addClass('active');
      $('#babyProfileEditAllergenFishOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenFishAvoid').removeClass('active');
      $('#babyProfileEditAllergenFishOk').addClass('active');
    };
    if(allergenPeanuts){
      $('#babyProfileEditAllergenPeanutsAvoid').addClass('active');
      $('#babyProfileEditAllergenPeanutsOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenPeanutsAvoid').removeClass('active');
      $('#babyProfileEditAllergenPeanutsOk').addClass('active');
    };
    if(allergenMilk){
      $('#babyProfileEditAllergenMilkAvoid').addClass('active');
      $('#babyProfileEditAllergenMilkOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenMilkAvoid').removeClass('active');
      $('#babyProfileEditAllergenMilkOk').addClass('active');
    };
    if(allergenTreeNuts){
      $('#babyProfileEditAllergenTreeNutsAvoid').addClass('active');
      $('#babyProfileEditAllergenTreeNutsOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenTreeNutsAvoid').removeClass('active');
      $('#babyProfileEditAllergenTreeNutsOk').addClass('active');
    };
    if(allergenSoybeans){
      $('#babyProfileEditAllergenSoybeansAvoid').addClass('active');
      $('#babyProfileEditAllergenSoybeansOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenSoybeansAvoid').removeClass('active');
      $('#babyProfileEditAllergenSoybeansOk').addClass('active');
    };
    if(otherAllergen){
      $('#profileEditOtherAllergenInput').val(otherAllergen);
    }else{
      $('#profileEditOtherAllergenInput').val(null);
    };

    $('.overlay-dark').removeClass('closed');

    $("#babyProfileAllergenNotes>.profileEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;
  },

  "click #babyProfileEditAllergenNotes_2": function(event, template){
    Session.set("allergenNotesFieldCheckingWarning", false);

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});

    var currentBabyInfo = {
      sequence: 2,
      name: userObject.profile.babyProfileTwo.name
    };

    Session.set('currentBaby', currentBabyInfo);

    var allergenWheat = userObject.profile.babyProfileTwo.allergenWheat;
    var allergenShellfish = userObject.profile.babyProfileTwo.allergenShellfish;
    var allergenEggs = userObject.profile.babyProfileTwo.allergenEggs;
    var allergenFish = userObject.profile.babyProfileTwo.allergenFish;
    var allergenPeanuts = userObject.profile.babyProfileTwo.allergenPeanuts;
    var allergenMilk = userObject.profile.babyProfileTwo.allergenMilk;
    var allergenTreeNuts = userObject.profile.babyProfileTwo.allergenTreeNuts;
    var allergenSoybeans = userObject.profile.babyProfileTwo.allergenSoybeans;
    var otherAllergen = userObject.profile.babyProfileTwo.otherAllergen;

    if(allergenWheat){
      $('#babyProfileEditAllergenWheatAvoid').addClass('active');
      $('#babyProfileEditAllergenWheatOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenWheatAvoid').removeClass('active');
      $('#babyProfileEditAllergenWheatOk').addClass('active');
    };
    if(allergenShellfish){
      $('#babyProfileEditAllergenShellfishAvoid').addClass('active');
      $('#babyProfileEditAllergenShellfishOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenShellfishAvoid').removeClass('active');
      $('#babyProfileEditAllergenShellfishOk').addClass('active');
    };
    if(allergenEggs){
      $('#babyProfileEditAllergenEggsAvoid').addClass('active');
      $('#babyProfileEditAllergenEggsOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenEggsAvoid').removeClass('active');
      $('#babyProfileEditAllergenEggsOk').addClass('active');
    };
    if(allergenFish){
      $('#babyProfileEditAllergenFishAvoid').addClass('active');
      $('#babyProfileEditAllergenFishOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenFishAvoid').removeClass('active');
      $('#babyProfileEditAllergenFishOk').addClass('active');
    };
    if(allergenPeanuts){
      $('#babyProfileEditAllergenPeanutsAvoid').addClass('active');
      $('#babyProfileEditAllergenPeanutsOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenPeanutsAvoid').removeClass('active');
      $('#babyProfileEditAllergenPeanutsOk').addClass('active');
    };
    if(allergenMilk){
      $('#babyProfileEditAllergenMilkAvoid').addClass('active');
      $('#babyProfileEditAllergenMilkOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenMilkAvoid').removeClass('active');
      $('#babyProfileEditAllergenMilkOk').addClass('active');
    };
    if(allergenTreeNuts){
      $('#babyProfileEditAllergenTreeNutsAvoid').addClass('active');
      $('#babyProfileEditAllergenTreeNutsOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenTreeNutsAvoid').removeClass('active');
      $('#babyProfileEditAllergenTreeNutsOk').addClass('active');
    };
    if(allergenSoybeans){
      $('#babyProfileEditAllergenSoybeansAvoid').addClass('active');
      $('#babyProfileEditAllergenSoybeansOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenSoybeansAvoid').removeClass('active');
      $('#babyProfileEditAllergenSoybeansOk').addClass('active');
    };
    if(otherAllergen){
      $('#profileEditOtherAllergenInput').val(otherAllergen);
    }else{
      $('#profileEditOtherAllergenInput').val(null);
    };

    $('.overlay-dark').removeClass('closed');

    $("#babyProfileAllergenNotes>.profileEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;
  },

  "click #babyProfileEditAllergenNotes_3": function(event, template){
    Session.set("allergenNotesFieldCheckingWarning", false);

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var currentBabyInfo = {
      sequence: 3,
      name: userObject.profile.babyProfileThree.name
    };

    Session.set('currentBaby', currentBabyInfo);


    var allergenWheat = userObject.profile.babyProfileThree.allergenWheat;
    var allergenShellfish = userObject.profile.babyProfileThree.allergenShellfish;
    var allergenEggs = userObject.profile.babyProfileThree.allergenEggs;
    var allergenFish = userObject.profile.babyProfileThree.allergenFish;
    var allergenPeanuts = userObject.profile.babyProfileThree.allergenPeanuts;
    var allergenMilk = userObject.profile.babyProfileThree.allergenMilk;
    var allergenTreeNuts = userObject.profile.babyProfileThree.allergenTreeNuts;
    var allergenSoybeans = userObject.profile.babyProfileThree.allergenSoybeans;
    var otherAllergen = userObject.profile.babyProfileThree.otherAllergen;

    if(allergenWheat){
      $('#babyProfileEditAllergenWheatAvoid').addClass('active');
      $('#babyProfileEditAllergenWheatOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenWheatAvoid').removeClass('active');
      $('#babyProfileEditAllergenWheatOk').addClass('active');
    };
    if(allergenShellfish){
      $('#babyProfileEditAllergenShellfishAvoid').addClass('active');
      $('#babyProfileEditAllergenShellfishOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenShellfishAvoid').removeClass('active');
      $('#babyProfileEditAllergenShellfishOk').addClass('active');
    };
    if(allergenEggs){
      $('#babyProfileEditAllergenEggsAvoid').addClass('active');
      $('#babyProfileEditAllergenEggsOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenEggsAvoid').removeClass('active');
      $('#babyProfileEditAllergenEggsOk').addClass('active');
    };
    if(allergenFish){
      $('#babyProfileEditAllergenFishAvoid').addClass('active');
      $('#babyProfileEditAllergenFishOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenFishAvoid').removeClass('active');
      $('#babyProfileEditAllergenFishOk').addClass('active');
    };
    if(allergenPeanuts){
      $('#babyProfileEditAllergenPeanutsAvoid').addClass('active');
      $('#babyProfileEditAllergenPeanutsOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenPeanutsAvoid').removeClass('active');
      $('#babyProfileEditAllergenPeanutsOk').addClass('active');
    };
    if(allergenMilk){
      $('#babyProfileEditAllergenMilkAvoid').addClass('active');
      $('#babyProfileEditAllergenMilkOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenMilkAvoid').removeClass('active');
      $('#babyProfileEditAllergenMilkOk').addClass('active');
    };
    if(allergenTreeNuts){
      $('#babyProfileEditAllergenTreeNutsAvoid').addClass('active');
      $('#babyProfileEditAllergenTreeNutsOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenTreeNutsAvoid').removeClass('active');
      $('#babyProfileEditAllergenTreeNutsOk').addClass('active');
    };
    if(allergenSoybeans){
      $('#babyProfileEditAllergenSoybeansAvoid').addClass('active');
      $('#babyProfileEditAllergenSoybeansOk').removeClass('active');
    }else{
      $('#babyProfileEditAllergenSoybeansAvoid').removeClass('active');
      $('#babyProfileEditAllergenSoybeansOk').addClass('active');
    };
    if(otherAllergen){
      $('#profileEditOtherAllergenInput').val(otherAllergen);
    }else{
      $('#profileEditOtherAllergenInput').val(null);
    };

    $('.overlay-dark').removeClass('closed');

    $("#babyProfileAllergenNotes>.profileEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;
  },

  // change status - wheat
  "click #babyProfileEditAllergenWheatAvoid": function(event, template){
    $('#babyProfileEditAllergenWheatAvoid').addClass('active');
    $('#babyProfileEditAllergenWheatOk').removeClass('active');
    return false;
  },
  "click #babyProfileEditAllergenWheatOk": function(event, template){
    $('#babyProfileEditAllergenWheatAvoid').removeClass('active');
    $('#babyProfileEditAllergenWheatOk').addClass('active');
    return false;
  },

  // change status - shellfish
  "click #babyProfileEditAllergenShellfishAvoid": function(event, template){
    $('#babyProfileEditAllergenShellfishAvoid').addClass('active');
    $('#babyProfileEditAllergenShellfishOk').removeClass('active');
    return false;
  },
  "click #babyProfileEditAllergenShellfishOk": function(event, template){
    $('#babyProfileEditAllergenShellfishAvoid').removeClass('active');
    $('#babyProfileEditAllergenShellfishOk').addClass('active');
    return false;
  },

  // change status - eggs
  "click #babyProfileEditAllergenEggsAvoid": function(event, template){
    $('#babyProfileEditAllergenEggsAvoid').addClass('active');
    $('#babyProfileEditAllergenEggsOk').removeClass('active');
    return false;
  },
  "click #babyProfileEditAllergenEggsOk": function(event, template){
    $('#babyProfileEditAllergenEggsAvoid').removeClass('active');
    $('#babyProfileEditAllergenEggsOk').addClass('active');
    return false;
  },
  // change status - fish
  "click #babyProfileEditAllergenFishAvoid": function(event, template){
    $('#babyProfileEditAllergenFishAvoid').addClass('active');
    $('#babyProfileEditAllergenFishOk').removeClass('active');
    return false;
  },
  "click #babyProfileEditAllergenFishOk": function(event, template){
    $('#babyProfileEditAllergenFishAvoid').removeClass('active');
    $('#babyProfileEditAllergenFishOk').addClass('active');
    return false;
  },
  // change status - Peanuts
  "click #babyProfileEditAllergenPeanutsAvoid": function(event, template){
    $('#babyProfileEditAllergenPeanutsAvoid').addClass('active');
    $('#babyProfileEditAllergenPeanutsOk').removeClass('active');
    return false;
  },
  "click #babyProfileEditAllergenPeanutsOk": function(event, template){
    $('#babyProfileEditAllergenPeanutsAvoid').removeClass('active');
    $('#babyProfileEditAllergenPeanutsOk').addClass('active');
    return false;
  },
  // change status - Milk
  "click #babyProfileEditAllergenMilkAvoid": function(event, template){
    $('#babyProfileEditAllergenMilkAvoid').addClass('active');
    $('#babyProfileEditAllergenMilkOk').removeClass('active');
    return false;
  },
  "click #babyProfileEditAllergenMilkOk": function(event, template){
    $('#babyProfileEditAllergenMilkAvoid').removeClass('active');
    $('#babyProfileEditAllergenMilkOk').addClass('active');
    return false;
  },
  // change status - Tree Nuts
  "click #babyProfileEditAllergenTreeNutsAvoid": function(event, template){
    $('#babyProfileEditAllergenTreeNutsAvoid').addClass('active');
    $('#babyProfileEditAllergenTreeNutsOk').removeClass('active');
    return false;
  },
  "click #babyProfileEditAllergenTreeNutsOk": function(event, template){
    $('#babyProfileEditAllergenTreeNutsAvoid').removeClass('active');
    $('#babyProfileEditAllergenTreeNutsOk').addClass('active');
    return false;
  },
  // change status - Soybeans
  "click #babyProfileEditAllergenSoybeansAvoid": function(event, template){
    $('#babyProfileEditAllergenSoybeansAvoid').addClass('active');
    $('#babyProfileEditAllergenSoybeansOk').removeClass('active');
    return false;
  },
  "click #babyProfileEditAllergenSoybeansOk": function(event, template){
    $('#babyProfileEditAllergenSoybeansAvoid').removeClass('active');
    $('#babyProfileEditAllergenSoybeansOk').addClass('active');
    return false;
  },

});

// allergen save

Template.babyProfile.events({
  "click #profileEditAllergenSave": function(event, template){
    var userId = Meteor.userId();
    var currentBaby = Session.get('currentBaby');

    var allergenWheat = $('#babyProfileEditAllergenWheatAvoid').hasClass('active');
    var allergenShellfish =$('#babyProfileEditAllergenShellfishAvoid').hasClass('active');
    var allergenEggs = $('#babyProfileEditAllergenEggsAvoid').hasClass('active');
    var allergenFish = $('#babyProfileEditAllergenFishAvoid').hasClass('active');
    var allergenPeanuts = $('#babyProfileEditAllergenPeanutsAvoid').hasClass('active');
    var allergenMilk = $('#babyProfileEditAllergenMilkAvoid').hasClass('active');
    var allergenTreeNuts = $('#babyProfileEditAllergenTreeNutsAvoid').hasClass('active');
    var allergenSoybeans = $('#babyProfileEditAllergenSoybeansAvoid').hasClass('active');
    var otherAllergen = $('#profileEditOtherAllergenInput').val();

    var allergenObject = {
      currentBaby: currentBaby.sequence,
      allergenWheat: allergenWheat,
      allergenShellfish: allergenShellfish,
      allergenEggs: allergenEggs,
      allergenFish: allergenFish,
      allergenPeanuts: allergenPeanuts,
      allergenMilk: allergenMilk,
      allergenTreeNuts: allergenTreeNuts,
      allergenSoybeans: allergenSoybeans,
      otherAllergen: otherAllergen,
    };

    console.log(allergenObject);

    Meteor.call("babyProfileSaveAllergens", userId, allergenObject, function(error, result){
      if(error){
        console.log("error", error);
        toastr.error("Baby's allergy profile cannot be saved at this moment. Please try again later.")
      }
      if(result){
        toastr.success('The allergen note is updated.');
        $('#babyProfileSelectionAllergenNotes').click();
      }
    });

    $('.overlay-dark').addClass('closed');
    $("#babyProfileAllergenNotes>.profileEditBlock").addClass("closed");

    return false;
  },
});

Template.babyProfile.helpers({
  currentBaby: function(){
    return Session.get('currentBaby');
  },

});

Session.setDefault("mealPlanFieldCheckingWarning", false);
Session.setDefault("basicsFieldCheckingWarning", false);
Session.setDefault("allergenNotesFieldCheckingWarning", false);

Template.babyProfile.helpers({
  mealPlanFieldCheckingWarning: function(){
    return Session.get('mealPlanFieldCheckingWarning');
  },
  basicsFieldCheckingWarning: function(){
    return Session.get('basicsFieldCheckingWarning');
  },

});

Template.babyProfile.events({
  "click .closeIcon": function(event, template){
    $('.overlay-dark').addClass('closed');
    $("#babyProfileMealPlans>.profileEditBlock").addClass("closed");
    $("#babyProfileBasics>.profileEditBlock").addClass("closed");
    $("#babyProfileAllergenNotes>.profileEditBlock").addClass("closed");

    return false;
  },

  "click .overlay-dark": function(event, template){
    $('.overlay-dark').addClass('closed');

    $("#babyProfileMealPlans>.profileEditBlock").addClass("closed");
    $("#babyProfileBasics>.profileEditBlock").addClass("closed");
    $("#babyProfileAllergenNotes>.profileEditBlock").addClass("closed");

    return false;
  },
});

Template.body.events({
  "keyup": function(event){
    if(event.keyCode == 27){
      $('.overlay-dark').addClass('closed');

      $("#babyProfileMealPlans>.profileEditBlock").addClass("closed");
      $("#babyProfileBasics>.profileEditBlock").addClass("closed");
      $("#babyProfileAllergenNotes>.profileEditBlock").addClass("closed");

      return false;    };
  },

});

// control for height
