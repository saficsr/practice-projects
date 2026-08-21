# Practice Projects

Small projects I built while learning HTML, CSS and vanilla JavaScript.
No frameworks, no libraries — the goal was to practice the fundamentals
by building something end to end each time.

## Projects

### To-Do List
Add, delete and filter tasks. Tasks are stored in localStorage, so they
survive a page refresh.
`todo-list/`

### Calculator
Basic arithmetic with button and keyboard input, delete-last-character
and clear-all, and a separate display area for the previous expression.
`calculator/`

### Weather App
Search any city and get the current weather plus a 5-day forecast, using
the Open-Meteo API. Two chained requests (city name to coordinates, then
coordinates to forecast), with loading and error states.

[Live demo](https://saficsr.github.io/practice-projects/weather_app/) · `weather-app/`

### Quiz App
Five multiple-choice questions pulled from the Open Trivia DB API, with a
30-second timer per question that turns red in the last five seconds and
moves on automatically when it runs out. Answer options are shuffled on
every render, and a progress bar tracks how far you are through the quiz.

The result screen shows your score and percentage, plus a review section
listing only the questions you got wrong — your answer next to the correct
one. Restarting fetches a fresh set of questions.

[Live demo](https://saficsr.github.io/practice-projects/quiz_game/) · `quiz-app/`

## Ecommerce Store

A shopping site with a separate admin panel. Products are added, edited
and deleted from the admin page; the store page lists them with search, category
filters, a product detail modal and a shopping cart. Both pages share the same 
`localStorage`, and uploaded images are resized in the browser with canvas before
being saved so they fit in the storage quota.

**[Live demo](https://saficsr.github.io/practice-projects/ecommerce_store/index.html)** 
— the store starts empty; add a few products from the admin panel first.

[Read more](ecommerce_store)

## Built with

HTML, CSS, JavaScript (ES6+). No build tools — each project runs by
opening its `index.html`.

APIs used: [Open-Meteo](https://open-meteo.com/) (weather),
[Open Trivia DB](https://opentdb.com/) (quiz). Both are free and require
no API key.
