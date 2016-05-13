registerServiceWorker = function() {

  if ('serviceWorker' in navigator) {
    checkPreconditions();

    navigator.serviceWorker.register('/serviceWorker.js')
    .then(waitForServiceWorkerToBeReady)
    .then(getPushSubscription)
    .then(setCheckbox)
    .catch(function(err) { console.error(err) });
  } else {
    console.warn('Service workers aren\'t supported in this browser.')
  };

  function checkPreconditions() {
    //console.log('checkPreconditions');
    var errorType = 'pNotifications';

    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      throw new Meteor.Error(errorType, 'Notifications are not supported.');
    }

    if (Notification.permission === 'denied') {
      throw new Meteor.Error(errorType, 'The user has blocked notifications.');
    }

    if (!('PushManager' in window)) {
      throw new Meteor.Error(errorType, 'Push messaging is not supported.');
    }

  }


  function waitForServiceWorkerToBeReady() {
    //console.log('waitForServiceWorkerToBeReady');
    return navigator.serviceWorker.ready;
  }

  function getPushSubscription(serviceWorkerRegistration) {
    //console.log('getPushSubscription');
    // At this point the Service Worker is ready, so we can enable the checkbox
    $('#push-button').attr('disabled', false);

    // We return the subscription
    return serviceWorkerRegistration.pushManager.getSubscription()
  }

  function setCheckbox(subscription) {
    // If there is no subscription, we leave the checkbox as is
    // and make sure the isPushEnabled is false
    if (!subscription) {
      Session.set('isPushEnabled', false);
      return;
    }
    // If we have a subscription, we set the checkbox to checked
    // and make sure the isPushEnabled is true
    else {
      $('#push-button').attr('checked', 'checked')
      Session.set('isPushEnabled', true);
    }
  }
}
