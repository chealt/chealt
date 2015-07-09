Template.layout.events({
    'click #logout': function () {
        Meteor.logout();
    }
});

Template.home.events({
    'input #todaysWorkout': function (event) {
        setSuggestionTimer($(event.target).val());
    }
});

var suggestionTimer;
var searchableCollections = [
        { collection: WorkoutTypes }
    ],
    words;

function setSuggestionTimer(inputValue) {
    clearTimeout(suggestionTimer);
    //suggestionTimer = setTimeout(suggestCollectionItem.bind(null, inputValue, searchableCollections[0]), 300);
    suggestionTimer = setTimeout(suggest.bind(null, inputValue), 300);
}

function suggest(inputValue) {
    setWords(inputValue);
    console.log(words);
}

function setWords(inputValue) {
    words = [];
    inputValue.split(' ').forEach(function (inputWord) {
        words.push({
            value: inputWord,
            suggestion: null
        });
    });
}

function suggestCollectionItem(needle, collectionObject) {
    var matchingItems = [];

    collectionObject.collection.find().forEach(function (collectionItem) {
        if (needle.indexOf(collectionItem.name) !== -1) {
            matchingItems.push(collectionItem);
        }
    });

    console.log(matchingItems);
}
