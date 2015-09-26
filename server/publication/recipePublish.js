Meteor.publish('recipePublish', function(){
    return Recipies.find();
});
