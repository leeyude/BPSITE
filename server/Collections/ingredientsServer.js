IngredientCollects = new Mongo.Collection("ingredients");


if (Meteor.isServer) {

  Meteor.methods({
    saveIngredients: function(itemName, itemType, stage, nowUsing, nutrition, allergenType, ingreId){
        if(ingreId){
          var newDate= new Date();
          var currentDate = moment(newDate).format('ll');
          IngredientCollects.update({_id:ingreId}, {$set:{
            itemName: itemName,
            itemType: itemType,
            stage: stage,
            nowUsing: nowUsing,
            nutrition: nutrition,
            allergenType: allergenType,
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
            allergenType: allergenType,
            updateAt: currentDate,
            createAt: currentDate,
            createBy: Meteor.user().username
          });
        };
      },

      deleteIngredients:function(ingreId){
        IngredientCollects.remove({_id:ingreId});
        console.log('delete');
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
      allergenType:'N/A',
      createBy: 'System Default'
    });

    IngredientCollects.insert({
      itemName: 'Apple',
      itemType: 'Fruits',
      stage:'2',
      nowUsing:'Yes',
      nutrition:'fiber, vitamin C',
      allergenType:'N/A',
      createBy: 'System Default'
    });

    IngredientCollects.insert({
      itemName: 'Pumpkin',
      itemType: 'Starchy Roots',
      stage:'2',
      nowUsing:'Yes',
      nutrition:'vitamine A, carotenoids',
      allergenType:'N/A',
      createBy: 'System Default'
    });

    IngredientCollects.insert({
      itemName: 'Brown Rice',
      itemType: 'Whole Grain',
      stage:'1',
      nowUsing:'Yes',
      nutrition:'magnesium, phosphorus, selenium, thiamin, niacin and vitamin B6,',
      allergenType:'N/A',
      createBy: 'System Default'
    });
  }
}
