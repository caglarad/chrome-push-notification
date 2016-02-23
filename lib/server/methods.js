Meteor.methods({
  // Subscriptions
  saveSubscription: function(subscriptionId) {
    var doc = {
      subscription_id: subscriptionId,
      owner: Meteor.userId()
    }

    return CpSubscriptions.upsert(doc, {$set: doc});
  },
  removeSubscription: function() {
    const userId = Meteor.userId()
    return CpSubscriptions.remove({ 'owner': userId })
  },
  requestPushNotification: function(userIds) {
    CpSubscriptions.requestUsersPush(userIds);
  },
  CpNotification_insert: function (userIds, notification) {
    userIds.forEach(function(userId) {
      CpNotification.insert(_.extend(notification, {owner: userId}));
    });
  }
});
