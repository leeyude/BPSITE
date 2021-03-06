//Tracker.autorun(function(){

//});

Meteor.publish('zipsPublish', function(currentServing, zipInput){
    if(currentServing===false){
      if(zipInput){
        return Zips.find(
          {zipcode: zipInput},
          {limit: 50}
        );
      }else{
        return Zips.find(
          {},
          {limit: 50}
        );
      };
    } else {
      return Zips.find(
        {currentServing: currentServing},
        {limit: 50}
      );
    };
    console.log("publish"+this);
    return this.ready;
});

Meteor.publish("zipsSearch", function(zipcode){
    return Zips.find({zipcode: zipcode});
});
