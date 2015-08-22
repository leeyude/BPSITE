Tracker.autorun(function () {
  Meteor.subscribe('zipsPublish',
  Session.get("CurrentServingSelector"),
  Session.get("zipSelector")
  );
});
