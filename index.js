// Get Quotes From API
// const API_URL = "https://zenquotes.io/api/quotes";
const API_URL = "https://type.fit/api/quotes";

const quotes = [];

async function FetchQuotes(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        quotes.push(...data);
    } catch(error) {
        alert(error.message);
    }
}

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

async function GetRandomQuote()
{
    loading();
    if(quotes.length < 3) await FetchQuotes(API_URL);
    
    var randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    authorText.textContent = quote.author ? quote.author : "Unknown";
    if(quote.text.length > 50) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.text;
    complete();
}

const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// For First Time
GetRandomQuote();

newQuoteBtn.addEventListener('click', GetRandomQuote);

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);