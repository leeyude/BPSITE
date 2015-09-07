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

mealVolume = function(userId){
  var userObject = Meteor.users.findOne({_id:userId});
  var mealsPerDay = [
    userObject.profile.babyProfileOne.mealsPerDay,
    userObject.profile.babyProfileTwo.mealsPerDay,
    userObject.profile.babyProfileThree.mealsPerDay
  ];
  var ouncePerMeal = [
    userObject.profile.babyProfileOne.ouncePerMeal,
    userObject.profile.babyProfileTwo.ouncePerMeal,
    userObject.profile.babyProfileThree.ouncePerMeal
  ];
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
  var defaultPureeOption = [{},{},{}];
  var mealPerWeek = mealVolume(userId);

  for (var i = 0; i < 3; i++) {
    if(babyStatus[i]){  // baby status is active, so the function gets what user saved before.
      if(i==0){
        defaultPureeOption[i]={
          singlePuree: userObject.profile.babyProfileOne.singlePuree,
          yummyPairs: userObject.profile.babyProfileOne.yummyPairs,
          tastyTrio: userObject.profile.babyProfileOne.tastyTrio,
          boxSmall: userObject.profile.babyProfileOne.boxSmall,
          boxMedium: userObject.profile.babyProfileOne.boxMedium,
          boxLarge: userObject.profile.babyProfileOne.boxLarge,
        };
      }else if(i==1){
        defaultPureeOption[i]={
          singlePuree: userObject.profile.babyProfileTwo.singlePuree,
          yummyPairs: userObject.profile.babyProfileTwo.yummyPairs,
          tastyTrio: userObject.profile.babyProfileTwo.tastyTrio,
          boxSmall: userObject.profile.babyProfileTwo.boxSmall,
          boxMedium: userObject.profile.babyProfileTwo.boxMedium,
          boxLarge: userObject.profile.babyProfileTwo.boxLarge,
        };
      }else if(i==2){
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
        if(mealPerWeek[i]>=84){
          defaultPureeOption[i]={
            singlePuree: false,
            yummyPairs:true,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else{
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
          defaultPureeOption[i]={
            singlePuree: true,
            yummyPairs:false,
            tastyTrio:false,
            boxSmall:false,
            boxMedium:false,
            boxLarge:true,
          };
        }else if(mealPerWeek[i]>=56){
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
zipForStateAndCity = function(zipInput){

  var zipObject = Zips.findOne({zipcode:zipInput});
  var result = {
    city: zipObject.cityName,
    state: zipObject.stateAbb,
    currentServing: zipObject.currentServing,
  };
  return result;
};
