Recipies= new Mongo.Collection("recipies");

Meteor.methods({
  addRecipe:function(recipeName, recipeStage){
    var newDate= new Date();
    var currentDate = moment(newDate).format('ll');
    Recipies.insert({
      recipeName: recipeName,
      recipeStage: recipeStage,
      recipeIsActive: false,
      classification: false,
      recipeIncludeIngredients: [],
      createAt: currentDate,
    });
  },

  deleteRecipe:function(recipeId){
    Recipies.remove({_id:recipeId});
    console.log('Deleted '+recipeId);
  },

  addIngredientFromRecipe: function(recipeId, ingredientId){
    var ingredientObject = IngredientCollects.findOne({_id: ingredientId});
    var itemName = ingredientObject.itemName;
    var stage = ingredientObject.stage;

    Recipies.update(
      {_id: recipeId},
      {
        $push: {
               recipeIncludeIngredients: {
                  ingredientId: ingredientId,
                  ingredientName: itemName,
                  percentage: 0,
                  stage: stage,
               }
             }
      }
    );
  },

  updateRecipeClassification: function(recipeId, selectedClassification){
    Recipies.update(
      {_id: recipeId},
      {$set: {
        classification: selectedClassification}}
    );
  },

  updateRecipeIsActive: function(recipeId, isActive){
    Recipies.update(
      {_id: recipeId},
      {$set: {
        recipeIsActive: isActive}}
    );
  },

  updateRecipeStage: function(recipeId, stage){
    Recipies.update(
      {_id: recipeId},
      {$set: {
        recipeStage: stage}}
    );
  },

  removeIngredientFromRecipe: function(recipeId, ingredientId){
    Recipies.update(
      {_id: recipeId},
      { $pull: { recipeIncludeIngredients: { ingredientId: ingredientId} }},
      { multi: true }
    );
  },

  updateRecipePercentage: function(recipeId, ingredientId, percentage){
    Recipies.update(
      {_id: recipeId, "recipeIncludeIngredients.ingredientId": ingredientId},
      { $set: { "recipeIncludeIngredients.$.percentage" : percentage }}
    );
  },



});
