Meteor.publish('workouts', function () {
    return Workouts.find();
});

Meteor.publish('workoutTypes', function () {
    return WorkoutTypes.find();
});

Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({ _id: this.userId });
    }
});
