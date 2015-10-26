getWeeksOfYear = function(year){
  // given a year, return the number of weeks of that year.

  var weeksInYear = [
    {year: 2015, numWeeks: 52},
    {year: 2016, numWeeks: 53},
    {year: 2017, numWeeks: 52},
    {year: 2018, numWeeks: 52},
    {year: 2019, numWeeks: 52},
    {year: 2020, numWeeks: 53},
    {year: 2021, numWeeks: 52},
    {year: 2022, numWeeks: 52},
    {year: 2023, numWeeks: 52},
    {year: 2024, numWeeks: 52},
    {year: 2025, numWeeks: 52},
    {year: 2026, numWeeks: 53}
  ];

  for(i=0;i<12;i++){
    if(weeksInYear[i].year= year){
      return weeksInYear[i].numWeeks;
    };
  };
};

getMealDefaults = function(userId, menuWeek){
  var userObject = Meteor.users.findOne({_id: userId});

  var babyProfiles = [
    userObject.profile.babyProfileOne,
    userObject.profile.babyProfileTwo,
    userObject.profile.babyProfileThree
  ];

  var menuWeekObject = MenuCalendarWeeks.findOne({menuWeekName: menuWeek});

  if(menuWeekObject.isReleased){
    // the weekly menu is ready for default setting.
    console.log('is released');
    var menuEntries = menuWeekObject.menuEntries;
    var menuEntriesByType = [[],[],[]];
    // get menu entries by types
    for(x=0;x<menuEntries.length;x++){
      //menuEntriesByType[0] represents single purees
      if(menuEntries[x].menuType=='singlePuree'){
        menuEntriesByType[0].push(menuEntries[x]);
      };
      //menuEntriesByType[1] represents yummy pairs
      if(menuEntries[x].menuType=='yummyPairs'){
        menuEntriesByType[1].push(menuEntries[x]);
      };
      //menuEntriesByType[2] represents tasty trio
      if(menuEntries[x].menuType=='tastyTrio'){
        menuEntriesByType[2].push(menuEntries[x]);
      };
    };

    // first get the array of big 8s and other allergens for the baby.
    var babyAllergens = [
      getBabyAllergenMatrix(babyProfiles[0]),
      getBabyAllergenMatrix(babyProfiles[1]),
      getBabyAllergenMatrix(babyProfiles[2])
    ];

    // second get baby's meal preference, namely single puree, yummy pairs, and tasty trio.

    var babyMealPreferences = [[
      babyProfiles[0].singlePuree,
      babyProfiles[0].yummyPairs,
      babyProfiles[0].tastyTrio,
    ],[
      babyProfiles[1].singlePuree,
      babyProfiles[1].yummyPairs,
      babyProfiles[1].tastyTrio,
    ],[
      babyProfiles[2].singlePuree,
      babyProfiles[2].yummyPairs,
      babyProfiles[2].tastyTrio,
    ]];

    // third get the array of big 8s and other allergens of the menus.
    var menuEntryAllergensByType = [[],[],[]]; // [0] - single puree, [1] - yummy pairs, [2] - tasty trio
    for(i=0;i<3;i++){
      for(j=0;j<menuEntriesByType[i].length;j++){
        menuEntryAllergensByType[i][j]=getMenuEntryAllergenMatrix(menuEntriesByType[i][j]);
      };
    };

    // now set available options for the babies.

    var availableOptions = [[[],[],[]],[[],[],[]],[[],[],[]]]; // babyOne[singlePuree, yummyPairs, tastyTrio], Two[singlePuree, yummyPairs, tastyTrio], and Three[singlePuree, yummyPairs, tastyTrio]

    for(x=0;x<3;x++){ // for the three babies
      for(y=0;y<3;y++){ // for three menu types

        if(babyMealPreferences[x][y]){ // preference of baby x and menu type y
          for(z=0;z<menuEntryAllergensByType[y].length;z++){ // there are z menus in type y
            var allergenExist = 0; // add allergenExist as a variable for checcking whether below allergen match would occur.
            for(m=0;m<9;m++){
              if(babyAllergens[x][m]&&menuEntryAllergensByType[y][z][m]) {// baby allergen of baby x & menu type y, checking for each allergen m
                allergenExist++;
              };
            };
            if(allergenExist==0){ // this means there is no allergen of baby and in the meal menu.
              availableOptions[x][y].push(menuEntriesByType[y][z]);
            };

          };

        };
      };
    };

    console.log('available options');
    console.log(availableOptions);
    // now we go on to select default options based on the available options
    var defaultSelection = [[],[],[]];

    loop1:
    for(x=0;x<3;x++){// for the three babies
      console.log('baby'+x);

      loop2:
      for(y=2;y>-1;y--){// for three menu types, from complex puree to simpler ones.
        console.log('type'+y);
        console.log('length =...'+defaultSelection[x].length);

        if(defaultSelection[x].length<2){ // we need only two meal options for the baby each week

          if(availableOptions[x][y].length>1){
            defaultSelection[x].push(availableOptions[x][y][0].selectedRecipeId);
            if(defaultSelection[x].length==2){
              break loop2;
            }else{
              availableOptions[x][y].shift();
              defaultSelection[x].push(availableOptions[x][y][0].selectedRecipeId);
            };
          }else if(availableOptions[x][y].length==1){
            defaultSelection[x].push(availableOptions[x][y][0].selectedRecipeId);

            if(defaultSelection[x].length==2){
              break loop2;
            };
          };
        };
      };
    };

    // now determine default volumes for each baby
    var volumes = [,,];
    for(x=0;x<3;x++){
      if(babyProfiles[x].babyStatus){
        if(babyProfiles[x].boxSmall){
          volumes[x]= [4,3];
        }else if(babyProfiles[x].boxMedium){
          volumes[x]= [8,6];
        }else if(babyProfiles[x].boxLarge){
          volumes[x]= [12,9];
        }else{
          volumes[x]= [false, false];
        };
      }else{
        volumes[x]= [false, false];
      };
    };

    var defaultRecipeWithVolume = [[{
      recipeId:defaultSelection[0][0],
      recipeVolume: volumes[0][0],
    },{
      recipeId:defaultSelection[0][1],
      recipeVolume: volumes[0][1],
    }],[{
      recipeId:defaultSelection[1][0],
      recipeVolume: volumes[1][0],
    },{
      recipeId:defaultSelection[1][1],
      recipeVolume: volumes[1][1],
    }],[{
      recipeId:defaultSelection[2][0],
      recipeVolume: volumes[2][0],
    },{
      recipeId:defaultSelection[2][1],
      recipeVolume: volumes[2][1],
    }]];

    return defaultRecipeWithVolume;

  }else{
    // no default setting yet.
    console.log('is NOT released');
    return false;
  };
};

getBabyAllergenMatrix = function(babyProfiles){
  var matrix = [
    babyProfiles.allergenWheat,
    babyProfiles.allergenShellfish,
    babyProfiles.allergenEggs,
    babyProfiles.allergenFish,
    babyProfiles.allergenPeanuts,
    babyProfiles.allergenMilk,
    babyProfiles.allergenTreeNuts,
    babyProfiles.allergenSoybeans,
    babyProfiles.otherAllergen,
  ];

  return  matrix;
};

getMenuEntryAllergenMatrix = function(menuEntry){
  var numIngredients = menuEntry.supplierDetails.length;
  var allergenMatrix = [];
  for(x=0;x<numIngredients;x++){
    var ingredientObject = IngredientCollects.findOne({_id: menuEntry.supplierDetails[x].ingredient});
    allergenMatrix[x]= [
      ingredientObject.allergenWheat,
      ingredientObject.allergenShellfish,
      ingredientObject.allergenEggs,
      ingredientObject.allergenFish,
      ingredientObject.allergenPeanuts,
      ingredientObject.allergenMilk,
      ingredientObject.allergenTreeNuts,
      ingredientObject.allergenSoybeans,
      ingredientObject.otherAllergens
    ];
  };
  var result =[false, false,false, false,false, false,false, false,false];
  for(y=0;y<9;y++){
    for(z=0;z<numIngredients;z++){
      if(allergenMatrix[z][y]){
        result[y]=true;
      };
    };
  };
  return result;
};

Meteor.methods({
  createDefaultDeliveryLog:function(userId){
    // Meteor Call locates in StripeServer
    console.log('createDefaultDeliveryLog');

    var today= new Date();
    var momentToday = moment(today);
    var year  = momentToday.year();
    var weeksThisYear = getWeeksOfYear(year);

    var weekOfYear = momentToday.week();
    var todayMenuWeek = 'Y'+year+'WK'+weekOfYear;
    var menuWeekList = [,,,,,,,,,,,]; // used for setting menuWeek for each log object
    var menuWeekFactors = []; // used for calculation later

    var j=0;
    for(i=0;i<12;i++){
      if((weekOfYear+i)<=weeksThisYear){
        menuWeekList[i] = 'Y'+year+'WK'+(weekOfYear+i);
        menuWeekFactors[i] = {
          year:year,
          weekOfYear: (weekOfYear+i)
        };
      }else{
        menuWeekList[i] = 'Y'+(year+1)+'WK'+(1+j);
        menuWeekFactors[i] = {
          year:year+1,
          weekOfYear: (1+j)
        };
        j++;
      };
    };

// firstly we get the menuWeek of today.

    var userObject = Meteor.users.findOne({_id: userId});

    var userDeliveryLog = userObject.deliveryLog[0];
    var momentFirstDeliveryDay = moment(userDeliveryLog.fulfilmentDate, "dddd, MMM Do");
    var deliveryWeekDay = moment(momentFirstDeliveryDay).day();

    var firstDeliveryMenuWeek = 'Y'+moment(momentFirstDeliveryDay).year()+'WK'+moment(momentFirstDeliveryDay).week();
// and then we get the menuWeek of the first delivery day.

    var dayDistance = momentFirstDeliveryDay.diff(today, 'days');

    var statusScheduleByWeek = [0,0,0,0,0,0,0,0,0,0,0,0]; // assuming next 12 continuous weeks will be delivered.

    if(dayDistance<8){ // set the first statusScheduleByWeek to be 1 if the first delivery date is set within 7 days from now.
      statusScheduleByWeek= [1,0,0,0,0,0,0,0,0,0,0,0];
    }else{ // if the dayDistance is larger than 8, it means we have skipped deliveries. Due to the setting of user's selections of four delivery day choices, we use for loop to scan 5 times to set skipped weeks here.
      for(i=0;i<12;i++){
        if(menuWeekList[i]!=firstDeliveryMenuWeek){
          statusScheduleByWeek[i]=99;
        }else{
          break;
        };
      };
    };

    // set up delivery schedule
    var deliverySchedule = [];

    for(i=0;i<12;i++){
      deliverySchedule[i]= moment().set({'year': menuWeekFactors[i].year, 'week': menuWeekFactors[i].weekOfYear, day: deliveryWeekDay});
    };

    console.log(deliveryWeekDay);
    console.log(firstDeliveryMenuWeek);
    console.log(todayMenuWeek);
    console.log(statusScheduleByWeek);
//    console.log(deliverySchedule);

    var mealDefaults = [];
    for(i=0;i<12;i++){
      var menuWeekObject = MenuCalendarWeeks.findOne({menuWeekName: menuWeekList[i]});


      if(menuWeekObject.isReleased){
        mealDefaults[i]= getMealDefaults(userId, menuWeekList[i]);
        console.log(mealDefaults[i]);
      }else{
        mealDefaults[i] = false;
      };
    };

    console.log(mealDefaults);

/*

    var userObject = Meteor.users.findOne({_id:userId});
    var firstDelivery = userObject.deliveryLog[0].fulfilmentDate;
    var userDeliveryLog = userObject.deliveryLog[0];
    var momentFirstDelivery = moment(firstDelivery, "ddd, MMM Do"); // get moment


    var firstDeliveryWeekday = moment(momentFirstDelivery).day; // get weekday
    var deliverySchedule = [];
    var dayDistance = momentFirstDelivery.diff(today, 'days');
    console.log(dayDistance);

    if(dayDistance<8){
      statusScheduleByWeek= [1,0,0,0,0,0,0,0,0,0,0,0];
    }else{
      for(i=0;i<4;i++){
        if(dayDistance>(11+i*7)){
          statusScheduleByWeek[i]=99;
        };
      };
    };
    var numberOfSkipped = 0;
    for(i=0;i<12;i++){
      if(statusScheduleByWeek[i]==99){
        numberOfSkipped++;
      }else{
        break;
      };
    };
    for(i=0;i<12;i++){
      deliverySchedule[i]= moment(momentFirstDelivery).add(7*(i-numberOfSkipped), 'days').format("dddd, MMM Do");
    };
    // update the first object in log array
    Meteor.users.update({_id:userId}, {$set:{
      deliveryLog: [
        { status: statusScheduleByWeek[0],
          // 0- not yet fulfilled, can be changed or canceled;
          // 1- not yet fulfilled, to be fulfilled in the current week;
          // 2- delivered, within two weeks after delivery,
          // 3- delivered, out of two weeks of delivery
          // 99 - skipped
          fulfilmentDate: deliverySchedule[0],//give a time of this shipment....
          deliveryAddress1: userDeliveryLog.deliveryAddress1,
          deliveryAddress2: userDeliveryLog.deliveryAddress2,

          content: userDeliveryLog.content,
          subtotal: userDeliveryLog.subtotal,
        },
      ],
    }});
    for(i=1;i<12;i++){
      // update the next 11 objects in log array
      Meteor.users.update({_id:userId}, {$push:{
        deliveryLog:
          { status: statusScheduleByWeek[i],
            // 0- not yet fulfilled, can be changed or canceled;
            // 1- not yet fulfilled, to be fulfilled in the current week;
            // 2- delivered, within two weeks after delivery,
            // 3- delivered, out of two weeks of delivery
            // 99 - skipped
            fulfilmentDate: deliverySchedule[i],//give a time of this shipment....
            deliveryAddress1: userDeliveryLog.deliveryAddress1,
            deliveryAddress2: userDeliveryLog.deliveryAddress2,

            content: userDeliveryLog.content,
            subtotal: userDeliveryLog.subtotal,
          },
      }});
    };


*/

  },
});
