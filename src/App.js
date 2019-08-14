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
    };
    
    this.internalExpression = {
        expression: "empty",
        previousCharacter: "empty", //will be either "number" or "operator"
    };
    
    
    //binds
    this.buttonClickEventHandler = this.buttonClickEventHandler.bind(this);
    this.assignClickEvent = this.assignClickEvent.bind(this);
    this.updateInternalExpression = this.updateInternalExpression.bind(this);
    this.isOperator = this.isOperator.bind(this);
    this.typeOfValue = this.typeOfValue.bind(this);
    this.calculateAnswer = this.calculateAnswer.bind(this);
    this.resetInternalExpression = this.resetInternalExpression.bind(this);
    this.updateRTDisplay = this.updateRTDisplay.bind(this);
    
    //function calls
    //window.onload();
    
}

assignClickEvent() {
    for(let i = 1; i < 18; i++) {
        document.getElementById(`btn${i}`).addEventListener("click",this.buttonClickEventHandler);
    }
}
    
buttonClickEventHandler(event) {
    //this takes an event (i.e. a button object), and then inputs its value into the internal expression variable
    
    const i = event.target.id;
    let inputValue = document.getElementById(i).value;
    console.log(`inside button click event method; value is: ${inputValue}`);
    
    //determines if the expression can accept more characters
    if (this.internalExpression.expression.length < 3 && this.internalExpression.expression !== "empty") {
        this.updateInternalExpression(inputValue);
        //update the RT display
        this.updateRTDisplay();
        
    }
    else if(this.internalExpression.expression === "empty") {
        this.updateInternalExpression(inputValue);
        //update the RT display
        this.updateRTDisplay();
    }
    //will calc answer and then update internal expression
    else {
        //calculatAnswer
        const answer = this.calculateAnswer(this.internalExpression.expression);
        //after answer is calcated, reset internal expression
        this.resetInternalExpression();
        this.updateFinalResultsDisplay();
    }
    
}
    
updateFinalResultsDisplay(value) {
    //this will return a react element
}

updateRTDisplay() {
    let expression = this.internalExpression.expression;
    let result = "";
    expression.forEach(function(item) {
        result += item + " ";
    }
    )
    this.setState({
        realTimeOutput = result;
    })
}
    
updateInternalExpression(inputValue) {
    //checks if the interal expression is empty
    if(this.internalExpression.expression.toString() === "empty") {
        this.internalExpression = inputValue.toString();
    }
    //if expression is not empty, test the input value to determine how it is processed
    else {
        if (this.isOperator(inputValue) === true) {
        //if the input is an operator, and the previous character in the global expression is an number
            if(this.internalExpression.previousCharacter === "number") {
                this.internalExpression.expression += inputValue.toString();
        }
        //do nothing if the inputted and previous values are both operators!!
        }
        else if (this.isOperator(inputValue) === false) {
            //if the input is a number, and the previous character in the global expression is an operator
            if(this.internalExpression.previousCharacter === "operator") {
                this.internalExpression.expression += inputValue.toString();
            }
            //do nothing if the inputted and previous values are both numbers!!
        }
        //records the type of value that was input last
        this.typeOfValue(inputValue);
    }
}
    
calculateAnswer(expression) {
    console.log("now the answer is calculated");
    const answer = math.eval(expression);
}
    

typeOfValue(value) {
    let expression = this.internalExpression.expression;
    let lastExpressionCharacter = expression[(expression.length -1)];
    if (expression !== "empty") {
        this.internalExpression.previousCharacter = (this.isOperator(lastExpressionCharacter)===true) ? "operator" : "number";
    }
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
       
resetInternalExpression() {
        this.internalExpression.expression = "empty";
        this.internalExpression.previousCharacter = "empty";
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
                    `${this.state.finalOutput}`
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                        &nbsp;
                </div>
                <div className="col-md-4" id="RTDisplay">
                    `${this.state.realTimeOutput}`
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
