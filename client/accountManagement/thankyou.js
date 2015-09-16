Template.thankyou.helpers({
  thisMonth: function(){
    var userId= Meteor.userId();
    var userObject = Meteor.users.findOne({_id:userId});
    var firstDelivery = userObject.deliveryLog[0].fulfilmentDate;
    console.log(firstDelivery);

    var today = new Date;
// setting displayed months
    var todayMonth = moment(today).month();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    Session.set("thisMonth", months[todayMonth]);
    Session.set("nextMonth", months[todayMonth+1]);
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
      firstMonthValueArray[calendarDateWithValue]= i;
      firstMonthClassValueArray[calendarDateWithValue]='';
      calendarDateWithValue++;
    }; // the array includes all dates remaining in the current month.


    Session.set("firstMonthValueArray", firstMonthValueArray);

    var checkWeeksInFirstMonth = Math.ceil((firstMonthValueArray.length/7));
    for(i=0;i<5; i++){
      if(i<(checkWeeksInFirstMonth-1)){
        firstMonthWeekSwitch[i]=true;
      };
    };
    Session.set("firstMonthWeekSwitch", firstMonthWeekSwitch);
    console.log(firstMonthValueArray);
    console.log(firstMonthWeekSwitch);


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
      secondMonthClassValueArray[calendarDateWithValue]='';
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

    console.log(secondMonthValueArray);
    console.log(secondMonthWeekSwitch);

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
