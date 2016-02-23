Picker.route('/cp_notification/:subscriptionId', function(params, req, res, next) {
  // Prepare the response
  res.writeHead(200, {'Content-Type': 'application/json'});

  const cookies = new Cookies( req );
  const userId = cookies.get("meteor_user_id") || "";
  const token = cookies.get("meteor_token") || "";

  //Check a valid user with this token exists
  const user = Meteor.users.findOne({
    _id: userId,
    'services.resume.loginTokens.hashedToken' : Accounts._hashLoginToken(token)
  });

  // If not logged in send an error JSON
  if(!user) {
    res.statusCode = 401;
    res.end(JSON.stringify({error: "Not allowed"}));
  } else {

    // const subscriptionId = CpSubscriptions.getSubscriptionIds([user._id
    const subscriptionId = params.subscriptionId;
    const notifications = CpSubscriptions.getNotifications(subscriptionId, user._id);

    res.end(
      JSON.stringify({notifications: notifications})
    );
  }
});
