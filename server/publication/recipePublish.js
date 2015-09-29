Meteor.publish('recipePublish', function(){
    return Recipies.find();
});

Meteor.publish('recipeImages', function(){
    return RecipeImages.find();
});
