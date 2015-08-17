Meteor.publish('zipsPublish', function(){
    return Zips.find();
});
