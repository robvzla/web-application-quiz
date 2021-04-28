//  Initializing and declaring the userName variable out of the scope so I can access to its value
//  at the end of the quiz for feedback
let userName = "";
//  Referencing all the html elements that I want to write based on user performance on the quiz
//  introSection is the introduction that I will display and hide at the beginning of the quiz
const introSection = document.getElementById("introductionSection");
//  questionSection is the whole questions that contains multiple choice, true or false, fill in the blank, etc..
const questionSection = document.getElementById("Questions");
//  nameFeedbackSection reference the html part that I will be updating based on what name the user type at the start of the quiz
const nameFeedbackSection = document.getElementById("nameFeedback");
//  totalQuestionsSection reference the total number of questions that will be display in the feedback section
const totalQuestionsSection = document.getElementById("totalQuestions");
//  numberOfCorrect reference the html part of the table that updates automatically based on how well or bad user performs on the quiz
const numberOfCorrect = document.getElementById("numberOfCorrect");
//  numberOfIncorrect reference the html part of the table that updates automatically based on how well or bad user performs on the quiz
const numberOfIncorrect = document.getElementById("numberOfIncorrect");
//  percentage reference the html part where I will be displaying user's overall performance
const percentage = document.getElementById("percentage");
//  score reference the html part where I will be displaying user's score after quiz is done
const score = document.getElementById("score");
//  clickCounter keeps track of how many times the user clicks the Next button and updates question number on top
var clickCounter = 0;
//  feeedBackString is going to contain the message that will be displayed to the user at the end of the quiz
let feedbackString = "";
//  incorrectFeedback reference the html section where I place what questions were wrong and explanation
const incorrectFeedback = document.getElementById("incorrectFeedback");

//  GetUserName function makes sure we capture user's name, otherwise it will not let the user continue and display an alert on screen
function getUserName ()
{
    //  userName get the value that has been input by user and store it so it can be used at the feedback section at the end
    userName = document.getElementById("userName").value;
    //  If user leaves name part empty an alert will be display on screen asking for user's name
    if( userName == "")
    {
        alert("Do not leave name in blank. Please enter your name!!!");
    }
    else
    {
        //  Once a name is entered and store in our variable we add the class "hide" to hide our introduction panel and
        //  then remove the class hide from our question panel so the user can start the quiz
        introSection.classList.add("hide");
        questionSection.classList.remove("hide");
        createMainArray();
        nextQuestion();
        clickCounter++;
    }
}
//  Adding a event listener to our start button to perform our function "getUserName"
document.getElementById("startingBtn").addEventListener("click", getUserName);

//  feebackSection references the html part where message will be display after quizz
const feedbackSection = document.getElementById("feedbackSection");
//  getting access to button 'NEXT'
var nextBtn = document.getElementById("NextBtn");

//  Main function of the game will contain display questions, options, get and check results
function mainGame()
{
    //  As long as questions are under total number of questions, then more questions are going to be displayed
    if (clickCounter !== displayArray.length) 
    {
        textInputField = document.getElementById("userTextAnswer").value.toLowerCase();
        getResult();
        nextQuestion();
        clickCounter++;
    } 
    else 
    {
        //  Getting user's input for text field questions
        textInputField = document.getElementById("userTextAnswer").value.toLowerCase();
        //  Getting results into an array of user's guess
        getResult();
        userAnswer;
        correctAnswersArray;
        var correct = 0;
        var incorrect = 0;
        //  This for loop checks the user's answer array and compare it with my correct answers array to find for 
        //  correct and incorrect answers
        for (let index = 0; index < displayArray.length; index++) 
        {
            var incorrectLocator = null;
            if (userAnswer[index] === correctAnswersArray[index]) 
            {
                correct++;
            }
            else
            {
                incorrect++;
                incorrectLocator = index;
            }
            //  This following condition is to display the questions the user did not guess right and
            //  display their correct answer
            if (incorrectLocator !== null) 
            {
                //  We create paragraphs elements for the question itself and the answer and then append their texts
                //  into their html by using appendChild
                incorrectFeedback.classList.remove("hide");
                var createParagraph = document.createElement("p");
                createParagraph.setAttribute("class", "correctionFeedback");
                var questionContent = questionForFeedback[incorrectLocator].question;
                var nodeQuestion = document.createTextNode(questionContent);
                createParagraph.appendChild(nodeQuestion);

                var createCommentParagraph = document.createElement("p");
                createCommentParagraph.setAttribute("class", "correctionFeedbackAnswer");
                var answerContent = questionForFeedback[incorrectLocator].text;
                var nodeAswer = document.createTextNode(answerContent);
                createCommentParagraph.appendChild(nodeAswer);

                var elementText = document.getElementById("wrongQuestions");
                elementText.appendChild(createParagraph);
                elementText.appendChild(createCommentParagraph);
            }
        }
        // The following conditions is goint to change the feedbackString depending on how well or bad the user's
        //  performs on the quizz
        if (correct <= 1) 
        {
            feedbackString = "Too bad " + userName + ", You can do much better"
        } 
        else if ((correct > 1) && (correct <= 3))
        {
            feedbackString = "Well Done " + userName + ", You are better than average people"
        }
        else
        {
            feedbackString = "Amazing " + userName + ", You are very knowledgeable"
        }
        //  Assigning feedbackString to my feedback section where the user's name is going to be display
        nameFeedbackSection.innerHTML = feedbackString;
        //  Assingning number of question at the feedback section
        totalQuestionsSection.innerHTML = clickCounter;
        //  Assingning number of correct question at the feedback section
        numberOfCorrect.innerHTML = correct;
        //  Assingning number of incorrect question at the feedback section
        numberOfIncorrect.innerHTML = incorrect;
        //  percentage is calculated based on how many questions the user has guessed write
        percentage.innerHTML = ((correct*100)/clickCounter) + " %";
        //  This will be display at the end of the quizz
        score.innerHTML = correct + "/" + clickCounter;

        //  Once all the questions have been answered, we will hide the questions section and display the feedback section
        questionSection.classList.add("hide");
        feedbackSection.classList.remove("hide");
    }
}

//  This gets the top text that displays the questions for the user to read
const questionText = document.querySelector(".questionTextPlace");
//  This gets the html section to display the numbers of the questions
const questionNumbers = document.querySelector(".numbersPlace");

//  multipleChoiceSection reference the html section that is going to be display if a random question is a MCQ
const multipleChoiceSection = document.getElementById("multipleChoiceSection");
//  trueOrFalseSection reference the html section that is going to be display if a random question is a true or false question
const trueOrFalseSection = document.getElementById("trueOrFalseSection");
//  textInputSection reference the html section that is going to be display if a random question is a ttext field question
const textInputSection = document.getElementById("textInputSection");
//  Referencing my phot html section
const photoSection = document.getElementById("photosSection");
//  Getting acces to each of my images in html so I can modify their sources according to the question
const image0 = document.getElementById("image0");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
var imageIndexSelected;
var questionForFeedback = [];

//  Keeps track of the questions as the user click the next button
let questionCounter = 0;
//  currentQuestion var is going to help me get the selected question and its attributes
let currentQuestion;
//  mainArray is the one that contains my questions that has been randomly shuffled
let mainArray = [];
//  This array contains all the options of the current question
let optionArray = [];
// This will hold the correct answers as each questions are set during an iteration
let correctAnswersArray = []; 
//  These boleans are going to be use during the true or false section
let trueValue = false;
let falseValue = false;
//  this string contains user's input and store it for later check
let textInputField = "";


//  This function creates a new array out of the array that picked random questions
function createMainArray() 
{
    const totalNumberOfQuestions = displayArray.length;
    for (let i = 0; i < totalNumberOfQuestions; i++) 
    {
        mainArray.push(displayArray[i]);
    }
    console.log (mainArray);
}

//  The following function will prepare each html element and attach it to the correct question structure
function getNewQuestion()
{
    //  Setting question text on screen
    const randomQuestionIndex = mainArray[Math.floor(Math.random() * mainArray.length)];
    currentQuestion = randomQuestionIndex;
    questionText.innerHTML = currentQuestion.question;
    console.log("CURRENT QUESTION = ");
    console.log(currentQuestion);
    const typeOfQuestion = currentQuestion.type;
    //  This is an array containing all correct answers
    correctAnswersArray.push(currentQuestion.answer);
    questionForFeedback.push(currentQuestion);
    console.log("My feedback questions: ");
    console.log(questionForFeedback);
    console.log ("THIS IS MY CORRECT ARRAY: " + correctAnswersArray);

    //  These conditions are going to display each question according to their types set during the creation of the object
    //  if the question is of type Multiple Choice, then the True or False section and Text section are going to be hide and so on
    if (typeOfQuestion === "Multiple Choice") 
    {
        multipleChoiceSection.classList.remove("hide");
        trueOrFalseSection.classList.add("hide");
        textInputSection.classList.add("hide");
        photoSection.classList.add("hide");
    } 
    else if (typeOfQuestion === "True or False") 
    {
        multipleChoiceSection.classList.add("hide");
        trueOrFalseSection.classList.remove("hide");
        textInputSection.classList.add("hide");
        photoSection.classList.add("hide");
    }
    else if (typeOfQuestion === "Text") 
    {
        multipleChoiceSection.classList.add("hide");
        trueOrFalseSection.classList.add("hide");
        textInputSection.classList.remove("hide");
        photoSection.classList.add("hide");
    }
    else if(typeOfQuestion === "Photo")
    {
        multipleChoiceSection.classList.add("hide");
        trueOrFalseSection.classList.add("hide");
        textInputSection.classList.add("hide");
        photoSection.classList.remove("hide");
    }

    //  To avoid repeated question texts I will first get the index and then remove that element at the given
    //  index using splice
    const indexIdentifier = mainArray.indexOf(randomQuestionIndex);
    mainArray.splice(indexIdentifier, 1);

    //  Setting the question number on screen
    questionNumbers.innerHTML = "Question " + (questionCounter + 1) + " of " + displayArray.length;

    //  Setting options on screen
    const optionsLenght = currentQuestion.options.length;
    //  Pushing optiong from my displayArray to my mainArray   Currently not being used, remember to remove it!!!!!!
    for (let i = 0; i < optionsLenght; i++) 
    {
        optionArray.push(currentQuestion.options[i]);
    }
    console.log("Checking options: " +optionArray);

    //  Creating the element options in html
    //  This loop set up the options for MCQ and Photos questions
    for (let j = 0; j < optionsLenght; j++) 
    {
        //  Getting the html elements
        var inputContainer12 = document.getElementById("container" + j); 
        //  Getting access to radioInput
        var getValue = document.getElementById("radioInput"+j); 
        var optionsInsideCurrent = currentQuestion.options[j];
        //  Setting the value of each option in MCQ, so I can compare with result
        getValue.setAttribute("value", j);
        //  Linking the options of my objects.js questionBank array to the html element
        inputContainer12.innerText = optionsInsideCurrent;
        if (typeOfQuestion === "Photo") 
        {
            var photoElement = document.getElementById("image" + j);
            var sourcePath = currentQuestion.options[j];
            if (j === 0) 
            {
                image0.setAttribute("src", sourcePath);
            } 
            else if (j ===1)
            {
                image1.setAttribute("src", sourcePath);
            }
            else if (j === 2)
            {
                image2.setAttribute("src", sourcePath);
            }
            else if (j === 3)
            {
                image3.setAttribute("src", sourcePath);
            }
        }
    }
    //  This condition will handle true or false buttons when a question is displayed
    if (typeOfQuestion === "True or False") 
    {
       console.log("THIS IS A TRUE OR FALSE QUESTION");
       //   Getting the reference of my buttons in html
       var trueBtn = document.getElementById("true");
       var falseBtn = document.getElementById("false");
       //   Adding an eventlistener so I can modify the value of the user's answer
       trueBtn.addEventListener("click", function(){
           console.log("True Button Was Pressed");
           //  Adding and removing class pressed so the user know which button is selected
           trueBtn.classList.add("pressed");
           falseBtn.classList.remove("pressed");
           trueValue = true;
           falseValue = false;
       })
       falseBtn.addEventListener("click", function(){
        console.log("False Button Was Pressed");
        //  Adding and removing class pressed so the user know which button is selected
        trueBtn.classList.remove("pressed");
        falseBtn.classList.add("pressed");
        trueValue = false; 
        falseValue = true;
    })
    } 
    if (typeOfQuestion === "Photo") 
    {
       //   Getting the reference of my images in html
       var image0Clicked = document.getElementById("image0");
       var image1Clicked = document.getElementById("image1");
       var image2Clicked = document.getElementById("image2");
       var image3Clicked = document.getElementById("image3");
       //   Adding an eventlistener and chaanging the opacity of the picture so I can know which image the user selected
       image0Clicked.addEventListener("click", function(){
           imageIndexSelected = 0;
           image0Clicked.classList.add("imagePressed");
           image1Clicked.classList.remove("imagePressed");
           image2Clicked.classList.remove("imagePressed");
           image3Clicked.classList.remove("imagePressed");
       })
       image1Clicked.addEventListener("click", function(){
        imageIndexSelected = 1;
        image0Clicked.classList.remove("imagePressed");
        image1Clicked.classList.add("imagePressed");
        image2Clicked.classList.remove("imagePressed");
        image3Clicked.classList.remove("imagePressed");
    })
    image2Clicked.addEventListener("click", function(){
        imageIndexSelected = 2;
        image0Clicked.classList.remove("imagePressed");
        image1Clicked.classList.remove("imagePressed");
        image2Clicked.classList.add("imagePressed");
        image3Clicked.classList.remove("imagePressed");
    })
    image3Clicked.addEventListener("click", function(){
        imageIndexSelected = 3;
        image0Clicked.classList.remove("imagePressed");
        image1Clicked.classList.remove("imagePressed");
        image2Clicked.classList.remove("imagePressed");
        image3Clicked.classList.add("imagePressed");
    })
    } 
    //  This is my most important button. When 'NEXT' is clicked it will first check user's answer and then display a new question on screen
    nextBtn.addEventListener("click", mainGame);
    //  updating question's number
    questionCounter++;
}
//  This array will hold the answers of the user
let userAnswer = [];
//  This function get the user's answer and store it into an array called userAnswer
function getResult() 
{
    //  Accesing to the correct result of the current question that was created in the script objects.js
    var correctResult = currentQuestion.answer;
    //  Getting the number of iptions of the current question
    const optionsLenght = currentQuestion.options.length;
    console.log("CORRECT RESULT: " + correctResult);
    //  Accessing to the MCQ radio input
    var selectedAnswer = document.getElementsByName("answers");
    //  This var will store the index at which the user has selected his/her answer in the MCQ section
    let valueHolder = 0;
    
    //  These conditions identify what type of question the user is currenty dealing with
    if (currentQuestion.type === "Multiple Choice") 
    {
        //  Checking which radio input has been selected
        for (let index = 0; index < optionsLenght; index++) 
        {
            if (selectedAnswer[index].checked === true) 
            {
                valueHolder = index;
            }
        }
        //  If no input has been selected then the default answer will be null
        if (valueHolder === 0) 
        {
            userAnswer.push(null);
        }
        else
        {
            userAnswer.push(valueHolder);
        }
    }
    else if (currentQuestion.type === "True or False")
    {
        for (let k = 0; k < 1; k++) 
        {
            if ((trueValue === true) && (falseValue === false)) 
            {
                userAnswer.push(0);
            }
            else if ((trueValue === false) && (falseValue === true))
            {
                userAnswer.push(1);
            }
            else
            {
                userAnswer.push(null);
            }
        }
    }
    else if ((currentQuestion.type === "Text"))
    {
        if (textInputField === "") 
        {
            userAnswer.push(null);
        } 
        else 
        {
            userAnswer.push(textInputField);
        }
        
    }
    else if ((currentQuestion.type === "Photo"))
    {
        if (imageIndexSelected === 0) 
        {
            userAnswer.push(0);
        } 
        else if (imageIndexSelected === 1)
        {
            userAnswer.push(1);
        }
        else if (imageIndexSelected === 2)
        {
            userAnswer.push(2);
        }
        else if (imageIndexSelected === 3)
        {
            userAnswer.push(3);
        }
        else
        {
            userAnswer.push(null);
        }
    }   
    console.log("User Guess Array: ");
    console.log(userAnswer);

}
//  This function displays a new question as long as the current question hasn't passed the limit number of question
function nextQuestion() 
{
    if (questionCounter === displayArray.length)
    {
        //  For test purposes ONLY
        console.log("QUIZ IS OVER");    
    } 
    else 
    {
        getNewQuestion();
    }
}
