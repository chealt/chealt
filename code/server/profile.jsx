Accounts.onCreateUser((options, user) => {
    const googleData = user.services && user.services.google;
    const googleEmail = googleData && googleData.email;
    const googleName = googleData && googleData.name;
    const googleProfilePicture = googleData && googleData.picture;

    const facebookData = user.services && user.services.facebook;
    const facebookEmail = facebookData && facebookData.email;
    const facebookName = facebookData && facebookData.name;
    const facebookProfilePicture = facebookData && facebookData.id && 'http://graph.facebook.com/' + facebookData.id + '/picture/?type=large';
    
    let profile = {};

    if (googleEmail) {
        _.extend(profile, {
            email: googleEmail
        });
    }

    if (googleName) {
        _.extend(profile, {
            name: googleName
        });
    }

    if (googleProfilePicture) {
        _.extend(profile, {
            picture: googleProfilePicture
        });
    }

    if (facebookEmail) {
        _.extend(profile, {
            email: facebookEmail
        });
    }

    if (facebookName) {
        _.extend(profile, {
            name: facebookName
        });
    }

    if (facebookProfilePicture) {
        _.extend(profile, {
            picture: facebookProfilePicture
        });
    }

    _.extend(user, {
        profile: profile
    });

    return user;
});

/*Accounts.onLogin(() => {
    const user = Meteor.user();
    const facebookService = user && user.services && user.services.facebook;
    const facebookAccessToken = facebookService && facebookService.accessToken;
    
    if (FBGraph, facebookAccessToken) {
        updateFriendsList(FBGraph, facebookAccessToken);
    }
});

const updateFriendsList = (graph, facebookAccessToken) => {
    graph.setAccessToken(facebookAccessToken);

    const processFriendsResponse = (error, response) => {
        console.log(error);
        console.log(response);
    };

    graph.get('me/friends', processFriendsResponse);
};*/
