Meteor.publish('menuCalendarPublish', function(){
    return MenuCalendarWeeks.find();
});
