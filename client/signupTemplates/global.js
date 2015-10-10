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
  console.log("demand per week..."+demandPerWeek);
  return demandPerWeek;
};

// This defaultMealOption function is used to set default meal options based on users input as users proceed with entering profiles.

defaultMealOption = function(userId, birthInput, mealFreq, mealOunces, whichBaby){
  var userObject = Meteor.users.findOne({_id:userId});
  var babyStatus = [
    userObject.profile.babyProfileOne.babyStatus,
    userObject.profile.babyProfileTwo.babyStatus,
    userObject.profile.babyProfileThree.babyStatus
  ];
  var babyAges = BDDifferenceResults(userId, birthInput);
  var mealPerWeek = mealVolume(userId, babyStatus);

  if(mealFreq=="6+"){
    var demandPerWeek= 6*mealOunces*7;
  }else if(mealFreq){
    var demandPerWeek= mealFreq*mealOunces*7;
  }else{
    var demandPerWeek= false;
  };

  if(whichBaby=='babyOne'){
    mealPerWeek[0]=demandPerWeek;
  }else if(whichBaby=='babyTwo'){
    mealPerWeek[1]=demandPerWeek;
  }else if(whichBaby=='babyThree'){
    mealPerWeek[2]=demandPerWeek;
  };

  console.log(babyAges);
  console.log("baby Status =..."+babyStatus);
  console.log(mealPerWeek);

  var defaultPureeOption = [{
    singlePuree: false,
    yummyPairs: false,
    tastyTrio: false,
  },{
    singlePuree: false,
    yummyPairs: false,
    tastyTrio: false,
  },{
    singlePuree: false,
    yummyPairs: false,
    tastyTrio: false,
  }];

  if(babyStatus[0]){
    console.log("baby one status true");

    defaultPureeOption[0]={
      singlePuree: userObject.profile.babyProfileOne.singlePuree,
      yummyPairs: userObject.profile.babyProfileOne.yummyPairs,
      tastyTrio: userObject.profile.babyProfileOne.tastyTrio,
      boxSmall: userObject.profile.babyProfileOne.boxSmall,
      boxMedium: userObject.profile.babyProfileOne.boxMedium,
      boxLarge: userObject.profile.babyProfileOne.boxLarge,
    };
  }else{
    console.log("baby one status false");
    console.log("baby age =..."+babyAges[0].months);
    console.log(mealPerWeek[0]);
    console.log(mealPerWeek[0]>=56);
    console.log(mealPerWeek[0]>=28);
    if(babyAges[0].months>=10){
      if(mealPerWeek[0]>=56){
        defaultPureeOption[0]={
          singlePuree: false,
          yummyPairs:false,
          tastyTrio:true,
          boxSmall:false,
          boxMedium:false,
          boxLarge:true,
        };
      }else if(mealPerWeek[0]>=28){
        defaultPureeOption[0]={
          singlePuree: false,
          yummyPairs:false,
          tastyTrio:true,
          boxSmall:false,
          boxMedium:true,
          boxLarge:false,
        };
      }else{
        defaultPureeOption[0]={
          singlePuree: false,
          yummyPairs:false,
          tastyTrio:true,
          boxSmall:true,
          boxMedium:false,
          boxLarge:false,
        };
      };
    }else if(babyAges[0].months>=8){
      if(mealPerWeek[0]>=56){
        defaultPureeOption[0]={
          singlePuree: false,
          yummyPairs:true,
          tastyTrio:false,
          boxSmall:false,
          boxMedium:false,
          boxLarge:true,
        };
      }else if(mealPerWeek[0]>=28){
        defaultPureeOption[0]={
          singlePuree: false,
          yummyPairs:true,
          tastyTrio:false,
          boxSmall:false,
          boxMedium:true,
          boxLarge:false,
        };
      }else{
        defaultPureeOption[0]={
          singlePuree: false,
          yummyPairs:true,
          tastyTrio:false,
          boxSmall:true,
          boxMedium:false,
          boxLarge:false,
        };
      };
    }else{
      if(mealPerWeek[0]>=56){
        defaultPureeOption[0]={
          singlePuree: true,
          yummyPairs:false,
          tastyTrio:false,
          boxSmall:false,
          boxMedium:false,
          boxLarge:true,
        };
      }else if(mealPerWeek[0]>=28){
        defaultPureeOption[0]={
          singlePuree: true,
          yummyPairs:false,
          tastyTrio:false,
          boxSmall:false,
          boxMedium:true,
          boxLarge:false,
        };
      }else{
        defaultPureeOption[0]={
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



  if(babyStatus[1]){
    console.log("baby two status true");

    defaultPureeOption[1]={
      singlePuree: userObject.profile.babyProfileTwo.singlePuree,
      yummyPairs: userObject.profile.babyProfileTwo.yummyPairs,
      tastyTrio: userObject.profile.babyProfileTwo.tastyTrio,
      boxSmall: userObject.profile.babyProfileTwo.boxSmall,
      boxMedium: userObject.profile.babyProfileTwo.boxMedium,
      boxLarge: userObject.profile.babyProfileTwo.boxLarge,
    };
  }else{

      console.log("baby one status false");
      if(babyAges[1].months>=10){
        if(mealPerWeek[1]>=56){
          defaultPureeOption[1]={
            singlePuree: false,
            yummyPairs:false,
            tastyTrio:true,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else if(mealPerWeek[1]>=28){
          defaultPureeOption[1]={
            singlePuree: false,
            yummyPairs:false,
            tastyTrio:true,
            boxSmall:false,
            boxMedium:true,
            boxLarge:false,
          };
        }else{
          defaultPureeOption[1]={
            singlePuree: false,
            yummyPairs:false,
            tastyTrio:true,
            boxSmall:true,
            boxMedium:false,
            boxLarge:false,
          };
        };
      }else if(babyAges[1].months>=8){
        if(mealPerWeek[1]>=56){
          defaultPureeOption[1]={
            singlePuree: false,
            yummyPairs:true,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else if(mealPerWeek[1]>=28){
          defaultPureeOption[1]={
            singlePuree: false,
            yummyPairs:true,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:true,
            boxLarge:false,
          };
        }else{
          defaultPureeOption[1]={
            singlePuree: false,
            yummyPairs:true,
            tastyTrio:false,
            boxSmall:true,
            boxMedium:false,
            boxLarge:false,
          };
        };
      }else{
        if(mealPerWeek[1]>=56){
          defaultPureeOption[0]={
            singlePuree: true,
            yummyPairs:false,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else if(mealPerWeek[1]>=28){
          defaultPureeOption[1]={
            singlePuree: true,
            yummyPairs:false,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:true,
            boxLarge:false,
          };
        }else{
          defaultPureeOption[1]={
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
  if(babyStatus[2]){
    console.log("baby three status true");

    defaultPureeOption[2]={
      singlePuree: userObject.profile.babyProfileThree.singlePuree,
      yummyPairs: userObject.profile.babyProfileThree.yummyPairs,
      tastyTrio: userObject.profile.babyProfileThree.tastyTrio,
      boxSmall: userObject.profile.babyProfileThree.boxSmall,
      boxMedium: userObject.profile.babyProfileThree.boxMedium,
      boxLarge: userObject.profile.babyProfileThree.boxLarge,
    };
  }else{

      console.log("baby three status false");
      if(babyAges[2].months>=10){
        if(mealPerWeek[2]>=56){
          defaultPureeOption[2]={
            singlePuree: false,
            yummyPairs:false,
            tastyTrio:true,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else if(mealPerWeek[2]>=28){
          defaultPureeOption[2]={
            singlePuree: false,
            yummyPairs:false,
            tastyTrio:true,
            boxSmall:false,
            boxMedium:true,
            boxLarge:false,
          };
        }else{
          defaultPureeOption[2]={
            singlePuree: false,
            yummyPairs:false,
            tastyTrio:true,
            boxSmall:true,
            boxMedium:false,
            boxLarge:false,
          };
        };
      }else if(babyAges[2].months>=8){
        if(mealPerWeek[2]>=56){
          defaultPureeOption[2]={
            singlePuree: false,
            yummyPairs:true,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else if(mealPerWeek[2]>=28){
          defaultPureeOption[2]={
            singlePuree: false,
            yummyPairs:true,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:true,
            boxLarge:false,
          };
        }else{
          defaultPureeOption[2]={
            singlePuree: false,
            yummyPairs:true,
            tastyTrio:false,
            boxSmall:true,
            boxMedium:false,
            boxLarge:false,
          };
        };
      }else{
        if(mealPerWeek[2]>=56){
          defaultPureeOption[2]={
            singlePuree: true,
            yummyPairs:false,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else if(mealPerWeek[2]>=28){
          defaultPureeOption[2]={
            singlePuree: true,
            yummyPairs:false,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:true,
            boxLarge:false,
          };
        }else{
          defaultPureeOption[2]={
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

  return defaultPureeOption;
};

// Get ZIP to check state and city
zipData = function(zipInput){
  Meteor.subscribe("zipsSearch", zipInput);

  var zipObject = Zips.findOne({zipcode:zipInput});
  console.log('this zip data is in the global js'+zipObject);
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


// convert week selection to menuWeekName in delivery schedule

convertWeekSelectionToMenuWeekName = function(weekSelection){
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for(i=0;i<12;i++){
    if(weekSelection[0]==months[i]){
      var month = i;
    };
  };
  var date = parseInt(weekSelection[1]);
  var year = weekSelection[2];

  var momentDate = moment().set({'year': year, 'month': month, 'date': date});
  var sat = moment(momentDate).day('Saturday').date();

  var menuWeekObject = MenuCalendarWeeks.findOne({dateSA: sat, month: month, year: year});

  return menuWeekObject;
};
