//Variables section
const tweetList = document.getElementById('tweet-list')





//Event Listeners section
eventListeners();

function eventListeners() {
    document.querySelector('#form').addEventListener('submit', newTweet);

    //Cancel task from list
    tweetList.addEventListener('click', cancelTweet);


    //Remove tweet from list
    tweetList.addEventListener('click', removeTweet);

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);


}



//Functions section

function newTweet(e) {
    e.preventDefault();

    //Reading the text area

    const tweet = document.getElementById('tweet').value;

    //The remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    //Add text to the list

    var li = document.createElement('li');
    li = document.createElement('a');
    br = document.createElement('br');
    li.textContent = tweet;

    //Add the remove button
    li.appendChild(removeBtn);

    //Add items to the list
    tweetList.appendChild(li);
    tweetList.appendChild(br);

    addTweetLocalStorage(tweet);
}
//Cancel task
function cancelTweet(e) {
    document.getElementById(tweetList)
    e.target.style.textDecoration = "line-through";

}


//Remove the tweet from DOm
function removeTweet(e) {
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    // Remove from Storage
    removeTweetLocalStorage(e.target.parentElement.textContent);
}

function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromLocalStorage();

    //add the tweet into the aray
    tweets.push(tweet);

    //convert tweet array to a string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromLocalStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    if (tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

//Prints Local Storage Tweets on Load
function localStorageOnLoad() {
    let tweets = getTweetsFromLocalStorage();

    //Loop trhough storage and then print the values

    tweets.forEach(function (tweet) {
        //The remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        //Add text to the list

        var li = document.createElement('li');
        li = document.createElement('a');
        br = document.createElement('br');
        li.textContent = tweet;

        //Add the remove button
        li.appendChild(removeBtn);

        //Add items to the list
        tweetList.appendChild(li);
        tweetList.appendChild(br);
    });
}

function removeTweetLocalStorage(tweet) {

    //Get tweets from Storage
    let tweets = getTweetsFromLocalStorage();

    // Remove the X from tweet
    const tweetDelete = tweet.substring(0, tweet.length - 1);

    //Loop through the tweets and remove the tweet that's equal

    tweets.forEach(function (tweetLS, index) {
        if (tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });

    //Save data - without the removed list
    localStorage.setItem('tweets', JSON.stringify(tweets));


}