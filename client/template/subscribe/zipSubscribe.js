Tracker.autorun(function () {
  Meteor.subscribe('zipsPublish',
  Session.get("CurrentServingSelector"),
  Session.get("zipSelector")
  );
  console.log("subscription is set to" + Session.get("CurrentServingSelector"));
});
