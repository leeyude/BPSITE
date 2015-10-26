// User page displays two types of sytstem users.
// Admin user display when session value is set to false, which is default;
// consumer user display when session value is set to true.
UserAdmins= new Mongo.Collection("userAdmins");

Template.adminUsers.helpers({
  BPadminLine: function(){
    return UserAdmins.find();
  },
  userTypeSelection: function(){
    return Session.get("userTypeSelection");
  },
});

// below section handles admin user edit, add, delete


Session.setDefault('currentAdmin',false);

Template.adminUsers.helpers({
  currentAdmin: function(){
    return Session.get('currentAdmin');
  }
});


Template.BPadminData.events({
  "click .BPadminData": function(event, template){
    var adminId= this.adminId;
    var adminObject = Meteor.users.findOne({_id:adminId});

    Session.set('currentAdmin',this);
    if(this.profileComplete){
      $('#adminFirstName').text(this.firstName);
      $('#adminLastName').text(this.lastName);
      $('#adminEmail').text(adminObject.emails[0].address);
      $('#adminEmployeeNumber').text(this.adminEmployeeNumber);
      $('#adminRole').text(this.role);
      $('#adminCreatedAt').text(moment(adminObject.createdAt).format('MMM DD, YYYY'));
    }else{
      $('#adminFirstName').text('');
      $('#adminLastName').text('');
      $('#adminEmail').text(adminObject.emails[0].address);
      $('#adminEmployeeNumber').text('');
      $('#adminRole').text('');
      $('#adminCreatedAt').text(moment(adminObject.createdAt).format('MMM DD, YYYY'));
    };

  },
});

Template.adminEdit.events({
  "click #adminEditSession": function(event, template){
    var currentAdmin = Session.get('currentAdmin');
    console.log(currentAdmin);
    if(currentAdmin){
      if(currentAdmin.profileComplete){
        $('#adminFirstNameEdit').val(currentAdmin.firstName);
        $('#adminLastNameEdit').val(currentAdmin.lastName);
        $('#adminRoleEdit').val(currentAdmin.role);
        $('#adminEmployeeNumberEdit').val(currentAdmin.adminEmployeeNumber);
      }else{
        $('#adminFirstNameEdit').val('');
        $('#adminLastNameEdit').val('');
        $('#adminRoleEdit').val('-');
        $('#adminEmployeeNumberEdit').val('');
      };
    }else{
      return false;
    };
  },

  "click #adminEditSave": function(event, template){
    var currentAdmin = Session.get('currentAdmin');
    console.log(currentAdmin);
    var adminUpdateId = currentAdmin._id;
    var adminId= currentAdmin.adminId;
    var firstName = $('#adminFirstNameEdit').val();
    var lastName = $('#adminLastNameEdit').val();
    var role = $('#adminRoleEdit').val();
    var adminEmployeeNumber = $('#adminEmployeeNumberEdit').val();

    if(firstName&&lastName&&role&&adminEmployeeNumber){
      var adminUpdateObject = {
        _id: adminUpdateId,
        adminId: adminId,
        firstName: firstName,
        lastName: lastName,
        role: role,
        adminEmployeeNumber:adminEmployeeNumber,
        profileComplete: true,
      };
      Meteor.call("adminEditSave", adminUpdateObject, function(error, result){
        if(error){
          toastr.error('Error occurs');
        }
        if(result){
          toastr.success('Admin Update Completed');
        }
      });

    }else{
      toastr.error('Pleae complete all field entries.')
    };
  },
});



Template.adminAdd.events({
  "click #adminAddSession": function(event, template){
    $('#adminFirstNameEdit').val('');
    $('#adminLastNameEdit').val('');
    $('#adminRoleEdit').val('-');
    $('#adminEmployeeNumberEdit').val('');
  },

  "click #adminAddSave": function(event, template){
    var currentAdmin = Session.get('currentAdmin');
    var firstName = $('#adminFirstNameAdd').val();
    var lastName = $('#adminLastNameAdd').val();
    var role = $('#adminRoleAdd').val();
    var adminEmployeeNumber = $('#adminEmployeeNumberAdd').val();
    var adminEmailAdd = $('#adminEmailAdd').val();
    var adminPasswordAdd = $('#adminPasswordAdd').val();

    if(firstName&&lastName&&role&&adminEmployeeNumber&&adminEmailAdd&&adminPasswordAdd){
      var adminUpdateObject = {
        firstName: firstName,
        lastName: lastName,
        role: role,
        adminEmployeeNumber:adminEmployeeNumber,
        adminEmailAdd: adminEmailAdd,
        adminPasswordAdd: adminPasswordAdd,
        profileComplete: true,
      };

      Accounts.createUser({
        email: adminEmailAdd,
        password: adminPasswordAdd
      },function(error){
        if(error){
          console.log(error);
          console.log('Cannot add admin as user.');
        };
      });

      Meteor.call("adminAddSave", adminUpdateObject, function(error, result){
        if(error){
          toastr.error('Error occurs when adding admin.');
        }
        if(result){
          toastr.success('Admin Added');
        }
      });
    }else{
      toastr.error('Pleae complete all field entries.')
    };

  },
});

// delete admin

Template.adminUsers.events({
  "click #deleteAdmin": function(event, template){
    var currentAdmin = Session.get('currentAdmin');
    Meteor.call("deleteAdmin", currentAdmin, function(error, result){
      if(error){
        toastr.error('Error occurs when deleting admin.');
      }
      if(result){
        toastr.success('Admin deleted');

      }
    });
    return false;
  }
});
