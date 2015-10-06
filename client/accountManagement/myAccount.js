Template.myAccount.helpers({
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
          $('#last4OnCard').text('Ending in '+result.last4);
        }else{
          $('#last4OnCard').text('');
        };
        if(result.exp_month&&result.exp_year){
          $('#endDateOnCard').text(result.exp_month+'/'+result.exp_year);
        }else{
          $('#endDateOnCard').text('');
        };

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

  "click #accMngtSelectionDelivery": function(event, template){
    var userId = Meteor.userId();
// changing webform classes
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
    $('#accountDeliveryInfo').addClass('hidden');
    $('#accountInfo').addClass('hidden');
    $('#accountPaymentInfo').removeClass('hidden');

    $('.accMngtItem').removeClass('active');
    $('#accMngtSelectionPayment').addClass('active');
    return false;
  },

// three sections of editing

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

    $('.overlay-dark').removeClass('closed');
    $("#accountDeliveryInfo>.accountEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;
  },

  "click #accountEditDelivery_typeResidential": function(event, template){
    $('#accountEditDelivery_typeResidential').addClass('active');
    $('#accountEditDelivery_typeBusiness').removeClass('active');
    return false;
  },

  "click #accountEditDelivery_typeBusiness": function(event, template){
    $('#accountEditDelivery_typeResidential').removeClass('active');
    $('#accountEditDelivery_typeBusiness').addClass('active');
    return false;
  },


  "click #myAccountEditAccountInfo": function(event, template){
    Session.set("accountInfoFieldCheckingWarning", false);


    var userId = Meteor.userId();
    var userObject = Meteor.users.findOne({_id: userId});
    $('#accountEditInfo_firstName').val(userObject.profile.userFirstName);
    $('#accountEditInfo_lastName').val(userObject.profile.userLastName);
    $('#accountEditInfo_email').val(userObject.emails[0].address);

    $('.overlay-dark').removeClass('closed');
    $("#accountInfo>.accountEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;
  },

  "click #myAccountEditPayment": function(event, template){
    Session.set("paymentFieldCheckingWarning", false);

    $('.overlay-dark').removeClass('closed');
    $("#accountPaymentInfo>.accountEditBlock.closed").removeClass("closed");
    $("html, body").animate({ scrollTop: 160 }, "slow");

    return false;
  },

// three save events for the four sections

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

    $('.overlay-dark').addClass('closed');
    $("#accountDeliveryInfo>.accountEditBlock").addClass("closed");

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
    Meteor.call("getZipData", addressZIP, function(error, result){
      if(error){
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
      }
      if(result){
        var zipObject = result;
        console.log('this zip object is the working js is...'+zipObject);
        if(zipObject.currentServing=='Yes'){
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
      }
    });
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

              $('.overlay-dark').addClass('closed');
              $("#accountInfo>.accountEditBlock").addClass("closed");
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

        $('.overlay-dark').addClass('closed');
        $("#accountInfo>.accountEditBlock").addClass("closed");

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

  var paymentFieldCheckingWarning = {
    cardNum: false,
    exp: false,
    cvc: false,
  };

  if(cardNum==''||exp_month==''||exp_year==''||cvc==''){
    // any of the field is empty
    if(cardNum==''){
      paymentFieldCheckingWarning.cardNum= true
    };
    if(exp_month==''||exp_year==''){
      paymentFieldCheckingWarning.exp= true
    };
    if(cvc==''){
      paymentFieldCheckingWarning.cvc= true
    };
    Session.set("paymentFieldCheckingWarning", paymentFieldCheckingWarning);
    toastr.error('Please ensure filling these fields.')

  }else{
    // all fields are filled
    Stripe.card.createToken({
        number: cardNum,
        cvc: cvc,
        exp_month: exp_month,
        exp_year: exp_year,
        name: name
    }, function(status, response) {
        if (response.error) {
          console.log(response.error);
          toastr.error('Card entry is invalid. Please try again.')

          paymentFieldCheckingWarning = {
            cardNum: false,
            exp: false,
            cvc: false,
          };
          Session.set("paymentFieldCheckingWarning", paymentFieldCheckingWarning);

        } else {
          // response contains id and card, which contains additional card details
          var stripeToken = response.id;

          Meteor.call("updateStripeCard", stripeID, stripeToken, function(error, result){
                if(error){
                  console.log("error", error);
                  toastr.error('Credit card information is invalid. Please try again.');
                  paymentFieldCheckingWarning = {
                    cardNum: false,
                    exp: false,
                    cvc: false,
                  };
                  Session.set("paymentFieldCheckingWarning", paymentFieldCheckingWarning);
                  return false;

                }
                if(result){
                  console.log(result);
                  toastr.success('Credit card successfully updated.');
                  Session.set("paymentFieldCheckingWarning", false);
                  return false;
                }
          });
        }
    });

/*    */

  };

  $('.overlay-dark').addClass('closed');
  $("#accountPaymentInfo>.accountEditBlock").addClass("closed");

  return false;
},



// cancel editing
  "click .closeIcon": function(event, template){
    $('.overlay-dark').addClass('closed');
    $("#accountDeliveryInfo>.accountEditBlock").addClass("closed");
    $("#accountInfo>.accountEditBlock").addClass("closed");
    $("#accountPaymentInfo>.accountEditBlock").addClass("closed");

    return false;
  },

  "click .overlay-dark": function(event, template){
    $('.overlay-dark').addClass('closed');

    $("#accountDeliveryInfo>.accountEditBlock").addClass("closed");
    $("#accountInfo>.accountEditBlock").addClass("closed");
    $("#accountPaymentInfo>.accountEditBlock").addClass("closed");

    return false;
  },

});

Session.setDefault("deliveryFieldCheckingWarning", false);
Session.setDefault("accountInfoFieldCheckingWarning", false);
Session.setDefault("paymentFieldCheckingWarning", false);

Template.myAccount.helpers({
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

Template.body.events({
  "keyup": function(event){
    if(event.keyCode == 27){
      $('.overlay-dark').addClass('closed');

      $("#accountDeliveryInfo>.accountEditBlock").addClass("closed");
      $("#accountInfo>.accountEditBlock").addClass("closed");
      $("#accountPaymentInfo>.accountEditBlock").addClass("closed");

      return false;    };
  },

});
