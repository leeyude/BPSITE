Recipies= new Mongo.Collection("recipies");

// below section handle's recipe's photo image upload;

RecipeImages = new FS.Collection("recipeImages", {
  stores: [new FS.Store.FileSystem("recipeImages")]
});

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

  recipeImages: function() {
    var recipeId = Session.get('selectingRecipe');
    if(recipeId){
      var recipeObject = Recipies.findOne({_id: recipeId});
      if(recipeObject.imageId.length>0){
        return RecipeImages.find({_id:{ $in: recipeObject.imageId}});;
      }else{
        return false;
      };
    }else{
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

  "change #recipeIsSeasonal": function(event, template){
    var recipeId = Session.get('selectingRecipe');
    var recipeIsSeasonal = $('#recipeIsSeasonal').val();
    Meteor.call("updateRecipeIsSeasonal", recipeId, recipeIsSeasonal);

  },

  "change #recipeDescription": function(event, template){
    var recipeId = Session.get('selectingRecipe');
    var recipeDescription = $('#recipeDescription').val();
    console.log(recipeDescription);
    Meteor.call("updateRecipeDescription", recipeId, recipeDescription);
  },



  'dropped #recipeImageDropZone': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      RecipeImages.insert(file, function (err, fileObj) {
        if (err){
          console.log(err);
          console.log(fileObj);
          toastr.error("Upload failed... please try again.");
        } else {
          toastr.success('Upload succeeded!');
          var recipeId = Session.get('selectingRecipe');
          var imageId = fileObj._id;
          Meteor.call("recipeImages", recipeId, imageId);
        }
      });
    });
  },

  'click .deleteRecipeImage': function(event, template) {
    var imageId = this._id;
    var recipeId = Session.get('selectingRecipe');
    Meteor.call("removeRecipeImage", recipeId, imageId);
  },

});

Template.recipeUpdate.events({
  "click #recipeUpdateButton": function(event, template){
    Session.set('editingRecipe', false);
    $('.recipeName').val(null);
    $('.recipeStage').val(null);
    $('.recipeIsSeasonal').val(null);
  },

  "click .save": function(event, template){
    var recipeName= template.find(".recipeName").value;
    var recipeStage= template.find(".recipeStage").value;
    var recipeIsSeasonal= template.find(".recipeIsSeasonal").value;

    Meteor.call('addRecipe', recipeName, recipeStage, recipeIsSeasonal);
  },
});

// to show the edit form for the selected recipe
Session.setDefault("selectingRecipe", false);

Template.recipeSummary.events({
  "click .recipeSummary": function(event, template){
    Session.set("selectingRecipe", this._id);
    console.log(this._id);
    $('#recipeName').text(this.recipeName);
    $('#recipeStage').val(this.recipeStage);

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

    if(this.recipeIsSeasonal){
      $('#recipeIsSeasonal').val('Yes');
    }else{
      $('#recipeIsSeasonal').val('No');
    };

    if(this.recipeDescription){
      $('#recipeDescription').val(this.recipeDescription);
    }else{
      $('#recipeDescription').val(null);
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
    console.log(recipeId);
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

  "click .recipeIngredientCheckbox": function(event, template){
    // get recipe id
    var recipeId= Session.get("selectingRecipe");
    console.log('click');
    var recipeObject = Recipies.findOne({_id: recipeId});
    var recipeIngredients= recipeObject.recipeIncludeIngredients;
    var ingredientId = this._id;

    console.log(this);

    if($("#"+ingredientId).hasClass('active')){
      $("#"+ingredientId).removeClass("active");
      Meteor.call("removeIngredientFromRecipe", recipeId, ingredientId);
    }else{
      $("#"+ingredientId).addClass("active");
      Meteor.call("addIngredientFromRecipe", recipeId, ingredientId);
    };

    return false;

  },
});

Template.recipeIngredientSelection.events({
  "click .editPercentage": function(event, template){
    Session.set("getRecipeIngredientId", this.ingredientId);
    return false;
  },
  "change .editPercentage": function(event, template){
    var ingredientId= this.ingredientId;
    var className = '.editPercentage'+ingredientId;
    var percentage = Number($(className).val());

    var recipeId = Session.get('selectingRecipe');

    console.log(ingredientId);

    Meteor.call("updateRecipePercentage", recipeId, ingredientId, percentage);
    return false;
  },

});
