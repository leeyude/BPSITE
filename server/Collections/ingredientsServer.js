IngredientCollects = new Mongo.Collection("ingredients");


if (Meteor.isServer) {

  Meteor.methods({
    saveIngredients: function(itemName, itemType, stage, nowUsing, nutrition, otherAllergens, ingreId, allergenWheat, allergenShellfish, allergenEggs, allergenFish, allergenPeanuts, allergenMilk, allergenTreeNuts, allergenSoybeans){
        if(ingreId){
          var newDate= new Date();
          var currentDate = moment(newDate).format('ll');
          IngredientCollects.update({_id:ingreId}, {$set:{
            itemName: itemName,
            itemType: itemType,
            stage: stage,
            nowUsing: nowUsing,
            nutrition: nutrition,
            allergenWheat: allergenWheat,
            allergenShellfish: allergenShellfish,
            allergenEggs: allergenEggs,
            allergenFish: allergenFish,
            allergenPeanuts: allergenPeanuts,
            allergenMilk: allergenMilk,
            allergenTreeNuts: allergenTreeNuts,
            allergenSoybeans: allergenSoybeans,
            otherAllergens: otherAllergens,
            updateAt: currentDate
          }});
          console.log(ingreId);
        } else {
          var newDate= new Date();
          var currentDate = moment(newDate).format('ll');
          IngredientCollects.insert({
            itemName: itemName,
            itemType: itemType,
            stage: stage,
            nowUsing: nowUsing,
            nutrition: nutrition,
            allergenWheat: allergenWheat,
            allergenShellfish: allergenShellfish,
            allergenEggs: allergenEggs,
            allergenFish: allergenFish,
            allergenPeanuts: allergenPeanuts,
            allergenMilk: allergenMilk,
            allergenTreeNuts: allergenTreeNuts,
            allergenSoybeans: allergenSoybeans,
            otherAllergens: otherAllergens,
            updateAt: currentDate,
            createAt: currentDate,
            createBy: Meteor.user().emails[0].address
          });
        };
      },

      deleteIngredients:function(ingreId){
        IngredientCollects.remove({_id:ingreId});
        console.log('delete '+ingreId);
      },
  });

/* below is the initial setting of ingredient database*/


  if (IngredientCollects.find().count() === 0) {
    IngredientCollects.insert({
      itemName: 'Avocado',
      itemType: 'Fruits',
      stage:'3',
      nowUsing:'Yes',
      nutrition:'fiber, potassium, Vitamin E, B-vitamins, and folic acid',
      allergenWheat: false,
      allergenShellfish:false,
      allergenEggs: false,
      allergenFish:false,
      allergenPeanuts: false,
      allergenMilk: false,
      allergenTreeNuts:false,
      allergenSoybeans:false,
      otherAllergens:'N/A',
      createBy: 'System Default'
    });

    IngredientCollects.insert({
      itemName: 'Apple',
      itemType: 'Fruits',
      stage:'2',
      nowUsing:'Yes',
      nutrition:'fiber, vitamin C',
      allergenWheat: false,
      allergenShellfish:false,
      allergenEggs: false,
      allergenFish:false,
      allergenPeanuts: false,
      allergenMilk: false,
      allergenTreeNuts:false,
      allergenSoybeans:false,
      otherAllergens:'N/A',
      createBy: 'System Default'
    });

    IngredientCollects.insert({
      itemName: 'Pumpkin',
      itemType: 'Starchy Roots',
      stage:'2',
      nowUsing:'Yes',
      nutrition:'vitamine A, carotenoids',
      allergenWheat: false,
      allergenShellfish:false,
      allergenEggs: false,
      allergenFish:false,
      allergenPeanuts: false,
      allergenMilk: false,
      allergenTreeNuts:false,
      allergenSoybeans:false,
      otherAllergens:'N/A',
      createBy: 'System Default'
    });

    IngredientCollects.insert({
      itemName: 'Brown Rice',
      itemType: 'Whole Grain',
      stage:'1',
      nowUsing:'Yes',
      nutrition:'magnesium, phosphorus, selenium, thiamin, niacin and vitamin B6,',
      allergenWheat: false,
      allergenShellfish:false,
      allergenEggs: false,
      allergenFish:false,
      allergenPeanuts: false,
      allergenMilk: false,
      allergenTreeNuts:false,
      allergenSoybeans:false,
      otherAllergens:'N/A',
      createBy: 'System Default'
    });
  }
}
