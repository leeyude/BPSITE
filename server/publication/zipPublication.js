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
    return this.ready;
});
