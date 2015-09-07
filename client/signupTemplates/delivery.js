// This section controls ZIP, State, and City value, as well as whether the entered ZIP can be served, and if yes, whether state and city matches the ZIP.

// to-do ZIP is served
// to-do state and city matches ZIP

Session.setDefault("zipDataSourceZIP", false); // false gets data from collection, and true gets data from user input.
Session.setDefault("zipDataSourceCity", false); // false gets data from collection, and true gets data from user input.
Session.setDefault("zipDataSourceState", false); // false gets data from collection, and true gets data from user input.
Session.setDefault("setCurrentServingValue", false); // false gets data from collection, and true gets data from user input.
Session.setDefault("zipFiveDigitWarning", false); // assume default Zip is five digit-> false; otherwise, true and then the warning pops out.


Template.delivery.helpers({
  setZIP: function(){
    var userId= Session.get("preUserLoggedIn");
    var zipDataSourceZIP = Session.get("zipDataSourceZIP");
    if(zipDataSourceZIP){ // get ZIP from form
      var getZIP = $("#addressZip").val();
      if(getZIP){
        Session.set("setZIP", getZIP);
      }else{
        var userObject = Meteor.users.findOne({_id:userId});
        var getZIP = userObject.profile.addressZIP;
        Session.set("setZIP", getZIP);
      };
    }else{ //get ZIP from collection
      var userObject = Meteor.users.findOne({_id:userId});
      var getZIP = userObject.profile.addressZIP;
      Session.set("setZIP", getZIP);
    };
    return Session.get("setZIP");
  },

  setCityValue: function(){
    var userId= Session.get("preUserLoggedIn");
    var zipDataSourceCity = Session.get("zipDataSourceCity");

    if(zipDataSourceCity){  // data comes from form
      var cityValue = $("#addressCity").val();
        Session.set("setCityValue", cityValue);
    }else{  //data comes from collection
      var userObject = Meteor.users.findOne({_id:userId});
      var tempData=zipForStateAndCity(userObject.profile.addressZIP);
      var cityValue = tempData.city;
      Session.set("setCityValue", cityValue);
    };
    return Session.get("setCityValue");
  },

  setStateValue: function(){
    var userId= Session.get("preUserLoggedIn");
    var zipDataSourceState = Session.get("zipDataSourceState");

    if(zipDataSourceState){  // data comes from form
      console.log("source from user");
      var stateValue = $("#addressState").val();
      Session.set("setStateValue", stateValue);

    }else{  //data comes from collection
      var userObject = Meteor.users.findOne({_id:userId});
      var tempData=zipForStateAndCity(userObject.profile.addressZIP);
      var stateValue = tempData.state;
      Session.set("setStateValue", stateValue);

    };
    return Session.get("setStateValue");
  },

  setCurrentServingValue: function(){ // false for not serving, and true for serving
    return Session.get("setCurrentServingValue");
  },
  zipFiveDigitWarning: function(){
    return Session.get("zipFiveDigitWarning");
  },

});

Template.delivery.events({
  "change #addressZip": function(event, template){
    var zipInput= $("#addressZip").val();

    if(zipInput.length==5){
      Session.set("zipFiveDigitWarning", false);
      Meteor.call("checkZipServing", zipInput, function(error, result){
        if(error){
          console.log("not serving");
          Session.set("setCurrentServingValue", true);
          $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        if(result){
          if(result==="serving"){
            console.log(result);
            Session.set("setCurrentServingValue", false);

            var getZIP = $("#addressZIP").val;
            Session.set("zipDataSourceZIP", true);
            Session.set("setZIP", getZIP);
          }else{
            console.log("not serving");
            Session.set("setCurrentServingValue", true);
            $("html, body").animate({ scrollTop: 0 }, "slow");
          };
        }
      });

    }else{
      Session.set("zipFiveDigitWarning", true);
      $("html, body").animate({ scrollTop: 0 }, "slow");

    };
  },
})

//below section handles delivery continue button
Session.setDefault("emptyWarning1", false);
Session.setDefault("emptyWarning2", false);
Session.setDefault("emptyWarning3", false);
Session.setDefault("emptyWarning4", false);
Session.setDefault("emptyWarning5", false);
Session.setDefault("emptyWarning6", false);
Session.setDefault("warningMessage", false);

Template.delivery.helpers({
  emptyWarning1: function(){
    return Session.get("emptyWarning1");
  },
  emptyWarning2: function(){
    return Session.get("emptyWarning2");
  },
  emptyWarning3: function(){
    return Session.get("emptyWarning3");
  },
  emptyWarning4: function(){
    return Session.get("emptyWarning4");
  },
  emptyWarning5: function(){
    return Session.get("emptyWarning5");
  },
  emptyWarning6: function(){
    return Session.get("emptyWarning6");
  },
  warningMessage: function(){
    return Session.get("warningMessage");

  },
});

Session.setDefault("creditCatdPayment", false);




Template.delivery.events({
  "click #deliveryContinue": function(event, template){
    console.log("click Continue");

    var userId= Session.get("preUserLoggedIn");
    var userObject = Meteor.users.findOne({_id:userId});
    var deliveryObject = {
      addressType: userObject.profile.addressType,
      userFirstName: template.find("#userFirstName").value,
      userLastName: template.find("#userLastName").value,
      addressLine1: template.find("#addressLine1").value,
      addressLine2: template.find("#addressLine2").value,
      addressCity: Session.get("setCityValue"),
      addressState: Session.get("setStateValue"),
      addressZIP: Session.get("setZIP"),
      userPhoneNumber: template.find("#userPhoneNumber").value,
    };
    var warningCount = 0;
    if(deliveryObject.userFirstName){
      Session.set("emptyWarning1", false);

    }else{
      Session.set("emptyWarning1", true);

      warningCount++
    };
    if(deliveryObject.userLastName){
      Session.set("emptyWarning2", false);

    }else{
      Session.set("emptyWarning2", true);

      warningCount++
    };
    if(deliveryObject.addressLine1){
      Session.set("emptyWarning3", false);

    }else{
      Session.set("emptyWarning3", true);

      warningCount++
    };
    if(deliveryObject.addressCity){
      Session.set("emptyWarning4", false);

    }else{
      Session.set("emptyWarning4", true);

      warningCount++
    };
    if(deliveryObject.addressState){
      Session.set("emptyWarning5", false);

    }else{
      Session.set("emptyWarning5", true);

      warningCount++
    };
    if(deliveryObject.userPhoneNumber){
      Session.set("emptyWarning6", false);
    }else{
      Session.set("emptyWarning6", true);

      warningCount++
    };
    console.log("warningCount is .....  "+warningCount);
    if(warningCount>0){
      Session.set("warningMessage", true);
    }else{
      Session.set("warningMessage", false);
      Meteor.call("deliveryContinue", userId, deliveryObject);
      Session.set("creditCatdPayment", false);

    };




    console.log(deliveryObject);
  },

});
