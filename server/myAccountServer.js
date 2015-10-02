Meteor.methods({
  "getCardInfo": function (stripID) {
    var Stripe = StripeSync("sk_test_g1O9OQ69qAtW4liCXH7zRzLN");
//    var stripe = require("stripe")("sk_test_g1O9OQ69qAtW4liCXH7zRzLN");
    var customerObject = Stripe.customers.retrieve(stripID);
    if(customerObject){
      var cardObject = {
        last4: customerObject.sources.data[0].last4,
        name: customerObject.sources.data[0].name,
        exp_month: customerObject.sources.data[0].exp_month,
        exp_year: customerObject.sources.data[0].exp_year,
        brand: customerObject.sources.data[0].brand
      };
      return cardObject;
    }else{
      return customerObject;
    };
  },

  'myAccountSaveMyMealPlan': function (userId, deliveryDays, planType, pureeType) {
    Meteor.users.update(
      {_id:userId},
      {
        $set:{
          "profile.deliveryDay": deliveryDays,
          "profile.babyProfileOne.boxSmall": planType[0].boxSmall,
          "profile.babyProfileOne.boxMedium": planType[0].boxMedium,
          "profile.babyProfileOne.boxLarge": planType[0].boxLarge,
          "profile.babyProfileOne.singlePuree": pureeType[0].singlePuree,
          "profile.babyProfileOne.yummyPairs": pureeType[0].yummyPairs,
          "profile.babyProfileOne.tastyTrio": pureeType[0].tastyTrio,

          "profile.babyProfileTwo.boxSmall": planType[1].boxSmall,
          "profile.babyProfileTwo.boxMedium": planType[1].boxMedium,
          "profile.babyProfileTwo.boxLarge": planType[1].boxLarge,
          "profile.babyProfileTwo.singlePuree": pureeType[1].singlePuree,
          "profile.babyProfileTwo.yummyPairs": pureeType[1].yummyPairs,
          "profile.babyProfileTwo.tastyTrio": pureeType[1].tastyTrio,

          "profile.babyProfileThree.boxSmall": planType[2].boxSmall,
          "profile.babyProfileThree.boxMedium": planType[2].boxMedium,
          "profile.babyProfileThree.boxLarge": planType[2].boxLarge,
          "profile.babyProfileThree.singlePuree": pureeType[2].singlePuree,
          "profile.babyProfileThree.yummyPairs": pureeType[2].yummyPairs,
          "profile.babyProfileThree.tastyTrio": pureeType[2].tastyTrio,
        }
      }
    );

  },

  'myAccountSaveDeliveryInfo': function (userId, addressLine1, addressLine2, addressZIP, addressCity, addressState, addressType, userPhoneNumber) {
    Meteor.users.update(
      {_id:userId},
      {
        $set:{
          "profile.addressLine1": addressLine1,
          "profile.addressLine2": addressLine2,
          "profile.addressZIP": addressZIP,
          "profile.addressCity": addressCity,
          "profile.addressState": addressState,
          "profile.addressType": addressType,
          "profile.userPhoneNumber": userPhoneNumber,
        }
      }
    );
  },

  'myAccountSaveAccountInfo': function (userId, userFirstName, userLastName, userEmail) {
    Meteor.users.update(
      {_id:userId},
      {
        $set:{
          "profile.userFirstName": userFirstName,
          "profile.userLastName": userLastName,
          "emails[0].address": userEmail,
        }
      }
    );
    return 'successful';
  },

});
