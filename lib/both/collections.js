CpNotification = new Meteor.Collection('cp_notification');

const CpNotificationSchema = new SimpleSchema({
  title: { type: String },
  message: {
    type: String,
    optional: true,
  },
  icon: {
    type: String,
    optional: true,
  },
  callbackAt: {
    optional: true,
    type: Date,
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
})

CpNotification.attachSchema(CpNotificationSchema);

CpNotification.send = function(notification, userIds) {
  check(notification, {
    title: String,
    message: Match.Optional(String),
    icon: Match.Optional(String),
  });

  // If userIds is not set, default it to the current user
  if(!userIds) {
    userIds = [Meteor.userId()];
  }

  // If userIds is not an Array, we make it an array
  if(!Array.isArray(userIds)) {
    userIds = [userIds];
  }

  // We save the notification to be sent for every user in the db
  Meteor.call('CpNotification_insert', userIds, notification);

  // Finally we send the push request to the cloud for all subscriptions
  // corresponding to the userIds
  Meteor.call('requestPushNotification', userIds);
}
