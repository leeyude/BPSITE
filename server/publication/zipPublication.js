Tracker.autorun(function(){
  Meteor.publish('zipsPublish', function(nowserving){
    console.log(nowserving);

      return Zips.find({}, {$or: [{ currentServing: nowserving }]} );
  });
});
