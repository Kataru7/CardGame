const cards = document.getElementsByClassName('card');
const backCards = document.getElementsByClassName('back');
let arrBackCards = [...backCards];
let cardsArr = [...cards];
let ifFlippedCard = false;
let lock = false;
let firstCard = null;
let secondCard = null;
let counterStep = 0;
let counterCouple = 0;

function cardsListen() {
    cardsArr.forEach(card => {
        card.addEventListener('click', rotateCard);
        const randomId = Math.floor(Math.random() * arrBackCards.length);
        card.style.order = randomId;
    });
}
cardsListen();


function rotateCard() {
    this.addEventListener('click', rotateCard);

    if (lock) {
        return;
    }
    this.classList.add('rotate');

    if (ifFlippedCard === false) {
        ifFlippedCard = true;
        firstCard = this;
        firstCard.removeEventListener('click', rotateCard);
    } else {
        ifFlippedCard = false;
        secondCard = this;
        lock = true;
        checkCards();
    }
}


function checkCards() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        counterCouple++;
        counterStep++;
        setTimeout(() => {
            firstCard.classList.add('none');
            secondCard.classList.add('none');
            firstCard.removeEventListener('click', rotateCard);
            secondCard.removeEventListener('click', rotateCard);
            lock = false;
            checkWin();
        }, 1000);

    } else {
        lock = true;
        counterStep++;
        setTimeout(() => {
            firstCard.classList.remove('rotate');
            secondCard.classList.remove('rotate');
            firstCard.addEventListener('click', rotateCard);
            firstCard = secondCard = null;
            lock = false;
        }, 1000)

    }
};

const popUpWindow = document.getElementById('popup-wrapper');

function createPopUp() {
    const popUp = document.createElement('div');
    popUp.id = 'popup';
    popUp.textContent = `Вы закончили игру за ${counterStep} ходов`;
    const btn = document.createElement('button');
    btn.id = 'btn';
    btn.textContent = 'Начни сначала';
    popUpWindow.append(popUp, btn);

    btn.addEventListener('click', restartGame);
};

function restartGame() {
    ifFlippedCard = lock = false;
    firstCard = secondCard = null;
    counterCouple = counterStep = 0;
    removeCards();
    cardsListen();
    deletePopUp();

};

function removeCards() {
    cardsArr.forEach(card => {
        card.removeEventListener('click', rotateCard);
        card.classList.remove('none');
        card.classList.remove('rotate')
    });
};

function deletePopUp() {
    const popUpDelete = document.getElementById('popup');
    popUpDelete.remove();
    const btnDelete = document.getElementById('btn');
    btnDelete.remove();
};

function checkWin() {
    if (counterCouple === 16) {
        cardsArr.forEach(card => { card.classList.remove('none') });
        createPopUp();
    } else {
        return;
    }
};