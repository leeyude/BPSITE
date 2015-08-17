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
}
