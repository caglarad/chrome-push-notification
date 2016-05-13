Meteor.methods({
  // Subscriptions
  saveSubscription: function(subscriptionId) {
    check(subscriptionId, String);

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
    check(userIds, Array);

    CpSubscriptions.requestUsersPush(userIds);
  },
  CpNotification_insert: function (userIds, notification) {
    check(userIds, Array);
    check(notification, Object);

    userIds.forEach(function(userId) {
      CpNotification.insert(_.extend(notification, {owner: userId}));
    });
  }
});
