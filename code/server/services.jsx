ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
        $set: {
            clientId: '829887773467-75cmjsqmqfdhqee90khu51id555ls3ri.apps.googleusercontent.com',
            secret: 'T08l29plApTnSkqzhj5TLOG3',
            loginStyle: 'popup'
        }
    }
);

ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
        $set: {
            appId: '1637948946454432',
            secret: 'fa3dd32c7bc233565f7371720f3f6351',
            loginStyle: 'popup'
        }
    }
);
