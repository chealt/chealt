Login = React.createClass({
    login() {
        Meteor.loginWithGoogle({
            requestPermissions: [
                'email',
                'profile',
                'https://www.googleapis.com/auth/fitness.activity.read',
                'https://www.googleapis.com/auth/fitness.body.write'
            ]
        }, updateUserInfoFromGoogleFit);
    },
    render() {
        return (
            <div className='login-container'>
                <button
                    className='google-login button-main upper invert'
                    onClick={this.login} >
                    google
                </button>
            </div>
        );
    }
});

const dataSourcesUrl = '/fitness/v1/users/me/dataSources';

function updateUserInfoFromGoogleFit() {
    updateUserWeight();
    updateUserActivities();
}

function updateUserActivities() {
    const activitiesDataSourceUrl = dataSourcesUrl + '?dataTypeName=com.google.activity.segment&fields=dataSource%2FdataStreamId';
    const dataSetFieldsParameter = 'point%2Fvalue%2FintVal';

    GoogleApi.get(activitiesDataSourceUrl)
        .then(getDataStreamIds)
        .then(loadAllDataSetsForStreams.bind(null, dataSetFieldsParameter))
        .then((dataSets) => {
            let activityTypes = [];
            
            dataSets.forEach((dataSet) => {
                if (dataSet.point) {
                    dataSet.point.forEach((point) => {
                        const activityType = point.value[0].intVal;

                        if (activityTypes.indexOf(activityType) === -1) {
                            activityTypes.push(activityType);
                        }
                    });
                }
            });

            if (activityTypes.length) {
                Meteor.call('updateUserActivities', activityTypes);
            }
        });
}

function updateUserWeight() {
    const weightDataSourceUrl = dataSourcesUrl + '?dataTypeName=com.google.weight&fields=dataSource%2FdataStreamId';
    const dataSetFieldsParameter = 'point%2Fvalue%2FfpVal';

    GoogleApi.get(weightDataSourceUrl)
        .then(getDataStreamIds)
        .then(loadAllDataSetsForStreams.bind(null, dataSetFieldsParameter))
        .then((dataSets) => {
            let lastMeasuredWeight = 0;
            let lastMeasureTimeMs = 0;
            
            dataSets.forEach((dataSet) => {
                dataSet.point.forEach((point) => {
                    if (point.modifiedTimeMillis > lastMeasureTimeMs) {
                        lastMeasuredWeight = point.value[0].fpVal;
                        lastMeasureTimeMs = point.modifiedTimeMillis;
                    }
                });
            });

            if (lastMeasuredWeight !== 0) {
                Meteor.call('updateUserWeight', lastMeasuredWeight);
            }
        });
}

function getDataStreamIds(dataSources) {
    return new Promise((resolve, reject) => {
        resolve(dataSources.dataSource.map((source) => {
            return source.dataStreamId;
        }));
    });
}

function loadAllDataSetsForStreams(dataSetFieldsParameter, dataStreamIds) {
    const dataSetUrlEnd = 'datasets/0-' + new Date().getTime() + '000000?fields=' + dataSetFieldsParameter;

    return Promise.all(dataStreamIds.map((dataStreamId) => {
        return GoogleApi.get(dataSourcesUrl + '/' + dataStreamId + '/' + dataSetUrlEnd);
    }));
}