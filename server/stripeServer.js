Meteor.methods({
  'stripeCusSubscribe': function(stripeToken, userEmail, subscrptionPlan, password, userId) {
    var Stripe = StripeSync("sk_test_g1O9OQ69qAtW4liCXH7zRzLN");
//    var stripe = require("stripe")("sk_test_g1O9OQ69qAtW4liCXH7zRzLN");

    Stripe.customers.create({
      source: stripeToken,
      email: userEmail,
      plan: subscrptionPlan,
    }, function(err, customer) {
      if (err) {
        console.log("Customer creation error");
      } else {
        var stripeCusId = customer.id;
        Meteor.users.update({"emails.address":userEmail}, {$set:{
          stripeID: stripeCusId,
          stripePlan: subscrptionPlan,
          activeStatus: true,
        }});
        Meteor.call("createDefaultDeliveryLog", userId);
        Accounts.setPassword(userId, password);
        console.log(Meteor.users.findOne({"emails.address":userEmail}));
        console.log("set password done.");
      }
    });
    return "Complete";
  },

  'updateStripeCard': function(userStripeID, stripeToken){
    console.log(userStripeID);

    var Stripe = StripeSync("sk_test_g1O9OQ69qAtW4liCXH7zRzLN");
//    var stripe = require("stripe")("sk_test_g1O9OQ69qAtW4liCXH7zRzLN");

    Stripe.customers.createSource(userStripeID,
    {
      source: stripeToken,
    },
    function(err, card) {
    // asynchronously called
      if(err) {
        return err;
      }
      if(card) {
        Stripe.customers.update(userStripeID,
          {
            default_source: card.id
          }, function(err, customer) {
          // asynchronously called
        });
        return "Complete";
      }
    });
  },

});

// other Stripe functions

askStripeUpdate_email = function(userId, userEmail){
  var userObject = Meteor.users.find({_id: userId});
  var userStripeID = userObject.stripeID;

  var Stripe = StripeSync("sk_test_g1O9OQ69qAtW4liCXH7zRzLN");

  Stripe.customers.update(userStripeID, {
    email: userEmail
  },function(err, customer) {
    if (err) {
      console.log("Customer email update error");
      return err;
    }
  });

  return "Complete";
};
