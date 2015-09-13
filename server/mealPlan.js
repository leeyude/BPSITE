getMealPlanDetails = function(planValue){
  if(planValue==0){
    var getMealPlanDetails= {
      mealPlan: "smallBox",
      price: 34.93,
      itemVolume: 7,
    };
  };
  if(planValue==1){
    var getMealPlanDetails= {
      mealPlan: "mediumBox",
      price: 62.86,
      itemVolume: 14,
    };
  };
  if(planValue==2){
    var getMealPlanDetails= {
      mealPlan: "largeBox",
      price: 82.95,
      itemVolume: 21,
    };
  };
  return getMealPlanDetails;
};

getSubtotal = function(tempUserObject){
  var subtotal = 0;
  if(tempUserObject.profile.babyProfileOne.babyStatus){
    var planSelection = [tempUserObject.profile.babyProfileOne.boxSmall, tempUserObject.profile.babyProfileOne.boxMedium,tempUserObject.profile.babyProfileOne.boxLarge];
    for(i=0;i<3;i++){
      if(planSelection[i]){
        var planValue=i;
      };
    };
    var mealPlanDetails = getMealPlanDetails(planValue);
    subtotal = subtotal+mealPlanDetails.price;
    console.log(subtotal);
  };

  if(tempUserObject.profile.babyProfileTwo.babyStatus){
    var planSelection = [tempUserObject.profile.babyProfileTwo.boxSmall, tempUserObject.profile.babyProfileTwo.boxMedium,tempUserObject.profile.babyProfileTwo.boxLarge];
    for(i=0;i<3;i++){
      if(planSelection[i]){
        var planValue=i;
      };
    };
    var mealPlanDetails = getMealPlanDetails(planValue);
    subtotal = subtotal+mealPlanDetails.price;
    console.log(subtotal);

  };

  if(tempUserObject.profile.babyProfileThree.babyStatus){
    var planSelection = [tempUserObject.profile.babyProfileThree.boxSmall, tempUserObject.profile.babyProfileThree.boxMedium,tempUserObject.profile.babyProfileThree.boxLarge];
    for(i=0;i<3;i++){
      if(planSelection[i]){
        var planValue=i;
      };
    };
    var mealPlanDetails = getMealPlanDetails(planValue);
    subtotal = subtotal+mealPlanDetails.price;
    console.log(subtotal);

  };
  return subtotal;
};
