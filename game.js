

const winningWord = ['A','S','P','E','N'];
let updateCounter = 1




const firstRow = ['Q','W','E','R','T','Y','U','I','O','P'];
const secondRow = ['A','S','D','F','G','H','J','K','L'];
const thirdRow = ['Z','X','C','V','B','N','M'];



function App(){
    const { useState, useEffect } = React; 
    const [attempt, setAttempt] = React.useState(1);
    const [currentGuess, setCurrentGuess] = React.useState([null, null, null, null, null]);
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
    
    
    
    const [guessPosition, setGuessPosition] = React.useState(0)
    
    //A function to check guess against winningWord
    const checkLetters = () => {
        let [currentAttempt, setCurrentAttempt] = getAttempt();
        let word = currentAttempt.guess;
        let newClasses = [];
        for (let i=0; i<5; i++) {
            let filtered = winningWord.filter(letter => letter == word[i]);
            if (word[i] == winningWord[i]) {
                newClasses.push('in-place');
            } else if (filtered.length < 1) {
                newClasses.push('absent');
            } else {
                newClasses.push('wrong-place');
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

    const getRowState = (attemptNumber) => {
        let theAttempt;
        switch (attemptNumber) {
            case 1 : 
                theAttempt = firstGuess;
                break;
            case 2 : 
                theAttempt = secondGuess;
                break;
            case 3 : 
                theAttempt = thirdGuess;
                break;
            case 4 : 
                theAttempt = fourthGuess;
                break;
            case 5 : 
                theAttempt = fifthGuess;
                break;
            case 6 : 
                theAttempt = sixthGuess;
                break;
            default : 
                theAttempt = firstGuess;
                break;
        };
        return theAttempt;
    }


    //The Keyboard Component
    function Keyboard({letter}) {
        console.log('Rendereding keyboard ------------------');
        return (
            <button className="letter" id={letter} onClick={(e) => {
                let [currentAttempt, setCurrentAttempt] = getAttempt();
                console.log(currentAttempt);
                console.log(setCurrentAttempt);
                if (guessPosition == 5) {
                    return null;
                }
                let newGuess = currentAttempt;
                newGuess.guess.splice(guessPosition, 1, e.target.innerText);
               
                setCurrentAttempt(newGuess);
                let currentPosition = guessPosition
                console.log(`Current Guess is ${currentGuess}`);
                console.log(`CurrentAttempt is ${currentAttempt}`);
                
                setGuessPosition(currentPosition + 1);
                
            }}>{letter}</button>
        ) 
    }

    //A component to make a letter box in a guess row
    function LetterBox({position, attemptNumber, guessed, letterClass}) {
        console.log(`Rendering ${attemptNumber} - ${position}`);
        console.log(`Guess passed in is ${guessed}`);
        return (
            <div className={letterClass}>{guessed}</div>
        )
    }



    //A component to create a guess row
    function UserAnswerRow({attemptNumber, attemptGuess}) {
        console.log(`----------------------Rendering row ${attemptNumber}`);
        console.log(firstGuess);
        console.log(secondGuess);
        console.log(thirdGuess);
        
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
        <h1>It's Not Wordle, but ...</h1>
        <UserAnswerRow attemptNumber={1} attemptGuess={firstGuess}/>
        <UserAnswerRow attemptNumber={2} attemptGuess={secondGuess}/>
        <UserAnswerRow attemptNumber={3} attemptGuess={thirdGuess}/>
        <UserAnswerRow attemptNumber={4} attemptGuess={fourthGuess}/>
        <UserAnswerRow attemptNumber={5} attemptGuess={fifthGuess}/>
        <UserAnswerRow attemptNumber={6} attemptGuess={sixthGuess}/>
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
            <button onClick={()=> {
                checkLetters();
                let newAttempt = attempt + 1;
                setAttempt(newAttempt);
                setGuessPosition(0);
            }}>Enter</button>
            {thirdRow.map((letter) => 
            <Keyboard key={letter} letter={letter}/>)
            }
            <button onClick={()=> {
                if (guessPosition == 0) {
                    return null
                };
                let [currentAttempt, setCurrentAttempt] = getAttempt();
                let newGuess = currentAttempt;
                newGuess.guess.splice((guessPosition - 1), 1, null);
                console.log(`In the delete function, newGuess is ${newGuess}`);
                setCurrentAttempt(newGuess);
                let newPosition = guessPosition - 1;
                setGuessPosition(newPosition);
            }}>⌫</button>
        </div>
        </>
    ); 
        
    
}

//Render it
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);