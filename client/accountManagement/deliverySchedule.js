// setting up views for delivery schedule
Template.deliverySchedule.helpers({
  thisMonth: function(){
    var userId= Meteor.userId();

    var today = new Date;
// setting displayed months
    var todayMonth = moment(today).month();
    var todayYear = moment(today).year();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    Session.set("thisMonth", months[todayMonth]);
    Session.set("thisMonthYear", todayYear);
    if(todayMonth<11){
      Session.set("nextMonth", months[todayMonth+1]);
      Session.set("nextMonthYear", todayYear);
    }else{
      Session.set("nextMonth", months[0]);
      Session.set("nextMonthYear", todayYear+1);
    };

// start to get delivery log items so we can feed dates to calendar
    var userDeliveryLog = Meteor.users.findOne({_id:userId}).deliveryLog;
    var logLength = userDeliveryLog.length; // set total calc for for loop
    var fulfilmentDateLogs = [];
    var deliveryDatesThisMonth = [];
    var deliveryStatusThisMonth = [];
    var deliveryDatesNextMonth = [];
    var deliveryStatusNextMonth = [];

    for(i=0;i<logLength;i++){
      var deliveryDate = moment(userDeliveryLog[i].fulfilmentDate, "ddd, MMM Do");
      var deliveryStatus = userDeliveryLog[i].status;
      if(moment(deliveryDate).month()==todayMonth){
        deliveryDatesThisMonth.push(moment(deliveryDate).date());
        deliveryStatusThisMonth.push(deliveryStatus);
      }else if(moment(deliveryDate).month()==(todayMonth+1)){
        deliveryDatesNextMonth.push(moment(deliveryDate).date());
        deliveryStatusNextMonth.push(deliveryStatus);
      };
    };

// setting default week for right panel information view
    if(Session.get("weekSelection")){
    }else{
      if(deliveryDatesThisMonth.length>0){
        if(deliveryStatusThisMonth[0]==99){
          var defaultDisplayWeek = [
            months[todayMonth],
            deliveryDatesThisMonth[0],
            todayYear,
            "skipped"
          ];
        }else{
          var defaultDisplayWeek = [
            months[todayMonth],
            deliveryDatesThisMonth[0],
            todayYear,
            "scheduled"
          ];
        };

      }else{
        if(todayMonth<11){
          if(deliveryStatusNextMonth[0]==99){
            var defaultDisplayWeek = [
              months[todayMonth+1],
              deliveryDatesNextMonth[0],
              todayYear,
              "skipped"
            ];
          }else{
            var defaultDisplayWeek = [
              months[todayMonth+1],
              deliveryDatesNextMonth[0],
              todayYear,
              "scheduled"
            ];
          };
        }else{
          if(deliveryStatusNextMonth[0]==99){
            var defaultDisplayWeek = [
              months[0],
              deliveryDatesNextMonth[0],
              todayYear+1,
              "skipped"
            ];
          }else{
            var defaultDisplayWeek = [
              months[0],
              deliveryDatesNextMonth[0],
              todayYear+1,
              "scheduled"
            ];
          };
        };
      };

      Session.set("weekSelection", defaultDisplayWeek);
    };

// setting
    var todayWeekday = moment(today).day();
    var todayYear = moment(today).year();
    var firstMonthWeekSwitch = [false,false,false,false,false]; // to control for whether a week should be shown.
    var secondMonthWeekSwitch = [false,false,false,false,false]; // to control for whether a week should be shown.

    var firstMonthValueArray = []; // to contain date number of the month
    var secondMonthValueArray = []; // to contain date number of the month
    var firstMonthClassValueArray = []; // to assign class value to the tds.
    var secondMonthClassValueArray = []; // to assign class value to the tds.
    for(i=0;i<42;i++){
      firstMonthClassValueArray[i]='invisible';
      secondMonthClassValueArray[i]='invisible';
    }; // set default value for all date cells to be invisible.

    var todayDateInMonth = moment(today).date(); // get today's date in the month
    for(i=0; i<todayWeekday;i++){
      firstMonthValueArray[i]= false;
    }; // disable any date before today.

    var calendarDateWithValue = todayWeekday; // start to set dates from today
    for(i=todayDateInMonth; i<(daysInMonth[todayMonth]+1);i++){
      firstMonthValueArray[calendarDateWithValue]= i; // setting displayed dates
      // and to set class of these displayed dates
      for(j=0; j<deliveryDatesThisMonth.length; j++){

        if(i==deliveryDatesThisMonth[j]){

          if(deliveryStatusThisMonth[j]==99){
            firstMonthClassValueArray[calendarDateWithValue]='skipped';

          }else{
            firstMonthClassValueArray[calendarDateWithValue]='scheduled';
          };
          break;
        }else{
          firstMonthClassValueArray[calendarDateWithValue]='';
        };
      };
      calendarDateWithValue++;
    };
    firstMonthClassValueArray[todayWeekday]='todayIcon';

     // the array includes all dates remaining for display in the current month.

    Session.set("firstMonthValueArray", firstMonthValueArray);

    var checkWeeksInFirstMonth = Math.ceil((firstMonthValueArray.length/7));
    for(i=0;i<5; i++){
      if(i<(checkWeeksInFirstMonth-1)){
        firstMonthWeekSwitch[i]=true;
      };
    };
    Session.set("firstMonthWeekSwitch", firstMonthWeekSwitch);



    var startDateInNextMonth = 1;
    var nextMonth = todayMonth+1;
    var nextMonthStartDay = moment().set({'year': todayYear, 'month': todayMonth+1, 'date': 1});
    var nextMonthStartWeekday = nextMonthStartDay.day();
    var calendarDateWithValue = nextMonthStartWeekday; // start to set dates from today
    for(i=0; i<nextMonthStartWeekday;i++){
      secondMonthValueArray[i]= false;
    }; // disable any date before today.
    for(i=1; i<(daysInMonth[nextMonth]+1);i++){
      secondMonthValueArray[calendarDateWithValue]= i;

      for(j=0; j<deliveryDatesNextMonth.length; j++){

        if(i==deliveryDatesNextMonth[j]){

          if(deliveryStatusNextMonth[j]==99){

            secondMonthClassValueArray[calendarDateWithValue]='skipped';

          }else{
            secondMonthClassValueArray[calendarDateWithValue]='scheduled';
          };
          break;
        }else{
          secondMonthClassValueArray[calendarDateWithValue]='';
        };
      };
      calendarDateWithValue++;
    }; // the array includes all dates remaining in the current month.
    Session.set("secondMonthValueArray", secondMonthValueArray);

    var checkWeeksInSecondMonth = Math.ceil((secondMonthValueArray.length/7));
    for(i=0;i<5; i++){
      if(i<(checkWeeksInSecondMonth-1)){
        secondMonthWeekSwitch[i]=true;
      };
    };
    Session.set("secondMonthWeekSwitch", secondMonthWeekSwitch);


    Session.set("firstMonthClassValueArray", firstMonthClassValueArray);
    Session.set("secondMonthClassValueArray", secondMonthClassValueArray);





    return Session.get("thisMonth");
  },
  nextMonth: function(){
    return Session.get("nextMonth");
  },
  firstMonthValueArray: function(){
    return Session.get("firstMonthValueArray");
  },
  secondMonthValueArray: function(){
    return Session.get("secondMonthValueArray");
  },
  firstMonthWeekSwitch: function(){
    return Session.get("firstMonthWeekSwitch");
  },
  secondMonthWeekSwitch: function(){
    return Session.get("secondMonthWeekSwitch");
  },
  firstMonthClassValueArray: function(){
    return Session.get("firstMonthClassValueArray");
  },
  secondMonthClassValueArray: function(){
    return Session.get("secondMonthClassValueArray");
  },
});


// var firstDelivery = moment(deliveryData.firstDelivery, "dddd, MMM Do");

// for displaying information of selected week

Template.deliverySchedule.helpers({
  weekSelection: function(){
    return Session.get("weekSelection");
  },
  weekInfo: function(){
    var weekSelection = Session.get("weekSelection");
    var momentSelectedDate = moment().set({
      'year': weekSelection[2],
      'month':weekSelection[0],
      'date':Number(weekSelection[1]),
    });

    // data needs to have
    // 1. time, 2. skipped or scheduled, 3.

    var dateForLogQuery = moment(momentSelectedDate).format("dddd, MMM Do");
    var dateForHeader = moment(momentSelectedDate).format("dddd, MMMM Do");
    if(weekSelection[3]=='skipped'){
      var statusText = 'Skipped';
      var statusClass = 'skippedDelivery'
    }else if(weekSelection[3]=='scheduled'){
      var statusText = 'Scheduled';
      var statusClass = 'scheduledDelivery'

    };
    var weekInfo= {
      header: dateForHeader,
      statusText: statusText,
      statusClass: statusClass,
    };
    Session.set("weekInfo", weekInfo);


    return Session.get("weekInfo");
  },

  // to display menu info according to week selection

  menuInfo: function(){
    var weekSelection = Session.get("weekSelection");
    var menuWeekObject = convertWeekSelectionToMenuWeekName(weekSelection);

    if(weekSelection[3]=='skipped'){
      var skipped = true;
    }else{
      var skipped = false;
    };
    console.log(skipped);
    console.log(weekSelection);

    var babyName= [,,];


    var menuInfo= {
      babyName: babyName,
      skipped: skipped,
    };
    Session.set("menuInfo", menuInfo);


    return Session.get("menuInfo");
  },

});

Template.deliverySchedule.events({
  "click .m1wk1": function(event, template){
    var getSkipped = $('.m1wk1').children('.skipped').children('td').text();
    var getScheduled = $('.m1wk1').children('.scheduled').text();
    var selectedWeekMonth = Session.get("thisMonth");
    var selectedWeekYear = Session.get("thisMonthYear");
    console.log(this);
    if(getSkipped){

      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m1wk2": function(event, template){
    var getSkipped = $('.m1wk2').children('.skipped').text();
    var getScheduled = $('.m1wk2').children('.scheduled').text();
    var selectedWeekMonth = Session.get("thisMonth");
    var selectedWeekYear = Session.get("thisMonthYear");


    if(getSkipped){

      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m1wk3": function(event, template){
    var getSkipped = $('.m1wk3').children('.skipped').text();
    var getScheduled = $('.m1wk3').children('.scheduled').text();
    var selectedWeekMonth = Session.get("thisMonth");
    var selectedWeekYear = Session.get("thisMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m1wk4": function(event, template){
    var getSkipped = $('.m1wk4').children('.skipped').text();
    var getScheduled = $('.m1wk4').children('.scheduled').text();
    var selectedWeekMonth = Session.get("thisMonth");
    var selectedWeekYear = Session.get("thisMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m1wk5": function(event, template){
    var getSkipped = $('.m1wk5').children('.skipped').text();
    var getScheduled = $('.m1wk5').children('.scheduled').text();
    var selectedWeekMonth = Session.get("thisMonth");
    var selectedWeekYear = Session.get("thisMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m1wk6": function(event, template){
    var getSkipped = $('.m1wk6').children('.skipped').text();
    var getScheduled = $('.m1wk6').children('.scheduled').text();
    var selectedWeekMonth = Session.get("thisMonth");
    var selectedWeekYear = Session.get("thisMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m2wk1": function(event, template){
    var getSkipped = $('.m2wk1').children('.skipped').text();
    var getScheduled = $('.m2wk1').children('.scheduled').text();
    var selectedWeekMonth = Session.get("nextMonth");
    var selectedWeekYear = Session.get("nextMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m2wk2": function(event, template){
    var getSkipped = $('.m2wk2').children('.skipped').text();
    var getScheduled = $('.m2wk2').children('.scheduled').text();
    var selectedWeekMonth = Session.get("nextMonth");
    var selectedWeekYear = Session.get("nextMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m2wk3": function(event, template){
    var getSkipped = $('.m2wk3').children('.skipped').text();
    var getScheduled = $('.m2wk3').children('.scheduled').text();
    var selectedWeekMonth = Session.get("nextMonth");
    var selectedWeekYear = Session.get("nextMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m2wk4": function(event, template){
    var getSkipped = $('.m2wk4').children('.skipped').text();
    var getScheduled = $('.m2wk4').children('.scheduled').text();
    var selectedWeekMonth = Session.get("nextMonth");
    var selectedWeekYear = Session.get("nextMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m2wk5": function(event, template){
    var getSkipped = $('.m2wk5').children('.skipped').text();
    var getScheduled = $('.m2wk5').children('.scheduled').text();
    var selectedWeekMonth = Session.get("nextMonth");
    var selectedWeekYear = Session.get("nextMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
  "click .m2wk6": function(event, template){
    var getSkipped = $('.m2wk6').children('.skipped').text();
    var getScheduled = $('.m2wk6').children('.scheduled').text();
    var selectedWeekMonth = Session.get("nextMonth");
    var selectedWeekYear = Session.get("nextMonthYear");


    if(getSkipped){


      var selectedWeekDate = getSkipped;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "skipped"];
      Session.set("weekSelection", deliveryOfTheWeek);
    }else if(getScheduled){


      var selectedWeekDate = getScheduled;
      var deliveryOfTheWeek = [selectedWeekMonth, selectedWeekDate, selectedWeekYear, "scheduled"];
      Session.set("weekSelection", deliveryOfTheWeek);
    };

  },
});
