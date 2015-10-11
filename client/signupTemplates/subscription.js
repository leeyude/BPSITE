Template.subscription.helpers({
  deliveryData: function(){
    var userId= Session.get("preUserLoggedIn");
    var handle= Meteor.subscribe("userData");

    Tracker.autorun(function() {
      if (handle.ready()){
        var userObject = Meteor.users.findOne({_id:userId});
        var deliveryData = userObject.deliveryLog[0];
        var subtotal = parseFloat(deliveryData.subtotal).toFixed(2);

        var babyStatus = [userObject.profile.babyProfileOne.babyStatus, userObject.profile.babyProfileTwo.babyStatus,userObject.profile.babyProfileThree.babyStatus];
        var babyName = getBabyName(userObject);

        var allergenArray = [
          [
            userObject.profile.babyProfileOne.allergenWheat,
            userObject.profile.babyProfileOne.allergenShellfish,
            userObject.profile.babyProfileOne.allergenEggs,
            userObject.profile.babyProfileOne.allergenFish,
            userObject.profile.babyProfileOne.allergenPeanuts,
            userObject.profile.babyProfileOne.allergenMilk,
            userObject.profile.babyProfileOne.allergenTreeNuts,
            userObject.profile.babyProfileOne.allergenSoybeans,
          ],[
            userObject.profile.babyProfileTwo.allergenWheat,
            userObject.profile.babyProfileTwo.allergenShellfish,
            userObject.profile.babyProfileTwo.allergenEggs,
            userObject.profile.babyProfileTwo.allergenFish,
            userObject.profile.babyProfileTwo.allergenPeanuts,
            userObject.profile.babyProfileTwo.allergenMilk,
            userObject.profile.babyProfileTwo.allergenTreeNuts,
            userObject.profile.babyProfileTwo.allergenSoybeans,
          ],[
            userObject.profile.babyProfileThree.allergenWheat,
            userObject.profile.babyProfileThree.allergenShellfish,
            userObject.profile.babyProfileThree.allergenEggs,
            userObject.profile.babyProfileThree.allergenFish,
            userObject.profile.babyProfileThree.allergenPeanuts,
            userObject.profile.babyProfileThree.allergenMilk,
            userObject.profile.babyProfileThree.allergenTreeNuts,
            userObject.profile.babyProfileThree.allergenSoybeans,
          ]
        ];

        if(babyStatus[1]){
          if(babyStatus[2]){
            var pureeArray = [[
              deliveryData.content[0].babyProfile.singlePuree,
              deliveryData.content[0].babyProfile.yummyPairs,
              deliveryData.content[0].babyProfile.tastyTrio,
            ],[
              deliveryData.content[1].babyProfile.singlePuree,
              deliveryData.content[1].babyProfile.yummyPairs,
              deliveryData.content[1].babyProfile.tastyTrio,
            ],[
              deliveryData.content[2].babyProfile.singlePuree,
              deliveryData.content[2].babyProfile.yummyPairs,
              deliveryData.content[2].babyProfile.tastyTrio,
            ]];

            var planArray = [[
              deliveryData.content[0].babyProfile.boxSmall,
              deliveryData.content[0].babyProfile.boxMedium,
              deliveryData.content[0].babyProfile.boxLarge,
            ],[
              deliveryData.content[1].babyProfile.boxSmall,
              deliveryData.content[1].babyProfile.boxMedium,
              deliveryData.content[1].babyProfile.boxLarge,
            ],[
              deliveryData.content[2].babyProfile.boxSmall,
              deliveryData.content[2].babyProfile.boxMedium,
              deliveryData.content[2].babyProfile.boxLarge,
            ]];

          }else{
            var pureeArray = [[
              deliveryData.content[0].babyProfile.singlePuree,
              deliveryData.content[0].babyProfile.yummyPairs,
              deliveryData.content[0].babyProfile.tastyTrio,
            ],[
              deliveryData.content[1].babyProfile.singlePuree,
              deliveryData.content[1].babyProfile.yummyPairs,
              deliveryData.content[1].babyProfile.tastyTrio,
            ],[
              false,
              false,
              false
            ]];

            var planArray = [[
              deliveryData.content[0].babyProfile.boxSmall,
              deliveryData.content[0].babyProfile.boxMedium,
              deliveryData.content[0].babyProfile.boxLarge,
            ],[
              deliveryData.content[1].babyProfile.boxSmall,
              deliveryData.content[1].babyProfile.boxMedium,
              deliveryData.content[1].babyProfile.boxLarge,
            ],[
              false,
              false,
              false
            ]];
          };
        }else{
          var pureeArray = [[
            deliveryData.content[0].babyProfile.singlePuree,
            deliveryData.content[0].babyProfile.yummyPairs,
            deliveryData.content[0].babyProfile.tastyTrio,
          ],[
            false,
            false,
            false
          ],[
            false,
            false,
            false
          ]];

          var planArray = [[
            deliveryData.content[0].babyProfile.boxSmall,
            deliveryData.content[0].babyProfile.boxMedium,
            deliveryData.content[0].babyProfile.boxLarge,
          ],[
            false,
            false,
            false
          ],[
            false,
            false,
            false
          ]];
        };

        var allergenSummary = [,,];
        var pureeSummary = [,,];
        var planType = [,,];

        for(i=0;i<3;i++){
          if(babyStatus[i]){
            allergenSummary[i]= getAllergenStatement(allergenArray[i]);
            pureeSummary[i]= getPureeStatement(pureeArray[i]);
            planType[i] = getPlanType(planArray[i]);
          }else{
            allergenSummary[i]=null;
            pureeSummary[i]= null;
            planType[i]=null;
          };
        };

        var deliveryDay = getDeliveryDay(userObject.profile.deliveryDay);
        var deliveryAddress = getDeliveryAddress(userObject);

        Session.set("babyStatus", babyStatus);
        Session.set("babyName", babyName);
        Session.set("planStatement", planType);
        Session.set("pureeStatement", pureeSummary);
        Session.set("allergenStatement", allergenSummary);
        Session.set("deliveryObject", babyStatus);


        deliveryObject = {
          subtotal: subtotal,
          firstDelivery: deliveryData.fulfilmentDate,
          deliveryDate: deliveryDay,
          deliveryAddress: deliveryAddress
        };
        Session.set("deliveryData", deliveryObject);

        return Session.get("deliveryData");
      };
    });


  },
  babyStatus: function(){
    return Session.get("babyStatus");
  },
  babyName: function(){
    return Session.get("babyName");
  },
  planStatement: function(){
    return Session.get("planStatement");
  },
  pureeStatement: function(){
    return Session.get("pureeStatement");
  },
  allergenStatement: function(){
    return Session.get("allergenStatement");
  },
});


// the section handles credit card

Session.setDefault("paymentError", false);
Session.setDefault("passwordError", false);
Session.setDefault("accountCreationError", false);

Template.subscription.helpers({
  paymentError: function(){
    return Session.get("paymentError");
  },
  passwordError: function(){
    return Session.get("passwordError");
  },
  accountCreationError: function(){
    return Session.get("accountCreationError");
  },
});

Template.subscription.events({
  "click #startSubscription": function(event, template){
    $('#startSubscription').prop('disabled', true);
    var password = $('#password').val();

    if(password){
// password is set by user
      Session.set("passwordError",false);
      var ccNum = $('#cardNumber').val();
      var cvc = $('#cvcInput').val();
      var expMo = $('#expirationDateMonth').val();
      var expYr = $('#expirationDateYear').val();
      var userEmail = Session.get("userEmail");

      var userId= Session.get("preUserLoggedIn");
      var subscrptionPlan = getSubscriptionPlan(userId);

      var deliveryData = Session.get("deliveryData");
      var firstDelivery = moment(deliveryData.firstDelivery, "dddd, MMM Do");
      var now = new Date();
      var duration = moment(firstDelivery).diff(now,'days');

      if(duration>7){
        console.log("duration > 7..."+duration);
        // we do not charge customers one week before delivery day.
        subscrptionPlan= "onHold";
        Stripe.card.createToken({
            number: ccNum,
            cvc: cvc,
            exp_month: expMo,
            exp_year: expYr,
        }, function(status, response) {
            if (response.error) {
              console.log(response.error);
              // Show the errors on the form
              Session.set("paymentError",response.error.message);
              $("html, body").animate({ scrollTop: 0 }, "slow");
              $('#startSubscription').prop('disabled', false);
            } else {
              console.log("creation of card is ok");

              // response contains id and card, which contains additional card details
              Session.set("paymentError",false);
              var stripeToken = response.id;
        // Insert the token into the meteor call so it gets to the server
              Meteor.call('stripeCusSubscribe', stripeToken, userEmail, subscrptionPlan, password, userId, function(error, result){
                if(error){
                  console.log("response error"+"..."+ error);

                  Session.set("accountCreationError", true);
                  $("html, body").animate({ scrollTop: 0 }, "slow");
                  $('#startSubscription').prop('disabled', false);
                }
                if(result){
                  console.log("duration > 7, but all other data is correct");
                  Session.set("accountCreationError", false);
                  console.log(userEmail);
                  console.log(password);
                  Meteor.subscribe('preUser', userEmail);
                  Meteor.setTimeout(function(){
                    Meteor.loginWithPassword(userEmail, password, function(err){
                      if (err){
                        console.log(err);
                        console.log("login error");
                      }else{
                        console.log("log in successful");
                      };
                    });
                    Router.go('/thankyou');
                  }, 3000);

                  return false;
                };
              });
            }
          });
      }else{
        console.log("this duration <7"+duration);

        // when today is within 7 days before delivery, set up a plan for the user directly.
        Stripe.card.createToken({
            number: ccNum,
            cvc: cvc,
            exp_month: expMo,
            exp_year: expYr,
        }, function(status, response) {
          if (response.error) {
            console.log("response error"+"..."+ error);
            // Show the errors on the form
            Session.set("paymentError",response.error.message);
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $('#startSubscription').prop('disabled', false);
          } else {
            console.log("creation of card is ok");
            // response contains id and card, which contains additional card details
            Session.set("paymentError",false);
            var stripeToken = response.id;
        // Insert the token into the meteor call so it gets to the server
            Meteor.call('stripeCusSubscribe', stripeToken, userEmail, subscrptionPlan, password, userId, function(error, result){
              if(error){
                Session.set("accountCreationError", true);
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $('#startSubscription').prop('disabled', false);
              }
              if(result){
                console.log("duration < 7, and all other data is correct");
                Session.set("accountCreationError", false);
                console.log(userEmail);
                console.log(password);
                var handle = Meteor.subscribe('preUser', userEmail);

                Tracker.autorun(function() {
                  if (handle.ready()){
                    $('.subcriptionWait').removeClass('hidden');
                    Meteor.loginWithPassword(userEmail, password, function(err){
                      if (err){
                        console.log(err);
                        console.log("login error");
                      }else{
                        console.log("log in successful");
                      };
                    });
                    Router.go('/thankyou');
                    return false;
                  }else{
                    console.log("waiting");
                    $('.subcriptionWait').removeClass('hidden');
                  };
                });

              };
            });
          };
        });
      };
    }else{
      // password is NOT set.
      Session.set("passwordError",true);
      $("html, body").animate({ scrollTop: 0 }, "slow");
      $('#startSubscription').prop('disabled', false);

    };


  },
});
