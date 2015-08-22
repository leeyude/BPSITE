PreUsers = new Mongo.Collection("preUsers");

Meteor.methods({
  emailExist:function(userEmail, userZip){
    var zipExistCheck = Zips.find({zipcode: userZip}).count()>0;
    var emailExistCheck = Meteor.users.find({'emails.address': userEmail}).count()>0;
    if(zipExistCheck){
      // If ZIP code exists then proceed to check email.
      if(emailExistCheck){
        console.log("email input "+ userEmail+ " already exists");
        return false;
        // return false to client that indicates the email input exists. This prompts the client to show "This Email has already been taken. Please revise email entry."
      }else{
        // return true to client that indicates that the email entry is valid. Client can move to next step of user profile building.

        console.log("email input "+ userEmail+ " is valid.");

        var zipCheck = Zips.findOne({zipcode: userZip}).currentServing==="Yes";
        if(zipCheck){
        //email entry is valid and the zipcode is currentServing, then direct the user to Profile buiding.
        console.log("Zip and Email are fine");
          return "proceed";
        }else{
        //email entry is valid BUT the zipcode is NOT currentServing, then direct the user to to not serving page.
        console.log("Email is fine, but ZIP is not covered.");
          return "notCovered";
        };
      };

    }else{
      //if ZIP code does not exist, the error message asks Client to alert that ZIP entry is wrong.
      throw new Meteor.Error(500, 'ZIP Code does not exist');
    };

  }
});
