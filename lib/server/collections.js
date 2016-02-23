CpSubscriptions = new Mongo.Collection('cp_subscriptions');

const CpSubscriptionsSchema = new SimpleSchema({
  subscription_id: {
    type: String,
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
});

CpSubscriptions.attachSchema(CpSubscriptionsSchema);

CpSubscriptions.getSubscriptionIds = function(userIds) {
  var selector = {owner: { $in: userIds }};
  var options = {fields: {subscription_id: 1, _id: 0}};
  return CpSubscriptions.find(selector, options).map(function(subscription) {
    return subscription.subscription_id;
  });
};

CpSubscriptions.getOwners = function(subscriptionIds) {
  var selector = {subscription_id: { $in: subscriptionIds }};
  var options = {fields: {owner: 1, _id: 0}};
  return CpSubscriptions.find(selector, options).map(function(subscription) {
    return subscription.owner;
  });
};

CpSubscriptions.requestUsersPush = function(userIds) {
  CpSubscriptions.requestPush(CpSubscriptions.getSubscriptionIds(userIds));
};

CpSubscriptions.requestPush = function(registrationIds) {
  var key = ChromePushNotifications.key;

  if(!key) {
    throw new Meteor.Error('key-error', 'You didn\'t set the Google API key. See server output.');
  }
  var url = 'https://android.googleapis.com/gcm/send';
  var options = {
    headers: {
      'Authorization': 'key=' + key,
      'Content-Type': 'application/json'
    },
    data: {
      registration_ids: registrationIds,
    }
  };

  HTTP.post(url, options, function (error, result) {
    if (error) {
      throw new Meteor.Error('api-error',
                      'Error while trying to contact google.' + error, error);
    }
  });
};

CpSubscriptions.getNotifications = function(subscriptionId, userId) {

  var subscription = CpSubscriptions.findOne({subscription_id: subscriptionId, owner: userId});

  if(!subscription) {
    throw new Meteor.Error('subscription not found',
           'Subscription with subscriptionId= ' + subscriptionId + 'not found');
  }

  // We should only be able to get our own unread notifications, so subscription
  // owner and userId should match
  if(subscription.owner === userId) {
    var selector = {owner: userId, callbackAt: null};
    var options = {sort: {createdAt: -1}, limit: 1};
    return CpNotification.find(selector, options).fetch();
  } else {
    throw new Meteor.Error('access-denied',
     'The owner of the requested subscription differs from the logged in user');
  }
};
