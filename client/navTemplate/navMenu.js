Session.setDefault("setSigninNav", true); // used to control for nav display of general use or sign-up use.

Template.navMenu.events({
  "click #signup": function(event, template){
    Session.set("setSigninNav", false);
  },
});

if (Meteor.isClient) {

  Router.route('/', function () {
    this.render('homepage');
  });

  Router.route('/howItWorks', {
    action: function(){
      this.render('howItWorks');
    },
    waitOn: function(){
      return [Meteor.subscribe('supplierImages'), Meteor.subscribe('supplierPublish')];
    },
  });

  Router.route('/weeklyMenu', function () {
    this.render('weeklyMenu');
  });

  Router.route('/pricing', function () {
    this.render('pricing');
  });

  Router.route('/signup', function () {
    this.render('signup');
  });

  Router.route('/signin', function () {
    this.render('signin');
  });

  Router.route('/zipNotCovered', function () {
    this.render('zipNotCovered');
  });

// sign-up routing
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
    waitOn: function(){
      var userEmail = Session.get("userEmail");
      return Meteor.subscribe('preUser', userEmail);
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
    waitOn: function(){
      var userEmail = Session.get("userEmail");
      return Meteor.subscribe('preUser', userEmail);
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
    waitOn: function(){
      var userEmail = Session.get("userEmail");
      return Meteor.subscribe('preUser', userEmail);
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
    waitOn: function(){
      var userEmail = Session.get("userEmail");
      return Meteor.subscribe('preUser', userEmail);
    },
  });

  Router.route('/delivery', {
    action: function(){

      this.render('delivery');
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
    waitOn: function(){
      var userEmail = Session.get("userEmail");
      return Meteor.subscribe('preUser', userEmail);
    },
  });

  Router.route('/subscription', {
    action: function(){

      this.render('subscription');
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
    waitOn: function(){
      var userEmail = Session.get("userEmail");
      return Meteor.subscribe('preUser', userEmail);
    },
  });

  Router.route('/thankyou', {
    action: function(){

      this.render('thankyou');
      $("html, body").animate({ scrollTop: 0 }, "slow");

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
    waitOn: function(){
      var userEmail = Session.get("userEmail");
      return Meteor.subscribe('preUser', userEmail);
    },
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

  Router.route('/workstation/recipe', {
    action: function(){

      this.render('recipe');
    },
    waitOn: function(){
      return [Meteor.subscribe('recipePublish'), Meteor.subscribe('recipeImages')];
    },
  });

  Router.route('/workstation/menuCalendar', {
    action: function(){

      this.render('menuCalendar');
    },
    waitOn: function(){
      return Meteor.subscribe('menuCalendarPublish');
    },
  });

  Router.route('/workstation/userManagement', function () {
    this.render('userManagement');
  });

  Router.route('/workstation/zipcodes', function () {
    this.render('zipcodes');
  });

  Router.route('/workstation/supplier', {
    action: function(){

      this.render('supplier');
    },
    waitOn: function(){
      return Meteor.subscribe('supplierImages');
    },
  });

// sign-in routing
  Router.route('/myAccount', {
    action: function(){

      this.render('myAccount');
    },
    waitOn: function(){
      return [Meteor.subscribe('userData')];
    },
  });

  Router.route('/deliverySchedule', {
    action: function(){

      this.render('deliverySchedule');
    },
    onBeforeAction: function(){
      var userToken= Session.get("preUserLoggedIn");
      // all properties available in the route function
      // are also available here such as this.params
      if (!userToken) {
        // if the user is not logged in, render the Login template
        Router.go('/signup');
      } else {
        // otherwise don't hold up the rest of hooks or our route/action function from running
        this.next();
      }
    },
    waitOn: function(){
      var userEmail = Session.get("userEmail");
      return Meteor.subscribe('preUser', userEmail);
    },
  });

  Router.route('/babyProfile', {
    action: function(){

      this.render('babyProfile');
    },
    waitOn: function(){
      return [Meteor.subscribe('userData')];
    },
  });

}

Template.navMenu.helpers({
  userName: function(){
    var userId= Meteor.userId();
    var userObject = Meteor.users.findOne({_id:userId});
    var userName = userObject.profile.userFirstName;
    Session.set("userFirstName", userName);
    return Session.get("userFirstName");
  },
  greeting: function(){
    var now = new Date();
    var hours = moment(now).hour();
    if(hours>18){
      var greeting = "Good evening";
    }else if(hours>12){
      var greeting = "Good afternoon";
    }else if(hours<3){
      var greeting = "Good evening";
    }else{
      var greeting = "Good morning";
    };
    Session.set("greeting", greeting);
    return Session.get("greeting");
  },
});

Template.navMenu.events({
  "click #signOut": function(event, template){
    console.log("click log out");
    Meteor.logout();
    Router.go('/');
    return false;
  },

  "click #myAccountBtn": function(event, template){
    Router.go('/myAccount');
    return false;
  },

});
