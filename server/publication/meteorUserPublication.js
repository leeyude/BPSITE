Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
});

Meteor.publish("allUserData", function () {
    return Meteor.users.find();
});

Meteor.publish("adminData", function () {
    return UserAdmins.find();
});
