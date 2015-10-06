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
    var stripEmailUpdate = askStripeUpdate_email(userId, userEmail);
    return 'successful';
  },

  'getZipData': function(zipInput){
    var zipObject = Zips.findOne({zipcode:zipInput});
    console.log('this zip data is in the server js'+zipObject);
    if(zipObject){
      var result = {
        city: zipObject.cityName,
        state: zipObject.stateAbb,
        currentServing: zipObject.currentServing,
        MO: zipObject.MO,
        TU: zipObject.TU,
        WE: zipObject.WE,
        TH: zipObject.TH,
        FR: zipObject.FR,
        SA: zipObject.SA,
        SU: zipObject.SU
      };
      return result;
    }else{
      var error = false;
      return error;
    };

  },

});
