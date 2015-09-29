MenuCalendarWeeks = new Mongo.Collection("menuCalendarWeeks");


// control month display
Template.menuCalendar.helpers({
  viewingMonth: function(){
    var currentViewingMonth = Session.get('viewingMonth');
    if(currentViewingMonth){
    }else{
      var today = new Date();
      var momentTodayMonth = moment(today).month();
      var momentNextMonth = moment(today).add(1, 'months').month();
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var todayYear = moment(today).year();
      if(momentTodayMonth==11){
        var nextMonthYear= todayYear+1;
      }else{
        var nextMonthYear= todayYear;
      };

      var displayMonths = {
        thisMonthText: months[momentTodayMonth],
        thisMonthNum: momentTodayMonth,

        nextMonthText: months[momentNextMonth],
        nextMonthNum: momentNextMonth,
        thisYear: todayYear,
        nextMonthYear: nextMonthYear,
      };
      Session.set('viewingMonth',displayMonths);
    };

    return Session.get('viewingMonth');
  },

  weekOfThisMonth: function(){
    var currentViewingMonth = Session.get('viewingMonth');
    var currentMonth = currentViewingMonth.thisMonthNum;
    var currentYear = currentViewingMonth.thisYear;
    return MenuCalendarWeeks.find({month: currentMonth, year: currentYear}, {sort:{ weekOfYear : 1}});
  },

  weekOfNextMonth: function(){
    var currentViewingMonth = Session.get('viewingMonth');
    var nextMonth = currentViewingMonth.nextMonthNum;
    var nextMonthYear = currentViewingMonth.nextMonthYear;
    return MenuCalendarWeeks.find({month: nextMonth, year: nextMonthYear},{sort:{ weekOfYear : 1}});
  },
  selectingMenuWeek: function(){
    return Session.get('selectingMenuWeek');
  }
});

Template.menuCalendar.events({
  "click #nextMonthButton": function(event, template){
    var currentViewingMonthObject = Session.get('viewingMonth');
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var currentViewingMonth = currentViewingMonthObject.thisMonthNum;
    var thisYear = currentViewingMonthObject.thisYear;

    if(currentViewingMonth==11){
      var nextMonthYear= currentViewingMonthObject.nextMonthYear;

      var displayMonths = {
        thisMonthText: months[0],
        thisMonthNum: 0,
        nextMonthText: months[1],
        nextMonthNum: 1,
        thisYear: currentViewingMonthObject.nextMonthYear,
        nextMonthYear: nextMonthYear,
      };
    }else if(currentViewingMonth==10){
      var nextMonthYear= currentViewingMonthObject.nextMonthYear+1;

      var displayMonths = {
        thisMonthText: months[11],
        thisMonthNum: 11,
        nextMonthText: months[0],
        nextMonthNum: 0,
        thisYear: currentViewingMonthObject.thisYear,
        nextMonthYear: nextMonthYear,
      };
    }else{
      var currentMonth = currentViewingMonth+1;
      var currentViewingYear = currentViewingMonthObject.thisYear;

      var displayMonths = {
        thisMonthText: months[currentMonth],
        thisMonthNum: currentMonth,
        nextMonthText: months[currentMonth+1],
        nextMonthNum: currentMonth+1,
        thisYear: currentViewingYear,
        nextMonthYear: currentViewingYear,
      };
    };
    Session.set('viewingMonth',displayMonths);
    return false;
  },


  "click #previousMonthButton": function(event, template){
    var currentViewingMonthObject = Session.get('viewingMonth');
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var currentViewingMonth = currentViewingMonthObject.thisMonthNum;

    if(currentViewingMonth==0){
      var displayMonths = {
        thisMonthText: months[11],
        thisMonthNum: 11,
        nextMonthText: months[0],
        nextMonthNum: 0,
        thisYear: currentViewingMonthObject.thisYear-1,
        nextMonthYear: currentViewingMonthObject.thisYear,
      };
    }else if(currentViewingMonth==11){
      var displayMonths = {
        thisMonthText: months[10],
        thisMonthNum: 10,
        nextMonthText: months[11],
        nextMonthNum: 11,
        thisYear: currentViewingMonthObject.thisYear,
        nextMonthYear: currentViewingMonthObject.thisYear,
      };
    }else{
      var currentMonth = currentViewingMonth-1;

      var displayMonths = {
        thisMonthText: months[currentMonth],
        thisMonthNum: currentMonth,
        nextMonthText: months[currentViewingMonth],
        nextMonthNum: currentViewingMonth,
        thisYear: currentViewingMonthObject.thisYear,
        nextMonthYear: currentViewingMonthObject.thisYear,
      };
    };
    Session.set('viewingMonth',displayMonths);
    return false;
  }
});


// This section controls menu information of a selected week
Session.setDefault("selectingMenuWeek", false);


Template.menuCalendarWeeks.events({
  "click .menuWeekRow": function(event, template){
    Session.set('selectingMenuWeek', this.menuWeekName);
    return false;
  },
});

Session.setDefault("selectingMenuType", {
  singlePuree: false,
  yummyPairs: false,
  tastyTrio: false,
});

Session.setDefault("selectingMenuRecipe", false);

Template.menuAddRecipe.helpers({
  selectingMenuType: function(){
    return Session.get("selectingMenuType");
  },

  selectingMenuRecipe: function(){
    return Session.get("selectingMenuRecipe");
  },

  menuGettingRecipies: function(){
    var selectingMenuType =  Session.get('selectingMenuType');
    if(selectingMenuType.singlePuree){
      return Recipies.find({recipeStage: '1'});
    }else if(selectingMenuType.yummyPairs){
      return Recipies.find({recipeStage: '2'});
    }else if(selectingMenuType.tastyTrio){
      return Recipies.find({$or: [ { recipeStage: '3' }, { recipeStage: '4'}]});
    };
  },

  supplierForIngredient: function(){
    return Suppliers.find();
  },
});

Template.menuAddRecipe.events({
  "click #menuAddRecipeButton": function(event, template){
    var menuSelection = {
      singlePuree: false,
      yummyPairs: false,
      tastyTrio: false,
    };
    Session.set('selectingMenuType', menuSelection);
    Session.set("selectingMenuRecipe", false);
  },

  "click #menuSinglePuree": function(event, template){
    $('.supplierforIngredientCheckbox').removeClass("active");

    var menuSelection = {
      singlePuree: true,
      yummyPairs: false,
      tastyTrio: false,
    };
    Session.set('selectingMenuType', menuSelection);
    Session.set("selectingMenuRecipe", false);

    return false;
  },
  "click #menuYummyPairs": function(event, template){
    $('.supplierforIngredientCheckbox').removeClass("active");

    var menuSelection = {
      singlePuree: false,
      yummyPairs: true,
      tastyTrio: false,
    };
    Session.set('selectingMenuType', menuSelection);
    Session.set("selectingMenuRecipe", false);

    return false;
  },
  "click #menuTastyTrio": function(event, template){
    $('.supplierforIngredientCheckbox').removeClass("active");

    var menuSelection = {
      singlePuree: false,
      yummyPairs: false,
      tastyTrio: true,
    };
    Session.set('selectingMenuType', menuSelection);
    Session.set("selectingMenuRecipe", false);

    return false;
  },

});

Session.setDefault("menuDetailObjects", false);

Template.menuGetRecipe.events({
  "click .recipeSelectionCheckboxWrap": function(event, template){
    $('.supplierforIngredientCheckbox').removeClass("active");

    var ingredientsIncluded = this.recipeIncludeIngredients;
    Session.set("selectingMenuRecipe", ingredientsIncluded); // display all ingredients of this selected recipe
    $('.recipeSelectionCheckbox').removeClass("active");

    var recipeFormId = '#forMenu'+this._id;
    $(recipeFormId).addClass("active");

// set up an object to contain selection information for the selected recipe
    var menuDetailObjects = [];
    for(i=0;i<ingredientsIncluded.length;i++){
      menuDetailObjects[i]= {
        selectedRecipeId: this._id,
        selectedRecipeName: this.recipeName,
        classification: this.classification,
        recipeIsSeasonal: this.recipeIsSeasonal,
        recipeDescription: this.recipeDescription,
        imageId: this.imageId,
        ingredient: ingredientsIncluded[i].ingredientId,
        supplier: null,
      };
    }

    Session.set("menuDetailObjects", menuDetailObjects);
    return false;
  }
});

Session.setDefault("selectedMenuIngredient", false);

Template.ingredientIncludedInRecipe.events({
  "click .selectedIngredientCheckboxWrap": function(event, template){
    $('.supplierforIngredientCheckbox').removeClass("active");
    $('.selectedIngredientCheckbox').removeClass("selectIngredient");

    var selectedIngredientId = '#ingreOnMenu-'+this.ingredientId;
    $(selectedIngredientId).addClass("selectIngredient");

    Session.set("selectedMenuIngredient", this.ingredientId);

    return false;
  }
});


Template.allSuppliers.events({
  "click .supplierforIngredientCheckboxWrap": function(event, template){
  $('.supplierforIngredientCheckbox').removeClass("active");
  var selectedSupplierId = '#ingreSupplier-'+this._id;
  $(selectedSupplierId).addClass("active");
  var selectedIngredientId = '#ingreOnMenu-'+Session.get('selectedMenuIngredient');
  $(selectedIngredientId).addClass("active");

  var selectedIngredientId = Session.get('selectedMenuIngredient');
  var getMenuDetailObjects = Session.get('menuDetailObjects');
  var setMenuDetailObjects = [];


  for(i=0;i<getMenuDetailObjects.length;i++){
    if(getMenuDetailObjects[i].ingredient==selectedIngredientId){
      setMenuDetailObjects[i]= {
        selectedRecipeId: getMenuDetailObjects[i].selectedRecipeId,
        selectedRecipeName: getMenuDetailObjects[i].selectedRecipeName,
        classification: getMenuDetailObjects[i].classification,
        recipeIsSeasonal: getMenuDetailObjects[i].recipeIsSeasonal,
        recipeDescription: getMenuDetailObjects[i].recipeDescription,
        imageId: getMenuDetailObjects[i].imageId,
        ingredient: getMenuDetailObjects[i].ingredient,
        supplier: this._id,
      };
    }else{
      setMenuDetailObjects[i]= {
        selectedRecipeId: getMenuDetailObjects[i].selectedRecipeId,
        selectedRecipeName: getMenuDetailObjects[i].selectedRecipeName,
        classification: getMenuDetailObjects[i].classification,
        recipeIsSeasonal: getMenuDetailObjects[i].recipeIsSeasonal,
        recipeDescription: getMenuDetailObjects[i].recipeDescription,
        imageId: getMenuDetailObjects[i].imageId,
        ingredient: getMenuDetailObjects[i].ingredient,
        supplier: getMenuDetailObjects[i].supplier,
      };
    };
  };

  Session.set('menuDetailObjects', setMenuDetailObjects)

  return false;
  }
});

Template.menuAddRecipe.events({
  "click #addRecipeToMenu": function(event, template){
    var getMenuDetailObjects = Session.get('menuDetailObjects');
    var getMenuType = Session.get('selectingMenuType');
    var getCalendarWeekName = Session.get('selectingMenuWeek');


    var checkSupplierCompletion = false;

    for(i=0;i<getMenuDetailObjects.length;i++){
      if(getMenuDetailObjects[i].supplier==null){
        checkSupplierCompletion=true;
      };
    };

    if(getMenuType.singlePuree){
      var menuType = 'singlePuree';
    }else if(getMenuType.yummyPairs){
      var menuType = 'yummyPairs';
    }else if(getMenuType.tastyTrio){
      var menuType = 'tastyTrio';
    };

    var setMenuDetailObjects=[];

    if(checkSupplierCompletion){
      toastr.error("Some ingredients have no supplier assigned.");
    }else{
      toastr.success("go ahead");
      for(i=0;i<getMenuDetailObjects.length;i++){
        setMenuDetailObjects[i]={
          ingredient: getMenuDetailObjects[i].ingredient,
          supplier: getMenuDetailObjects[i].supplier
        };
      };

      var submittingObject = {
        menuType: menuType,
//        classification:
        selectedRecipeId: getMenuDetailObjects[0].selectedRecipeId,
        selectedRecipeName: getMenuDetailObjects[0].selectedRecipeName,
        classification: getMenuDetailObjects[0].classification,
        recipeIsSeasonal: getMenuDetailObjects[0].recipeIsSeasonal,
        recipeDescription: getMenuDetailObjects[0].recipeDescription,
        imageId: getMenuDetailObjects[0].imageId,
        menuRecipeIsPublic: false,
        supplierDetails: setMenuDetailObjects,

      };
      console.log(submittingObject);
      console.log(submittingObject.menuType);
      Meteor.call("addRecipeToMenu", getCalendarWeekName, submittingObject);

    };

  }
});


// to display menu details of the selected week

Template.menuCalendar.helpers({
  menuDisplayingRecipeSinglePuree: function(){
    var selectingMenuWeek = Session.get('selectingMenuWeek');
    if(selectingMenuWeek){
      var menuWeekObject = MenuCalendarWeeks.findOne({menuWeekName:selectingMenuWeek});
      var menuObjects = [];
      for(i=0;i<(menuWeekObject.menuEntries.length);i++){
        if(menuWeekObject.menuEntries[i].menuType=='singlePuree'){
          menuObjects.push(menuWeekObject.menuEntries[i]);
        };
      };
      return menuObjects;
    }else{
      return false;
    };
  },
  menuDisplayingRecipeYummyPairs: function(){
    var selectingMenuWeek = Session.get('selectingMenuWeek');
    if(selectingMenuWeek){
      var menuWeekObject = MenuCalendarWeeks.findOne({menuWeekName:selectingMenuWeek});
      var menuObjects = [];
      for(i=0;i<(menuWeekObject.menuEntries.length);i++){
        if(menuWeekObject.menuEntries[i].menuType=='yummyPairs'){
          menuObjects.push(menuWeekObject.menuEntries[i]);
        };
      };
      return menuObjects;
    }else{
      return false;
    };
  },
  menuDisplayingRecipeTastyTrio: function(){
    var selectingMenuWeek = Session.get('selectingMenuWeek');
    if(selectingMenuWeek){
      var menuWeekObject = MenuCalendarWeeks.findOne({menuWeekName:selectingMenuWeek});
      var menuObjects = [];
      for(i=0;i<(menuWeekObject.menuEntries.length);i++){
        if(menuWeekObject.menuEntries[i].menuType=='tastyTrio'){
          menuObjects.push(menuWeekObject.menuEntries[i]);
        };
      };
      return menuObjects;
    }else{
      return false;
    };

  },

  menuRecipeDetails: function(){
    return Session.get('menuRecipeDetails');
  },

});


// to display information of selected recipeId
Session.setDefault("menuRecipeDetails", false);


Template.menuRecipeSinglePuree.events({
  "click .menuRecipeSinglePuree": function(event, template){
    Session.set("menuRecipeDetails", this);
  },

  "click .deleteMenuRecipe": function(event, template){
     var selectedRecipeId = this.selectedRecipeId;
     var selectingMenuWeek = Session.get('selectingMenuWeek');

     Meteor.call("removeRecipeFromMenu", selectingMenuWeek, selectedRecipeId);
  },
});

Template.menuRecipeYummyPairs.events({
  "click .menuRecipeYummyPairs": function(event, template){
    Session.set("menuRecipeDetails", this);
  },

  "click .deleteMenuRecipe": function(event, template){
     var selectedRecipeId = this.selectedRecipeId;
     var selectingMenuWeek = Session.get('selectingMenuWeek');

     Meteor.call("removeRecipeFromMenu", selectingMenuWeek, selectedRecipeId);
  },
});

Template.menuRecipeTastyTrio.events({
  "click .menuRecipeTastyTrio": function(event, template){
    Session.set("menuRecipeDetails", this);
  },

  "click .deleteMenuRecipe": function(event, template){
     var selectedRecipeId = this.selectedRecipeId;
     var selectingMenuWeek = Session.get('selectingMenuWeek');

     Meteor.call("removeRecipeFromMenu", selectingMenuWeek, selectedRecipeId);
  },
});

Template.menuCalendar.helpers({
  menuRecipeImage: function(){
    var menuRecipeObject = Session.get('menuRecipeDetails');
    if(menuRecipeObject){
      if(menuRecipeObject.imageId.length>0){
        return RecipeImages.find({_id:{ $in: menuRecipeObject.imageId}});;
      }else{
        return false;
      };
    }else{
      return false;
    };

  },

  menuRecipeIngredientNSupplier: function(){
    var menuRecipeObject = Session.get('menuRecipeDetails');
    if(menuRecipeObject){

      var supplierDetails = menuRecipeObject.supplierDetails;
      var ingredientNSupplierDetailObject = [];

      for(i=0;i<supplierDetails.length;i++){
        var ingredientObject = IngredientCollects.findOne({_id: supplierDetails[i].ingredient});
        var supplierObject = Suppliers.findOne({_id: supplierDetails[i].supplier});

        ingredientNSupplierDetailObject[i] = {
          ingredientName: ingredientObject.itemName,
          supplierName: supplierObject.supplierName,
          supplierCity: supplierObject.supplierCity,
          supplierState: supplierObject.supplierState
        };
      };
      return ingredientNSupplierDetailObject;
    }else{
      return false;
    };
  },

  menuRecipeNutrients: function(){
    var menuRecipeObject = Session.get('menuRecipeDetails');
    if(menuRecipeObject){
      var ingredientNutrients = '';
      var supplierDetails = menuRecipeObject.supplierDetails;

      for(i=0;i<supplierDetails.length;i++){
        var ingredientObject = IngredientCollects.findOne({_id: supplierDetails[i].ingredient});
        if(ingredientNutrients==''){
          ingredientNutrients = ingredientObject.nutrition;
        }else{
          ingredientNutrients = ingredientNutrients+", "+ingredientObject.nutrition;
        };
      };
      return ingredientNutrients;
    }else{
      return false;
    };
  },

  menuRecipeAllergens: function(){
    var menuRecipeObject = Session.get('menuRecipeDetails');
    if(menuRecipeObject){
      var supplierDetails = menuRecipeObject.supplierDetails;
      var allergenControlItem = {
         allergenWheat: false,
         allergenShellfish: false,
         allergenEggs: false,
         allergenFish: false,
         allergenPeanuts: false,
         allergenMilk: false,
         allergenTreeNuts: false,
         allergenSoybeans: false,
         otherAllergens: [],
      };

      for(i=0;i<supplierDetails.length;i++){
        var ingredientObject = IngredientCollects.findOne({_id: supplierDetails[i].ingredient});
        if(ingredientObject.allergenWheat){
          allergenControlItem.allergenWheat =true;
        };
        if(ingredientObject.allergenShellfish){
          allergenControlItem.allergenShellfish =true;
        };
        if(ingredientObject.allergenEggs){
          allergenControlItem.allergenEggs =true;
        };
        if(ingredientObject.allergenFish){
          allergenControlItem.allergenFish =true;
        };
        if(ingredientObject.allergenPeanuts){
          allergenControlItem.allergenPeanuts =true;
        };
        if(ingredientObject.allergenMilk){
          allergenControlItem.allergenMilk =true;
        };
        if(ingredientObject.allergenTreeNuts){
          allergenControlItem.allergenTreeNuts =true;
        };
        if(ingredientObject.allergenSoybeans){
          allergenControlItem.allergenSoybeans =true;
        };
        if(ingredientObject.otherAllergens){
          allergenControlItem.otherAllergens.push(ingredientObject.otherAllergens);
        };
      };

      return allergenControlItem;
    }else{
      return false;
    };
  },

});

Template.menuCalendar.events({
  "click #menuRecipeSetToPublic": function(event, template){
    var getCalendarWeekName = Session.get('selectingMenuWeek');
    var getMenuDetailObjects = Session.get('menuRecipeDetails');
    var menuRecipeIsPublic = true;
    Meteor.call("menuRecipeSetPublic", getCalendarWeekName, getMenuDetailObjects.selectedRecipeId, menuRecipeIsPublic);
    $('#menuRecipeSetToPublic').addClass('active');
    $('#menuRecipeSetToPrivate').removeClass('active');
  },

  "click #menuRecipeSetToPrivate": function(event, template){
    var getCalendarWeekName = Session.get('selectingMenuWeek');
    var getMenuDetailObjects = Session.get('menuRecipeDetails');
    var menuRecipeIsPublic = false;
    Meteor.call("menuRecipeSetPublic", getCalendarWeekName, getMenuDetailObjects.selectedRecipeId, menuRecipeIsPublic);
    $('#menuRecipeSetToPublic').removeClass('active');
    $('#menuRecipeSetToPrivate').addClass('active');
  },
});
