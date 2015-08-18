Tracker.autorun(function () {
  Meteor.subscribe('zipsPublish', Session.get("CurrentServingSelector"));
  console.log("subscription is set to" + Session.get("CurrentServingSelector"));
});
