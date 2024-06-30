let elementsData = [];

async function loadCSV() {
    const response = await fetch('elementsData.csv');
    const data = await response.text();
    elementsData = csvToJSON(data);
    loadQuestion();
}

function csvToJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentline[j].trim();
        }

        result.push(obj);
    }

    return result;
}

function getRandomElement() {
    return elementsData[Math.floor(Math.random() * elementsData.length)];
}

function generateOptions(correctAnswer) {
    let options = new Set();
    options.add(correctAnswer);
    while (options.size < 4) {
        let randomMass = Math.floor(Math.random() * 200) + 1;
        options.add(randomMass);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    const element = getRandomElement();
    const question = `The atomic mass of the element ${element["Element Name"]}?`;
    const correctAnswer = parseInt(element["Atomic Mass"]);
    const options = generateOptions(correctAnswer);

    document.getElementById("question").innerText = question;
    document.getElementById("question").setAttribute("data-answer", correctAnswer);
    document.getElementById("option1").innerText = options[0];
    document.getElementById("option2").innerText = options[1];
    document.getElementById("option3").innerText = options[2];
    document.getElementById("option4").innerText = options[3];

    document.getElementById("result").innerText = "";
}

function checkAnswer(button) {
    const correctAnswer = parseInt(document.getElementById("question").getAttribute("data-answer"));
    const selectedAnswer = parseInt(button.innerText);
    const resultDiv = document.getElementById("result");

    if (selectedAnswer === correctAnswer) {
        resultDiv.innerText = "Correct!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerText = `Wrong! The correct answer is ${correctAnswer}.`;
        resultDiv.style.color = "red";
    }

    setTimeout(loadQuestion, 2000);
}

window.onload = loadCSV;
