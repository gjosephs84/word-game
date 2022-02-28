# Description
It's not Wordle, but ... Word Game is a for-educational-purposes-only functional clone of the popular word guessing game recently acquired by the New York Times. For me, it is an extra-curricular exercise to help cement my understanding of React, as well as stretch my logic muscles. 

In developing this clone, I was pushed to think deeply about components and how they work together. While most of the gameplay functionality of the original is present and working, this project is a work in progress, and will be updated regularly as I dive deeper into learning React through MIT XPro's Professional Certificate in Coding course.

On each page load, the software selects, at random, one of the nearly 2500 words that were part of Wordle's original word list. Refreshing the page will set a new word each time.

# How to Run
To play the game in your browser from anywhere, visit:
<a href="https://gjosephs84.github.io/word-game">gjosephs84.github.io/word-game</a>

To run it on your local machine, download/clone the repository. With node installed, cd to the directory in your terminal, and enter 'http-server'. Navigate to the provided localhost adress in your browser.

# Roadmap of Future Improvements
Presently, each click/tap on a keyboard button causes React to re-render everything. I am working on improving my understanding and moving the state variables into components so that each letter guessed causes less rendering.

Unlike original Wordle, the keyboard doesn't keep track of letters guessed, yet. I'll implement this functionality once I get my state issues sorted out.

As this is primarily a learning exercise for me, I will continue to update and refine the styling.

# License Information
This software is licensed MIT. See license for more information.