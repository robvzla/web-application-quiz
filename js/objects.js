//  The following is an array of Objects (questions, options, and answers).
//  By setting a type it will help me randomly choose each question while
//  compliying with the Assignment rules (1 MCQ, 1 images, 1 True or false, etc)

const questionsBank = [
    {
        question: "What is the capital of Venezuela ?",
        options: ["Berlin", "Paris", "Caracas", "Quito"],
        answer: 2,
        text: "The capital is Caracas",
        type: "Multiple Choice",
    },
    {
        question: "How many countries are there in the world ?",
        options: ["89", "191", "112", "195"],
        answer: 3,
        text: "There are 195 countries",
        type: "Multiple Choice",
    },
    {
        question: "What is 235 + 65 ?",
        options: ["240", "300", "301", "190"],
        answer: 1,
        text: "The sum is 300",
        type: "Multiple Choice",
    },
    {
        question: "Number of continents in the world ?",
        options: ["4", "9", "5", "7"],
        answer: 3,
        text: "There are 7 continents",
        type: "Multiple Choice",
    },
    {
        question: "Is the Antarctica the coldest continent ?",
        options: ["True", "False"],
        answer: 0,
        text: "Antartica is the coldest continent",
        type: "True or False",
    },
    {
        question: "Is Oscar Wilde Irish ?",
        options: ["True", "False"],
        answer: 0,
        text: "Yes, Oscar Wilde is Irish",
        type: "True or False",
    },
    {
        question: "Was Thomas Edison the inventor of the lightbulb ?",
        options: ["True", "False"],
        answer: 0,
        text: "Yes, Edison invented the lightbulb",
        type: "True or False",
    },
    {
        question: "Did the Irish Independence War ended in 1925 ?",
        options: ["True", "False"],
        answer: 1,
        text: "False, it ended on July of 1921",
        type: "True or False",
    },
    {
        question: "What color does mixing blue and yellow makes ?",
        options: ["green"],
        answer: "green",
        text: "it makes green color",
        type: "Text",
    },
    {
        question: "In which country is the Tower of Pisa located ?",
        options: ["italy"],
        answer: "italy",
        text: "It is located in Italy",
        type: "Text",
    },
    {
        question: "Name the fictional city Batman calls home ?",
        options: ["gotham"],
        answer: "gotham",
        text: "Gotham is the city of Batman",
        type: "Text",
    },
    {
        question: "Who wrote Hamlet ?",
        options: ["william shakespeare"],
        answer: "william shakespeare",
        text: "The one and only, William Shakespeare",
        type: "Text",
    },
    {
        question: "What is the flag of Mexico ?",
        options: ["images/italy_flag.png", "images/sweden_flag.png", "images/mexico_flag.png", "images/us_flag.png"],
        answer: 2,
        text: "From left to right: Green, White, Red and a seal in the middle",
        type: "Photo",
    },
    {
        question: "What is the platform that make the most money ?",
        options: ["images/facebook.png", "images/instagram.jpeg", "images/whatsapp.jpeg", "images/youtube.png"],
        answer: 0,
        text: "Facebook makes 2.23 billion $ a year",
        type: "Photo",
    },
    {
        question: "Which one is the Map of Japan ?",
        options: ["images/japanMap.png", "images/italyMap.png", "images/mexicoMap.png", "images/canadaMap.png"],
        answer: 0,
        text: "It is the first picture from left to right",
        type: "Photo",
    },
]
//  This function generate random index numbers that will help me choose the questions from the bank
function generateRandomNumbers (min, max)
{
    var limitNumber = ((max - min) + 1);
    let randomNumber = Math.random() * limitNumber;
    var result = Math.floor(randomNumber) + min;
    return result;
}

//  This functions creates an array of 5 non-repeated questions. I used splice method to make sure no question
//  from the bank of question array is repeated. I also included conditions to assure that at least 
//  1 Multiple Choice, 1 Text inpute and 1 radio button question is asked to the user.
function createArrayDisplay(start, end)
{
    let myTemporaryArray = [];
    let randomIndexSelector = 0;
    
    for (let i = start; i <= end; i++) 
    {
        if ((i == 0) || (i ==1)) 
        {
            do 
            {
                randomIndexSelector = generateRandomNumbers(0, questionsBank.length-1);
            } while (questionsBank[randomIndexSelector].type !== "Multiple Choice");
        }
        else if (i == 2) 
        {
            do 
            {
                randomIndexSelector = generateRandomNumbers(0, questionsBank.length-1);
            } while (questionsBank[randomIndexSelector].type !== "Text");
        } 
        else if ((i == 3)) 
        {
            do 
            {
                randomIndexSelector = generateRandomNumbers(0, questionsBank.length-1);
            } while (questionsBank[randomIndexSelector].type !== "True or False");
        }
        else if ((i == 4)) 
        {
            do 
            {
                randomIndexSelector = generateRandomNumbers(0, questionsBank.length-1);
            } while (questionsBank[randomIndexSelector].type !== "Photo");
        }  
        myTemporaryArray.push(questionsBank[randomIndexSelector]); 
        questionsBank.splice(randomIndexSelector, 1);
        conditionsCompliance(myTemporaryArray, i);
    }
    return myTemporaryArray;
}
let displayArray = createArrayDisplay(0,4);
console.log("First script", displayArray); 

//  This function is ONLY for test purposes. I need it to check if conditions are being met
function conditionsCompliance(myArray, index) 
{
    var counterMCQ = 0;
    var counterTF = 0;
    var counterText = 0;
    var counterPhoto = 0;

    if (myArray[index].type == "Multiple Choice")
    {
        counterMCQ++;
        console.log("MCQ = " + counterMCQ)
    }
    else if (myArray[index].type == "True or False")  
    {
        counterTF++;
        console.log("True or False = " + counterTF)
    }
    else if (myArray[index].type == "Text")  
    {
        counterText++;
        console.log("Text = " + counterText)
    }
    else if (myArray[index].type == "Photo")  
    {
        counterPhoto++;
        console.log("Photo = " + counterPhoto)
    }
    else
    {
        console.log("Not DEFINEED")
    }

    if ((counterMCQ != 1) && (counterText != 1) && (counterTF != 3))
    {
        return "This thing is not complying";    
    }
}