var minValue;
var maxValue;
var answerNumber;
let orderNumber = 1;
let gameRun = true;

const inputMin = document.getElementById('inputMin');
const inputMax = document.getElementById('inputMax');
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

function spellNumber(n) {
    let spellingNumber = n < 0 ? 'минус ' : '';
    if (n < 0) { n *= -1;}
    let digitsCount = n.toString().length;
    let numberDigits = [];// Array(digitsCount);
    if (n === 0) {
        return 'ноль';
    } else {
        let power = 0;
        for (let i = 1; i <= digitsCount; i++) {
            power = digitsCount - i;
            numberDigits[i - 1] = Math.floor(n / 10 ** power);
            n = n % 10**power;
        }
        let checkUnits = digitsCount > 1 ? false : true;
        for (let i = digitsCount; i >= 1; i--) {
            switch (i) {
                case 3: {
                    switch (numberDigits[digitsCount - i]) {
                        case 1: spellingNumber += 'сто'; break;
                        case 2: spellingNumber += 'двести'; break;
                        case 3: spellingNumber += 'триста'; break;
                        case 4: spellingNumber += 'четыреста'; break;
                        case 5: spellingNumber += 'пятьсот'; break;
                        case 6: spellingNumber += 'шестьсот'; break;
                        case 7: spellingNumber += 'семьсот'; break;
                        case 8: spellingNumber += 'восемьсот'; break;
                        case 9: spellingNumber += 'девятьсот'; break;
                    }
                }
                break;
                case 2: {
                    if (numberDigits[digitsCount - i] >= 2 && numberDigits[digitsCount - i] <= 9) {
                        switch (numberDigits[digitsCount - i]) {
                            case 2: spellingNumber += 'двацать'; break;
                            case 3: spellingNumber += 'тридцать'; break;
                            case 4: spellingNumber += 'сорок'; break;
                            case 5: spellingNumber += 'пятьдесят'; break;
                            case 6: spellingNumber += 'шестьдесят'; break;
                            case 7: spellingNumber += 'семьдесят'; break;
                            case 8: spellingNumber += 'восемьдесят'; break;
                            case 9: spellingNumber += 'девяносто'; break;
                        }
                        checkUnits = true;
                    } else if (numberDigits[digitsCount - i] === 1) {
                        switch (numberDigits[digitsCount - i] * 10 + numberDigits[digitsCount - (i - 1)]) {
                            case 10: spellingNumber += 'десять'; break;
                            case 11: spellingNumber += 'одинадцать'; break;
                            case 12: spellingNumber += 'двенадцать'; break;
                            case 13: spellingNumber += 'тринадцать'; break;
                            case 14: spellingNumber += 'четырнадцать'; break;
                            case 15: spellingNumber += 'пятнадцать'; break;
                            case 16: spellingNumber += 'шестнадцать'; break;
                            case 17: spellingNumber += 'семнадцать'; break;
                            case 18: spellingNumber += 'восемнадцать'; break;
                            case 19: spellingNumber += 'девятнадцать'; break;
                        }
                        checkUnits = false;
                    } else { // если десятоки равны 0
                        checkUnits = true;
                    }
                }
                break;
                case 1: {
                    if (checkUnits) {
                        switch (numberDigits[digitsCount - i]) {
                            case 1: spellingNumber += 'один'; break;
                            case 2: spellingNumber += 'два'; break;
                            case 3: spellingNumber += 'три'; break;
                            case 4: spellingNumber += 'четыре'; break;
                            case 5: spellingNumber += 'пять'; break;
                            case 6: spellingNumber += 'шесть'; break;
                            case 7: spellingNumber += 'семь'; break;
                            case 8: spellingNumber += 'восемь'; break;
                            case 9: spellingNumber += 'девять'; break;
                        }                        
                    }
                }
                break;
            }
            if (i > 1) {spellingNumber += ' ';}
        }
    }
    if (spellingNumber.length <= 12) {
        return spellingNumber;
    } else {
        return false;
    }
}

inputMin.addEventListener('change', function () {
    minValue = parseInt(inputMin.value);
    minValue = isNaN(minValue) ? 0 : minValue;
    minValue < -999 ? document.getElementById('minFailedAlert').classList.remove("d-none") : document.getElementById('minFailedAlert').classList.add("d-none");
})

inputMax.addEventListener('change', function () {
    maxValue = parseInt(inputMax.value);
    maxValue = isNaN(maxValue) ? 100 : maxValue;
    maxValue > 999 ? document.getElementById('maxFailedAlert').classList.remove("d-none") : document.getElementById('maxFailedAlert').classList.add("d-none");
})

document.getElementById('startGame').addEventListener('click', function () {
    if (minValue > maxValue) {
        maxValue = [minValue, minValue = maxValue][0]; // переменные меняются значениями
        maxValue = maxValue > 1000 ? 100 : maxValue;
        minValue = 0;
    }
    // начало если пустой input
    minValue = isNaN(minValue) ? 0 : minValue;
    maxValue = isNaN(maxValue) ? 100 : maxValue;
    // конец если пустой input
    document.getElementById('leftEdge').innerText = minValue;
    document.getElementById('rightEdge').innerText = maxValue;
    document.getElementById('guessNumber').classList.remove("d-none");
    document.getElementById('enterNumbers').classList.add("d-none");
})

document.getElementById('goOn').addEventListener('click', function () {
    document.getElementById('leftEdge').innerText = minValue;
    document.getElementById('rightEdge').innerText = maxValue;
    document.getElementById('game').classList.remove("d-none");
    document.getElementById('guessNumber').classList.add("d-none");
    answerNumber = Math.floor((minValue + maxValue) / 2);
    answer = !!spellNumber(answerNumber) ? spellNumber(answerNumber) : answerNumber
    answerField.innerText = `Вы загадали число ${ answer }?`;
})

orderNumberField.innerText = orderNumber;

document.getElementById('btnRetry').addEventListener('click', function () {
    inputMin.value = '';
    inputMax.value = '';
    document.getElementById('game').classList.add("d-none");
    document.getElementById('enterNumbers').classList.remove("d-none");
    orderNumber = 0;
    gameRun = true;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber - 1;
            console.log(' minValue = ' + minValue + ' maxValue = ' + maxValue);
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            answer = !!spellNumber(answerNumber) ? spellNumber(answerNumber) : answerNumber;
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round(Math.random()*3);
            answerField.innerText = (phraseRandom === 0) ? 
                `Вы загадали число ${ answer }?` : 
                (phraseRandom === 1) ? 
                `Полагаю, что это ${ answer }?` : 
                (phraseRandom === 2) ? 
                `Наверное число ${ answer }?` :
                `Легко! Это ${ answer }?`;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber + 1;
            answerNumber = Math.floor((maxValue + minValue) / 2);
            console.log(' minValue = ' + minValue + ' maxValue = ' + maxValue);
            answer = !!spellNumber(answerNumber) ? spellNumber(answerNumber) : answerNumber;
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round(Math.random()*3);
            answerField.innerText = (phraseRandom === 0) ? 
                `Вы загадали число ${ answer }?` : 
                (phraseRandom === 1) ? 
                `Думаю, это ${ answer }?` : 
                (phraseRandom === 2) ? 
                `Ваше число ${ answer }?` :
                `Легко! Это ${ answer }?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom = Math.round(Math.random()*3);
        answerField.innerText = (phraseRandom === 0) ? 
        `Я всегда угадываю\n\u{1F60E}` : 
        (phraseRandom === 1) ? 
        `Какой я умница\n\u{1F60F}` : 
        (phraseRandom === 2) ? 
        `Кто умнее?\n\u{1F61C}` :
        `Расплюнуть\n\u{1F60E}`;
        gameRun = false;
    }
})