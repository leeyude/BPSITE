// this BDdifference function is used to provide baby's months and days from Birth.
BDDifferenceResults = function (userId, birthInput){
  var userObject = Meteor.users.findOne({_id:userId});
  var babyStatus = [
    userObject.profile.babyProfileOne.babyStatus,
    userObject.profile.babyProfileTwo.babyStatus,
    userObject.profile.babyProfileThree.babyStatus
  ];
  var birthdays = [
    userObject.profile.babyProfileOne.birthday,
    userObject.profile.babyProfileTwo.birthday, userObject.profile.babyProfileThree.birthday
  ];
  var now = new Date();
  var momentNow={
    days: moment(now).date(),
    months: moment(now).month(),
    years: moment(now).year()
  };
  var momentBirthInput={
    days: moment(birthInput, "MMM D,YYYY" ).date(),
    months: moment(birthInput, "MMM D,YYYY").month(),
    years: moment(birthInput, "MMM D,YYYY").year()
  };
  var momentBD= [{},{},{}];
  var result= [{},{},{}];
  for (var i = 0; i < 3; i++) {
    if(babyStatus[i]){
      momentBD[i]={
        days: moment(birthdays[i], "MMM D,YYYY" ).date(),
        months: moment(birthdays[i], "MMM D,YYYY").month(),
        years: moment(birthdays[i], "MMM D,YYYY").year()
      };
      result[i] =BDdifference(momentNow, momentBD[i]);
    }else{
      result[i] = BDdifference(momentNow, momentBirthInput);
    };
  };
  return result;
};
/* the result is in the form of the following
  result= [{
  days: 7,
  months: 28
  },{
  days: 7,
  months: 28
  },
  {
  days: 7,
  months: 28
  }
];
*/

BDdifference = function(now, then){
  if(then.days>now.days){
    if(then.month==3||then.month==5||then.month==8||then.month==10){
      diffDays= (now.days+30)-then.days;
    }else if(then.month==1){
      diffDays= (now.days+28)-then.days;
    }else{
      diffDays= (now.days+31)-then.days;
    };
    if(then.months>now.months){
      diffMonths= (now.months+12)-then.months;
      diffYears= now.years-then.years-1;
      diffMonths= diffMonths+(diffYears*12);
    }else{
      diffMonths= now.months-then.months-1;
      diffYears=now.years-then.years;
      diffMonths= diffMonths+(diffYears*12);
    };
  }else{
    diffDays= now.days-then.days;
    if(then.months>now.months){
      diffMonths= (now.months+12)-then.months;
      diffYears= now.years-then.years-1;
      diffMonths= diffMonths+(diffYears*12);
    }else{
      diffMonths= now.months-then.months;
      diffYears=now.years-then.years;
      diffMonths= diffMonths+(diffYears*12);
    };
  };
  var diffResult = {
    months: diffMonths,
    days: diffDays
  };
  return diffResult;
};

// This mealVolume function is used to get how much the baby in profile eats per week.

mealVolume = function(userId, babyStatus){
  var userObject = Meteor.users.findOne({_id:userId});
  var mealsPerDay = [
    userObject.profile.babyProfileOne.mealsPerDay,
    userObject.profile.babyProfileTwo.mealsPerDay,
    userObject.profile.babyProfileThree.mealsPerDay
  ];
  console.log("meals per day="+mealsPerDay);
  var ouncePerMeal = [
    userObject.profile.babyProfileOne.ouncePerMeal,
    userObject.profile.babyProfileTwo.ouncePerMeal,
    userObject.profile.babyProfileThree.ouncePerMeal
  ];
  console.log("ounce per day="+ouncePerMeal);

  var demandPerWeek = [{},{},{}];

  for (var i = 0; i < 3; i++) {
    if(mealsPerDay[i]=="6+"){
      demandPerWeek[i]= 6*ouncePerMeal[i]*7;
    }else if(mealsPerDay){
      demandPerWeek[i]= mealsPerDay[i]*ouncePerMeal[i]*7;
    }else{
      demandPerWeek[i]=false;
    };
  };
  console.log(demandPerWeek);
  console.log("demand per week");
  return demandPerWeek;
};

// This defaultMealOption function is used to set default meal options based on users input as users proceed with entering profiles.

defaultMealOption = function(userId, birthInput){
  var babyAges = BDDifferenceResults(userId, birthInput);
  var userObject = Meteor.users.findOne({_id:userId});
  var babyStatus = [
    userObject.profile.babyProfileOne.babyStatus,
    userObject.profile.babyProfileTwo.babyStatus,
    userObject.profile.babyProfileThree.babyStatus
  ];
  console.log("baby Status =..."+babyStatus);

  var defaultPureeOption = [{},{},{}];
  var mealPerWeek = mealVolume(userId, babyStatus);

  for (var i = 0; i < 3; i++) {
    if(babyStatus[i]){  // baby status is active, so the function gets what user saved before.
      if(i==0){
        console.log("status true,"+" i="+i);
        defaultPureeOption[i]={
          singlePuree: userObject.profile.babyProfileOne.singlePuree,
          yummyPairs: userObject.profile.babyProfileOne.yummyPairs,
          tastyTrio: userObject.profile.babyProfileOne.tastyTrio,
          boxSmall: userObject.profile.babyProfileOne.boxSmall,
          boxMedium: userObject.profile.babyProfileOne.boxMedium,
          boxLarge: userObject.profile.babyProfileOne.boxLarge,
        };
      }else if(i==1){
        console.log("status true,"+" i="+i);
        defaultPureeOption[i]={
          singlePuree: userObject.profile.babyProfileTwo.singlePuree,
          yummyPairs: userObject.profile.babyProfileTwo.yummyPairs,
          tastyTrio: userObject.profile.babyProfileTwo.tastyTrio,
          boxSmall: userObject.profile.babyProfileTwo.boxSmall,
          boxMedium: userObject.profile.babyProfileTwo.boxMedium,
          boxLarge: userObject.profile.babyProfileTwo.boxLarge,
        };
      }else if(i==2){
        console.log("status true,"+" i="+i);
        defaultPureeOption[i]={
          singlePuree: userObject.profile.babyProfileThree.singlePuree,
          yummyPairs: userObject.profile.babyProfileThree.yummyPairs,
          tastyTrio: userObject.profile.babyProfileThree.tastyTrio,
          boxSmall: userObject.profile.babyProfileThree.boxSmall,
          boxMedium: userObject.profile.babyProfileThree.boxMedium,
          boxLarge: userObject.profile.babyProfileThree.boxLarge,
        };
      };
    }else{  // baby status is not active, so the function sets a default value for meal option and box size for the user.
      console.log("status false"+" i="+i);
      console.log(mealPerWeek[i]);
      if(babyAges[i].months>=10){
        defaultPureeOption[i]={
          singlePuree: false,
          yummyPairs:false,
          tastyTrio:true,
          boxSmall:false,
          boxMedium:false,
          boxLarge:true,
        };
      }else if(babyAges[i].months>=8){
        console.log("does meal per week >= 84"+mealPerWeek[i]>=84);
        if(mealPerWeek[i]>=84){
          console.log("meal per week >=84"+mealPerWeek[i]);

          defaultPureeOption[i]={
            singlePuree: false,
            yummyPairs:true,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else{
          console.log("meal per week <84"+mealPerWeek[i]);

          defaultPureeOption[i]={
            singlePuree: false,
            yummyPairs:true,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:true,
            boxLarge:false,
          };
        };
      }else{
        if(mealPerWeek[i]>=84){
          console.log("meal per week >=84"+mealPerWeek[i]);

          defaultPureeOption[i]={
            singlePuree: true,
            yummyPairs:false,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else if(mealPerWeek[i]>=56){
          console.log("56< meal per week <84"+mealPerWeek[i]);

          defaultPureeOption[i]={
            singlePuree: true,
            yummyPairs:false,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:true,
            boxLarge:false,
          };
        }else{
          defaultPureeOption[i]={
            singlePuree: true,
            yummyPairs:false,
            tastyTrio:false,
            boxSmall:true,
            boxMedium:false,
            boxLarge:false,
          };
        };
      };
    };
  };

  return defaultPureeOption;
};

// Get ZIP to check state and city
zipData = function(zipInput){

  var zipObject = Zips.findOne({zipcode:zipInput});
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

};
// this section generates baby names
getBabyName = function(userObject){
  var babyName =[,,];
  if (userObject.profile.babyProfileTwo.babyStatus) {
    if(userObject.profile.babyProfileThree.babyStatus){
      babyName[0]=userObject.profile.babyProfileOne.name;
      babyName[1]=userObject.profile.babyProfileTwo.name;
      babyName[2]=userObject.profile.babyProfileThree.name;
    }else{
      babyName[0]=userObject.profile.babyProfileOne.name;
      babyName[1]=userObject.profile.babyProfileTwo.name;
    };
  }else{
    babyName[0]=userObject.profile.babyProfileOne.name;
  };
  return babyName;
};


// this section generates allergen statement

getAllergenStatement = function(allergenArray){
  var statementFactor = 0;
  var statementContent = [];
  var allergenNames = [
    "wheat", "shellfish", "eggs", "fish", "peanuts", "milk", "nuts", "soybeans" ];
  var j=0;
  for (var i = 0; i < 8; i++) {
    if(allergenArray[i]){
      statementFactor++;
      statementContent[j]= allergenNames[i];
      j++;
    };
  };

  if(statementFactor==0){
    var statementSummary = "none of the eight allergens";
  }else if(statementFactor==1){
    var statementSummary = statementContent[0];
  }else if(statementFactor==2){
    var statementSummary = statementContent[0]+" and "+statementContent[1]
  }else{
    var lastAllergenNum = statementFactor-1;
    var insertAnd = "and "+statementContent[lastAllergenNum];
    statementContent[lastAllergenNum]=insertAnd;
    var statementSummary=statementContent[0];
    for (var k = 1; k < statementFactor; k++) {
      statementSummary = statementSummary +", "+ statementContent[k];
    };
  };
  return statementSummary;
};

// this section generates puree statement

getPureeStatement = function(pureeArray){
  var pureeFactor = 0;
  var pureeOptions = ["Single Puree", "Yummy Pairs", "Tasty Trio"];
  var statementContent=[];
  var j=0;

  for (var i = 0; i < 3; i++) {
    if(pureeArray[i]){
      pureeFactor++;
      statementContent[j]= pureeOptions[i];
      j++;
    };
  };
  if(pureeFactor==0){
    Session.set("emptyWarning1", true);
    var statementSummary = "nothing. Please select at least one kind of puree";
  }else if(pureeFactor==1){
    Session.set("emptyWarning1", false);
    var statementSummary = statementContent[0];
  }else if(pureeFactor==2){
    Session.set("emptyWarning1", false);
    var statementSummary = statementContent[0]+" and "+statementContent[1];
  }else{
    Session.set("emptyWarning1", false);
    var statementSummary = statementContent[0]+", "+statementContent[1]+", and "+statementContent[2];
  };
  return statementSummary;
};

// this section generates plan type statement

getPlanType = function(planArray){
  var planFactor = 0;
    if(planArray[0]==true){
      var planType = "Small Box";
    };
    if(planArray[1]==true){
      var planType = "Medium Box";
    };
    if(planArray[2]==true){
      var planType = "Large Box";
    };
  return planType;
};


// this section generates delivery date in a complete form instead of abbreviation

getDeliveryDay = function(dayInput){
  if(dayInput=="MO"){
    var deliveryDay = "Mondays";
  };
  if(dayInput=="TU"){
    var deliveryDay = "Tuesdays";
  };
  if(dayInput=="WE"){
    var deliveryDay = "Wednesdays";
  };
  if(dayInput=="TH"){
    var deliveryDay = "Thursdays";
  };
  if(dayInput=="FR"){
    var deliveryDay = "Fridays";
  };
  if(dayInput=="SA"){
    var deliveryDay = "Saturdays";
  };
  if(dayInput=="SU"){
    var deliveryDay = "Sundays";
  };
  return deliveryDay;
};

// this section generates full delivery address
getDeliveryAddress = function(userObject){
  var addressLine1 = userObject.profile.addressLine1;
  var addressLine2 = userObject.profile.addressLine2;
  var addressCity = userObject.profile.addressCity;
  var addressState = userObject.profile.addressState;
  var addressZIP = userObject.profile.addressZIP;

  if(addressLine2){
    var deliveryAddress = addressLine1+" "+addressLine2+", "+addressCity+", "+addressState+" "+addressZIP;
  }else{
    var deliveryAddress = addressLine1+", "+addressCity+", "+addressState+" "+addressZIP;
  };
  return deliveryAddress;
};

// this section generates subscription planType
getSubscriptionPlan = function(userId){
  var userId= Session.get("preUserLoggedIn");
  var userObject = Meteor.users.findOne({_id:userId});
  var logLength = userObject.deliveryLog.length;
  logLength = logLength-1;
  var deliveryData = userObject.deliveryLog[logLength];

  var babyStatus = [userObject.profile.babyProfileOne.babyStatus, userObject.profile.babyProfileTwo.babyStatus,userObject.profile.babyProfileThree.babyStatus];

  if(babyStatus[1]){
    if(babyStatus[2]){
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
        false,
      ]];
    };
  }else{
    var planArray = [[
      deliveryData.content[0].babyProfile.boxSmall,
      deliveryData.content[0].babyProfile.boxMedium,
      deliveryData.content[0].babyProfile.boxLarge,
    ],[
      false,
      false,
      false,
    ],[
      false,
      false,
      false,
    ]];
  };

  console.log(planArray);

  var planType = [,,];
  var boxSmall = 0;
  var boxMedium = 0;
  var boxLarge = 0;
  var subscriptionPlan = null;

  for(i=0;i<3;i++){
    if(babyStatus[i]){
      planType[i] = getPlanType(planArray[i]);
    }else{
      planType[i]=null;
    };
  };


  for(i=0;i<3;i++){
    if(planType[i]=="Small Box"){
      boxSmall++;
    };
    if(planType[i]=="Medium Box"){
      boxMedium++;
    };
    if(planType[i]=="Large Box"){
      boxLarge++;
    };
  };

  if(boxSmall==1 && boxMedium==0 && boxLarge==0){
    subscriptionPlan = "boxSmall";
  };
  if(boxSmall==0 && boxMedium==1 && boxLarge==0){
    subscriptionPlan = "boxMedium";
  };
  if(boxSmall==0 && boxMedium==0 && boxLarge==1){
    subscriptionPlan = "boxLarge";
  };
  if(boxSmall==2 && boxMedium==0 && boxLarge==0){
    subscriptionPlan = "boxSmall*2";
  };
  if(boxSmall==0 && boxMedium==2 && boxLarge==0){
    subscriptionPlan = "boxMedium*2";
  };
  if(boxSmall==0 && boxMedium==0 && boxLarge==2){
    subscriptionPlan = "boxLarge*2";
  };

  if(boxSmall==1 && boxMedium==1 && boxLarge==0){
    subscriptionPlan = "boxSmall+Medium";
  };
  if(boxSmall==1 && boxMedium==0 && boxLarge==1){
    subscriptionPlan = "boxSmall+Large";
  };
  if(boxSmall==0 && boxMedium==1 && boxLarge==1){
    subscriptionPlan = "boxSmall+Large";
  };

  if(boxSmall==3 && boxMedium==0 && boxLarge==0){
    subscriptionPlan = "boxSmall*3";
  };
  if(boxSmall==0 && boxMedium==3 && boxLarge==0){
    subscriptionPlan = "boxMedium*3";
  };
  if(boxSmall==0 && boxMedium==0 && boxLarge==3){
    subscriptionPlan = "boxLarge*3";
  };

  if(boxSmall==2 && boxMedium==1 && boxLarge==0){
    subscriptionPlan = "boxSmall*2+1ME";
  };
  if(boxSmall==2 && boxMedium==0 && boxLarge==1){
    subscriptionPlan = "boxSM*2+1LG";
  };

  if(boxSmall==1 && boxMedium==2 && boxLarge==0){
    subscriptionPlan = "boxMedium*2+1Small";
  };
  if(boxSmall==0 && boxMedium==2 && boxLarge==1){
    subscriptionPlan = "boxSmall*2+1Large";
  };

  if(boxSmall==1 && boxMedium==0 && boxLarge==2){
    subscriptionPlan = "boxLarge*2+1SM";
  };
  if(boxSmall==0 && boxMedium==1 && boxLarge==2){
    subscriptionPlan = "boxLarge*2+1Medium";
  };

  if(boxSmall==1 && boxMedium==1 && boxLarge==1){
    subscriptionPlan = "boxSM+ME+LG";
  };

  return subscriptionPlan;
};

getDeliveryDays = function(abb){
  var deliveryDays = ['Sundays','Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Saturdays'];
  if(abb=='SU'){return deliveryDays[0]};
  if(abb=='MO'){return deliveryDays[1]};
  if(abb=='TU'){return deliveryDays[2]};
  if(abb=='WE'){return deliveryDays[3]};
  if(abb=='TH'){return deliveryDays[4]};
  if(abb=='FR'){return deliveryDays[5]};
  if(abb=='SA'){return deliveryDays[6]};
};
