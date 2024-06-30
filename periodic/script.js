const elementsData = [
    { "Element Name": "Hydrogen", "Atomic Mass": 1.0 },
    { "Element Name": "Helium", "Atomic Mass": 4.0 },
    { "Element Name": "Lithium", "Atomic Mass": 7.0 },
    { "Element Name": "Beryllium", "Atomic Mass": 9.0 },
    { "Element Name": "Boron", "Atomic Mass": 11.0 },
];

function getRandomElement() {
    return elementsData[Math.floor(Math.random() * elementsData.length)];
}

function generateOptions(correctAnswer) {
    let options = new Set();
    options.add(correctAnswer);  
    while (options.size < 4) { 
        let randomMass = Math.floor(Math.random() * 200) + 1;  
        options.add(parseFloat(randomMass));  
    }
    return Array.from(options).sort(() => Math.random() - 0.5); 
}

function loadQuestion() {
    const element = getRandomElement();
    const question = `The atomic mass of the element ${element["Element Name"]}?`;
    const correctAnswer = element["Atomic Mass"];
    const options = generateOptions(correctAnswer);

    document.getElementById("question").innerText = question;
    document.getElementById("option1").innerText = options[0];
    document.getElementById("option2").innerText = options[1];
    document.getElementById("option3").innerText = options[2];
    document.getElementById("option4").innerText = options[3];

    document.getElementById("result").innerText = "";
}

function checkAnswer(button) {
    const element = getRandomElement();
    const correctAnswer = element["Atomic Mass"];
    const resultDiv = document.getElementById("result");

    if (parseFloat(button.innerText) === correctAnswer) {
        resultDiv.innerText = "Correct!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerText = `Wrong! The correct answer is ${correctAnswer}.`;
        resultDiv.style.color = "red";
    }

    setTimeout(loadQuestion, 2000); 
}


window.onload = loadQuestion;
