Zips= new Mongo.Collection("zips");


Template.zipcodes.helpers ({
  zipLine: function(){
    return Zips.find({},{limit : 100});
  },
});

Template.zipcodes.events({
  'click #readCSV': function(event) {
    event.preventDefault();
    var reader = new FileReader();
    var loadedFile = document.getElementById('readZipCSV').files[0];
    console.log(loadedFile);
    readFile(loadedFile, function(content) {
      Meteor.call('upload',content);
    })
  }
});

readFile = function(loadedFile,onLoadCallback) {
//When the file is loaded the callback is called with the contents as a string
  var reader = new FileReader();
  reader.onload = function (event){
    var contents=event.target.result;
    onLoadCallback(contents);
  }
  reader.readAsText(loadedFile);
};


/*
 var data;

 function handleFileSelect(evt) {
   var file = evt.target.files[0];  //loadedFile

   Papa.parse(file, {
     header: false,
     dynamicTyping: true,
     complete: function(data) {
       console.log(data);
       Meteor.call('upload',data);
     }
   });
 }


 $(document).ready(function(){
   $("#readZipCSV").change(handleFileSelect);
 });

});
*/
