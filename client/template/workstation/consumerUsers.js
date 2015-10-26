Template.consumerUsers.helpers({
  consumerData: function(){
    var admins = UserAdmins.find();
    var adminObjects = admins.fetch();
    var adminIds = [];

    for(i=0;i<admins.count();i++){
      adminIds[i]= adminObjects[i].adminId;
    };
    return Meteor.users.find({ _id: { $not: { $in: adminIds} } });
  },

  
});
