###Chrome Push Notifications

##Installation

Add the package: meteor add proyk:chrome-push-notification
Set the Google API key (see Google API key)
Copy the Service Worker to the /public of your application
Google API key

The preferred way to set your google API key is to use the Meteor.settings mechanism. See http://docs.meteor.com/#/full/meteor_settings. Start the Meteor instance with the --settings option. See meteor help run and meteor mhelp deploy. The packacge expects the key to be under serviceConfigurations.google.key in a settings JSON file. I believe this should become the standard place to put API keys. This is the preferred way because you might want to use different keys for different environments.

##Templates


{{> Cp_notifications_checkbox}}

Renders a push notifications checkbox.
Takes following options:
label: The label of the checkbox. Defaults to Enable Push notifications.
class: The HTML class property to pass to the checkbox wrapper div.

bpNotifications.send(notification, userIds): Sends a push notification.
notification: See below.
userIds: Optional. String with Mongo _id of user or Array of Mongo _ids of users.

##Send message

var notification = {
  title: "Notification title",
  message: "Notification body",
  icon: "/img/icon.png",
};

var userIds = ["HS7r7qhL2yrKtoZfs", "heN3BoGdKx7httKWB"];

CpNotification.send(notification, userIds);
