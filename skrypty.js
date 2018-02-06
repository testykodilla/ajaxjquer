var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var prefix = "https://cors-anywhere.herokuapp.com/";

function getQuote() {
	$.getJSON(prefix + quoteUrl, createTweet);
	$.ajaxSetup({ cache: false });
};

function createTweet(input) {
	var data = input[0];
	var quoteText = $(data.content).text().trim();
	var quoteAuthor = data.title;

	if(!quoteAuthor.length) {
		quoteAuthor = "Autor nieznany";	
	}

	var tweetText = "Cytat dnia - " + quoteText + " Autor: " + quoteAuthor;	

	if (tweetText.length > 280) { //Twitter w zeszłym roku zwiększył ilość znaków w tweecie to 280
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.cytat').text(quoteText);
		$('.autor').text("Autor: " + quoteAuthor);
		$('.tweet').attr('href', tweet);
	}
}

$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    })
});