let elementsData = [];

async function loadCSV() {
    const response = await fetch('elementsData.csv');
    const data = await response.text();
    elementsData = csvToJSON(data);
    printRandomElement();
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

function printRandomElement() {
    const element = getRandomElement();
    console.log(`Element: ${element["Element Name"]}, Atomic Mass: ${element["Atomic Mass"]}`);
}

window.onload = loadCSV;
