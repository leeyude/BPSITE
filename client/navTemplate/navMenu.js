Session.setDefault("setSigninNav", true);

Template.navMenu.events({
  "click #signup": function(event, template){
    Session.set("setSigninNav", false);
  },
});

if (Meteor.isClient) {

  Router.route('/', function () {
    this.render('homepage');
  });

  Router.route('/howItWorks', function () {
    this.render('howItWorks');
  });

  Router.route('/weeklyMenu', function () {
    this.render('weeklyMenu');
  });

  Router.route('/pricing', function () {
    this.render('pricing');
  });

  Router.route('/login', function () {
    this.render('login');
  });

  Router.route('/signup', function () {
    this.render('signup');
  });

  Router.route('/zipNotCovered', function () {
    this.render('zipNotCovered');
  });

  Router.route('/profile', {
    action: function(){
      this.render('profile');
    },
    onBeforeAction: function(){
      var preUserToken= Session.get("preUserLoggedIn");
      // all properties available in the route function
      // are also available here such as this.params
      if (!preUserToken) {
        // if the user is not logged in, render the Login template
        Router.go('/signup');
      } else {
        // otherwise don't hold up the rest of hooks or our route/action function from running
        this.next();
      }
    },
  });

  Router.route('/profile2', {
    action: function(){
      this.render('profile2');
    },
    onBeforeAction: function(){
      var preUserToken= Session.get("preUserLoggedInToProfile2");
      // all properties available in the route function
      // are also available here such as this.params
      if (!preUserToken) {
        // if the user is not logged in, render the Login template
        Router.go('/signup');
      } else {
        // otherwise don't hold up the rest of hooks or our route/action function from running
        this.next();
      }
    },
  });

  Router.route('/profile3', {
    action: function(){
      this.render('profile3');
    },
    onBeforeAction: function(){
      var preUserToken= Session.get("preUserLoggedInToProfile3");
      // all properties available in the route function
      // are also available here such as this.params
      if (!preUserToken) {
        // if the user is not logged in, render the Login template
        Router.go('/signup');
      } else {
        // otherwise don't hold up the rest of hooks or our route/action function from running
        this.next();
      }
    },
  });

  Router.route('/mealPlan', {
    action: function(){
      this.render('mealPlan');
    },
    onBeforeAction: function(){
      var preUserToken= Session.get("preUserforMealPlan");

      // all properties available in the route function
      // are also available here such as this.params
      if (!preUserToken) {
        // if the user is not logged in, render the Login template
        Router.go('/signup');
      } else {
        // otherwise don't hold up the rest of hooks or our route/action function from running
        this.next();
      }
    },
  });

  Router.route('/delivery', function () {
    this.render('delivery');
  });

  Router.route('/about', function () {
    this.render('about');
  });

  Router.route('/workstation/themagicofbabypurest', function () {
    this.render('themagicofbabypurest');
  });

  Router.route('/workstation/ingredients', function () {
    this.render('ingredients');
  });

  Router.route('/workstation/recipe', function () {
    this.render('recipe');
  });

  Router.route('/workstation/menuCalendar', function () {
    this.render('menuCalendar');
  });

  Router.route('/workstation/userManagement', function () {
    this.render('userManagement');
  });

  Router.route('/workstation/zipcodes', function () {
    this.render('zipcodes');
  });

}
