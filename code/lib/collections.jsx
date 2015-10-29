Events = new Mongo.Collection('events');
Activities = new Mongo.Collection('activities');

Events.allow({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

Activities.allow({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
})
