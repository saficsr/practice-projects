const startScreen = document.querySelector(".start-screen")
const questionScreen = document.querySelector(".question-cards")
const resultScreen = document.querySelector(".result-screen")
const startBtn = document.querySelector(".start-btn")
const questionCounter = document.querySelector("#question-progression")
const counter = document.querySelector("#counter")
const progressFill = document.querySelector(".progress-fill")
const nextBtn = document.querySelector(".next-btn")
const score = document.querySelector("#answered-numbers")
const correctPercentage = document.querySelector("#correct-percentage")
const restartBtn = document.querySelector(".restart-btn")
const questionText = document.querySelector(".question-text p")
const answerCards = document.querySelector(".answer-cards")
const reviewList = document.querySelector(".review-list")
const missText = document.querySelector(".miss-text p")

const QUESTION_TIME = 30
const answers = new Map()
let timeLeft = 30
let timerId = null
let questions = []
let currentIndex = 0
let selectedAnswer = null
function decode(text) {
    const temp = document.createElement("textarea")
    temp.innerHTML = text
    return temp.value
}
const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple"
async function getData() {
    try {
        startBtn.disabled = true
        startBtn.textContent = "Loading..."
        const response = await fetch(API_URL)
        const data = await response.json()
        questions = data.results.map(item => {
            return {
                question: decode(item.question),
                options: shuffle([...item.incorrect_answers, item.correct_answer].map(decode)),
                correct: decode(item.correct_answer)
            }
        })
        startBtn.disabled = false
        startBtn.textContent = "Start"
    }
    catch (error) {
        startBtn.textContent = "Try again"
        startBtn.disabled = false

    }
}
getData()


startBtn.addEventListener("click", startQuiz)
function startQuiz() {
    startScreen.classList.add("hidden")
    questionScreen.classList.remove("hidden")
    showQuestion()
}
function showQuestion() {
    selectedAnswer = null
    nextBtn.disabled = true
    const current = questions[currentIndex]
    questionText.textContent = current.question
    answerCards.innerHTML = ""
    current.options.forEach(answer => {
        const btn = document.createElement("button")
        btn.textContent = answer
        btn.classList.add("answer-btn")
        btn.addEventListener("click", () => {
            answerCards.querySelectorAll(".answer-btn").forEach(b => {
                b.classList.remove("selected")
            })
            btn.classList.add("selected")
            selectedAnswer = answer
            nextBtn.disabled = false
        })
        answerCards.appendChild(btn)

    })
    const percent = ((currentIndex + 1) / questions.length) * 100
    progressFill.style.width = percent + "%"
    questionCounter.textContent = currentIndex + 1
    if (currentIndex === questions.length - 1) {
        nextBtn.textContent = "Finish quiz"
    } else {
        nextBtn.textContent = "Next question"
    }
    startTimer()
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}
nextBtn.addEventListener("click", nextQuestion)
function nextQuestion() {
    answers.set(currentIndex, selectedAnswer)
    currentIndex++
    if (currentIndex < questions.length) {
        showQuestion()
    }
    else {
        showResult()
    }
}
function showResult() {
    let correctCount = 0
    clearInterval(timerId)
    questionScreen.classList.add("hidden")
    resultScreen.classList.remove("hidden")
    questions.forEach((q, i) => {
        if (answers.get(i) === q.correct) {
            correctCount++
        }
    })
    score.textContent = correctCount
    correctPercentage.textContent = Math.round((correctCount / questions.length) * 100)
    if (correctCount === questions.length) {
        missText.classList.add("hidden")
    } else {
        missText.classList.remove("hidden")
    }
    reviewList.innerHTML = ""
    questions.forEach((q, i) => {
        if (answers.get(i) === q.correct) return
        const reviewItem = document.createElement("div")
        reviewItem.classList.add("review-item")
        const reviewQuestion = document.createElement("p")
        reviewQuestion.classList.add("review-question")
        const yourAnswer = document.createElement("p")
        yourAnswer.classList.add("your-answer")
        const correctAnswer = document.createElement("p")
        correctAnswer.classList.add("correct-answer")
        reviewItem.append(reviewQuestion, yourAnswer, correctAnswer)
        reviewList.appendChild(reviewItem)
        reviewQuestion.textContent = q.question
        const userAnswer = answers.get(i)
        yourAnswer.textContent = `Your answer: ${userAnswer === null ? "no answer" : userAnswer}`
        correctAnswer.textContent = `Correct answer: ${q.correct}`

    })
}
restartBtn.addEventListener("click", restart)
function restart() {
    currentIndex = 0
    selectedAnswer = null
    answers.clear()
    getData()
    resultScreen.classList.add("hidden")
    startScreen.classList.remove("hidden")
}
function startTimer() {
    counter.classList.remove("danger")
    clearInterval(timerId)
    timeLeft = QUESTION_TIME
    counter.textContent = "00:" + String(QUESTION_TIME).padStart(2, "0")

    timerId = setInterval(() => {
        timeLeft--
        counter.textContent = "00:" + String(timeLeft).padStart(2, "0")
        if (timeLeft <= 5) {
            counter.classList.add("danger")
        }
        if (timeLeft <= 0) {
            clearInterval(timerId)
            nextQuestion()
        }
    }, 1000)
}