IngredientCollects = new Mongo.Collection("ingredients");

Session.setDefault("editingIngredient", false);

Template.ingredients.events({
  "click #addIngredientButtom": function (event, template){
    Session.set("editingIngredient", false);
    $('.itemName').val(null);
    $('.itemType').val(null);
    $('.stage').val(null);
    $('.nowUsing').val(null);
    $('.nutrition').val(null);
    $('.allergenType').val(null);
  },
});

Template.ingredients.helpers({
  ingredientItem: function(event, template){
    return IngredientCollects.find({}, {sort: {stage: +1, createdAt: -1}});
  }
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
    $('.allergenType').val(this.allergenType);
  }
});

if(Meteor.isClient){
  Template.addIngredients.helpers({
    editingIngredient: function(){
        return Session.get('editingIngredient');
    }
  });

  Template.addIngredients.events({

    "click .save": function(event, template){
      var itemName= template.find(".itemName").value;
      var itemType= template.find(".itemType").value;
      var stage= template.find(".stage").value;
      var nowUsing= template.find(".nowUsing").value;
      var nutrition= template.find(".nutrition").value;
      var allergenType= template.find(".allergenType").value;
      var ingreId= Session.get('editingIngredient');
      Meteor.call('saveIngredients', itemName, itemType, stage, nowUsing, nutrition, allergenType, ingreId);
    },

    "click .delete": function(event, template){
      var ingreId= Session.get('editingIngredient');
      Meteor.call('deleteIngredients', ingreId);
    },
  });
}
