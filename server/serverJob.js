Meteor.methods({
  createDefaultDeliveryLog:function(userId){
    var userObject = Meteor.users.findOne({_id:userId});
    var firstDelivery = userObject.deliveryLog[0].fulfilmentDate;
    var userDeliveryLog = userObject.deliveryLog[0];
    var momentFirstDelivery = moment(firstDelivery, "ddd, MMM Do"); // get moment
    var today= new Date();
    var momentToday = moment(today);

    var firstDeliveryWeekday = moment(momentFirstDelivery).day; // get weekday
    var statusScheduleByWeek = [0,0,0,0,0,0,0,0,0,0,0,0]; // assuming next 12c weeks will be delivered.
    var deliverySchedule = [];
    var dayDistance = momentFirstDelivery.diff(today, 'days');
    console.log(dayDistance);
    if(dayDistance<8){
      statusScheduleByWeek= [1,0,0,0,0,0,0,0,0,0,0,0];
    }else{
      for(i=0;i<4;i++){
        if(dayDistance>(11+i*7)){
          statusScheduleByWeek[i]=99;
        };
      };
    };
    var numberOfSkipped = 0;
    for(i=0;i<12;i++){
      if(statusScheduleByWeek[i]==99){
        numberOfSkipped++;
      }else{
        break;
      };
    };
    for(i=0;i<12;i++){
      deliverySchedule[i]= moment(momentFirstDelivery).add(7*(i-numberOfSkipped), 'days').format("dddd, MMM Do");
    };
    // update the first object in log array
    Meteor.users.update({_id:userId}, {$set:{
      deliveryLog: [
        { status: statusScheduleByWeek[0],
          // 0- not yet fulfilled, can be changed or canceled;
          // 1- not yet fulfilled, to be fulfilled in the current week;
          // 2- delivered, within two weeks after delivery,
          // 3- delivered, out of two weeks of delivery
          // 99 - skipped
          fulfilmentDate: deliverySchedule[0],//give a time of this shipment....
          deliveryAddress1: userDeliveryLog.deliveryAddress1,
          deliveryAddress2: userDeliveryLog.deliveryAddress2,

          content: userDeliveryLog.content,
          subtotal: userDeliveryLog.subtotal,
        },
      ],
    }});
    for(i=1;i<12;i++){
      // update the next 11 objects in log array
      Meteor.users.update({_id:userId}, {$push:{
        deliveryLog:
          { status: statusScheduleByWeek[i],
            // 0- not yet fulfilled, can be changed or canceled;
            // 1- not yet fulfilled, to be fulfilled in the current week;
            // 2- delivered, within two weeks after delivery,
            // 3- delivered, out of two weeks of delivery
            // 99 - skipped
            fulfilmentDate: deliverySchedule[i],//give a time of this shipment....
            deliveryAddress1: userDeliveryLog.deliveryAddress1,
            deliveryAddress2: userDeliveryLog.deliveryAddress2,

            content: userDeliveryLog.content,
            subtotal: userDeliveryLog.subtotal,
          },
      }});
    };

  },
});
