Template.loginPage.events({
    'click .google-login': function () {
        Meteor.loginWithGoogle({
            requestPermissions: ['email', 'profile', 'https://www.googleapis.com/auth/fitness.activity.read']
        }, function (error) {
            if (!error) {
                Router.go('home');
            }
        });
    }
});
