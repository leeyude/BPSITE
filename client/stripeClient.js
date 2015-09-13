Meteor.startup(function() {
    Stripe.setPublishableKey('pk_test_oXVcHf7bmHDimDD8vD8bGR2u');
});

Meteor.startup(function() {
    var handler = StripeCheckout.configure({
        key: 'pk_test_oXVcHf7bmHDimDD8vD8bGR2u',
        token: function(token) {}
    });
});



/*
function stripeResponseHandler(status, response) {
  var $form = $('#payment-form');

  if (response.error) {
    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    $form.get(0).submit();
  }
};*/
