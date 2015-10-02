Template.myAccount.helpers({
  myAccountMealPlan: function(){
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
        if(babyRecipeType[0]){
          babyRecipeType[0]=babyRecipeType[0]+", Yummy Pairs";
        }else{
          babyRecipeType[0]='Yummy Pairs';
        };
      };
      if(userObject.profile.babyProfileOne.tastyTrio){
        if(babyRecipeType[0]){
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
        if(babyRecipeType[1]){
          babyRecipeType[1]=babyRecipeType[1]+", Yummy Pairs";
        }else{
          babyRecipeType[1]='Yummy Pairs';
        };
      };
      if(userObject.profile.babyProfileTwo.tastyTrio){
        if(babyRecipeType[1]){
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
        if(babyRecipeType[2]){
          babyRecipeType[2]=babyRecipeType[2]+", Yummy Pairs";
        }else{
          babyRecipeType[2]='Yummy Pairs';
        };
      };
      if(userObject.profile.babyProfileThree.tastyTrio){
        if(babyRecipeType[2]){
          babyRecipeType[2]=babyRecipeType[2]+", Tasty Trio";
        }else{
          babyRecipeType[2]='Tasty Trio';
        };
      };
    };

    var setMyAccountMealPlanObject = {
      babyStatus: babyStatus,
      babyName: babyName,
      babyPlanType: babyPlanType,
      babyRecipeType: babyRecipeType,
      deliveryDays: deliveryDays
    };

    Session.set('myAccountMealPlan', setMyAccountMealPlanObject);

    return Session.get('myAccountMealPlan');
  },
  myAccountDelivery: function(){
    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var myAccountDeliveryObject = {
      deliveryName: userObject.profile.userFirstName+" "+userObject.profile.userLastName,
      deliveryAddress: userObject.profile.addressLine1+" "+userObject.profile.addressLine2,
      deliveryCity: userObject.profile.addressCity,
      deliveryState: userObject.profile.addressState,
      deliveryZIP: userObject.profile.addressZIP,
      deliveryUserPhone: userObject.profile.userPhoneNumber
    };

    Session.set('myAccountDelivery', myAccountDeliveryObject);

    return Session.get('myAccountDelivery');
  },
  myAccountInfo: function(){
    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var myAccountInfoObject = {
      name: userObject.profile.userFirstName+" "+userObject.profile.userLastName,
      email: userObject.emails[0].address,
    };

    Session.set('myAccountInfo', myAccountInfoObject);

    return Session.get('myAccountInfo');
  },

  myAccountPayment: function(){
    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    var stripeID = userObject.stripeID;


    Meteor.call("getCardInfo", stripeID, function(error, result){
      if(error){
        toastr.error('Cannot retrieve card information from Stripe.');

        return false;
      }
      if(result){
        Session.set("myAccountPayment", result);
        if(result.name){
          $('#nameOnCard').text(result.name);
        }else{
          $('#nameOnCard').text('');
        };
        if(result.brand){
          $('#brandOnCard').text(result.brand);
        }else{
          $('#brandOnCard').text('');
        };
        if(result.last4){
          $('#last4OnCard').text(result.last4);
        }else{
          $('#last4OnCard').text('');
        };
        if(result.exp_month&&result.exp_year){
          $('#endDateOnCard').text(result.exp_month+'/'+result.exp_year);
        }else{
          $('#endDateOnCard').text('');
        };

        $('#brandOnCard').text(result.brand);
        $('#last4OnCard').text(result.last4);
        $('#endDateOnCard').text(result.exp_month+'/'+result.exp_year);

//result = {
//last4: customerObject.sources.data[0].last4,
//name: customerObject.sources.data[0].name,
//exp_month: customerObject.sources.data[0].exp_month,
//exp_year: customerObject.sources.data[0].exp_year,
//brand: customerObject.sources.data[0].brand
//};

        return Session.get('myAccountPayment');
      }
    });
  },

  getAgesbyBirthdays: function(){
    var userId = Meteor.userId();
    var result = BDDifferenceResults(userId);  // a global function of BDDifferenceResults.
    Session.set('babyBirthdays', result);
    return Session.get('babyBirthdays');
  }
});

Template.myAccount.events({
  "click #accMngtSelectionMealPlan": function(event, template){
// changing webform classes
    $('#accountMealPlans').removeClass('hidden');
    $('#accountDeliveryInfo').addClass('hidden');
    $('#accountInfo').addClass('hidden');
    $('#accountPaymentInfo').addClass('hidden');

    $('.accMngtItem').removeClass('active');
    $('#accMngtSelectionMealPlan').addClass('active');
    return false;
  },

  "click #accMngtSelectionDelivery": function(event, template){
    var userId = Meteor.userId();
// changing webform classes
    $('#accountMealPlans').addClass('hidden');
    $('#accountDeliveryInfo').removeClass('hidden');
    $('#accountInfo').addClass('hidden');
    $('#accountPaymentInfo').addClass('hidden');

    $('.accMngtItem').removeClass('active');
    $('#accMngtSelectionDelivery').addClass('active');
    return false;
  },
  "click #accMngtSelectionInfo": function(event, template){
    var userId = Meteor.userId();
// changing webform classes
    $('#accountMealPlans').addClass('hidden');
    $('#accountDeliveryInfo').addClass('hidden');
    $('#accountInfo').removeClass('hidden');
    $('#accountPaymentInfo').addClass('hidden');

    $('.accMngtItem').removeClass('active');
    $('#accMngtSelectionInfo').addClass('active');
    return false;
  },
  "click #accMngtSelectionPayment": function(event, template){
    var userId = Meteor.userId();
// changing webform classes
    $('#accountMealPlans').addClass('hidden');
    $('#accountDeliveryInfo').addClass('hidden');
    $('#accountInfo').addClass('hidden');
    $('#accountPaymentInfo').removeClass('hidden');

    $('.accMngtItem').removeClass('active');
    $('#accMngtSelectionPayment').addClass('active');
    return false;
  },

// four sections of editing
  "click #myAccountEditMealPlan": function(event, template){
    Session.set("mealPlanFieldCheckingWarning", false);

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
// set delivery days
    var deliveryDays = getDeliveryDays(userObject.profile.deliveryDay);
    $('#accountEditMealPlan_deliveryDays').val(userObject.profile.deliveryDay);

    var babyPlanType = [];
    var babyRecipeType= [[],[],[]];
    var babyStatus = [userObject.profile.babyProfileOne.babyStatus, userObject.profile.babyProfileTwo.babyStatus, userObject.profile.babyProfileThree.babyStatus];

    if(userObject.profile.babyProfileOne.babyStatus){

      if(userObject.profile.babyProfileOne.boxSmall){
        $('#accountEditMealPlan_planType_1').val('SM');
      }else if(userObject.profile.babyProfileOne.boxMedium){
        $('#accountEditMealPlan_planType_1').val('ME');
      }else{
        $('#accountEditMealPlan_planType_1').val('LG');
      };

      if(userObject.profile.babyProfileOne.singlePuree){
        $('#accountEditMealPlan_singlePuree_1').addClass('active');
      }else{
        $('#accountEditMealPlan_singlePuree_1').removeClass('active');
      };
      if(userObject.profile.babyProfileOne.yummyPairs){
        $('#accountEditMealPlan_yummyPairs_1').addClass('active');
      }else{
        $('#accountEditMealPlan_yummyPairs_1').removeClass('active');
      };
      if(userObject.profile.babyProfileOne.tastyTrio){
        $('#accountEditMealPlan_tastyTrio_1').addClass('active');
      }else{
        $('#accountEditMealPlan_tastyTrio_1').removeClass('active');
      };
    };

    if(userObject.profile.babyProfileTwo.babyStatus){

      if(userObject.profile.babyProfileTwo.boxSmall){
        $('#accountEditMealPlan_planType_2').val('SM');
      }else if(userObject.profile.babyProfileTwo.boxMedium){
        $('#accountEditMealPlan_planType_2').val('ME');
      }else{
        $('#accountEditMealPlan_planType_2').val('LG');
      };

      if(userObject.profile.babyProfileTwo.singlePuree){
        $('#accountEditMealPlan_singlePuree_2').addClass('active');
      }else{
        $('#accountEditMealPlan_singlePuree_2').removeClass('active');
      };
      if(userObject.profile.babyProfileTwo.yummyPairs){
        $('#accountEditMealPlan_yummyPairs_2').addClass('active');
      }else{
        $('#accountEditMealPlan_yummyPairs_2').removeClass('active');
      };
      if(userObject.profile.babyProfileTwo.tastyTrio){
        $('#accountEditMealPlan_tastyTrio_2').addClass('active');
      }else{
        $('#accountEditMealPlan_tastyTrio_2').removeClass('active');
      };
    };

    if(userObject.profile.babyProfileThree.babyStatus){

      if(userObject.profile.babyProfileThree.boxSmall){
        $('#accountEditMealPlan_planType_3').val('SM');
      }else if(userObject.profile.babyProfileThree.boxMedium){
        $('#accountEditMealPlan_planType_3').val('ME');
      }else{
        $('#accountEditMealPlan_planType_3').val('LG');
      };

      if(userObject.profile.babyProfileThree.singlePuree){
        $('#accountEditMealPlan_singlePuree_3').addClass('active');
      }else{
        $('#accountEditMealPlan_singlePuree_3').removeClass('active');
      };
      if(userObject.profile.babyProfileThree.yummyPairs){
        $('#accountEditMealPlan_yummyPairs_3').addClass('active');
      }else{
        $('#accountEditMealPlan_yummyPairs_3').removeClass('active');
      };
      if(userObject.profile.babyProfileThree.tastyTrio){
        $('#accountEditMealPlan_tastyTrio_3').addClass('active');
      }else{
        $('#accountEditMealPlan_tastyTrio_3').removeClass('active');
      };
    };

    var userZip = userObject.profile.addressZIP;
    var zipObject = zipData(userZip);
    if(!zipObject.SU){
      $('#accountEditMealPlan_deliveryDays option[value="SU"]').remove();
    };
    if(!zipObject.MO){
      $('#accountEditMealPlan_deliveryDays option[value="MO"]').remove();
    };
    if(!zipObject.TU){
      $('#accountEditMealPlan_deliveryDays option[value="TU"]').remove();
    };
    if(!zipObject.WE){
      $('#accountEditMealPlan_deliveryDays option[value="WE"]').remove();
    };
    if(!zipObject.TH){
      $('#accountEditMealPlan_deliveryDays option[value="TH"]').remove();
    };
    if(!zipObject.FR){
      $('#accountEditMealPlan_deliveryDays option[value="FR"]').remove();
    };
    if(!zipObject.SA){
      $('#accountEditMealPlan_deliveryDays option[value="SA"]').remove();
    };

    $('.overlay-dark').removeClass('hidden');
    return false;

  },

  "click #myAccountEditDelivery": function(event, template){
    Session.set("deliveryFieldCheckingWarning", false);

    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});

    $('#accountEditDelivery_addressLine1').val(userObject.profile.addressLine1);
    $('#accountEditDelivery_addressLine2').val(userObject.profile.addressLine2);
    $('#accountEditDelivery_city').val(userObject.profile.addressCity);
    $('#accountEditDelivery_state').val(userObject.profile.addressState);
    $('#accountEditDelivery_zip').val(userObject.profile.addressZIP);

    if(userObject.profile.addressType){
      $('#accountEditDelivery_typeResidential').addClass('active');
      $('#accountEditDelivery_typeBusiness').removeClass('active');
    }else{
      $('#accountEditDelivery_typeResidential').removeClass('active');
      $('#accountEditDelivery_typeBusiness').addClass('active');
    };
    $('#accountEditDelivery_phone').val(userObject.profile.userPhoneNumber);

    $('.overlay-dark').removeClass('hidden');
    return false;
  },

  "click #myAccountEditAccountInfo": function(event, template){
    Session.set("accountInfoFieldCheckingWarning", false);


    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    $('#accountEditInfo_firstName').val(userObject.profile.userFirstName);
    $('#accountEditInfo_lastName').val(userObject.profile.userLastName);
    $('#accountEditInfo_email').val(userObject.emails[0].address);

    $('.overlay-dark').removeClass('hidden');
    return false;
  },

  "click #myAccountEditPayment": function(event, template){
    Session.set("paymentFieldCheckingWarning", false);

    $('.overlay-dark').removeClass('hidden');
  },

// activate all buttons in the four sections

  "click #accountEditMealPlan_singlePuree_1": function(event, template){
    if($('#accountEditMealPlan_singlePuree_1').hasClass('active')){
      $('#accountEditMealPlan_singlePuree_1').removeClass('active')
    }else{
      $('#accountEditMealPlan_singlePuree_1').addClass('active')
    };
    return false;
  },

  "click #accountEditMealPlan_singlePuree_2": function(event, template){
    if($('#accountEditMealPlan_singlePuree_2').hasClass('active')){
      $('#accountEditMealPlan_singlePuree_2').removeClass('active')
    }else{
      $('#accountEditMealPlan_singlePuree_2').addClass('active')
    };
    return false;
  },
  "click #accountEditMealPlan_singlePuree_3": function(event, template){
    if($('#accountEditMealPlan_singlePuree_3').hasClass('active')){
      $('#accountEditMealPlan_singlePuree_3').removeClass('active')
    }else{
      $('#accountEditMealPlan_singlePuree_3').addClass('active')
    };
    return false;
  },
  "click #accountEditMealPlan_yummyPairs_1": function(event, template){
    if($('#accountEditMealPlan_yummyPairs_1').hasClass('active')){
      $('#accountEditMealPlan_yummyPairs_1').removeClass('active')
    }else{
      $('#accountEditMealPlan_yummyPairs_1').addClass('active')
    };
    return false;
  },
  "click #accountEditMealPlan_yummyPairs_2": function(event, template){
    if($('#accountEditMealPlan_yummyPairs_2').hasClass('active')){
      $('#accountEditMealPlan_yummyPairs_2').removeClass('active')
    }else{
      $('#accountEditMealPlan_yummyPairs_2').addClass('active')
    };
    return false;
  },
  "click #accountEditMealPlan_yummyPairs_3": function(event, template){
    if($('#accountEditMealPlan_yummyPairs_3').hasClass('active')){
      $('#accountEditMealPlan_yummyPairs_3').removeClass('active')
    }else{
      $('#accountEditMealPlan_yummyPairs_3').addClass('active')
    };
    return false;
  },
  "click #accountEditMealPlan_tastyTrio_1": function(event, template){
    if($('#accountEditMealPlan_tastyTrio_1').hasClass('active')){
      $('#accountEditMealPlan_tastyTrio_1').removeClass('active')
    }else{
      $('#accountEditMealPlan_tastyTrio_1').addClass('active')
    };
    return false;
  },
  "click #accountEditMealPlan_tastyTrio_2": function(event, template){
    if($('#accountEditMealPlan_tastyTrio_2').hasClass('active')){
      $('#accountEditMealPlan_tastyTrio_2').removeClass('active')
    }else{
      $('#accountEditMealPlan_tastyTrio_2').addClass('active')
    };
    return false;
  },
  "click #accountEditMealPlan_tastyTrio_3": function(event, template){
    if($('#accountEditMealPlan_tastyTrio_3').hasClass('active')){
      $('#accountEditMealPlan_tastyTrio_3').removeClass('active')
    }else{
      $('#accountEditMealPlan_tastyTrio_3').addClass('active')
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

// four save events for the four sections

"click #accountEditMealPlanSave": function(event, template){
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

  if($('#accountEditMealPlan_singlePuree_1').hasClass('active')||$('#accountEditMealPlan_singlePuree_2').hasClass('active')||$('#accountEditMealPlan_singlePuree_2').hasClass('active')){
    Session.set("mealPlanFieldCheckingWarning", false);
    if(userObject.profile.babyProfileOne.babyStatus){
      if($('#accountEditMealPlan_planType_1').val()=='SM'){
        planType[0] = {
          boxSmall: true,
          boxMedium: false,
          boxLarge: false
        }
      };
      if($('#accountEditMealPlan_planType_1').val()=='ME'){
        planType[0] = {
          boxSmall: false,
          boxMedium: true,
          boxLarge: false
        }
      };
      if($('#accountEditMealPlan_planType_1').val()=='LG'){
        planType[0] = {
          boxSmall: false,
          boxMedium: false,
          boxLarge: true
        }
      };

      if($('#accountEditMealPlan_singlePuree_1').hasClass('active')){
        pureeType[0].singlePuree = true;
      }else{
        pureeType[0].singlePuree = false;
      };
      if($('#accountEditMealPlan_yummyPairs_1').hasClass('active')){
        pureeType[0].yummyPairs = true;
      }else{
        pureeType[0].yummyPairs = false;
      };
      if($('#accountEditMealPlan_tastyTrio_1').hasClass('active')){
        pureeType[0].tastyTrio = true;
      }else{
        pureeType[0].tastyTrio = false;
      };
    };

    if(userObject.profile.babyProfileTwo.babyStatus){
      if($('#accountEditMealPlan_planType_2').val()=='SM'){
        planType[1] = {
          boxSmall: true,
          boxMedium: false,
          boxLarge: false
        }
      };
      if($('#accountEditMealPlan_planType_2').val()=='ME'){
        planType[1] = {
          boxSmall: false,
          boxMedium: true,
          boxLarge: false
        }
      };
      if($('#accountEditMealPlan_planType_2').val()=='LG'){
        planType[1] = {
          boxSmall: false,
          boxMedium: false,
          boxLarge: true
        }
      };
      if($('#accountEditMealPlan_singlePuree_2').hasClass('active')){
        pureeType[1].singlePuree = true;
      }else{
        pureeType[1].singlePuree = false;
      };
      if($('#accountEditMealPlan_yummyPairs_2').hasClass('active')){
        pureeType[1].yummyPairs = true;
      }else{
        pureeType[1].yummyPairs = false;
      };
      if($('#accountEditMealPlan_tastyTrio_2').hasClass('active')){
        pureeType[1].tastyTrio = true;
      }else{
        pureeType[1].tastyTrio = false;
      };
    };

    if(userObject.profile.babyProfileThree.babyStatus){
      if($('#accountEditMealPlan_planType_3').val()=='SM'){
        planType[2] = {
          boxSmall: true,
          boxMedium: false,
          boxLarge: false
        }
      };
      if($('#accountEditMealPlan_planType_3').val()=='ME'){
        planType[2] = {
          boxSmall: false,
          boxMedium: true,
          boxLarge: false
        }
      };
      if($('#accountEditMealPlan_planType_3').val()=='LG'){
        planType[2] = {
          boxSmall: false,
          boxMedium: false,
          boxLarge: true
        }
      };
      if($('#accountEditMealPlan_singlePuree_3').hasClass('active')){
        pureeType[2].singlePuree = true;
      }else{
        pureeType[2].singlePuree = false;
      };
      if($('#accountEditMealPlan_yummyPairs_3').hasClass('active')){
        pureeType[2].yummyPairs = true;
      }else{
        pureeType[2].yummyPairs = false;
      };
      if($('#accountEditMealPlan_tastyTrio_3').hasClass('active')){
        pureeType[2].tastyTrio = true;
      }else{
        pureeType[2].tastyTrio = false;
      };
    };

    var deliveryDays = $('#accountEditMealPlan_deliveryDays').val();

    Meteor.call("myAccountSaveMyMealPlan", userId, deliveryDays, planType, pureeType, function(error, result){
      if(error){
        console.log("error", error);
        toastr.error('Your choice cannot be saved at this moment. Please try again later.');
      }
      if(result){
        toastr.success('Meal plans are updated.');
      }
    });
    $('.overlay-dark').addClass('hidden');

    return false;

  }else{
    Session.set("mealPlanFieldCheckingWarning", true);
    console.log(Session.get('mealPlanFieldCheckingWarning'));
    toastr.error('Please choose at least one puree type.');
    return false;
  };
},

"click #accountEditDeliverySave": function(event, template){
  var userId = Meteor.userId();
  var userObject = Meteor.users.findOne({_id: userId});

  var addressLine1 = $('#accountEditDelivery_addressLine1').val();
  var addressLine2 = $('#accountEditDelivery_addressLine2').val();
  var addressZIP = $('#accountEditDelivery_zip').val();
  var addressCity = $('#accountEditDelivery_city').val();
  var addressState = $('#accountEditDelivery_state').val();

  var addressType = $('#accountEditDelivery_typeResidential').hasClass('active');
  var userPhoneNumber = $('#accountEditDelivery_phone').val();

  var warningObject = {
    addressLine1: addressLine1=='',
    addressZIP: addressZIP=='',
    userPhoneNumber: userPhoneNumber=='',
  };

  if(addressLine1==''||addressZIP==''||userPhoneNumber==''){
    console.log(warningObject);
    console.log('here');
    Session.set("deliveryFieldCheckingWarning", warningObject);
    return false;
  }else{
    Session.set("deliveryFieldCheckingWarning", false);

    Meteor.call("myAccountSaveDeliveryInfo", userId, addressLine1, addressLine2, addressZIP, addressCity, addressState, addressType, userPhoneNumber, function(error, result){
      if(error){
        console.log("error", error);
        toastr.error('Your delivery information cannot be saved at this moment. Please try again later.');
      }
      if(result){
        toastr.success('Your delivery information are updated.');
      }
    });

    $('.overlay-dark').addClass('hidden');
    return false;

  };
},

"change #accountEditDelivery_zip": function(event, template){
  var userId = Meteor.userId();
  var userObject = Meteor.users.findOne({_id: userId});

  var addressZIP = $('#accountEditDelivery_zip').val();
  if(addressZIP.length!=5){
    // ZIP code is not 5 digits
    var deliveryFieldCheckingWarning = Session.get('deliveryFieldCheckingWarning');
    if(deliveryFieldCheckingWarning){
      deliveryFieldCheckingWarning.addressZIP = true;

    }else{
      deliveryFieldCheckingWarning = {
        addressLine1: false,
        addressZIP: true,
        userPhoneNumber: false,
      };
    };
    Session.set("deliveryFieldCheckingWarning", deliveryFieldCheckingWarning);
    toastr.error('Please enter a valid 5-digit ZIP Code.');
    return false;
  }else{
    // ZIP code is 5 digits
    var zipObject = zipData(addressZIP);
    if(zipObject){
      if(zipObject.currentServing){
        // ZIP code is served by us

        var deliveryFieldCheckingWarning = Session.get('deliveryFieldCheckingWarning');
        if(deliveryFieldCheckingWarning){
          deliveryFieldCheckingWarning.addressZIP = false;

        }else{
          deliveryFieldCheckingWarning = false;
        };
        Session.set("deliveryFieldCheckingWarning", deliveryFieldCheckingWarning);

        $('#accountEditDelivery_city').val(zipObject.city);
        $('#accountEditDelivery_state').val(zipObject.state);
        return false;

      }else{
        // ZIP code is not served by us now
        var deliveryFieldCheckingWarning = Session.get('deliveryFieldCheckingWarning');
        if(deliveryFieldCheckingWarning){
          deliveryFieldCheckingWarning.addressZIP = true;

        }else{
          deliveryFieldCheckingWarning = {
            addressLine1: false,
            addressZIP: true,
            userPhoneNumber: false,
          };
        };
        Session.set("deliveryFieldCheckingWarning", deliveryFieldCheckingWarning);
        toastr.error('We currently do not serve the ZIP Code area you entered. Please contact us for support.');
        return false;
      };
    }else{
      // ZIP code does not exist
      var deliveryFieldCheckingWarning = Session.get('deliveryFieldCheckingWarning');
      if(deliveryFieldCheckingWarning){
        deliveryFieldCheckingWarning.addressZIP = true;

      }else{
        deliveryFieldCheckingWarning = {
          addressLine1: false,
          addressZIP: true,
          userPhoneNumber: false,
        };
      };
      Session.set("deliveryFieldCheckingWarning", deliveryFieldCheckingWarning);
      toastr.error('The ZIP Code you entered does not exist. Please try again or contact us for support.')
      return false;
    };
  };

},

"click #accountEditAccountInfoSave": function(event, template){
  var userId = Meteor.userId();
  var userObject = Meteor.users.findOne({_id: userId});
  var userFirstName= $('#accountEditInfo_firstName').val();
  var userLastName= $('#accountEditInfo_lastName').val();
  var userEmail= $('#accountEditInfo_email').val();
  var oldPassword= $('#accountEditInfo_oldPassword').val();
  var password = $('#accountEditInfo_password').val();
  var passwordRe = $('#accountEditInfo_passwordRe ').val();

  var accountInfoFieldCheckingWarning = {
    userFirstName: false,
    userLastName: false,
    userEmail: false,
    password: false,
    oldPassword: false,
  };

  if(oldPassword){
    // old password exists
    if(password){
      // user inputs a new password
      if(password==passwordRe){
        // password and confirmed password matches.
        if(userFirstName==''||userLastName==''||userEmail==''){
          // there is empty field in the form
          if(userFirstName==''){
            accountInfoFieldCheckingWarning.userFirstName= true
          };
          if(userLastName==''){
            accountInfoFieldCheckingWarning.userLastName= true
          };
          if(userEmail==''){
            accountInfoFieldCheckingWarning.userEmail= true
          };

          Session.set('accountInfoFieldCheckingWarning', accountInfoFieldCheckingWarning);
          toastr.error('Please ensure filling these fields.')

          return false;
        }else{
          // All fields are filled in the form, and passwords matched.
          Accounts.changePassword(oldPassword, password, function(err){
            if(err){
              console.log(err);
              var accountInfoFieldCheckingWarning = {
                userFirstName: false,
                userLastName: false,
                userEmail: false,
                password: true,
                oldPassword: false,
              };

              Session.set('accountInfoFieldCheckingWarning', accountInfoFieldCheckingWarning);
              toastr.error('Old password is incorrect.');
            }else{
              Meteor.call("myAccountSaveAccountInfo", userId, userFirstName, userLastName, userEmail, function(error, result){
                if(error){
                  console.log("error", error);
                  toastr.error('Account information cannot be saved at this moment. Please try again later.');
                }
                if(result){
                  Session.set('accountInfoFieldCheckingWarning', false);
                  toastr.success('Account information are updated.');
                }
              });

              $('.overlay-dark').addClass('hidden');
              return false;
            };
          });



          return false;
        };
      }else{
        // password and confirmed password does not match.
        console.log(password);
        console.log(passwordRe);
        var accountInfoFieldCheckingWarning = {
          userFirstName: false,
          userLastName: false,
          userEmail: false,
          password: true,
          oldPassword: false,
        };

        Session.set('accountInfoFieldCheckingWarning', accountInfoFieldCheckingWarning);
        toastr.error('The confirmation does not match the password you entered. Please try again.')
        return false;
      };


    }else{
      // no password input
      var accountInfoFieldCheckingWarning = {
        userFirstName: false,
        userLastName: false,
        userEmail: false,
        password: true,
        oldPassword: false,
      };

      Session.set('accountInfoFieldCheckingWarning', accountInfoFieldCheckingWarning);
      toastr.error('Please enter new password. Otherwise, please keep all password field blank.')
      return false;
    };
  }else{
    // old password does not exist
    if(password){
      // old password does not exist, but password exists.
      var accountInfoFieldCheckingWarning = {
        userFirstName: false,
        userLastName: false,
        userEmail: false,
        password: false,
        oldPassword: true,
      };

      Session.set('accountInfoFieldCheckingWarning', accountInfoFieldCheckingWarning);
      toastr.error('To change your password, you must enter current password correctly.')
      return false;
    }else{
      if(userFirstName==''||userLastName==''||userEmail==''){
        // there is empty field in the form aside from password fields
        if(userFirstName==''){
          accountInfoFieldCheckingWarning.userFirstName= true
        };
        if(userLastName==''){
          accountInfoFieldCheckingWarning.userLastName= true
        };
        if(userEmail==''){
          accountInfoFieldCheckingWarning.userEmail= true
        };

        console.log(accountInfoFieldCheckingWarning);

        Session.set('accountInfoFieldCheckingWarning', accountInfoFieldCheckingWarning);
        toastr.error('Please ensure filling these fields.')
        return false;
      }else{
        // No password. change All other fields are filled in the form

        Meteor.call("myAccountSaveAccountInfo", userId, userFirstName, userLastName, userEmail, function(error, result){
          if(error){
            console.log("error", error);
            toastr.error('Account information cannot be saved at this moment. Please try again later.');
          }
          if(result){
            Session.set('accountInfoFieldCheckingWarning', false);
            toastr.success('Account information are updated.');
          }
        });

        $('.overlay-dark').addClass('hidden');

        return false;
      };

    };
  };
},

"click #accountEditPaymentSave": function(event, template){
  Session.set("paymentFieldCheckingWarning", false);

  var userId = Meteor.userId();
  var userObject = Meteor.users.findOne({_id: userId});
  var stripeID = userObject.stripeID;
  console.log(stripeID);

  var name = $('#accountEditPayment_nameOnCard').val();
  var cardNum = $('#accountEditPayment_cardNumber').val();
  var exp_month = $('#accountEditPayment_expMonth').val();
  var exp_year = $('#accountEditPayment_expYear').val();
  var cvc = $('#accountEditInfo_cvc').val();

 

  $('.overlay-dark').addClass('hidden');

  return false;
},



// cancel editing
  "click .closeIcon": function(event, template){
    $('.overlay-dark').addClass('hidden');
    return false;
  },
  "click .overlay-dark": function(event, template){
    $('.overlay-dark').addClass('hidden');
    return false;
  },

});

Session.setDefault("mealPlanFieldCheckingWarning", false);
Session.setDefault("deliveryFieldCheckingWarning", false);
Session.setDefault("accountInfoFieldCheckingWarning", false);
Session.setDefault("paymentFieldCheckingWarning", false);

Template.myAccount.helpers({
  mealPlanFieldCheckingWarning: function(){
    return Session.get('mealPlanFieldCheckingWarning');
  },
  deliveryFieldCheckingWarning: function(){
    return Session.get('deliveryFieldCheckingWarning');
  },
  accountInfoFieldCheckingWarning: function(){
    return Session.get('accountInfoFieldCheckingWarning');
  },
  paymentFieldCheckingWarning: function(){
    return Session.get('paymentFieldCheckingWarning');
  },

});
