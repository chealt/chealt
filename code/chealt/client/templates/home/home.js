/* globals WorkoutTypes, Session */
Template.layout.events({
    'click #logout': function () {
        Meteor.logout();
    }
});

Template.home.helpers({
    'suggestions': function () {
        return Session.get('suggestions');
    }
});

Template.home.events({
    'input #todaysWorkout': function (event) {
        setSuggestionTimer($(event.target).val());
    }
});

var suggestionTimer,
    searchableCollections = [
        { collection: WorkoutTypes }
    ],
    suggestions = {
        inputWords: [],
        matchingItems: []
    };

function setSuggestionTimer(inputValue) {
    clearTimeout(suggestionTimer);
    suggestionTimer = setTimeout(suggest.bind(null, inputValue), 300);
}

function suggest(inputValue) {
    suggestions.inputWords = inputValue.split(' ') || [];
    suggestFromCollections();
    Session.set('suggestions', suggestions.matchingItems);
}

function suggestFromCollections() {
    suggestions.matchingItems = [];

    searchableCollections.forEach(function (collection) {
        suggestions.inputWords.forEach(function (word) {
            var matcherResults = suggestCollectionItem(word, collection);
            
            if (matcherResults) {
                suggestions.matchingItems.push(matcherResults);
            }
        });
    });
}

function suggestCollectionItem(needle, collectionObject) {
    return collectionObject.collection.findOne({ name: needle });
}
