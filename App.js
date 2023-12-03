import {useEffect, useState} from 'react';
import './App.css';
import ColorsArray from './colorsArray';

let quoteUrl = "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote]= useState("Life isn’t about getting and having, it’s about giving and being.");
  const [author, setAuthor]= useState("Kevin Kruse");
  const [randomIndex, setIndex]= useState(0);
  const [quotesArray,setQuotesArray] = useState(null);
  const [randomColor, setRandomColor] = useState('black');

  const fetchQuotes = async(url) =>{
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(()=>{
    fetchQuotes(quoteUrl)
    }
  ,[quoteUrl])

 

  const getRandomIndex = ()=>{
    let randomIndex = (Math.floor(quotesArray.length*Math.random()))
    setIndex(randomIndex)
    setQuote(quotesArray[randomIndex].quote)
    setAuthor(quotesArray[randomIndex].author)
    setRandomColor(ColorsArray[randomIndex].hex)

  }

  const testQuotes=[
    {quote:"quote1", author:"name1"},
    {quote:"quote2", author:"name2"},
    {quote:"quote3", author:"name3"},

  ]

  return (
    <div className="App">
      <header className="App-header" style= {{backgroundColor:randomColor, color:randomColor}}>
        <div id='quote-box'>
        
        <p id='text'>
          {quote}
        </p>
        <p id="author">
          - {author}
        </p>
        <a id='tweet-quote'
        href= {encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)}
        >
           <i class="fa-twitter">Tweet</i>
        </a>
        <button id='new-quote'
        style= {{backgroundColor:randomColor}}
        onClick={()=> {
          getRandomIndex()
        }}>New Quote</button>
        
        </div>
      </header>
    </div>
  );
}

export default App;
