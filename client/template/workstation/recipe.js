Recipies= new Mongo.Collection("recipies");

Session.setDefault("editingRecipe", false);

Template.recipe.helpers({
  editingRecipe: function(){
    return Session.get('editingRecipe');
  },
  recipeLine: function(){
    return Recipies.find();
  },
  recipeIngredient: function(){
    var recipeId= Session.get("selectingRecipe");
    if(recipeId){
      var recipeObject = Recipies.findOne({_id: recipeId});
      var numberOfIngredients = recipeObject.recipeIncludeIngredients.length;
      var recipeIngredientDetail = [];
      for(i=0;i<numberOfIngredients;i++){
        var ingredientObject = IngredientCollects.findOne({_id: recipeObject.recipeIncludeIngredients[i].ingredientId});

        recipeIngredientDetail[i]= {
          _id: recipeObject.recipeIncludeIngredients[i].ingredientId,
          ingredientName: ingredientObject.itemName,
          ingredientPercentage: recipeObject.recipeIncludeIngredients[i].percentage,
          stage: recipeObject.recipeIncludeIngredients[i].stage,
          allergenWheat: ingredientObject.allergenWheat,
          allergenShellfish: ingredientObject.allergenShellfish,
          allergenEggs: ingredientObject.allergenEggs,
          allergenFish: ingredientObject.allergenFish,
          allergenPeanuts: ingredientObject.allergenPeanuts,
          allergenMilk: ingredientObject.allergenMilk,
          allergenTreeNuts: ingredientObject.allergenTreeNuts,
          allergenSoybeans: ingredientObject.allergenSoybeans,
          otherAllergen: ingredientObject.otherAllergen,
        };
      };
      return recipeIngredientDetail;
    };
  },

  summarizingIngredients: function(){
    var recipeId= Session.get("selectingRecipe");
    if(recipeId){
      var recipeObject = Recipies.findOne({_id: recipeId});
      var numberOfIngredients = recipeObject.recipeIncludeIngredients.length;
      var recipeIngredientDetail = [];

      var summaryPercentage = 0;
      var summaryStage = 1;
      var summaryAllergenWheat= false;
      var summaryAllergenShellfish= false;
      var summaryAllergenEggs= false;
      var summaryAllergenFish= false;
      var summaryAllergenPeanuts= false;
      var summaryAllergenMilk= false;
      var summaryAllergenTreeNuts= false;
      var summaryAllergenSoybeans= false;
      var summaryOtherAllergen= null;

      if(numberOfIngredients==0){
        ingredientSummary = {
          ingredientPercentage: summaryPercentage,
          stage: summaryStage,
          allergenWheat: summaryAllergenWheat,
          allergenShellfish: summaryAllergenShellfish,
          allergenEggs: summaryAllergenEggs,
          allergenFish: summaryAllergenFish,
          allergenPeanuts: summaryAllergenPeanuts,
          allergenMilk: summaryAllergenMilk,
          allergenTreeNuts: summaryAllergenTreeNuts,
          allergenSoybeans: summaryAllergenSoybeans,
          otherAllergen: summaryOtherAllergen,
        };
      }else{
        for(i=0;i<numberOfIngredients;i++){
          var ingredientObject = IngredientCollects.findOne({_id: recipeObject.recipeIncludeIngredients[i].ingredientId});

          summaryPercentage = summaryPercentage + recipeObject.recipeIncludeIngredients[i].percentage;

          if(recipeObject.recipeIncludeIngredients[i].stage>summaryStage){
            summaryStage= recipeObject.recipeIncludeIngredients[i].stage;
          };

          if(ingredientObject.allergenWheat){
            summaryAllergenWheat = true;
          };

          if(ingredientObject.allergenShellfish){
            summaryAllergenShellfish = true;
          };

          if(ingredientObject.allergenEggs){
            summaryAllergenEggs = true;
          };

          if(ingredientObject.allergenFish){
            summaryAllergenFish = true;
          };

          if(ingredientObject.allergenPeanuts){
            summaryAllergenPeanuts = true;
          };

          if(ingredientObject.allergenMilk){
            summaryAllergenMilk = true;
          };

          if(ingredientObject.allergenTreeNuts){
            summaryAllergenTreeNuts = true;
          };

          if(ingredientObject.allergenSoybeans){
            summaryAllergenSoybeans = true;
          };

          if(ingredientObject.otherAllergen){
            summaryOtherAllergen = summaryOtherAllergen + ingredientObject.otherAllergen;
          };

          ingredientSummary = {
            ingredientPercentage: summaryPercentage,
            stage: summaryStage,
            allergenWheat: summaryAllergenWheat,
            allergenShellfish: summaryAllergenShellfish,
            allergenEggs: summaryAllergenEggs,
            allergenFish: summaryAllergenFish,
            allergenPeanuts: summaryAllergenPeanuts,
            allergenMilk: summaryAllergenMilk,
            allergenTreeNuts: summaryAllergenTreeNuts,
            allergenSoybeans: summaryAllergenSoybeans,
            otherAllergen: summaryOtherAllergen,
          }
        };
      };

      return ingredientSummary;
    }else{
      ingredientSummary = {
        ingredientPercentage: false,
        stage: false,
        allergenWheat: false,
        allergenShellfish: false,
        allergenEggs: false,
        allergenFish: false,
        allergenPeanuts: false,
        allergenMilk: false,
        allergenTreeNuts: false,
        allergenSoybeans: false,
        otherAllergen: false,
      }
      return false;
    };
  },
});

Template.recipe.events({
  "click #recipeDeleteButton": function(event, template){
    var recipeId = Session.get('selectingRecipe');
    Session.set('selectingRecipe', false);
    Meteor.call("deleteRecipe", recipeId);
  },

  "change #recipeClassification": function(event, template){
    var recipeId = Session.get('selectingRecipe');
    var selectedClassification = $('#recipeClassification').val();
    Meteor.call("updateRecipeClassification", recipeId, selectedClassification);

  },

  "change #recipeIsActive": function(event, template){
    var recipeId = Session.get('selectingRecipe');
    var isActive = $('#recipeIsActive').val();
    Meteor.call("updateRecipeIsActive", recipeId, isActive);

  },

  "change #recipeStage": function(event, template){
    var recipeId = Session.get('selectingRecipe');
    var stage = $('#recipeStage').val();
    Meteor.call("updateRecipeStage", recipeId, stage);

  },
});

Template.recipeUpdate.events({
  "click #recipeUpdateButton": function(event, template){
    Session.set('editingRecipe', false);
    $('.recipeName').val(null);
    $('.recipeStage').val(null);
  },

  "click .save": function(event, template){
    var recipeName= template.find(".recipeName").value;
    var recipeStage= template.find(".recipeStage").value;

    Meteor.call('addRecipe', recipeName, recipeStage);
  },
});

// to show the edit form for the selected recipe
Session.setDefault("selectingRecipe", false);

Template.recipeSummary.events({
  "click .recipeSummary": function(event, template){
    Session.set("selectingRecipe", this._id);
    $('#recipeName').text(this.recipeName);
    $('#recipeStage').val(this.recipeStage);
    console.log(this.classification);
    if(this.recipeIsActive){
      $('#recipeIsActive').val('Yes');
    }else{
      $('#recipeIsActive').val('No');

    };
    if(this.classification){
      $('#recipeClassification').val(this.classification);
    }else{
      $('#recipeClassification').val('-');
    };


    $(".active").removeClass("active");
    $(".editPercentage").val(null);
  },
});

Template.recipe.helpers({
  selectingRecipe: function(){
    var recipeId= Session.get("selectingRecipe");
    var recipeObject = Recipies.findOne({_id: recipeId});
    return recipeObject;
  },
});

// Below section manages editing ingredients to the recipe

Template.recipeEditIngredients.helpers({
  listIngredients: function(){
    return IngredientCollects.find();
  },

  listIngredientSelections: function(){
    var recipeId= Session.get("selectingRecipe");
    if(recipeId){
      var recipeIngredientObject = Recipies.findOne({_id: recipeId}).recipeIncludeIngredients;
      return recipeIngredientObject;
    };

  },
});

Template.recipeEditIngredients.events({
  "click #recipeEditIngredientButton": function(event, template){
    var recipeId= Session.get("selectingRecipe");
    var recipeObject = Recipies.findOne({_id: recipeId});
    var numberOfIngredients = recipeObject.recipeIncludeIngredients.length;
    var ingredientIdList = [];
    for(i=0;i<numberOfIngredients;i++){
      ingredientIdList[i]= '#'+recipeObject.recipeIncludeIngredients[i].ingredientId;
      if($(ingredientIdList[i]).hasClass('active')){
      }else{
        $(ingredientIdList[i]).addClass("active");
      };
    };

  },

  "click .ingredientOptions": function(event, template){
    // get recipe id
    var recipeId= Session.get("selectingRecipe");
    var recipeObject = Recipies.findOne({_id: recipeId});
    var recipeIngredients= recipeObject.recipeIncludeIngredients;


    $('.recipeIngredientCheckbox').click(function(event) {
      var ingredientId = this.id;

        if($(this).hasClass('active')){
          $(this).removeClass("active");
          Meteor.call("removeIngredientFromRecipe", recipeId, ingredientId);
        }else{
          $(this).addClass("active");
          Meteor.call("addIngredientFromRecipe", recipeId, ingredientId);
        };


      event.stopImmediatePropagation();
      return false;
    });
  },
});

Template.recipeIngredientSelection.events({
  "click .editPercentage": function(event, template){
    Session.set("getRecipeIngredientId", this.ingredientId);
    return false;
  },
  "change .editPercentage": function(event, template){
    var id= this.ingredientId;
    var className = '.editPercentage'+id;
    var percentage = Number($(className).val());

    var recipeId = Session.get('selectingRecipe');
    var ingredientId = Session.get('getRecipeIngredientId');

    Meteor.call("updateRecipePercentage", recipeId, ingredientId, percentage);
    return false;
  },

});
