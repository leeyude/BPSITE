Meteor.methods({
  'babyProfileSaveMyMealPlan': function (userId, deliveryDays, planType, pureeType) {
    Meteor.users.update(
      {_id:userId},
      {
        $set:{
          "profile.deliveryDay": deliveryDays,
          "profile.babyProfileOne.boxSmall": planType[0].boxSmall,
          "profile.babyProfileOne.boxMedium": planType[0].boxMedium,
          "profile.babyProfileOne.boxLarge": planType[0].boxLarge,
          "profile.babyProfileOne.singlePuree": pureeType[0].singlePuree,
          "profile.babyProfileOne.yummyPairs": pureeType[0].yummyPairs,
          "profile.babyProfileOne.tastyTrio": pureeType[0].tastyTrio,

          "profile.babyProfileTwo.boxSmall": planType[1].boxSmall,
          "profile.babyProfileTwo.boxMedium": planType[1].boxMedium,
          "profile.babyProfileTwo.boxLarge": planType[1].boxLarge,
          "profile.babyProfileTwo.singlePuree": pureeType[1].singlePuree,
          "profile.babyProfileTwo.yummyPairs": pureeType[1].yummyPairs,
          "profile.babyProfileTwo.tastyTrio": pureeType[1].tastyTrio,

          "profile.babyProfileThree.boxSmall": planType[2].boxSmall,
          "profile.babyProfileThree.boxMedium": planType[2].boxMedium,
          "profile.babyProfileThree.boxLarge": planType[2].boxLarge,
          "profile.babyProfileThree.singlePuree": pureeType[2].singlePuree,
          "profile.babyProfileThree.yummyPairs": pureeType[2].yummyPairs,
          "profile.babyProfileThree.tastyTrio": pureeType[2].tastyTrio,
        }
      }
    );

  },

  'babyProfileSaveBasics': function (userId, babyBasics) {
    console.log(babyBasics);
    if(babyBasics.currentBaby==1){
      Meteor.users.update(
        {_id:userId},
        {
          $set:{
            "profile.babyProfileOne.name": babyBasics.name,
            "profile.babyProfileOne.birthday": babyBasics.birthday,
            "profile.babyProfileOne.gender": babyBasics.gender,
            "profile.babyProfileOne.mealsPerDay": babyBasics.mealsPerDay,
            "profile.babyProfileOne.ouncePerMeal": babyBasics.ouncePerMeal,
            "profile.babyProfileOne.eatingHabits": true,
          }
        }
      );
    }else if(babyBasics.currentBaby==2){
      Meteor.users.update(
        {_id:userId},
        {
          $set:{
            "profile.babyProfileTwo.name": babyBasics.name,
            "profile.babyProfileTwo.birthday": babyBasics.birthday,
            "profile.babyProfileTwo.gender": babyBasics.gender,
            "profile.babyProfileTwo.mealsPerDay": babyBasics.mealsPerDay,
            "profile.babyProfileTwo.ouncePerMeal": babyBasics.ouncePerMeal,
            "profile.babyProfileTwo.eatingHabits": true,
          }
        }
      );
    }else if(babyBasics.currentBaby==3){
      Meteor.users.update(
        {_id:userId},
        {
          $set:{
            "profile.babyProfileThree.name": babyBasics.name,
            "profile.babyProfileThree.birthday": babyBasics.birthday,
            "profile.babyProfileThree.gender": babyBasics.gender,
            "profile.babyProfileThree.mealsPerDay": babyBasics.mealsPerDay,
            "profile.babyProfileThree.ouncePerMeal": babyBasics.ouncePerMeal,
            "profile.babyProfileThree.eatingHabits": true,
          }
        }
      );
    };
    return 'complete';
  },

  'babyProfileSaveAllergens': function (userId, allergenObject) {
    if(allergenObject.currentBaby==1){
      Meteor.users.update(
        {_id:userId},
        {
          $set:{
            "profile.babyProfileOne.allergenWheat": allergenObject.allergenWheat,
            "profile.babyProfileOne.allergenShellfish": allergenObject.allergenShellfish,
            "profile.babyProfileOne.allergenEggs": allergenObject.allergenEggs,
            "profile.babyProfileOne.allergenFish": allergenObject.allergenFish,
            "profile.babyProfileOne.allergenPeanuts": allergenObject.allergenPeanuts,
            "profile.babyProfileOne.allergenMilk": allergenObject.allergenMilk,
            "profile.babyProfileOne.allergenTreeNuts": allergenObject.allergenTreeNuts,
            "profile.babyProfileOne.allergenSoybeans": allergenObject.allergenSoybeans,
            "profile.babyProfileOne.otherAllergen": allergenObject.otherAllergen,

          }
        }
      );
      return 'complete';

    }else if(allergenObject.currentBaby==2){
      Meteor.users.update(
        {_id:userId},
        {
          $set:{
            "profile.babyProfileTwo.allergenWheat": allergenObject.allergenWheat,
            "profile.babyProfileTwo.allergenShellfish": allergenObject.allergenShellfish,
            "profile.babyProfileTwo.allergenEggs": allergenObject.allergenEggs,
            "profile.babyProfileTwo.allergenFish": allergenObject.allergenFish,
            "profile.babyProfileTwo.allergenPeanuts": allergenObject.allergenPeanuts,
            "profile.babyProfileTwo.allergenMilk": allergenObject.allergenMilk,
            "profile.babyProfileTwo.allergenTreeNuts": allergenObject.allergenTreeNuts,
            "profile.babyProfileTwo.allergenSoybeans": allergenObject.allergenSoybeans,
            "profile.babyProfileTwo.otherAllergen": allergenObject.otherAllergen,
          }
        }
      );
      return 'complete';

    }else if(allergenObject.currentBaby==3){
      Meteor.users.update(
        {_id:userId},
        {
          $set:{
            "profile.babyProfileThree.allergenWheat": allergenObject.allergenWheat,
            "profile.babyProfileThree.allergenShellfish": allergenObject.allergenShellfish,
            "profile.babyProfileThree.allergenEggs": allergenObject.allergenEggs,
            "profile.babyProfileThree.allergenFish": allergenObject.allergenFish,
            "profile.babyProfileThree.allergenPeanuts": allergenObject.allergenPeanuts,
            "profile.babyProfileThree.allergenMilk": allergenObject.allergenMilk,
            "profile.babyProfileThree.allergenTreeNuts": allergenObject.allergenTreeNuts,
            "profile.babyProfileThree.allergenSoybeans": allergenObject.allergenSoybeans,
            "profile.babyProfileThree.otherAllergen": allergenObject.otherAllergen,
          }
        }
      );
      return 'complete';

    };
  },
});
