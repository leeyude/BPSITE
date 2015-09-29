Recipies= new Mongo.Collection("recipies");

RecipeImages = new FS.Collection("recipeImages", {
  stores: [new FS.Store.FileSystem("recipeImages")]
});


RecipeImages.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

RecipeImages.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
  });


Meteor.methods({
  addRecipe:function(recipeName, recipeStage, recipeSeasonal){
    var newDate= new Date();
    var currentDate = moment(newDate).format('ll');
    if(recipeSeasonal=='Yes'){
      var recipeIsSeasonal = true;
    }else{
      var recipeIsSeasonal = false;
    };

    Recipies.insert({
      recipeName: recipeName,
      recipeStage: recipeStage,
      recipeIsSeasonal: recipeIsSeasonal,
      recipeIsActive: false,
      classification: false,
      recipeIncludeIngredients: [],
      imageId: [],
      recipeDescription: {},
      createAt: currentDate,
    });
  },

  deleteRecipe:function(recipeId){
    var recipeObject = Recipies.findOne({_id: recipeId});
    RecipeImages.remove({_id:{ $in: recipeObject.imageId}});
    Recipies.remove({_id:recipeId});
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

  updateRecipeIsSeasonal: function(recipeId, recipeIsSeasonal){
    Recipies.update(
      {_id: recipeId},
      {$set: {
        recipeIsSeasonal: recipeIsSeasonal}}
    );
  },

  updateRecipeDescription: function(recipeId, recipeDescription){
    Recipies.update(
      {_id: recipeId},
      {$set: {
        recipeDescription: recipeDescription}}
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

  recipeImages: function(recipeId, imageId){
    Recipies.update({_id: recipeId}, {$push: {"imageId": imageId}});
    return false;
  },

  removeRecipeImage: function(recipeId, imageId){
    Recipies.update(
      {_id: recipeId},
      {$pull: {"imageId": imageId}},
      { multi: true }
    );
    RecipeImages.remove({_id:imageId});

  },

});
