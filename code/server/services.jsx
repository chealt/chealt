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
