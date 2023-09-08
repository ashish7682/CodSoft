var screen = document.querySelector('.calculator_screen'),
    numBtns = document.querySelectorAll('.num'),
    operatorBtns = document.querySelectorAll('.operatorBtn'),
    equalBtn = document.querySelector('.equalBtn'),
    allClearBtn = document.querySelector('.allClear'),
    deleteBtn = document.querySelector('.delete'),
    parcent = document.querySelector('.parcent'),
    resultDisplayed = false;



    // adding click handler to number buttons
    for(var i=0; i<numBtns.length; i++){
        numBtns[i].addEventListener('click', function(e){

            // storing current input string and its last character in variables.
            var currentString = screen.value
            var lastChar = currentString[currentString.length - 1]

            if(resultDisplayed === false){
                screen.value += e.target.innerHTML
            }

            else if(resultDisplayed === true && lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷"){
                resultDisplayed = false
                screen.value += e.target.innerHTML
            }

            else{
                resultDisplayed = false
                screen.value = ""
                screen.value += e.target.innerHTML
            }
        })
    }


    // adding click handler to operator buttons
    for(var i=0; i<operatorBtns.length; i++){
        operatorBtns[i].addEventListener('click', function(e){

             // storing current input string and its last character in variables.
             var currentString = screen.value
             var lastChar = currentString[currentString.length -1]

             if(lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
                var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML
                screen.value = newString
             }

             else if(currentString.length == 0){
                alert("Enter a number first.")
             }

             else{
                screen.value += e.target.innerHTML
             }
        })
    }


    // adding click handler to equal button
    equalBtn.addEventListener('click', function(){
        var inputString = screen.value

        var numbers = inputString.split(/\+|\-|\×|\÷/g)

        var operators = inputString.replace(/[0-9]|\./g, "").split("")

        // console.log(inputString);
        // console.log(numbers);
        // console.log(operators);


        // now we are looping through the array and doing one operation at a time.
        // first divide, then multiply, then subtraction and then addition

        var divide = operators.indexOf("÷")
        while(divide != -1){
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
            operators.splice(divide, 1)
            divide = operators.indexOf("÷")
        }


        var multiply = operators.indexOf("×")
        while(multiply != -1){
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1])
            operators.splice(multiply, 1)
            multiply = operators.indexOf("×")
        }


        var subtract = operators.indexOf("-")
        while(subtract != -1){
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1])
            operators.splice(subtract, 1)
            subtract = operators.indexOf("-")
        }

        var add = operators.indexOf("+")
        while(add != -1){

            // using parseFloat is necessary, otherwise it will show result in string concatenation.
            numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]))
            operators.splice(add, 1)
            add = operators.indexOf("+")
        }

        screen.value = numbers[0] // displaying the output
        resultDisplayed = true

    })


    allClearBtn.addEventListener('click', function(){
        screen.value = ""
    })

    deleteBtn.addEventListener('click', function(){
        var deleteValue = screen.value.slice(0, -1)
        screen.value = deleteValue
    })


    parcent.addEventListener('click', function(){
        var par = eval(screen.value / 100)
        screen.value = par
    })