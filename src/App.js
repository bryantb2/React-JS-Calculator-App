import React from 'react';
import './App.css';
import Bootstrap from '../node_modules/react-bootstrap';

class App extends React.Component {

constructor(props) {
    super(props);
    
    this.state = {};
    this.state = {
        //these are display strings
        finalOutput: "",
        realTimeOutput: "",
        displayingFinalTotal: false, //tracking if data is being displayed
        displayingExpression: false,
    };
    
    //records the expression to be evaluated
    this.internalExpression = {
        expression: "empty",
        previousCharacter: "empty", //will be either "number" or "operator"
    };
    
    //BINDS
    this.buttonClickEventHandler = this.buttonClickEventHandler.bind(this);
    this.enterButtonClickEventHandler = this.enterButtonClickEventHandler.bind(this);
    this.clearButtonClickEventHandler = this.clearButtonClickEventHandler.bind(this);
    this.assignClickEvent = this.assignClickEvent.bind(this);
    this.updateInternalExpression = this.updateInternalExpression.bind(this);
    this.isOperator = this.isOperator.bind(this);
    this.typeOfValue = this.typeOfValue.bind(this);
    this.isNumber = this.isNumber.bind(this);
    this.calculateAnswer = this.calculateAnswer.bind(this);
    this.resetInternalExpression = this.resetInternalExpression.bind(this);
    this.resetRTDisplay = this.resetRTDisplay.bind(this);
    this.resetFinalResultsDisplay = this.resetFinalResultsDisplay.bind(this);
    this.updateRTDisplay = this.updateRTDisplay.bind(this);
    this.updateFinalResultsDisplay = this.updateFinalResultsDisplay.bind(this);
}

//EVENT HANDLERS AND LISTENERS  -----------------------------------------
assignClickEvent() {
    for(let i = 1; i < 18; i++) {
       if (i === 16) {
           document.getElementById("btn16").addEventListener("click",this.clearButtonClickEventHandler);
       }
        else if (i === 17) {
            document.getElementById("btn17").addEventListener("click",this.enterButtonClickEventHandler);
        }
        else {  
            document.getElementById(`btn${i}`).addEventListener("click",this.buttonClickEventHandler);
        }
    }
}

enterButtonClickEventHandler(event) {
    //calculate answer
    //add answer to final answer, if present
    //update final results display
    //reset real time display
    let answer = this.calculateAnswer(this.internalExpression.expression);
    if (this.state.displayingFinalTotal === true) {
        answer += this.state.finalOutput;
    }
    this.updateFinalResultsDisplay(answer);
    this.resetInternalExpression();
    this.resetRTDisplay();
}    
    
clearButtonClickEventHandler(event) {
    //reset internal expression
    //first reset RTDisplay
    //then reset final display on second press (do this first if RTDdisplay has no values)
    this.resetInternalExpression();
    if (this.state.displayingExpression === true) {
        this.resetRTDisplay();
    }
    else {
        this.resetFinalResultsDisplay();
    }
    
}
    
buttonClickEventHandler(event) {
    //this takes an event (i.e. a button object), and then inputs its value into the internal expression variable
    
    const i = event.target.id;
    let inputValue = document.getElementById(i).value;
    console.log(`inside button click event method; value is: ${inputValue}`);
    
    //determines if the expression can accept more characters
    if (this.internalExpression.expression !== "empty") {
        if (this.internalExpression.expression.length < 6) {
                this.updateInternalExpression(inputValue);
                //update the RT display {
                this.updateRTDisplay(this.internalExpression.expression);
        }
        //will calc answer and then update internal expression
        else {
            //calculatAnswer
            const answer = this.calculateAnswer(this.internalExpression.expression);
            //after answer is calcated, reset internal expression
            this.resetInternalExpression();
            this.resetRTDisplay();
            this.updateFinalResultsDisplay(answer);
        }
    }
    //executes under the assumption the expression is empty
    else {
        this.updateInternalExpression(inputValue);
        //update the RT display
        this.updateRTDisplay(this.internalExpression.expression);
    }
}
    
//INTERNAL EXPRESSION METHODS -----------------------------------------
updateInternalExpression(inputValue) {
    //checks if the interal expression is empty
    if(this.internalExpression.expression.toString() === "empty") {
        //checks to make sure the math syntax being entered is correct
        if (this.isNumber(inputValue) === true) {
            this.internalExpression.expression = inputValue.toString();
        }
        else {
            alert("Please enter a number or parentheses");
        }
    }
    //if expression is not empty
    else {
        let expression = this.internalExpression.expression.toString();
        if (this.isOperator(inputValue) === true) {
        //if the input is an operator, and the previous character in the global expression is a number
            if(this.internalExpression.previousCharacter === "number") {
                expression += inputValue.toString();
                this.internalExpression.expression= expression;
            }
            else {
                alert("Please enter a number or parentheses");
            }
        //do nothing if the inputted and previous values are both operators!!
        }
        //executes if the input is not an operator (i.e. number or parentheses)
        else {
            expression += inputValue.toString();
            this.internalExpression.expression= expression;
        }
        //records the type of value that was input last
    }
    this.internalExpression.previousCharacter = this.typeOfValue(inputValue);
}    
    
resetInternalExpression() {
        this.internalExpression.expression = "empty";
        this.internalExpression.previousCharacter = "empty";
}    
    
calculateAnswer(expression) {
    console.log("now the answer is calculated");
    const answer = eval(expression);
    return answer;
}
    

typeOfValue(value) {
    let expression = this.internalExpression.expression;
    let lastExpressionCharacter = expression[(expression.length -1)];
    let type = "";
    if (expression !== "empty") {
        type = (this.isOperator(lastExpressionCharacter)===true) ? "operator" : "number";
    }
    return type;
}
    
isOperator(value) {
    value = value.toString();
    let operatorArray = ["-","+","/","*"];
    for (let i = 0; i < operatorArray.length; i++) {
        if(value === operatorArray[i])
            return true;
    }
    return false;
}

isNumber(value) {
    value = value.toString();
    let operatorArray = ["-","+","/","*"];
    for (let i = 0; i < operatorArray.length; i++) {
        if(value === operatorArray[i])
            return false;
    }
    return true;
}    
    
//UI METHODS -----------------------------------------------------------
updateFinalResultsDisplay(value) {
    this.setState({
        finalOutput: value,
        displayingFinalTotal: true
    });
}
    
resetFinalResultsDisplay() {
    //resets final results
    this.setState({
        finalOutput: "",
        displayingFinalTotal: false,
    })
}

resetRTDisplay() {
    //resets real-time display
    this.setState({
        realTimeOutput: "",
        displayingExpression: false,
    })
}    
    
updateRTDisplay(expression) {
    expression = Array.from(expression);
    let result = "";
    for (let character of expression) {
        if (this.isOperator(character) === true)
            result += (" " + character + " ");
        else
            result += character;
    }
    
    
    this.setState({
        realTimeOutput: result,
        displayingExpression: true,
    })
}

render() {
    
    window.onload = this.assignClickEvent;
    
    return (
    <div className="jumbotron bg-dark text-white">
        <div className="row">
            <div className="col-md-12">
                <h1 className="title">React JS Calculator</h1>
                <p className="info">With the help of Bootstrap 3's CDN (content delivery network) and Facebook's open source ES6 framework, React JS, I was able to put together a functional demonstration of the framework. As of 7/30/2019, this app uses two major React components: a <b><i>class</i></b> component for the main calculator UI that displays the results based off state updates while a second, <b><i>functional</i></b>, component handles the internal logic of the calculator, getting data and then spitting out results.</p>
                <div className="announcement"><b>Coming soon:</b> console logging of internal logic in real-time, providing a visual of the back-end logic.
            </div>
        </div>

        <div className="row">
            <div className="col-md-12">
                &nbsp;
            </div>
        </div>

        <div className="container-fluid">

            <div className="row">
                <div className="col-md-4">
                    &nbsp;
                </div>
                <div className="col-md-4" id="finalResult">
                    {this.state.finalOutput}
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                        &nbsp;
                </div>
                <div className="col-md-4" id="RTDisplay">
                    {this.state.realTimeOutput}
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    &nbsp;
                </div>
                <div className="col-md-1">
                    <button id="btn1" type="button" className="btn btn btn-block" value="1">1</button>
                </div>
                <div className="col-md-1">
                    <button id="btn2" type="button" className="btn btn btn-block" value="2">2</button>
                </div>
                <div className="col-md-1">
                    <button id="btn3" type="button" className="btn btn btn-block" value="3">3</button>
                </div>
                <div className="col-md-1">
                    <button id="btn4" type="button" className="btn btn btn-block" value="+">+</button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    &nbsp;
                </div>
                <div className="col-md-1">
                    <button id="btn5" type="button" className="btn btn btn-block" value="4">4</button>
                </div>
                <div className="col-md-1">
                    <button id="btn6" type="button" className="btn btn btn-block" value="5">5</button>
                </div>
                <div className="col-md-1">
                    <button id="btn7" type="button" className="btn btn btn-block" value="6">6</button>
                </div>
                <div className="col-md-1">
                    <button id="btn8" type="button" className="btn btn btn-block" value="-">-</button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    &nbsp;
                </div>
                <div className="col-md-1">
                    <button id="btn9" type="button" className="btn btn btn-block" value="7">7</button>
                </div>
                <div className="col-md-1">
                    <button id="btn10" type="button" className="btn btn btn-block" value="8">8</button>
                </div>
                <div className="col-md-1">
                    <button id="btn11" type="button" className="btn btn btn-block" value="9">9</button>
                </div>
                <div className="col-md-1">
                    <button id="btn12" type="button" className="btn btn btn-block" value="/">/</button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    &nbsp;
                </div>
                <div className="col-md-2">
                    <button id="btn13" type="button" className="btn btn btn-block" value="0">0</button>
                </div>
                <div className="col-md-1">
                    <button id="btn14" type="button" className="btn btn btn-block" value=")">)</button>
                </div>
                <div className="col-md-1">
                    <button id="btn15" type="button" className="btn btn btn-block" value="*">*</button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    &nbsp;
                </div>
                <div className="col-md-2">
                    <button id="btn16" type="button" className="btn btn btn-block" value="clear">Clear</button>
                </div>
                <div className="col-md-2">
                    <button id="btn17" type="button" className="btn btn btn-block" value="enter">Enter Button</button>
                </div>
            </div>
        </div>  
        </div>
    </div>
  )
};
}

export default App;
