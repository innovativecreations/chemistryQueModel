let elementsData = [];

async function loadCSV() {
    const response = await fetch('elementsData.csv');
    const data = await response.text();
    elementsData = csvToJSON(data);
    displayRandomElement();
}

function csvToJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',').map(header => header.trim());

    for (let i = 1; i < lines.length; i++) {
        const currentline = lines[i].split(',');

        if (currentline.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j].trim();
            }
            result.push(obj);
        }
    }

    return result;
}

function getRandomElement() {
    return elementsData[Math.floor(Math.random() * elementsData.length)];
}

function generateOptions(correctAnswer, property) {
    let options = new Set();
    options.add(correctAnswer);
    while (options.size < 4) {
        let randomElement = getRandomElement();
        let randomOption = randomElement[property];
        options.add(randomOption);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
}

function displayRandomElement() {
    const element = getRandomElement();
    const properties = [
        { prop: 'Atomic Number', label: 'atomic number' },
        { prop: 'Symbol', label: 'symbol' },
        { prop: 'Atomic Mass', label: 'atomic mass' },
        { prop: 'Element Name', label: 'name' },
        { prop: 'Atomic Radii (pm)', label: 'atomic radii' }
    ];
    const propertyObj = properties[Math.floor(Math.random() * properties.length)];
    const property = propertyObj.prop;
    const label = propertyObj.label;
    const correctAnswer = element[property];

    document.getElementById('question').innerText = `What's the ${label} of the given element?`;
    document.getElementById('element-number').innerText = element['Atomic Number'];
    document.getElementById('element-symbol').innerText = element['Symbol'];
    document.getElementById('element-name').innerText = element['Element Name'];
    document.getElementById('element-mass').innerText = element['Atomic Mass'];

    const options = generateOptions(correctAnswer, property);

    document.getElementById('option1').innerText = options[0];
    document.getElementById('option2').innerText = options[1];
    document.getElementById('option3').innerText = options[2];
    document.getElementById('option4').innerText = options[3];

    document.getElementById('option1').setAttribute('data-answer', correctAnswer);
    document.getElementById('option2').setAttribute('data-answer', correctAnswer);
    document.getElementById('option3').setAttribute('data-answer', correctAnswer);
    document.getElementById('option4').setAttribute('data-answer', correctAnswer);

    document.getElementById('result').innerText = '';
    document.querySelectorAll('.option').forEach(button => {
        button.classList.remove('correct', 'wrong');
    });
}

function checkAnswer(button) {
    const correctAnswer = button.getAttribute('data-answer');
    const selectedAnswer = button.innerText;
    const resultDiv = document.getElementById('result');

    if (selectedAnswer === correctAnswer) {
        resultDiv.innerText = 'Correct!';
        resultDiv.style.color = 'green';
        button.classList.add('correct');
    } else {
        resultDiv.innerText = `Wrong! The correct answer is ${correctAnswer}.`;
        resultDiv.style.color = 'red';
        button.classList.add('wrong');
    }

    setTimeout(displayRandomElement, 2000);
}

window.onload = loadCSV;
