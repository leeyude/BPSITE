/* User account Schema

{
  _id: "bbca5d6a-2156-41c4-89da-0329e8c99a4f",  // Meteor.userId()
  activeStatus: false, // email exists but the user did not finish registration and subscription.

  email: aiolos.lee@gmail.com
  emailVerified: false;
  password: false;
  creditCard: 1234-5678-9012-3456,

  createdAt: Wed Aug 21 2013 15:16:52 GMT-0700 (PDT),

  profile: {
    addressType: [true] for Residential/ [false] for Business,
    userFirstName: [text]
    userLastName: [text]
    addressLine1: [text]
    addressLine2: [text]
    addressCity: [text]
    addressState: [text]
    addressZIP: [text]
    userPhoneNumber: [text]
    babyProfileOne:{
      babyStatus: [true] for profile created by user/ [false] for not,
      name: [text],
      gender: [true] for boy/ [false] for girl,
      birthday:  [date]
      allergenWheat: [true] for existing/ [false] for non-existing
      allergenShellfish: [true] for existing/ [false] for non-existing
      allergenEggs: [true] for existing/ [false] for non-existing
      allergenFish: [true] for existing/ [false] for non-existing
      allergenPeanuts: [true] for existing/ [false] for non-existing
      allergenMilk: [true] for existing/ [false] for non-existing
      allergenTreeNuts: [true] for existing/ [false] for non-existing
      allergenSoybeans: [true] for existing/ [false] for non-existing
      otherAllergen: [text],
      eatingHabits: true/false,
      mealsPerDay: [number] if eatingHabits is true, or [false] if eatingHabits is false
      ouncePerMeal: [number], if eatingHabits is true, or [false] if eatingHabits is false
      pureeOne: [true] for selected/ [false] for not-selected,
      pureeTwo: [true] for selected/ [false] for not-selected,
      pureeThree: [true] for selected/ [false] for not-selected,
      mealBoxSmall: [true] for selected/ [false] for not-selected,
      mealBoxMedium: [true] for selected/ [false] for not-selected,
      mealBoxLarge: [true] for selected/ [false] for not-selected,
    }
    babyProfileTwo:{
      babyStatus: [true] for profile created by user/ [false] for not,
      name: [text],
      gender: [true] for boy/ [false] for girl,
      birthday:  [date]
      allergenWheat: [true] for existing/ [false] for non-existing
      allergenShellfish: [true] for existing/ [false] for non-existing
      allergenEggs: [true] for existing/ [false] for non-existing
      allergenFish: [true] for existing/ [false] for non-existing
      allergenPeanuts: [true] for existing/ [false] for non-existing
      allergenMilk: [true] for existing/ [false] for non-existing
      allergenTreeNuts: [true] for existing/ [false] for non-existing
      allergenSoybeans: [true] for existing/ [false] for non-existing
      otherAllergen: [text],
      eatingHabits: true/false,
      mealsPerDay: [number] if eatingHabits is true, or [false] if eatingHabits is false
      ouncePerMeal: [number], if eatingHabits is true, or [false] if eatingHabits is false
      pureeOne: [true] for selected/ [false] for not-selected,
      pureeTwo: [true] for selected/ [false] for not-selected,
      pureeThree: [true] for selected/ [false] for not-selected,
      mealBoxSmall: [true] for selected/ [false] for not-selected,
      mealBoxMedium: [true] for selected/ [false] for not-selected,
      mealBoxLarge: [true] for selected/ [false] for not-selected,
    }
    babyProfileThree:{
      babyStatus: [true] for profile created by user/ [false] for not,
      name: [text],
      gender: [true] for boy/ [false] for girl,
      birthday:  [date]
      allergenWheat: [true] for existing/ [false] for non-existing
      allergenShellfish: [true] for existing/ [false] for non-existing
      allergenEggs: [true] for existing/ [false] for non-existing
      allergenFish: [true] for existing/ [false] for non-existing
      allergenPeanuts: [true] for existing/ [false] for non-existing
      allergenMilk: [true] for existing/ [false] for non-existing
      allergenTreeNuts: [true] for existing/ [false] for non-existing
      allergenSoybeans: [true] for existing/ [false] for non-existing
      otherAllergen: [text],
      eatingHabits: true/false,
      mealsPerDay: [number] if eatingHabits is true, or [false] if eatingHabits is false
      ouncePerMeal: [number], if eatingHabits is true, or [false] if eatingHabits is false
      pureeOne: [true] for selected/ [false] for not-selected,
      pureeTwo: [true] for selected/ [false] for not-selected,
      pureeThree: [true] for selected/ [false] for not-selected,
      mealBoxSmall: [true] for selected/ [false] for not-selected,
      mealBoxMedium: [true] for selected/ [false] for not-selected,
      mealBoxLarge: [true] for selected/ [false] for not-selected,
    },
  },
  services: {
    facebook: {
      id: "709050", // facebook id
      accessToken: "AAACCgdX7G2...AbV9AZDZD"
    },
    resume: {
      loginTokens: [
        { token: "97e8c205-c7e4-47c9-9bea-8e2ccc0694cd",
          when: 1349761684048 }
      ]
    }
  }
}


User account schema-


*/


Meteor.methods({
  emailExist:function(userEmail, userZip){
    var zipExistCheck = Zips.find({zipcode: userZip}).count()>0;
    var emailExistCheck = Meteor.users.find({email: userEmail}).count()>0;

    console.log("email matching found..."+emailExistCheck);

    if(zipExistCheck){
      // If ZIP code exists then proceed to check email.
      if(emailExistCheck){
        console.log("email input "+ userEmail+ " already exists");
        // check whether the user email exists with active status
//        var preUserActive = Meteor.users.find({'emails.address': userEmail}).activeStatus==true; this was used due to meteor accounts-password package.
        var preUserActive = Meteor.users.findOne({email: userEmail}).activeStatus==true;

        // check whether the existing email represents an active user.
        console.log("preUserActive is ..."+preUserActive);
        if(!preUserActive){
          return "proceed";
        }else{
          return false;
          // return false to client that indicates the email input exists. This prompts the client to show "This Email has already been taken. Please revise email entry."
        };
      }else{
        // return true to client that indicates that the email entry is valid. Client can move to next step of user profile building.

        console.log("email input "+ userEmail+ " does not exist and is valid.");

        var zipServingCheck = Zips.findOne({zipcode: userZip}).currentServing==="Yes";

        Meteor.users.insert({
          email:    userEmail,
          password: false,
          emailVerified: false,
          activeStatus: false,
          createdAt: new Date(),
          profile: {
            addressZIP: userZip,
            babyProfileOne:{
              babyStatus: false,
            },
            babyProfileTwo:{
              babyStatus: false,
            }
          }
        }, function (error) {
          if (error) {
            console.log("Cannot create user");
          }
        });
        console.log("user created");
        if(zipServingCheck){
        //email entry is valid and the zipcode is currentServing, then direct the user to Profile buiding.
        console.log("Zip and Email are fine");
          return "proceed";
        }else{
        //email entry is valid BUT the zipcode is NOT currentServing, then direct the user to to not serving page.
        console.log("Email is fine, but ZIP is not served.");
          return "notCovered";
        };
      };

    }else{
      //if ZIP code does not exist, the error message asks Client to alert that ZIP entry is wrong.
      throw new Meteor.Error(500, 'ZIP Code does not exist');
    };

  },

  preUserContinue1: function(preId, tempUserObject1){

    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressType: tempUserObject1.profile.addressType,
        babyProfileOne:{
          babyStatus: true,
          name: tempUserObject1.profile.babyProfileOne.name,
          gender: tempUserObject1.profile.babyProfileOne.gender,
          birthday: tempUserObject1.profile.babyProfileOne.birthday,
          allergenWheat: tempUserObject1.profile.babyProfileOne.allergenWheat,
          allergenShellfish: tempUserObject1.profile.babyProfileOne.allergenShellfish,
          allergenEggs: tempUserObject1.profile.babyProfileOne.allergenEggs,
          allergenFish: tempUserObject1.profile.babyProfileOne.allergenFish,
          allergenPeanuts: tempUserObject1.profile.babyProfileOne.allergenPeanuts,
          allergenMilk: tempUserObject1.profile.babyProfileOne.allergenMilk,
          allergenTreeNuts: tempUserObject1.profile.babyProfileOne.allergenTreeNuts,
          allergenSoybeans: tempUserObject1.profile.babyProfileOne.allergenSoybeans,
          otherAllergen: tempUserObject1.profile.babyProfileOne.otherAllergen,
          eatingHabits: tempUserObject1.profile.babyProfileOne.eatingHabits,
          mealsPerDay: tempUserObject1.profile.babyProfileOne.mealsPerDay,
          ouncePerMeal: tempUserObject1.profile.babyProfileOne.ouncePerMeal
        },
        babyProfileTwo:{
          babyStatus: false,
        },
        babyProfileThree:{
          babyStatus: false,
        },
      },
    }});
  },
  preUserAddProfile1: function(preId, tempUserObject1){

    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressType: tempUserObject1.profile.addressType,
        babyProfileOne:{
          babyStatus: true,
          name: tempUserObject1.profile.babyProfileOne.name,
          gender: tempUserObject1.profile.babyProfileOne.gender,
          birthday: tempUserObject1.profile.babyProfileOne.birthday,
          allergenWheat: tempUserObject1.profile.babyProfileOne.allergenWheat,
          allergenShellfish: tempUserObject1.profile.babyProfileOne.allergenShellfish,
          allergenEggs: tempUserObject1.profile.babyProfileOne.allergenEggs,
          allergenFish: tempUserObject1.profile.babyProfileOne.allergenFish,
          allergenPeanuts: tempUserObject1.profile.babyProfileOne.allergenPeanuts,
          allergenMilk: tempUserObject1.profile.babyProfileOne.allergenMilk,
          allergenTreeNuts: tempUserObject1.profile.babyProfileOne.allergenTreeNuts,
          allergenSoybeans: tempUserObject1.profile.babyProfileOne.allergenSoybeans,
          otherAllergen: tempUserObject1.profile.babyProfileOne.otherAllergen,
          eatingHabits: tempUserObject1.profile.babyProfileOne.eatingHabits,
          mealsPerDay: tempUserObject1.profile.babyProfileOne.mealsPerDay,
          ouncePerMeal: tempUserObject1.profile.babyProfileOne.ouncePerMeal
        },
        babyProfileTwo:{
          babyStatus: false,
        },
        babyProfileThree:{
          babyStatus: false,
        },
      },
    }});
  },


});
