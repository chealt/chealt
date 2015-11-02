Login = React.createClass({
    loginWithGoogle() {
        Meteor.loginWithGoogle({
            requestPermissions: [
                'email',
                'profile',
                'https://www.googleapis.com/auth/fitness.activity.read',
                'https://www.googleapis.com/auth/fitness.body.write'
            ]
        }, updateUserInfoFromGoogleFit);
    },
    loginWithFacebook() {
        Meteor.loginWithFacebook({
            requestPermissions: [
                'email',
                'user_events',
                'public_profile'
            ]
        });
    },
    getInitialState() {
        return {
            isBubbleShown: false
        };
    },
    toggleBubble() {
        this.setState({
            isBubbleShown: !this.state.isBubbleShown
        });
    },
    closeBubble() {
        this.setState({
            isBubbleShown: false
        });
    },
    anythingCloser() {
        if (this.state.isBubbleShown) {
            return <AnythingCloser onClick={this.closeBubble} />;
        }
    },
    getBubbleContent() {
        return (
            <div className='login-bubble-content'>
                <button
                    className='google-login button main upper'
                    onClick={this.loginWithGoogle} >
                    google
                </button>
                <button
                    className='facebook-login button main upper'
                    onClick={this.loginWithFacebook} >
                    facebook
                </button>
            </div>
        );
    },
    render() {
        return (
            <div className='login-container bubble-container'>
                <button
                    className='google-login button main upper invert'
                    onClick={this.toggleBubble} >
                    login
                </button>
                <BubbleArrow
                    position='below'
                    isShown={this.state.isBubbleShown} />
                <Bubble
                    position='below'
                    isShown={this.state.isBubbleShown}
                    content={this.getBubbleContent()} />
                {this.anythingCloser()}
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
    const dataSetFieldsParameter = 'point(modifiedTimeMillis%2Cvalue%2FfpVal)';

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