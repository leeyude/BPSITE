if (Meteor.users.find({ email: "yl@babypurest.com" }).count() === 0) {
  Meteor.users.insert({

  });
}
