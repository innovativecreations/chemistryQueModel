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
    let element;
    do {
        element = elementsData[Math.floor(Math.random() * elementsData.length)];
    } while (!element['Element Name'] || !element['Symbol'] || !element['Atomic Number'] || !element['Atomic Mass']);
    return element;
}

function generateOptions(correctAnswer, property) {
    let options = new Set();
    options.add(correctAnswer);
    while (options.size < 4) {
        let randomElement = getRandomElement();
        let randomOption = randomElement[property];
        if (randomOption !== undefined && randomOption !== null && randomOption !== '') {
            options.add(randomOption);
        }
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
}

function displayRandomElement() {
    const element = getRandomElement();
    const properties = [
        { prop: 'Element Name', label: 'name' },
        { prop: 'Symbol', label: 'symbol' },
        { prop: 'Atomic Number', label: 'atomic number' },
        { prop: 'Atomic Mass', label: 'atomic mass' }
    ];
    const propertyObj = properties[Math.floor(Math.random() * properties.length)];
    const property = propertyObj.prop;
    const label = propertyObj.label;
    const correctAnswer = element[property];

    document.getElementById('question').innerText = `What's the "${label}" of the given element?`;

    document.getElementById('element-number').innerText = property === 'Atomic Number' ? '?' : element['Atomic Number'];
    document.getElementById('element-symbol').innerText = property === 'Symbol' ? '?' : element['Symbol'];
    document.getElementById('element-name').innerText = property === 'Element Name' ? '?' : element['Element Name'];
    document.getElementById('element-mass').innerText = property === 'Atomic Mass' ? '?' : element['Atomic Mass'];

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
