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

  Router.route('/profile', function () {
    this.render('profile');
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
