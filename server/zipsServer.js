Zips= new Mongo.Collection("zips");

Meteor.methods({
  upload : function(fileContent) {
  console.log("start insert");
  import_file_CSV(fileContent);
  console.log("completed");
}
});
