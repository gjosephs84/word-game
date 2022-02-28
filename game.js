
// Get the winning word on page load
const winning = allWords[Math.floor(Math.random() * 2315)].toLocaleUpperCase();
const winningWord = Array.from(winning);

// Arrays for generating the three rows of the keyboard
const firstRow = ['Q','W','E','R','T','Y','U','I','O','P'];
const secondRow = ['A','S','D','F','G','H','J','K','L'];
const thirdRow = ['Z','X','C','V','B','N','M'];

// The parent App component, currently holding all state variables
function App(){
    
    // Brought in, even though useEffect is not presently being used
    const { useState, useEffect } = React; 

    // Holds error messages/the solution after attempt number six
    const [message, setMessage] = React.useState(null);

    // Determines the guess number (1-6)
    const [attempt, setAttempt] = React.useState(1);
   
    // State variables to hold each of six guesses AND their eventual results
    // where guess.result is an array of classNames which will show green, yellow,
    // or grey based on letter placement after users enter a guess.
    const [firstGuess, setFirstGuess]  = React.useState({
        guess: [null, null, null, null, null],
        result: ['empty','empty','empty','empty','empty']
    });
    const [secondGuess, setSecondGuess] = React.useState({
        guess: [null, null, null, null, null],
        result: ['empty','empty','empty','empty','empty']
    });
    const [thirdGuess, setThirdGuess] = React.useState({
        guess: [null, null, null, null, null],
        result: ['empty','empty','empty','empty','empty']
    });
    const [fourthGuess, setFourthGuess] = React.useState({
        guess: [null, null, null, null, null],
        result: ['empty','empty','empty','empty','empty']
    });
    const [fifthGuess, setFifthGuess] = React.useState({
        guess: [null, null, null, null, null],
        result: ['empty','empty','empty','empty','empty']
    });
    const [sixthGuess, setSixthGuess] = React.useState({
        guess: [null, null, null, null, null],
        result: ['empty','empty','empty','empty','empty']
    });
    
    // Determines the index position of current guess (0-4)
    const [guessPosition, setGuessPosition] = React.useState(0)
    
    // A function to check guess against winningWord
    const checkLetters = () => {
        // Figure out which guess attempt we're on
        let [currentAttempt, setCurrentAttempt] = getAttempt();
        // And set word to be the guess user provided
        let word = currentAttempt.guess;

        // An array to hold the classnames of the letters guessed
        let newClasses = [];
        let lettersMarked = [];
        for (let i=0; i<5; i++) {
            // A filtered array that contains matches for the ith
            // letter in the user's word in the winning word
            let filtered = winningWord.filter(letter => letter == word[i]);
            // An array to check to see if the guess has double letters
            let filteredGuess = word.filter(letter => letter == word[i]);
            // if the letter isn't there at all, mark it!
            if (filtered.length < 1) {
                newClasses.push('absent');
            }
            // Otherwise, since the letter exists, figure out if it's in
            // the right place, provided it only occurs once
            else {
                if (word[i] == winningWord[i]) {
                    newClasses.push('in-place');
                    lettersMarked.push(word[i]);
                } else {
                    if (winningWord.includes(word[i])) {
                        if (lettersMarked.includes(word[i]) == false) {
                            newClasses.push('wrong-place');
                            lettersMarked.push(word[i]);
                        } else {
                            newClasses.push('absent');
                        }
                    }
                }
            };
        };
        let newResults = currentAttempt;
        newResults.result = newClasses;
        setCurrentAttempt(newResults);
    } 
    
    //A function to figure out the attempt for the keyboard onClick
    const getAttempt = () => {
        let theAttempt, setTheAttempt;
        switch (attempt) {
            case 1 : 
                theAttempt = firstGuess;
                setTheAttempt = setFirstGuess;
                break;
            case 2 : 
                theAttempt = secondGuess;
                setTheAttempt = setSecondGuess;
                break;
            case 3 : 
                theAttempt = thirdGuess;
                setTheAttempt = setThirdGuess;
                break;
            case 4 : 
                theAttempt = fourthGuess;
                setTheAttempt = setFourthGuess;
                break;
            case 5 : 
                theAttempt = fifthGuess;
                setTheAttempt = setFifthGuess;
                break;
            case 6 : 
                theAttempt = sixthGuess;
                setTheAttempt = setSixthGuess;
                break;
            default : 
                theAttempt = firstGuess;
                setTheAttempt = setFirstGuess;
                break;
        };
        return [theAttempt, setTheAttempt];
    };

    //A component to relay messages to the player
    function AspenSays() {
        return (
            <div>
            {message && <div className="message">
                <h4>{message}</h4> 
                <div className="container"><button className="dismiss" onClick={() => {
                    setMessage(null);
                }}>Dismiss</button></div>
            </div>}
            </div>
        )
    }

    //The Keyboard Component
    function Keyboard({letter}) {
        return (
            <button className="letter" id={letter} onClick={(e) => {
                let [currentAttempt, setCurrentAttempt] = getAttempt();
                if (guessPosition == 5) {
                    return null;
                }
                let newGuess = currentAttempt;
                newGuess.guess.splice(guessPosition, 1, e.target.innerText);
                setCurrentAttempt(newGuess);
                let currentPosition = guessPosition
                setGuessPosition(currentPosition + 1);
                
            }}>{letter}</button>
        ) 
    }

    //A component to make a letter box in a guess row
    function LetterBox({position, attemptNumber, guessed, letterClass}) {
        return (
            <div className={letterClass}>{guessed}</div>
        )
    }



    //A component to create a guess row
    function UserAnswerRow({attemptNumber, attemptGuess}) {
            return (
                <div className="guesses">
                    {attemptGuess.guess.map((guessedLetter, index) => 
                    <LetterBox key={`${attemptNumber}-${index}`} position={index} attemptNumber={attemptNumber} guessed={guessedLetter} letterClass={attemptGuess.result[index]}/>
                    )}  
                </div>
            )
    }



    return(
        <>
        <div className="container">
        <h1>It's Not Wordle, but ...</h1>
        <div className="container">
        <UserAnswerRow attemptNumber={1} attemptGuess={firstGuess}/>
        <UserAnswerRow attemptNumber={2} attemptGuess={secondGuess}/>
        <UserAnswerRow attemptNumber={3} attemptGuess={thirdGuess}/>
        <UserAnswerRow attemptNumber={4} attemptGuess={fourthGuess}/>
        <UserAnswerRow attemptNumber={5} attemptGuess={fifthGuess}/>
        <UserAnswerRow attemptNumber={6} attemptGuess={sixthGuess}/>
        <AspenSays/>
        </div>
        <div className="first-row">
            {firstRow.map((letter) => 
            <Keyboard key={letter} letter={letter}/>)
            }
        </div>
        <div className="second-row">
            {secondRow.map((letter) => 
            <Keyboard key={letter} letter={letter}/>)
            }
        </div>
        <div className="third-row">
            <button className="enter" onClick={()=> {
                let [currentAttempt, setCurrentAttempt] = getAttempt();
                let word = currentAttempt.guess;
                // First, figure out if it's a word in the answers array
                let guessAsString = word.join("").toLocaleLowerCase();
                let filteredAnswers = allWords.filter(word => word == guessAsString);
                if (filteredAnswers.length < 1) {
                    setMessage(`That's not an accepted word`);
                    return null;
                }
                checkLetters();
                let newAttempt = attempt + 1;
                if (newAttempt > 6) {
                    setMessage(`The winning word was ${winning}`);
                    return null;
                }
                if (guessAsString == winning.toLocaleUpperCase()) {
                    setMessage(`You got it!`);
                    return null;
                }
                setAttempt(newAttempt);
                setGuessPosition(0);
            }}>ENTER</button>
            {thirdRow.map((letter) => 
            <Keyboard key={letter} letter={letter}/>)
            }
            <button className="delete" onClick={()=> {
                if (guessPosition == 0) {
                    return null
                };
                let [currentAttempt, setCurrentAttempt] = getAttempt();
                let newGuess = currentAttempt;
                newGuess.guess.splice((guessPosition - 1), 1, null);
                setCurrentAttempt(newGuess);
                let newPosition = guessPosition - 1;
                setGuessPosition(newPosition);
            }}>⌫</button>
        </div>
        
        </div>
        </>
    ); 
        
    
}

//Render it
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);