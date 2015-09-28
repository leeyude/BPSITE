MenuCalendarWeeks = new Mongo.Collection("menuCalendarWeeks");


if (Meteor.isServer) {

/* below is the initial setting of ingredient database*/

  if (MenuCalendarWeeks.find().count() === 0){
    for(i=0;i<500;i++){
      var momentLastWeekday = moment().day(i*7+6);
      var momentWeekOfYear = moment(momentLastWeekday).week();
      var momentYear = moment(momentLastWeekday).year();

      console.log(momentYear);
      var momentMonth = moment(momentLastWeekday).month();
      var name = 'Y'+momentYear+'WK'+momentWeekOfYear;
      var dateSU= moment(momentLastWeekday).subtract(6, 'days').date();
      var dateMO= moment(momentLastWeekday).subtract(5, 'days').date();
      var dateTU= moment(momentLastWeekday).subtract(4, 'days').date();
      var dateWE= moment(momentLastWeekday).subtract(3, 'days').date();
      var dateTH= moment(momentLastWeekday).subtract(2, 'days').date();
      var dateFR= moment(momentLastWeekday).subtract(1, 'days').date();
      var dateSA= moment(momentLastWeekday).date();



      MenuCalendarWeeks.insert({
        menuWeekName: name,
        weekOfYear: momentWeekOfYear,
        year: momentYear,
        month: momentMonth,
        saturdayDate: momentLastWeekday,
        dateSU: dateSU,
        dateMO: dateMO,
        dateTU: dateTU,
        dateWE: dateWE,
        dateTH: dateTH,
        dateFR: dateFR,
        dateSA: dateSA,
        menuEntries: [],
      });
    };
  };
}


// insert recipe to menu

Meteor.methods({
  addRecipeToMenu:function(getCalendarWeekName, submittingObject){
    var menuCalendarWeekObject = MenuCalendarWeeks.findOne({menuWeekName: getCalendarWeekName});
    var menuEntries = menuCalendarWeekObject.menuEntries;
    var existingMenuItem = null;

    for(i=0;i<(menuEntries.length+1);i++){
      if(menuEntries[i]){
        if(submittingObject.selectedRecipeId==menuEntries[i].selectedRecipeId){
          existingMenuItem = i;
        };
      };
    };
    if(existingMenuItem==null){
      console.log('item does not exist '+existingMenuItem);
      console.log(submittingObject);

      // pushes entire new recipe and supplier document to the menu

      MenuCalendarWeeks.update(
        {menuWeekName: getCalendarWeekName},
        {
          $push: {
                 menuEntries: submittingObject,
          }
        }
      );
    }else{
      console.log(submittingObject);
      console.log('item exist'+existingMenuItem);
      // only updates supplier information
      MenuCalendarWeeks.update(
        {menuWeekName: getCalendarWeekName, 'menuEntries.selectedRecipeId': submittingObject.selectedRecipeId},
        {
          $set: {
            "menuEntries.$.supplierDetails": submittingObject.supplierDetails,
          }
        }
      );
    };

  },
});
