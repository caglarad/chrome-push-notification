Template.Cp_notifications_checkbox.onRendered(function() {
  registerServiceWorker();
});

Template.Cp_notifications_checkbox.events({
  'click #push-button': function (evt) {
    var subscriptionManager = SubscriptionManager(evt.currentTarget);
    if (Session.get('isPushEnabled')) {
      subscriptionManager.unsubscribe();
    } else {
      subscriptionManager.subscribe();
    }
  }
})

Template.Cp_notifications_checkbox.helpers({
  label: function() {
    if(this.label) {
      return this.label;
    } else {
      return "Chrome push";
    }
  },
  classes: function() {
    if(this.class) {
      return this.class;
    } else {
      return;
    }
  }
});
