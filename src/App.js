import React from 'react';
import './App.css';
import { WordGenerator } from './words';

let id = 0;
const letters = "a b c d e f g h i j k l m n o p q r s t u v w x y z å ä ö";
const separatedLetters = letters.split(' ');
let buttons = [];
let image = null;


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      wrongGuesses: 0,
      displayText: [],
      correctWord: WordGenerator()
    }
  }
  
  componentDidMount(){
    let newStringToDisplay = [];
    image = document.querySelector('img');

    this.state.correctWord.split('').forEach(char => {
      newStringToDisplay.push("_")
    });
    
    this.setState({ displayText: newStringToDisplay }, () => {
      this.printDisplayText();
    });
    
    buttons = separatedLetters.map( letter => <button className="letterBtn" key={ id++ } onClick={ this.handleClick }> { letter } </button> );
  }

  handleClick = (e) => {
    e.target.setAttribute("disabled", "disabled");
    this.guess(e.target.innerText);
  }

  guess = (char) => {
    if (this.state.correctWord.includes(char)){
      let charIndexes = [];
      
      for(let i = 0; i < this.state.correctWord.length; i++){
        if (this.state.correctWord[i] === char){
          charIndexes.push(i);
        }
      }

      let newTextToDisplay = this.state.displayText;
      charIndexes.forEach(x => {
        newTextToDisplay[x] = char;
      });

      this.setState({ displayText: newTextToDisplay });
      this.printDisplayText();

      if (!this.state.displayText.includes("_")){
        this.setState({ displayText: ["G", "R", "A", "T", "T", "I", "S", "!"]}, () => {
          this.printDisplayText();
          document.querySelectorAll('button').forEach(btn => {
            if (!(btn.id === 'resetBtn')){
              btn.setAttribute("disabled", "disabled");
            }
          })

          image.src = "./images/success.jpg";
        });
      }
    }
    else { 
      this.setState({ wrongGuesses: this.state.wrongGuesses + 1 }, () => {
        document.querySelector('img').src = "images/" + this.state.wrongGuesses + ".jpg";
      });

      if (this.state.wrongGuesses >= 5){
        this.setState({ displayText: ["G", "A", "M", "E", "O", "V", "E", "R"]}, () => {
          this.printDisplayText();
          document.querySelectorAll('button').forEach(btn => {
            if (!(btn.id === 'resetBtn')){
              btn.setAttribute("disabled", "disabled");
            }
          })

          image.src = "./images/fail.jpg";
        });
        
      }
    }
  }

  reset = () => {
    const btns = document.querySelectorAll('button');
    btns.forEach(btn => {
      btn.removeAttribute("disabled");
    });

    let newWord = WordGenerator();

    while (newWord === this.state.correctWord){
      newWord = WordGenerator();
    }

    let newStringToDisplay = [];

    newWord.split('').forEach(char => {
      newStringToDisplay.push("_")
    });

    image.src = "images/0.jpg";

    this.setState({ correctWord: newWord, wrongGuesses: 0, displayText: [...newStringToDisplay]  }, () => {
      this.printDisplayText();
    });
  }

  printDisplayText = () => {
    let p = document.getElementById('underscores');
    p.innerText = "";

    this.state.displayText.forEach(char => {
      p.innerText += (char + " ")
    });

    p.style.letterSpacing = '30px';
  }

  render() {
    return (
      <div className="App">
        <h1>Hänga gubbe</h1>
        <h3>Spelet går ut på att gissa bokstäver i ett ord vars bokstäver initialt är helt dolda, men som visas som ledtrådar när spelaren lyckats gissa på dem.</h3>
        <div className="gameArea">
          <img src="/images/0.jpg" alt="suck"/>
          <p id="underscores"></p>
          <p>Felaktiga gissningar: { this.state.wrongGuesses }</p>
          
          <div className="buttons">
            { 
              buttons
            } 
          </div>
  
          <button id="resetBtn" onClick={ this.reset }>Återställ</button>
        </div>
      </div>
    );
  }
}

export default App;
