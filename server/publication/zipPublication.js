//Tracker.autorun(function(){

//});

Meteor.publish('zipsPublish', function(currentServing){
    if(currentServing===false){
      return Zips.find(
        {},
        {limit: 50}
      );
    } else {
      return Zips.find(
        {currentServing: currentServing},
        {limit: 50}
      );
    };
    return this.ready;
});
