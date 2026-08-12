const numberBtn = document.querySelectorAll(".number")
const clearBtn = document.querySelector("#btn-clear")
const operatorBtn = document.querySelectorAll(".operator")
const equalsBtn = document.querySelector(".equals")
const removeBtn = document.querySelector(".remove")
const currentDisplay = document.querySelector("#currentDisplay")
const prevDisplay = document.querySelector("#prevDisplay")
let expression = ""
function runEvents() {
    numberBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            expression += btn.textContent;
            currentDisplay.value = expression;

        })
    })
    operatorBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            expression += btn.textContent;
            currentDisplay.value = expression;
        })
    })
    equalsBtn.addEventListener("click", () => {
        if(expression === "") return;
        const safeExpression = expression.replace(/x/g, "*")
        const result = eval(safeExpression)
        prevDisplay.value = expression;
        currentDisplay.value = result;
        expression = result.toString()
    })
    removeBtn.addEventListener("click",()=>{
        expression = expression.slice(0,-1)
        currentDisplay.value = expression
    })
    clearBtn.addEventListener("click",()=>{
        expression = ""
        currentDisplay.value = ""
        prevDisplay.value = ""
    })
}
runEvents()
