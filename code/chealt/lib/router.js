Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('workouts');
    }
});

Router.route('/', { name: 'home' });
Router.route('/workouts', { name: 'workoutsList' });
Router.route('/workouts/:_id', {
    name: 'workoutItem',
    data: function () {
        return Workouts.findOne(this.params._id);
    }
});

Router.onBeforeAction('dataNotFound', { only: 'workoutItem' });
