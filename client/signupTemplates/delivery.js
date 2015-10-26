// This section controls ZIP, State, and City value, as well as whether the entered ZIP can be served, and if yes, whether state and city matches the ZIP.

// to-do ZIP is served
// to-do state and city matches ZIP

Session.setDefault("zipDataSourceZIP", false); // false gets data from collection, and true gets data from user input.
Session.setDefault("zipDataSourceCity", false); // false gets data from collection, and true gets data from user input.
Session.setDefault("zipDataSourceState", false); // false gets data from collection, and true gets data from user input.
Session.setDefault("setCurrentServingValue", false); // false gets data from collection, and true gets data from user input.
Session.setDefault("zipFiveDigitWarning", false); // assume default Zip is five digit-> false; otherwise, true and then the warning pops out.
Session.setDefault("deliveryFirstName", false);
Session.setDefault("deliveryLastName", false);
Session.setDefault("deliveryAddressOne", false);
Session.setDefault("deliveryAddressTwo", false);
Session.setDefault("deliveryPhone", false);

// this section sets field values for delivery form if the values exist.
Template.delivery.helpers({
  deliveryFirstName: function(){
    return Session.get("deliveryFirstName");
  },
  deliveryLastName: function(){
    return Session.get("deliveryLastName");
  },
  deliveryAddressOne: function(){
    return Session.get("deliveryAddressOne");
  },
  deliveryAddressTwo: function(){
    return Session.get("deliveryAddressTwo");
  },
  deliveryPhone: function(){
    return Session.get("deliveryPhone");
  },
});

Template.delivery.helpers({
  deliveryDayOption: function(){
    var userId= Session.get("preUserLoggedIn");
    var userObject = Meteor.users.findOne({_id:userId});
    var tempData=zipData(userObject.profile.addressZIP);
    var deliveryDayOption = {
      MO: tempData.MO,
      TU: tempData.TU,
      WE: tempData.WE,
      TH: tempData.TH,
      FR: tempData.FR,
      SA: tempData.SA,
      SU: tempData.SU
    };
    Session.set("deliveryDayOption", deliveryDayOption);
    return Session.get("deliveryDayOption");
  },

  setZIP: function(){
    var userId= Session.get("preUserLoggedIn");
    var userObject = Meteor.users.findOne({_id:userId});
    if(userObject.profile.userFirstName){
      Session.set("deliveryFirstName", userObject.profile.userFirstName);
    }else{
      Session.set("deliveryFirstName", false);
    };
    if(userObject.profile.userLastName){
      Session.set("deliveryLastName", userObject.profile.userLastName);
    }else{
      Session.set("deliveryLastName", false);
    };
    if(userObject.profile.addressLine1){
      Session.set("deliveryAddressOne", userObject.profile.addressLine1);
    }else{
      Session.set("deliveryAddressOne", false);
    };
    if(userObject.profile.addressLine2){
      Session.set("deliveryAddressTwo", userObject.profile.addressLine2);
    }else{
      Session.set("deliveryAddressTwo", false);
    };
    if(userObject.profile.userPhoneNumber){
      Session.set("deliveryPhone", userObject.profile.userPhoneNumber);
    }else{
      Session.set("deliveryPhone", false);
    };
    // set delivery day
    var userObject = Meteor.users.findOne({_id:userId});
    var tempData=zipData(userObject.profile.addressZIP);
    // set default Delivery Day as the earliest delivery day of a week.
    if(tempData.SU){
      Session.set("deliveryDay", 7);
    };
    if(tempData.SA){
      Session.set("deliveryDay", 6);
    };
    if(tempData.FR){
      Session.set("deliveryDay", 5);
    };
    if(tempData.TH){
      Session.set("deliveryDay", 4);
    };
    if(tempData.WE){
      Session.set("deliveryDay", 3);
    };
    if(tempData.TU){
      Session.set("deliveryDay", 2);
    };
    if(tempData.MO){
      Session.set("deliveryDay", 1);
    };

    // if there is a user selected value of delivery day, below section will overwrite the earlier value.

    if(userObject.profile.deliveryDay=="MO"){
      Session.set("deliveryMO", true);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 1);
    };
    if(userObject.profile.deliveryDay=="TU"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", true);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 2);
    };
    if(userObject.profile.deliveryDay=="WE"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", true);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 3);
    };
    if(userObject.profile.deliveryDay=="TH"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", true);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 4);
    };
    if(userObject.profile.deliveryDay=="FR"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", true);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 5);
    };
    if(userObject.profile.deliveryDay=="SA"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", true);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 6);
    };
    if(userObject.profile.deliveryDay=="SU"){
      Session.set("deliveryMO", true);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", true);
      Session.set("deliveryDay", 7);
    };




    var zipDataSourceZIP = Session.get("zipDataSourceZIP");
// set state
    var zipDataSourceState = Session.get("zipDataSourceState");

    if(zipDataSourceState){  // data comes from form
      console.log("source from user");
      var stateValue = $("#addressState").val();
      if(stateValue){
        Session.set("setStateValue", stateValue);
      }else{
        var tempData=zipData(userObject.profile.addressZIP);
        var stateValue = tempData.state;
        Session.set("setStateValue", stateValue);
      };
    }else{  //data comes from collection
      var tempData=zipData(userObject.profile.addressZIP);
      var stateValue = tempData.state;
      Session.set("setStateValue", stateValue);

    };
    $("#addressState").val(stateValue);

// set city
var zipDataSourceCity = Session.get("zipDataSourceCity");

if(zipDataSourceCity){  // data comes from form
  var cityValue = $("#addressCity").val();
  if(cityValue){
    Session.set("setCityValue", cityValue);
  }else{
    var tempData=zipData(userObject.profile.addressZIP);
    var cityValue = tempData.city;
    Session.set("setCityValue", cityValue);
  };
}else{  //data comes from collection
  var tempData=zipData(userObject.profile.addressZIP);
  var cityValue = tempData.city;
  Session.set("setCityValue", cityValue);
};


    if(zipDataSourceZIP){ // get ZIP from form
      var getZIP = $("#addressZip").val();
      if(getZIP){
        Session.set("setZIP", getZIP);
      }else{
        var getZIP = userObject.profile.addressZIP;
        Session.set("setZIP", getZIP);
      };
    }else{ //get ZIP from collection
      var getZIP = userObject.profile.addressZIP;
      Session.set("setZIP", getZIP);
    };
    return Session.get("setZIP");
  },

  setCityValue: function(){
    return Session.get("setCityValue");
  },

  setStateValue: function(){
    return Session.get("setStateValue");
  },

  setCurrentServingValue: function(){ // false for not serving, and true for serving
    return Session.get("setCurrentServingValue");
  },
  zipFiveDigitWarning: function(){
    return Session.get("zipFiveDigitWarning");
  },

});
Session.setDefault("deliveryMO", false);
Session.setDefault("deliveryTU", false);
Session.setDefault("deliveryWE", false);
Session.setDefault("deliveryTH", false);
Session.setDefault("deliveryFR", false);
Session.setDefault("deliverySA", false);
Session.setDefault("deliverySU", false);


Template.delivery.helpers({
  deliveryMO: function(){
    return Session.get("deliveryMO")
  },
  deliveryTU: function(){
    return Session.get("deliveryTU")
  },
  deliveryWE: function(){
    return Session.get("deliveryWE")
  },
  deliveryTH: function(){
    return Session.get("deliveryTH")
  },
  deliveryFR: function(){
    return Session.get("deliveryFR")
  },
  deliverySA: function(){
    return Session.get("deliverySA")
  },
  deliverySU: function(){
    return Session.get("deliverySU")
  },
});

Template.delivery.events({
  "change #deliveryDay": function(event, template){
    var getDeliveryDay = $("#deliveryDay").val();
    if(getDeliveryDay=="MO"){
      Session.set("deliveryMO", true);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 1);
    };
    if(getDeliveryDay=="TU"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", true);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 2);
    };
    if(getDeliveryDay=="WE"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", true);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 3);
    };
    if(getDeliveryDay=="TH"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", true);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 4);
    };
    if(getDeliveryDay=="FR"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", true);
      Session.set("deliverySA", false);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 5);
    };
    if(getDeliveryDay=="SA"){
      Session.set("deliveryMO", false);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", true);
      Session.set("deliverySU", false);
      Session.set("deliveryDay", 6);
    };
    if(getDeliveryDay=="SU"){
      Session.set("deliveryMO", true);
      Session.set("deliveryTU", false);
      Session.set("deliveryWE", false);
      Session.set("deliveryTH", false);
      Session.set("deliveryFR", false);
      Session.set("deliverySA", false);
      Session.set("deliverySU", true);
      Session.set("deliveryDay", 7);
    };
  },

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
          if(result.currentServing==="Yes"){
            Session.set("setCurrentServingValue", false);
            Session.set("setStateValue", result.stateAbb);
            Session.set("zipDataSourceState", true);

            Session.set("setCityValue", result.cityName);
            Session.set("zipDataSourceCity", true);

            console.log(result.stateAbb);
            console.log(result.cityName);


            var getZIP = $("#addressZIP").val;
            Session.set("zipDataSourceZIP", true);
            Session.set("setZIP", getZIP);
          }else{
            console.log(result.currentServing);

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

// this section defines the first delivery
Template.delivery.helpers({
  deliveryDay: function(){
    return Session.get("deliveryDay");
  },
  firstDeliveryOptions: function(){
    var today = new Date;
    var operationDay = 7;
    var zip= Session.get("validZIP");
    console.log(zip);

    var deliveryDay = Session.get("deliveryDay");
    console.log("deliveryDay is..."+deliveryDay);
    var dayDistance = operationDay- (moment(today).day());
    if(dayDistance>=4){

      var firstDeliveryOptions = [moment().day((deliveryDay+7)).format("dddd, MMM Do"), moment().day(deliveryDay+14).format("dddd, MMM Do"), moment().day(deliveryDay+21).format("dddd, MMM Do"),moment().day((deliveryDay+28)).format("dddd, MMM Do") ];
    }else{
      var firstDeliveryOptions = [moment().day(deliveryDay+14).format("dddd, MMM Do"), moment().day(deliveryDay+21).format("dddd, MMM Do"), moment().day(deliveryDay+28).format("dddd, MMM Do"), moment().day(deliveryDay+35).format("dddd, MMM Do"),];
    };

    Session.set("firstDeliveryOptions", firstDeliveryOptions);
    return Session.get("firstDeliveryOptions");
  }
});

Session.setDefault("firstDelverySelection", [true,false,false,false]);
Template.delivery.helpers({
  firstDelverySelection: function(){
    return Session.get("firstDelverySelection");
  }
});

Template.delivery.events({
  "change #firstDeliveryOptions": function(event, template){
    var getFirstDeliverySelection = $("#firstDeliveryOptions").val();
    var getFirstDeliveryOptions = Session.get("firstDeliveryOptions");
    if(getFirstDeliverySelection==getFirstDeliveryOptions[0]){
      Session.set("firstDelverySelection", [true,false,false,false]);
    };
    if(getFirstDeliverySelection==getFirstDeliveryOptions[1]){
      Session.set("firstDelverySelection", [false,true,false,false]);
    };
    if(getFirstDeliverySelection==getFirstDeliveryOptions[2]){
      Session.set("firstDelverySelection", [false,false,true,false]);
    };
    if(getFirstDeliverySelection==getFirstDeliveryOptions[3]){
      Session.set("firstDelverySelection", [false,false,false,true]);
    };
    console.log(Session.get("firstDelverySelection"));
  }
});


//below section handles delivery continue button
Session.setDefault("emptyWarning1", false);
Session.setDefault("emptyWarning2", false);
Session.setDefault("emptyWarning3", false);
Session.setDefault("emptyWarning4", false);
Session.setDefault("emptyWarning5", false);
Session.setDefault("emptyWarning6", false);
Session.setDefault("emptyWarning7", false);

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
  emptyWarning7: function(){
    return Session.get("emptyWarning7");
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

    var today = new Date;
    var operationDay = 7;
    var deliveryDay = Session.get("deliveryDay")
    var dayDistance = operationDay- (moment(today).day());
    if(dayDistance>=4){
      var deliveryStatus = 0;
    }else{
      var deliveryStatus = 1;
    };

    var firstDelivery = template.find("#firstDeliveryOptions").value;
    var momentFirstDelivery = moment(firstDelivery, "dddd, MMM Do");
    var menuWeek = 'Y'+moment(momentFirstDelivery).year()+'WK'+moment(momentFirstDelivery).week();

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
      deliveryDay: template.find("#deliveryDay").value,
      firstDelivery: template.find("#firstDeliveryOptions").value,
      deliveryStatus: deliveryStatus,
      menuWeek: menuWeek,
    };
    console.log(deliveryObject);
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
      Router.go('/subscription');
    };

  },

});
