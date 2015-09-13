/* User account Schema

{
  _id: "bbca5d6a-2156-41c4-89da-0329e8c99a4f",  // Meteor.userId()
  activeStatus: false, // email exists but the user did not finish registration and subscription.

  email: aiolos.lee@gmail.com
  emailVerified: false;
  password: false;
  creditCard: {
    cardNumber: 1234-5678-9012-3456,
    expirationMonth: 11,
    expirationYear: 2018
    cvcNumber: 123
  };
  stripeID: "cus_6xxdILvOPNDuQe", // Stripe ID from customer creation

  createdAt: Wed Aug 21 2013 15:16:52 GMT-0700 (PDT),

  profile: {
    addressZIP: [text]
    addressType: [true] for Residential/ [false] for Business,
    deliveryDay: [text]
    userFirstName: [text]
    userLastName: [text]
    addressLine1: [text]
    addressLine2: [text]
    addressCity: [text]
    addressState: [text]
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

*/

Meteor.methods({
  emailExist:function(userEmail, userZip){
    var zipExistCheck = Zips.find({zipcode: userZip}).count()>0;
    var emailExistCheck = Meteor.users.find({"emails.address": userEmail}).count()>0;
    var zipServingCheck = Zips.findOne({zipcode: userZip}).currentServing==="Yes";

    if(zipExistCheck){
      // If ZIP code exists then proceed to check email.
      if(zipServingCheck){
        // if the ZIP exists and also being served by Baby Purest,
        // move to check email entry.
        if(emailExistCheck){
          console.log("email input "+ userEmail+ " already exists");
          // email exists, then move to check whether the email user completed registration process before by checking active status.
          var preUserActive = Meteor.users.findOne({"emails.address": userEmail}).activeStatus==true;

          console.log("active status is..."+preUserActive);
          if(preUserActive){
            // check whether user status is active.
            return "active";
            // return false to client that indicates the email input exists. This prompts the client to show "This Email has already been taken. Please revise email entry."
          }else{
            // the user submitted email before but did not complete process, or has terminated his account.
            var tempUserObject = Meteor.users.findOne({"emails.address":userEmail});
             Meteor.users.update({"emails.address":userEmail}, {$set:{
               profile: {
                 addressType: tempUserObject.profile.addressType,
                 deliveryDay: tempUserObject.profile.deliveryDay,
                 userFirstName: tempUserObject.profile.userFirstName,
                 userLastName: tempUserObject.profile.userLastName,
                 addressLine1: tempUserObject.profile.addressLine1,
                 addressLine2: tempUserObject.profile.addressLine2,
                 addressCity: tempUserObject.profile.addressCity,
                 addressState: tempUserObject.profile.addressState,
                 addressZIP: userZip,
                 userPhoneNumber: tempUserObject.userPhoneNumber,
                 babyProfileOne: tempUserObject.profile.babyProfileOne,
                 babyProfileTwo: tempUserObject.profile.babyProfileTwo,
                 babyProfileThree: tempUserObject.profile.babyProfileThree,
               },
             }});

             return "proceed";
          };
        }else{
        // email does not exist
        console.log("email input "+ userEmail+ " does not exist and is valid.");

        Accounts.createUser({
          email:    userEmail,
          createdAt: new Date(),
          profile: {
            addressZIP: userZip,
            deliveryDay: false,
            addressType: false,
            userFirstName: false,
            userLastName: false,
            addressLine1: false,
            addressLine2: false,
            addressCity: false,
            addressState: false,
            userPhoneNumber: false,

            babyProfileOne:{
              babyStatus: false,
            },
            babyProfileTwo:{
              babyStatus: false,
            },
            babyProfileThree:{
              babyStatus: false,
            },
          }
        });

        Meteor.users.update({"emails.address":userEmail}, {$set:{
          emailVerified: false,
          activeStatus: false,
        }});

        console.log("user created");
        //email entry is valid and the zipcode is currentServing, then direct the user to Profile buiding.
        return "proceed";
        };
      }else{
        //The ZIP code is valid but currently not served.
        //Direct the user to to "not-serving" page.
        console.log("zip code is 5 digit, but ZIP is not served.");
        return "notCovered";
      };
    }else{
      //if ZIP code does not exist, the error message asks Client to alert that ZIP entry is wrong.
      throw new Meteor.Error(500, 'ZIP Code does not exist');
    };

  },

  mealDataUpdate1: function(preId, mealFreq, mealOunces){ // before 1st baby status becomes true
    var tempUserObject = Meteor.users.findOne({_id:preId});
    console.log("meal data update 1");
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject.profile.addressZIP,
        addressType: tempUserObject.profile.addressType,
        deliveryDay: tempUserObject.profile.deliveryDay,
        userFirstName: tempUserObject.profile.userFirstName,
        userLastName: tempUserObject.profile.userLastName,
        addressLine1: tempUserObject.profile.addressLine1,
        addressLine2: tempUserObject.profile.addressLine2,
        addressCity: tempUserObject.profile.addressCity,
        addressState: tempUserObject.profile.addressState,
        userPhoneNumber: tempUserObject.profile.userPhoneNumber,

        babyProfileOne:{
          babyStatus: false,
          name: tempUserObject.profile.babyProfileOne.name,
          gender: tempUserObject.profile.babyProfileOne.gender,
          birthday: tempUserObject.profile.babyProfileOne.birthday,
          allergenWheat: tempUserObject.profile.babyProfileOne.allergenWheat,
          allergenShellfish: tempUserObject.profile.babyProfileOne.allergenShellfish,
          allergenEggs: tempUserObject.profile.babyProfileOne.allergenEggs,
          allergenFish: tempUserObject.profile.babyProfileOne.allergenFish,
          allergenPeanuts: tempUserObject.profile.babyProfileOne.allergenPeanuts,
          allergenMilk: tempUserObject.profile.babyProfileOne.allergenMilk,
          allergenTreeNuts: tempUserObject.profile.babyProfileOne.allergenTreeNuts,
          allergenSoybeans: tempUserObject.profile.babyProfileOne.allergenSoybeans,
          otherAllergen: tempUserObject.profile.babyProfileOne.otherAllergen,
          eatingHabits: tempUserObject.profile.babyProfileOne.eatingHabits,
          mealsPerDay: mealFreq,
          ouncePerMeal: mealOunces,
          singlePuree: tempUserObject.profile.babyProfileOne.singlePuree,
          yummyPairs: tempUserObject.profile.babyProfileOne.yummyPairs,
          tastyTrio: tempUserObject.profile.babyProfileOne.tastyTrio,
          boxSmall: tempUserObject.profile.babyProfileOne.boxSmall,
          boxMedium: tempUserObject.profile.babyProfileOne.boxMedium,
          boxLarge: tempUserObject.profile.babyProfileOne.boxLarge,
        },
        babyProfileTwo:tempUserObject.profile.babyProfileTwo,
        babyProfileThree:tempUserObject.profile.babyProfileThree,
      },
    }});
  },

  preUserContinue1: function(preId, tempUserObject1, mealOption){
    var tempUserObject0 = Meteor.users.findOne({_id:preId});

    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject0.profile.addressZIP,
        addressType: tempUserObject1.profile.addressType,
        deliveryDay: tempUserObject0.profile.deliveryDay,
        userFirstName: tempUserObject0.profile.userFirstName,
        userLastName: tempUserObject0.profile.userLastName,
        addressLine1: tempUserObject0.profile.addressLine1,
        addressLine2: tempUserObject0.profile.addressLine2,
        addressCity: tempUserObject0.profile.addressCity,
        addressState: tempUserObject0.profile.addressState,
        userPhoneNumber: tempUserObject0.profile.userPhoneNumber,

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
          ouncePerMeal: tempUserObject1.profile.babyProfileOne.ouncePerMeal,
          singlePuree: mealOption[0].singlePuree,
          yummyPairs: mealOption[0].yummyPairs,
          tastyTrio: mealOption[0].tastyTrio,
          boxSmall: mealOption[0].boxSmall,
          boxMedium: mealOption[0].boxMedium,
          boxLarge: mealOption[0].boxLarge,
        },
        babyProfileTwo:{
          babyStatus: false,
          name: false,
          gender: false,
          birthday: false,
          allergenWheat: false,
          allergenShellfish: false,
          allergenEggs: false,
          allergenFish: false,
          allergenPeanuts: false,
          allergenMilk: false,
          allergenTreeNuts: false,
          allergenSoybeans: false,
          otherAllergen: false,
          eatingHabits: false,
          mealsPerDay: false,
          ouncePerMeal: false,
          singlePuree: false,
          yummyPairs:false,
          tastyTrio:false,
          boxSmall:false,
          boxMedium:false,
          boxLarge:false,
        },
        babyProfileThree:{
          babyStatus: false,
          name: false,
          gender: false,
          birthday: false,
          allergenWheat: false,
          allergenShellfish: false,
          allergenEggs: false,
          allergenFish: false,
          allergenPeanuts: false,
          allergenMilk: false,
          allergenTreeNuts: false,
          allergenSoybeans: false,
          otherAllergen: false,
          eatingHabits: false,
          mealsPerDay: false,
          ouncePerMeal: false,
          singlePuree: false,
          yummyPairs:false,
          tastyTrio:false,
          boxSmall:false,
          boxMedium:false,
          boxLarge:false,
        },
      },
    }});
  },

  preUserContinue2: function(preId, tempUserObject2, mealOption){
    var tempUserObject1 = Meteor.users.findOne({_id:preId});
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject1.profile.addressZIP,
        addressType: tempUserObject2.profile.addressType,
        deliveryDay: tempUserObject1.profile.deliveryDay,
        userFirstName: tempUserObject1.profile.userFirstName,
        userLastName: tempUserObject1.profile.userLastName,
        addressLine1: tempUserObject1.profile.addressLine1,
        addressLine2: tempUserObject1.profile.addressLine2,
        addressCity: tempUserObject1.profile.addressCity,
        addressState: tempUserObject1.profile.addressState,
        userPhoneNumber: tempUserObject1.profile.userPhoneNumber,

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
          ouncePerMeal: tempUserObject1.profile.babyProfileOne.ouncePerMeal,
          singlePuree: mealOption[0].singlePuree,
          yummyPairs: mealOption[0].yummyPairs,
          tastyTrio: mealOption[0].tastyTrio,
          boxSmall: mealOption[0].boxSmall,
          boxMedium: mealOption[0].boxMedium,
          boxLarge: mealOption[0].boxLarge,
        },
        babyProfileTwo:{
          babyStatus: true,
          name: tempUserObject2.profile.babyProfileTwo.name,
          gender: tempUserObject2.profile.babyProfileTwo.gender,
          birthday: tempUserObject2.profile.babyProfileTwo.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileTwo.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileTwo.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileTwo.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileTwo.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileTwo.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileTwo.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileTwo.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileTwo.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileTwo.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileTwo.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileTwo.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileTwo.ouncePerMeal,
          singlePuree: mealOption[1].singlePuree,
          yummyPairs: mealOption[1].yummyPairs,
          tastyTrio: mealOption[1].tastyTrio,
          boxSmall: mealOption[1].boxSmall,
          boxMedium: mealOption[1].boxMedium,
          boxLarge: mealOption[1].boxLarge,
        },
        babyProfileThree:{
          babyStatus: false,
          name: false,
          gender: false,
          birthday: false,
          allergenWheat: false,
          allergenShellfish: false,
          allergenEggs: false,
          allergenFish: false,
          allergenPeanuts: false,
          allergenMilk: false,
          allergenTreeNuts: false,
          allergenSoybeans: false,
          otherAllergen: false,
          eatingHabits: false,
          mealsPerDay: false,
          ouncePerMeal: false,
          singlePuree: false,
          yummyPairs: false,
          tastyTrio: false,
          boxSmall:false,
          boxMedium:false,
          boxLarge:false,
        },
      },
    }});
  },

  preUserContinue3: function(preId, tempUserObject3, mealOption){
    var tempUserObject1 = Meteor.users.findOne({_id:preId});
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject1.profile.addressZIP,
        addressType: tempUserObject3.profile.addressType,
        deliveryDay: tempUserObject1.profile.deliveryDay,
        userFirstName: tempUserObject1.profile.userFirstName,
        userLastName: tempUserObject1.profile.userLastName,
        addressLine1: tempUserObject1.profile.addressLine1,
        addressLine2: tempUserObject1.profile.addressLine2,
        addressCity: tempUserObject1.profile.addressCity,
        addressState: tempUserObject1.profile.addressState,
        userPhoneNumber: tempUserObject1.profile.userPhoneNumber,

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
          ouncePerMeal: tempUserObject1.profile.babyProfileOne.ouncePerMeal,
          singlePuree: mealOption[0].singlePuree,
          yummyPairs: mealOption[0].yummyPairs,
          tastyTrio: mealOption[0].tastyTrio,
          boxSmall: mealOption[0].boxSmall,
          boxMedium: mealOption[0].boxMedium,
          boxLarge: mealOption[0].boxLarge,
        },
        babyProfileTwo:{
          babyStatus: true,
          name: tempUserObject1.profile.babyProfileTwo.name,
          gender: tempUserObject1.profile.babyProfileTwo.gender,
          birthday: tempUserObject1.profile.babyProfileTwo.birthday,
          allergenWheat: tempUserObject1.profile.babyProfileTwo.allergenWheat,
          allergenShellfish: tempUserObject1.profile.babyProfileTwo.allergenShellfish,
          allergenEggs: tempUserObject1.profile.babyProfileTwo.allergenEggs,
          allergenFish: tempUserObject1.profile.babyProfileTwo.allergenFish,
          allergenPeanuts: tempUserObject1.profile.babyProfileTwo.allergenPeanuts,
          allergenMilk: tempUserObject1.profile.babyProfileTwo.allergenMilk,
          allergenTreeNuts: tempUserObject1.profile.babyProfileTwo.allergenTreeNuts,
          allergenSoybeans: tempUserObject1.profile.babyProfileTwo.allergenSoybeans,
          otherAllergen: tempUserObject1.profile.babyProfileTwo.otherAllergen,
          eatingHabits: tempUserObject1.profile.babyProfileTwo.eatingHabits,
          mealsPerDay: tempUserObject1.profile.babyProfileTwo.mealsPerDay,
          ouncePerMeal: tempUserObject1.profile.babyProfileTwo.ouncePerMeal,
          singlePuree: mealOption[1].singlePuree,
          yummyPairs: mealOption[1].yummyPairs,
          tastyTrio: mealOption[1].tastyTrio,
          boxSmall: mealOption[1].boxSmall,
          boxMedium: mealOption[1].boxMedium,
          boxLarge: mealOption[1].boxLarge,
        },
        babyProfileThree:{
          babyStatus: true,
          name: tempUserObject3.profile.babyProfileThree.name,
          gender: tempUserObject3.profile.babyProfileThree.gender,
          birthday: tempUserObject3.profile.babyProfileThree.birthday,
          allergenWheat: tempUserObject3.profile.babyProfileThree.allergenWheat,
          allergenShellfish: tempUserObject3.profile.babyProfileThree.allergenShellfish,
          allergenEggs: tempUserObject3.profile.babyProfileThree.allergenEggs,
          allergenFish: tempUserObject3.profile.babyProfileThree.allergenFish,
          allergenPeanuts: tempUserObject3.profile.babyProfileThree.allergenPeanuts,
          allergenMilk: tempUserObject3.profile.babyProfileThree.allergenMilk,
          allergenTreeNuts: tempUserObject3.profile.babyProfileThree.allergenTreeNuts,
          allergenSoybeans: tempUserObject3.profile.babyProfileThree.allergenSoybeans,
          otherAllergen: tempUserObject3.profile.babyProfileThree.otherAllergen,
          eatingHabits: tempUserObject3.profile.babyProfileThree.eatingHabits,
          mealsPerDay: tempUserObject3.profile.babyProfileThree.mealsPerDay,
          ouncePerMeal: tempUserObject3.profile.babyProfileThree.ouncePerMeal,
          singlePuree: mealOption[2].singlePuree,
          yummyPairs: mealOption[2].yummyPairs,
          tastyTrio: mealOption[2].tastyTrio,
          boxSmall: mealOption[2].boxSmall,
          boxMedium: mealOption[2].boxMedium,
          boxLarge: mealOption[2].boxLarge,
        },
      },
    }});
  },


  completeUpdate1: function(preId, tempUserObject1, mealOption){
    var tempUserObject2 = Meteor.users.findOne({_id:preId});
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject2.profile.addressZIP,
        addressType: tempUserObject1.profile.addressType,
        deliveryDay: tempUserObject2.profile.deliveryDay,
        userFirstName: tempUserObject2.profile.userFirstName,
        userLastName: tempUserObject2.profile.userLastName,
        addressLine1: tempUserObject2.profile.addressLine1,
        addressLine2: tempUserObject2.profile.addressLine2,
        addressCity: tempUserObject2.profile.addressCity,
        addressState: tempUserObject2.profile.addressState,
        userPhoneNumber: tempUserObject2.profile.userPhoneNumber,

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
          ouncePerMeal: tempUserObject1.profile.babyProfileOne.ouncePerMeal,
          singlePuree: mealOption[0].singlePuree,
          yummyPairs: mealOption[0].yummyPairs,
          tastyTrio: mealOption[0].tastyTrio,
          boxSmall: mealOption[0].boxSmall,
          boxMedium: mealOption[0].boxMedium,
          boxLarge: mealOption[0].boxLarge,
        },
        babyProfileTwo:{
          babyStatus: tempUserObject2.profile.babyProfileTwo.babyStatus,
          name: tempUserObject2.profile.babyProfileTwo.name,
          gender: tempUserObject2.profile.babyProfileTwo.gender,
          birthday: tempUserObject2.profile.babyProfileTwo.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileTwo.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileTwo.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileTwo.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileTwo.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileTwo.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileTwo.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileTwo.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileTwo.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileTwo.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileTwo.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileTwo.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileTwo.ouncePerMeal,
          singlePuree: mealOption[1].singlePuree,
          yummyPairs: mealOption[1].yummyPairs,
          tastyTrio: mealOption[1].tastyTrio,
          boxSmall: mealOption[2].boxSmall,
          boxMedium: mealOption[2].boxMedium,
          boxLarge: mealOption[2].boxLarge,
        },
        babyProfileThree:{
          babyStatus: tempUserObject2.profile.babyProfileThree.babyStatus,
          name: tempUserObject2.profile.babyProfileThree.name,
          gender: tempUserObject2.profile.babyProfileThree.gender,
          birthday: tempUserObject2.profile.babyProfileThree.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileThree.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileThree.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileThree.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileThree.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileThree.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileThree.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileThree.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileThree.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileThree.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileThree.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileThree.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileThree.ouncePerMeal,
          singlePuree: mealOption[2].singlePuree,
          yummyPairs: mealOption[2].yummyPairs,
          tastyTrio: mealOption[2].tastyTrio,
          boxSmall: mealOption[2].boxSmall,
          boxMedium: mealOption[2].boxMedium,
          boxLarge: mealOption[2].boxLarge,
        },
      },
    }});
  },

  completeUpdate2: function(preId, tempUserObject2, mealOption){
    var tempUserObject3 = Meteor.users.findOne({_id:preId});
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject3.profile.addressZIP,
        addressType: tempUserObject2.profile.addressType,
        deliveryDay: tempUserObject3.profile.deliveryDay,
        userFirstName: tempUserObject3.profile.userFirstName,
        userLastName: tempUserObject3.profile.userLastName,
        addressLine1: tempUserObject3.profile.addressLine1,
        addressLine2: tempUserObject3.profile.addressLine2,
        addressCity: tempUserObject3.profile.addressCity,
        addressState: tempUserObject3.profile.addressState,
        userPhoneNumber: tempUserObject3.profile.userPhoneNumber,

        babyProfileOne:{
          babyStatus: true,
          name: tempUserObject3.profile.babyProfileOne.name,
          gender: tempUserObject3.profile.babyProfileOne.gender,
          birthday: tempUserObject3.profile.babyProfileOne.birthday,
          allergenWheat: tempUserObject3.profile.babyProfileOne.allergenWheat,
          allergenShellfish: tempUserObject3.profile.babyProfileOne.allergenShellfish,
          allergenEggs: tempUserObject3.profile.babyProfileOne.allergenEggs,
          allergenFish: tempUserObject3.profile.babyProfileOne.allergenFish,
          allergenPeanuts: tempUserObject3.profile.babyProfileOne.allergenPeanuts,
          allergenMilk: tempUserObject3.profile.babyProfileOne.allergenMilk,
          allergenTreeNuts: tempUserObject3.profile.babyProfileOne.allergenTreeNuts,
          allergenSoybeans: tempUserObject3.profile.babyProfileOne.allergenSoybeans,
          otherAllergen: tempUserObject3.profile.babyProfileOne.otherAllergen,
          eatingHabits: tempUserObject3.profile.babyProfileOne.eatingHabits,
          mealsPerDay: tempUserObject3.profile.babyProfileOne.mealsPerDay,
          ouncePerMeal: tempUserObject3.profile.babyProfileOne.ouncePerMeal,
          singlePuree: mealOption[0].singlePuree,
          yummyPairs: mealOption[0].yummyPairs,
          tastyTrio: mealOption[0].tastyTrio,
          boxSmall: mealOption[0].boxSmall,
          boxMedium: mealOption[0].boxMedium,
          boxLarge: mealOption[0].boxLarge,
        },
        babyProfileTwo:{
          babyStatus: tempUserObject2.profile.babyProfileTwo.babyStatus,
          name: tempUserObject2.profile.babyProfileTwo.name,
          gender: tempUserObject2.profile.babyProfileTwo.gender,
          birthday: tempUserObject2.profile.babyProfileTwo.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileTwo.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileTwo.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileTwo.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileTwo.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileTwo.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileTwo.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileTwo.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileTwo.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileTwo.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileTwo.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileTwo.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileTwo.ouncePerMeal,
          singlePuree: mealOption[1].singlePuree,
          yummyPairs: mealOption[1].yummyPairs,
          tastyTrio: mealOption[1].tastyTrio,
          boxSmall: mealOption[1].boxSmall,
          boxMedium: mealOption[1].boxMedium,
          boxLarge: mealOption[1].boxLarge,
        },
        babyProfileThree:{
          babyStatus: tempUserObject3.profile.babyProfileThree.babyStatus,
          name: tempUserObject3.profile.babyProfileThree.name,
          gender: tempUserObject3.profile.babyProfileThree.gender,
          birthday: tempUserObject3.profile.babyProfileThree.birthday,
          allergenWheat: tempUserObject3.profile.babyProfileThree.allergenWheat,
          allergenShellfish: tempUserObject3.profile.babyProfileThree.allergenShellfish,
          allergenEggs: tempUserObject3.profile.babyProfileThree.allergenEggs,
          allergenFish: tempUserObject3.profile.babyProfileThree.allergenFish,
          allergenPeanuts: tempUserObject3.profile.babyProfileThree.allergenPeanuts,
          allergenMilk: tempUserObject3.profile.babyProfileThree.allergenMilk,
          allergenTreeNuts: tempUserObject3.profile.babyProfileThree.allergenTreeNuts,
          allergenSoybeans: tempUserObject3.profile.babyProfileThree.allergenSoybeans,
          otherAllergen: tempUserObject3.profile.babyProfileThree.otherAllergen,
          eatingHabits: tempUserObject3.profile.babyProfileThree.eatingHabits,
          mealsPerDay: tempUserObject3.profile.babyProfileThree.mealsPerDay,
          ouncePerMeal: tempUserObject3.profile.babyProfileThree.ouncePerMeal,
          singlePuree: mealOption[2].singlePuree,
          yummyPairs: mealOption[2].yummyPairs,
          tastyTrio: mealOption[2].tastyTrio,
          boxSmall: mealOption[2].boxSmall,
          boxMedium: mealOption[2].boxMedium,
          boxLarge: mealOption[2].boxLarge,
        },
      },
    }});
  },

  completeUpdate3: function(preId, tempUserObject2, mealOption){
    var tempUserObject1 = Meteor.users.findOne({_id:preId});
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject1.profile.addressZIP,
        addressType: tempUserObject2.profile.addressType,
        deliveryDay: tempUserObject1.profile.deliveryDay,
        userFirstName: tempUserObject1.profile.userFirstName,
        userLastName: tempUserObject1.profile.userLastName,
        addressLine1: tempUserObject1.profile.addressLine1,
        addressLine2: tempUserObject1.profile.addressLine2,
        addressCity: tempUserObject1.profile.addressCity,
        addressState: tempUserObject1.profile.addressState,
        userPhoneNumber: tempUserObject1.profile.userPhoneNumber,

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
          ouncePerMeal: tempUserObject1.profile.babyProfileOne.ouncePerMeal,
          singlePuree: mealOption[0].singlePuree,
          yummyPairs: mealOption[0].yummyPairs,
          tastyTrio: mealOption[0].tastyTrio,
          boxSmall: mealOption[0].boxSmall,
          boxMedium: mealOption[0].boxMedium,
          boxLarge: mealOption[0].boxLarge,
        },
        babyProfileTwo:{
          babyStatus: true,
          name: tempUserObject1.profile.babyProfileTwo.name,
          gender: tempUserObject1.profile.babyProfileTwo.gender,
          birthday: tempUserObject1.profile.babyProfileTwo.birthday,
          allergenWheat: tempUserObject1.profile.babyProfileTwo.allergenWheat,
          allergenShellfish: tempUserObject1.profile.babyProfileTwo.allergenShellfish,
          allergenEggs: tempUserObject1.profile.babyProfileTwo.allergenEggs,
          allergenFish: tempUserObject1.profile.babyProfileTwo.allergenFish,
          allergenPeanuts: tempUserObject1.profile.babyProfileTwo.allergenPeanuts,
          allergenMilk: tempUserObject1.profile.babyProfileTwo.allergenMilk,
          allergenTreeNuts: tempUserObject1.profile.babyProfileTwo.allergenTreeNuts,
          allergenSoybeans: tempUserObject1.profile.babyProfileTwo.allergenSoybeans,
          otherAllergen: tempUserObject1.profile.babyProfileTwo.otherAllergen,
          eatingHabits: tempUserObject1.profile.babyProfileTwo.eatingHabits,
          mealsPerDay: tempUserObject1.profile.babyProfileTwo.mealsPerDay,
          ouncePerMeal: tempUserObject1.profile.babyProfileTwo.ouncePerMeal,
          singlePuree: mealOption[1].singlePuree,
          yummyPairs: mealOption[1].yummyPairs,
          tastyTrio: mealOption[1].tastyTrio,
          boxSmall: mealOption[1].boxSmall,
          boxMedium: mealOption[1].boxMedium,
          boxLarge: mealOption[1].boxLarge,
        },
        babyProfileThree:{
          babyStatus: true,
          name: tempUserObject2.profile.babyProfileThree.name,
          gender: tempUserObject2.profile.babyProfileThree.gender,
          birthday: tempUserObject2.profile.babyProfileThree.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileThree.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileThree.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileThree.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileThree.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileThree.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileThree.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileThree.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileThree.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileThree.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileThree.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileThree.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileThree.ouncePerMeal,
          singlePuree: mealOption[2].singlePuree,
          yummyPairs: mealOption[2].yummyPairs,
          tastyTrio: mealOption[2].tastyTrio,
          boxSmall: mealOption[2].boxSmall,
          boxMedium: mealOption[2].boxMedium,
          boxLarge: mealOption[2].boxLarge,
        },
      },
    }});
  },

  cancel2: function(preId, mealOption){
    var tempUserObject2 = Meteor.users.findOne({_id:preId});
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject2.profile.addressZIP,
        addressType: tempUserObject2.profile.addressType,
        deliveryDay: tempUserObject2.profile.deliveryDay,
        userFirstName: tempUserObject2.profile.userFirstName,
        userLastName: tempUserObject2.profile.userLastName,
        addressLine1: tempUserObject2.profile.addressLine1,
        addressLine2: tempUserObject2.profile.addressLine2,
        addressCity: tempUserObject2.profile.addressCity,
        addressState: tempUserObject2.profile.addressState,
        userPhoneNumber: tempUserObject2.profile.userPhoneNumber,

        babyProfileOne:{
          babyStatus: true,
          name: tempUserObject2.profile.babyProfileOne.name,
          gender: tempUserObject2.profile.babyProfileOne.gender,
          birthday: tempUserObject2.profile.babyProfileOne.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileOne.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileOne.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileOne.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileOne.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileOne.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileOne.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileOne.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileOne.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileOne.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileOne.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileOne.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileOne.ouncePerMeal,
          singlePuree: mealOption[0].singlePuree,
          yummyPairs: mealOption[0].yummyPairs,
          tastyTrio: mealOption[0].tastyTrio,
          boxSmall: mealOption[0].boxSmall,
          boxMedium: mealOption[0].boxMedium,
          boxLarge: mealOption[0].boxLarge,
        },
        babyProfileTwo:{
          babyStatus: false, // the only change of the user object is here- change to false of the second baby.
          name: tempUserObject2.profile.babyProfileTwo.name,
          gender: tempUserObject2.profile.babyProfileTwo.gender,
          birthday: tempUserObject2.profile.babyProfileTwo.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileTwo.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileTwo.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileTwo.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileTwo.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileTwo.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileTwo.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileTwo.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileTwo.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileTwo.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileTwo.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileTwo.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileTwo.ouncePerMeal,
          singlePuree: mealOption[1].singlePuree,
          yummyPairs: mealOption[1].yummyPairs,
          tastyTrio: mealOption[1].tastyTrio,
          boxSmall: mealOption[1].boxSmall,
          boxMedium: mealOption[1].boxMedium,
          boxLarge: mealOption[1].boxLarge,
        },
        babyProfileThree:{
          babyStatus: false,
          name: tempUserObject2.profile.babyProfileThree.name,
          gender: tempUserObject2.profile.babyProfileThree.gender,
          birthday: tempUserObject2.profile.babyProfileThree.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileThree.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileThree.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileThree.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileThree.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileThree.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileThree.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileThree.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileThree.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileThree.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileThree.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileThree.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileThree.ouncePerMeal,
          singlePuree: mealOption[2].singlePuree,
          yummyPairs: mealOption[2].yummyPairs,
          tastyTrio: mealOption[2].tastyTrio,
          boxSmall: mealOption[2].boxSmall,
          boxMedium: mealOption[2].boxMedium,
          boxLarge: mealOption[2].boxLarge,
        },
      },
    }});

  },

  cancel3: function(preId, mealOption){
    var tempUserObject2 = Meteor.users.findOne({_id:preId});
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject2.profile.addressZIP,
        addressType: tempUserObject2.profile.addressType,
        deliveryDay: tempUserObject2.profile.deliveryDay,
        userFirstName: tempUserObject2.profile.userFirstName,
        userLastName: tempUserObject2.profile.userLastName,
        addressLine1: tempUserObject2.profile.addressLine1,
        addressLine2: tempUserObject2.profile.addressLine2,
        addressCity: tempUserObject2.profile.addressCity,
        addressState: tempUserObject2.profile.addressState,
        userPhoneNumber: tempUserObject2.profile.userPhoneNumber,

        babyProfileOne:{
          babyStatus: true,
          name: tempUserObject2.profile.babyProfileOne.name,
          gender: tempUserObject2.profile.babyProfileOne.gender,
          birthday: tempUserObject2.profile.babyProfileOne.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileOne.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileOne.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileOne.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileOne.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileOne.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileOne.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileOne.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileOne.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileOne.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileOne.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileOne.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileOne.ouncePerMeal,
          singlePuree: mealOption[0].singlePuree,
          yummyPairs: mealOption[0].yummyPairs,
          tastyTrio: mealOption[0].tastyTrio,
          boxSmall: mealOption[0].boxSmall,
          boxMedium: mealOption[0].boxMedium,
          boxLarge: mealOption[0].boxLarge,
        },
        babyProfileTwo:{
          babyStatus: true,
          name: tempUserObject2.profile.babyProfileTwo.name,
          gender: tempUserObject2.profile.babyProfileTwo.gender,
          birthday: tempUserObject2.profile.babyProfileTwo.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileTwo.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileTwo.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileTwo.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileTwo.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileTwo.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileTwo.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileTwo.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileTwo.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileTwo.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileTwo.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileTwo.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileTwo.ouncePerMeal,
          singlePuree: mealOption[1].singlePuree,
          yummyPairs: mealOption[1].yummyPairs,
          tastyTrio: mealOption[1].tastyTrio,
          boxSmall: mealOption[1].boxSmall,
          boxMedium: mealOption[1].boxMedium,
          boxLarge: mealOption[1].boxLarge,
        },
        babyProfileThree:{
          babyStatus: false, // the only change of the user object is here- change to false of the second baby.
          name: tempUserObject2.profile.babyProfileThree.name,
          gender: tempUserObject2.profile.babyProfileThree.gender,
          birthday: tempUserObject2.profile.babyProfileThree.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileThree.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileThree.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileThree.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileThree.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileThree.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileThree.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileThree.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileThree.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileThree.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileThree.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileThree.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileThree.ouncePerMeal,
          singlePuree: mealOption[2].singlePuree,
          yummyPairs: mealOption[2].yummyPairs,
          tastyTrio: mealOption[2].tastyTrio,
          boxSmall: mealOption[2].boxSmall,
          boxMedium: mealOption[2].boxMedium,
          boxLarge: mealOption[2].boxLarge,
        },
      },
    }});

  },
  mealPlanContinue: function(preId, mealOption){
    var tempUserObject2 = Meteor.users.findOne({_id:preId});
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressZIP: tempUserObject2.profile.addressZIP,
        addressType: tempUserObject2.profile.addressType,
        deliveryDay: tempUserObject2.profile.deliveryDay,
        userFirstName: tempUserObject2.profile.userFirstName,
        userLastName: tempUserObject2.profile.userLastName,
        addressLine1: tempUserObject2.profile.addressLine1,
        addressLine2: tempUserObject2.profile.addressLine2,
        addressCity: tempUserObject2.profile.addressCity,
        addressState: tempUserObject2.profile.addressState,
        userPhoneNumber: tempUserObject2.profile.userPhoneNumber,

        babyProfileOne:{
          babyStatus: true,
          name: tempUserObject2.profile.babyProfileOne.name,
          gender: tempUserObject2.profile.babyProfileOne.gender,
          birthday: tempUserObject2.profile.babyProfileOne.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileOne.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileOne.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileOne.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileOne.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileOne.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileOne.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileOne.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileOne.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileOne.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileOne.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileOne.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileOne.ouncePerMeal,
          singlePuree: mealOption[0].singlePuree,
          yummyPairs: mealOption[0].yummyPairs,
          tastyTrio: mealOption[0].tastyTrio,
          boxSmall: mealOption[0].boxSmall,
          boxMedium: mealOption[0].boxMedium,
          boxLarge: mealOption[0].boxLarge,
        },
        babyProfileTwo:{
          babyStatus: tempUserObject2.profile.babyProfileTwo.babyStatus,
          name: tempUserObject2.profile.babyProfileTwo.name,
          gender: tempUserObject2.profile.babyProfileTwo.gender,
          birthday: tempUserObject2.profile.babyProfileTwo.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileTwo.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileTwo.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileTwo.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileTwo.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileTwo.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileTwo.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileTwo.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileTwo.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileTwo.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileTwo.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileTwo.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileTwo.ouncePerMeal,
          singlePuree: mealOption[1].singlePuree,
          yummyPairs: mealOption[1].yummyPairs,
          tastyTrio: mealOption[1].tastyTrio,
          boxSmall: mealOption[1].boxSmall,
          boxMedium: mealOption[1].boxMedium,
          boxLarge: mealOption[1].boxLarge,
        },
        babyProfileThree:{
          babyStatus: tempUserObject2.profile.babyProfileThree.babyStatus,
          name: tempUserObject2.profile.babyProfileThree.name,
          gender: tempUserObject2.profile.babyProfileThree.gender,
          birthday: tempUserObject2.profile.babyProfileThree.birthday,
          allergenWheat: tempUserObject2.profile.babyProfileThree.allergenWheat,
          allergenShellfish: tempUserObject2.profile.babyProfileThree.allergenShellfish,
          allergenEggs: tempUserObject2.profile.babyProfileThree.allergenEggs,
          allergenFish: tempUserObject2.profile.babyProfileThree.allergenFish,
          allergenPeanuts: tempUserObject2.profile.babyProfileThree.allergenPeanuts,
          allergenMilk: tempUserObject2.profile.babyProfileThree.allergenMilk,
          allergenTreeNuts: tempUserObject2.profile.babyProfileThree.allergenTreeNuts,
          allergenSoybeans: tempUserObject2.profile.babyProfileThree.allergenSoybeans,
          otherAllergen: tempUserObject2.profile.babyProfileThree.otherAllergen,
          eatingHabits: tempUserObject2.profile.babyProfileThree.eatingHabits,
          mealsPerDay: tempUserObject2.profile.babyProfileThree.mealsPerDay,
          ouncePerMeal: tempUserObject2.profile.babyProfileThree.ouncePerMeal,
          singlePuree: mealOption[2].singlePuree,
          yummyPairs: mealOption[2].yummyPairs,
          tastyTrio: mealOption[2].tastyTrio,
          boxSmall: mealOption[2].boxSmall,
          boxMedium: mealOption[2].boxMedium,
          boxLarge: mealOption[2].boxLarge,
        },
      },
    }});
  },

  deliveryContinue: function(preId, deliveryInfo){
    var tempUserObject = Meteor.users.findOne({_id:preId});
    Meteor.users.update({_id:preId}, {$set:{
      profile: {
        addressType: tempUserObject.profile.addressType,
        deliveryDay: deliveryInfo.deliveryDay,
        userFirstName: deliveryInfo.userFirstName,
        userLastName: deliveryInfo.userLastName,
        addressLine1: deliveryInfo.addressLine1,
        addressLine2: deliveryInfo.addressLine2,
        addressCity: deliveryInfo.addressCity,
        addressState: deliveryInfo.addressState,
        addressZIP: tempUserObject.profile.addressZIP,
        userPhoneNumber: deliveryInfo.userPhoneNumber,
        babyProfileOne: tempUserObject.profile.babyProfileOne,
        babyProfileTwo: tempUserObject.profile.babyProfileTwo,
        babyProfileThree: tempUserObject.profile.babyProfileThree,
      },
    }});
// collect information from collection and delivery form


// if this action is for new data insert, the skip data wipe-out step; otherwise, this section clear data so that all updates can be loaded in the collection.

    var planSelection = [tempUserObject.profile.babyProfileOne.boxSmall, tempUserObject.profile.babyProfileOne.boxMedium,tempUserObject.profile.babyProfileOne.boxLarge];
    for(i=0;i<3;i++){
      if(planSelection[i]){
        var planValue=i;
      };
    };
    var mealPlanDetails = getMealPlanDetails(planValue);

    var tempDeliveryContent = [{
          mealPlan: mealPlanDetails.mealPlan,
          price: mealPlanDetails.price,
          itemVolume: mealPlanDetails.itemVolume,
          babyProfile: tempUserObject.profile.babyProfileOne,
        },,];

    if(tempUserObject.profile.babyProfileTwo.babyStatus){
      var planSelection = [tempUserObject.profile.babyProfileTwo.boxSmall, tempUserObject.profile.babyProfileTwo.boxMedium,tempUserObject.profile.babyProfileTwo.boxLarge];
      for(i=0;i<3;i++){
        if(planSelection[i]){
          var planValue=i;
        };
      };
      var mealPlanDetails = getMealPlanDetails(planValue);

      tempDeliveryContent[1] = {
            mealPlan: mealPlanDetails.mealPlan,
            price: mealPlanDetails.price,
            itemVolume: mealPlanDetails.itemVolume,
            babyProfile: tempUserObject.profile.babyProfileTwo,
      };
    };

    if(tempUserObject.profile.babyProfileThree.babyStatus){
      var planSelection = [tempUserObject.profile.babyProfileThree.boxSmall, tempUserObject.profile.babyProfileThree.boxMedium,tempUserObject.profile.babyProfileThree.boxLarge];
      for(i=0;i<3;i++){
        if(planSelection[i]){
          var planValue=i;
        };
      };
      var mealPlanDetails = getMealPlanDetails(planValue);

      tempDeliveryContent[2] = {
            mealPlan: mealPlanDetails.mealPlan,
            price: mealPlanDetails.price,
            itemVolume: mealPlanDetails.itemVolume,
            babyProfile: tempUserObject.profile.babyProfileThree,
      };
    };

    var subtotal = getSubtotal(tempUserObject);

    Meteor.users.update({_id:preId}, {$set:{
      deliveryLog: [
        { status: deliveryInfo.deliveryStatus,  // 0- not yet fulfilled, can be changed or canceled; 1- not yet fulfilled, to be fulfilled in the current week; 2- delivered, within two weeks after delivery, 3- delivered, out of two weeks of delivery
          fulfilmentDate: deliveryInfo.firstDelivery,//give a time of this shipment....
          deliveryAddress1: deliveryInfo.addressLine1,
          deliveryAddress2: deliveryInfo.addressLine2,

          content: [
            tempDeliveryContent[0],tempDeliveryContent[1],tempDeliveryContent[2]
          ],
          subtotal: subtotal,
        },
      ],
    }});

  },

  checkZipServing: function(zipInput){
    var zipObject = Zips.findOne({zipcode: zipInput});
    var zipServingCheck = zipObject.currentServing==="Yes";

    if(zipServingCheck){
      return zipObject;
    }else{
      return "not";
    };
  },


});
