Accounts.onCreateUser((options, user) => {
    const googleData = user.services && user.services.google;
    const googleEmail = googleData && googleData.email;
    const googleName = googleData && googleData.name;
    const googleProfilePicture = googleData && googleData.picture;
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

    _.extend(user, {
        profile: profile
    });

    return user;
});
