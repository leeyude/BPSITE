Zips= new Mongo.Collection("zips");

Meteor.methods({
   upload : function(fileContent) {
   console.log("start insert");
   import_file_CSV(fileContent);
   console.log("completed");
 }
});

import_file_CSV = function(file) {
  console.log("enter function")
  var lines = file.split(/\r\n|\n/);
  var l = lines.length - 1;
  for (var i=0; i < l; i++) {
    var line = lines[i];
    var line_parts = line.split(',');
    if(line_parts[0].length===3){
      var zipcode = "00"+line_parts[0];
    } else {
      if(line_parts[0].length===4){
        var zipcode = "0"+line_parts[0];
      }else{
        var zipcode = line_parts[0];
      };
    };

    var cityName = line_parts[1];
    var stateAbb = line_parts[2];
    var currentServing = "No";

    var result = Zips.insert({zipcode:zipcode, cityName:cityName, stateAbb:stateAbb, currentServing: currentServing});
    };
    return result;
};

Meteor.methods({
  updateZips: function(zipcode, cityName, stateAbb, currentServing, zipId){
      if(zipId){
        var newDate= new Date();
        var currentDate = moment(newDate).format('ll');
        Zips.update({_id:zipId}, {$set:{
          zipcode: zipcode,
          cityName: cityName,
          stateAbb: stateAbb,
          currentServing: currentServing,
          zipId: zipId,
        }});
        console.log(zipId);
      } else {
        var newDate= new Date();
        var currentDate = moment(newDate).format('ll');
        Zips.insert({
          zipcode: zipcode,
          cityName: cityName,
          stateAbb: stateAbb,
          currentServing: currentServing,
          zipId: zipId,
        });
      };
    },

    deleteZips:function(zipId){
      Zips.remove({_id:zipId});
      console.log('delete');
    },
});
