IngredientCollects = new Mongo.Collection("ingredients");

Session.setDefault("editingIngredient", false);
Session.setDefault("ingredientAllergenWheat", false);
Session.setDefault("ingredientAllergenShellfish", false);
Session.setDefault("ingredientAllergenEggs", false);
Session.setDefault("ingredientAllergenFish", false);
Session.setDefault("ingredientAllergenPeanuts", false);
Session.setDefault("ingredientAllergenMilk", false);
Session.setDefault("ingredientAllergenTreeNuts", false);
Session.setDefault("ingredientAllergenSoybeans", false);


Template.ingredients.events({
  "click #addIngredientButtom": function (event, template){
    Session.set("editingIngredient", false);
    $('.itemName').val(null);
    $('.itemType').val(null);
    $('.stage').val(null);
    $('.nowUsing').val(null);
    $('.nutrition').val(null);
    $('.otherAllergens').val(null);
    Session.set("editingIngredient", false);
    Session.set("ingredientAllergenWheat", false);
    Session.set("ingredientAllergenShellfish", false);
    Session.set("ingredientAllergenEggs", false);
    Session.set("ingredientAllergenFish", false);
    Session.set("ingredientAllergenPeanuts", false);
    Session.set("ingredientAllergenMilk", false);
    Session.set("ingredientAllergenTreeNuts", false);
    Session.set("ingredientAllergenSoybeans", false);


  },
});

Template.ingredients.helpers({
  ingredientItem: function(event, template){
    return IngredientCollects.find({}, {sort: {stage: +1, createdAt: -1}});
  },

});


Template.ingredientData.events({
  "dblclick .ingredientData": function(event, template){
    $("#addIngredientButtom").click();
    Session.set("editingIngredient", this._id);
    $('.itemName').val(this.itemName);
    $('.itemType').val(this.itemType);
    $('.stage').val(this.stage);
    $('.nowUsing').val(this.nowUsing);
    $('.nutrition').val(this.nutrition);
    $('.otherAllergens').val(this.otherAllergens);
    Session.set("ingredientAllergenWheat", this.allergenWheat);
    Session.set("ingredientAllergenShellfish", this.allergenShellfish);
    Session.set("ingredientAllergenEggs", this.allergenEggs);
    Session.set("ingredientAllergenFish", this.allergenFish);
    Session.set("ingredientAllergenPeanuts", this.allergenPeanuts);
    Session.set("ingredientAllergenMilk", this.allergenMilk);
    Session.set("ingredientAllergenTreeNuts", this.allergenTreeNuts);
    Session.set("ingredientAllergenSoybeans", this.allergenSoybeans);
    console.log(Session.get("ingredientAllergenWheat"));
    console.log(Session.get("ingredientAllergenShellfish"));
    console.log(Session.get("ingredientAllergenEggs"));
    console.log(Session.get("ingredientAllergenFish"));
    console.log(Session.get("ingredientAllergenPeanuts"));
    console.log(Session.get("ingredientAllergenMilk"));
    console.log(Session.get("ingredientAllergenTreeNuts"));
    console.log(Session.get("ingredientAllergenSoybeans"));    
  }
});

if(Meteor.isClient){
  Template.addIngredients.helpers({
    editingIngredient: function(){
        return Session.get('editingIngredient');
    },
    ingredientAllergenWheat: function(){
      return Session.get("ingredientAllergenWheat");
    },
    ingredientAllergenShellfish: function(){
      return Session.get("ingredientAllergenShellfish");
    },
    ingredientAllergenEggs: function(){
      return Session.get("ingredientAllergenEggs");
    },
    ingredientAllergenFish: function(){
      return Session.get("ingredientAllergenFish");
    },
    ingredientAllergenPeanuts: function(){
      return Session.get("ingredientAllergenPeanuts");
    },
    ingredientAllergenMilk: function(){
      return Session.get("ingredientAllergenMilk");
    },
    ingredientAllergenTreeNuts: function(){
      return Session.get("ingredientAllergenTreeNuts");
    },
    ingredientAllergenSoybeans: function(){
      return Session.get("ingredientAllergenSoybeans");
    },
  });

  Template.addIngredients.events({

    "click .save": function(event, template){
      var itemName= template.find(".itemName").value;
      var itemType= template.find(".itemType").value;
      var stage= template.find(".stage").value;
      var nowUsing= template.find(".nowUsing").value;
      var nutrition= template.find(".nutrition").value;
      var allergenWheat= Session.get("ingredientAllergenWheat");
      var allergenShellfish= Session.get("ingredientAllergenShellfish");
      var allergenEggs= Session.get("ingredientAllergenEggs");
      var allergenFish= Session.get("ingredientAllergenFish");
      var allergenPeanuts= Session.get("ingredientAllergenPeanuts");
      var allergenMilk= Session.get("ingredientAllergenMilk");
      var allergenTreeNuts= Session.get("ingredientAllergenTreeNuts");
      var allergenSoybeans= Session.get("ingredientAllergenSoybeans");
      var otherAllergens= template.find(".otherAllergens").value;
      var ingreId= Session.get('editingIngredient');
      Meteor.call('saveIngredients', itemName, itemType, stage, nowUsing, nutrition, otherAllergens, ingreId, allergenWheat, allergenShellfish, allergenEggs, allergenFish, allergenPeanuts, allergenMilk, allergenTreeNuts, allergenSoybeans);
    },

    "click .delete": function(event, template){
      var ingreId= Session.get('editingIngredient');
      Meteor.call('deleteIngredients', ingreId);
    },

    "click #ingredientAllergenWheat": function(event, template) {
      console.log("click");
      var alergenValue = Session.get("ingredientAllergenWheat");
      console.log(alergenValue);
      if(alergenValue){
        Session.set("ingredientAllergenWheat",false);
      }else{
        Session.set("ingredientAllergenWheat",true);
      };
    },

    "click #ingredientAllergenShellfish": function(event, template) {
      console.log("click");
      var alergenValue = Session.get("ingredientAllergenShellfish");
      console.log(alergenValue);
      if(alergenValue){
        Session.set("ingredientAllergenShellfish",false);
      }else{
        Session.set("ingredientAllergenShellfish",true);
      };
    },

    "click #ingredientAllergenEggs": function(event, template) {
      console.log("click");
      var alergenValue = Session.get("ingredientAllergenEggs");
      console.log(alergenValue);
      if(alergenValue){
        Session.set("ingredientAllergenEggs",false);
      }else{
        Session.set("ingredientAllergenEggs",true);
      };
    },

    "click #ingredientAllergenFish": function(event, template) {
      console.log("click");
      var alergenValue = Session.get("ingredientAllergenFish");
      console.log(alergenValue);
      if(alergenValue){
        Session.set("ingredientAllergenFish",false);
      }else{
        Session.set("ingredientAllergenFish",true);
      };
    },

    "click #ingredientAllergenPeanuts": function(event, template) {
      console.log("click");
      var alergenValue = Session.get("ingredientAllergenPeanuts");
      console.log(alergenValue);
      if(alergenValue){
        Session.set("ingredientAllergenPeanuts",false);
      }else{
        Session.set("ingredientAllergenPeanuts",true);
      };
    },

    "click #ingredientAllergenMilk": function(event, template) {
      console.log("click");
      var alergenValue = Session.get("ingredientAllergenMilk");
      console.log(alergenValue);
      if(alergenValue){
        Session.set("ingredientAllergenMilk",false);
      }else{
        Session.set("ingredientAllergenMilk",true);
      };
    },

    "click #ingredientAllergenTreeNuts": function(event, template) {
      console.log("click");
      var alergenValue = Session.get("ingredientAllergenTreeNuts");
      console.log(alergenValue);
      if(alergenValue){
        Session.set("ingredientAllergenTreeNuts",false);
      }else{
        Session.set("ingredientAllergenTreeNuts",true);
      };
    },

    "click #ingredientAllergenSoybeans": function(event, template) {
      console.log("click");
      var alergenValue = Session.get("ingredientAllergenSoybeans");
      console.log(alergenValue);
      if(alergenValue){
        Session.set("ingredientAllergenSoybeans",false);
      }else{
        Session.set("ingredientAllergenSoybeans",true);
      };
    },
  });
}
