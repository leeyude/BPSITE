Meteor.publish('ingredientsPublish', function(){
    return IngredientCollects.find();
});
