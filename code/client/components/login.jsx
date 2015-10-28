Login = React.createClass({
    login() {
        Meteor.loginWithGoogle({
            requestPermissions: [
                'email',
                'profile',
                'https://www.googleapis.com/auth/fitness.activity.read',
                'https://www.googleapis.com/auth/fitness.body.write'
            ]
        }, updateUserWeight);
    },
    render() {
        return (
            <button
                className='google-login button-main upper invert'
                onClick={this.login} >
                google
            </button>
        );
    }
});


function updateUserWeight() {
    const dataSourcesUrl = '/fitness/v1/users/me/dataSources';
    const dataSetUrlEnd = 'datasets/0-1443194884000000000';

    GoogleApi.get(dataSourcesUrl)
        .then((data) => {
            return new Promise((resolve, reject) => {
                let dataStreamIds = [];
                
                data.dataSource.forEach((source) => {
                    if(source.dataStreamId.indexOf('com.google.weight') > -1) {
                        dataStreamIds.push(source.dataStreamId);
                    }
                        
                });

                resolve(dataStreamIds);
            });
        })
        .then((dataStreamIds) => {
            return Promise.all(dataStreamIds.map((dataStreamId) => {
                return GoogleApi.get(dataSourcesUrl + '/' + dataStreamId + '/' + dataSetUrlEnd);
            }));
        })
        .then((dataSets) => {
            let values = [];
            
            dataSets.forEach((dataSet) => {
                dataSet.point.forEach((point) => {
                    values.push(point.value[0].fpVal);
                });
            });

            const averageWeight = (values.reduce((previous, current) => {
                return previous + current;
            }) / values.length);

            Meteor.call('updateUserWeight', averageWeight);
        });
}