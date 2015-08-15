Zips= new Mongo.Collection("zips");


Template.zipcodes.helpers ({
  zipLine: function(){
    return Zips.find();
  },
});

Template.zipcodes.events({
 'click #readCSV': function(event) {
console.log("click");
document.getElementById('readCSV').addEventListener('click', readFile, false);
var files = event.target.files;
var loadedFile = document.getElementById('readCSV').files[0];

console.log("read file");
readFile(loadedFile, function(content) {
Meteor.call('upload',content);
});
 }
});

import_file_CSV = function(file) {
  console.log("enter function import_file_orders")
  var lines = file.split(/\r\n|\n/);
  var l = lines.length - 1;
  for (var i=0; i < l; i++) {
    var line = lines[i];
    var line_parts = line.split(',');

    var zipcode = line_parts[0];
    var cityName = line_parts[1];
    var stateAbb = line_parts[2];
    var currentServing = "N";

    var result = Zips.insert({zipcode:zipcode, cityName:cityName, stateAbb:stateAbb});
    console.log(Zips.findOne(result));
    };
    return result;
}

 readFile = function(loadedFile,onLoadCallback) {
//When the file is loaded the callback is called with the contents as a string
  var reader = new FileReader();
  reader.onload = function (e){
  var contents=e.target.result;
    onLoadCallback(contents);
  }
  reader.readAsText(loadedFile);
  return false;
};
