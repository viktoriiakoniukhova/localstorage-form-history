const inputs = document.querySelectorAll('input');
const submit = document.getElementById('submit-button');
const historyContainer = document.getElementById('history-wrapper');

const inputNames = ['first-name', 'last-name', 'email', 'phone', 'company', 'address'];
let cardsArray;

// localStorage.clear()

if (localStorage.getItem("cards-array") !== null) {
    cardsArray = JSON.parse(localStorage.getItem("cards-array"));
} else {
    // No data, start with an empty array
    cardsArray = [];
}

if(window.location.href.match("index.html") != null) {

    inputs.forEach((input) => {
        if (localStorage.getItem(input.name)) {
            input.value = localStorage.getItem(input.name);
        }

        input.addEventListener('input', (e) => {
            localStorage.setItem(input.name, e.target.value);
        })

        // Sync inputs in different tabs
        setInterval(() => {
            input.value = localStorage.getItem(input.name);
        },100)

    });
    submit.addEventListener('click', (ev) => {
        ev.preventDefault();
        inputs.forEach((input) => {
            input.value = "";
        });

        cardsArray.splice(0, 0, createHistoryCard());
        localStorage.clear();

        localStorage.setItem('cards-array', JSON.stringify(cardsArray));
    });
}
if (window.location.href.match("history.html") != null){
    let storedCards = JSON.parse(localStorage.getItem('cards-array'));

    storedCards.forEach((element) => {
        historyContainer.insertAdjacentHTML('beforeend',element);
    })

    historyContainer.childNodes.forEach((card, index) => {

        // Add event on delete buttons
        card.lastChild.addEventListener('click', () =>{
            card.remove();
            storedCards.splice(index, 1);
            localStorage.setItem('cards-array', JSON.stringify(storedCards));
        })
    })
}

function createHistoryCard() {

    // Create card elements
    let submitHistoryCard = document.createElement('div');
    let cardFirstName = document.createElement('p');
    let cardLastName = document.createElement('p');
    let cardEmail = document.createElement('p');
    let cardPhone = document.createElement('p');
    let cardCompany = document.createElement('p');
    let cardAddress = document.createElement('p');
    let deleteButton = document.createElement('button');

    deleteButton.innerHTML = "DELETE";

    // Add classes to created elements
    submitHistoryCard.classList.add('submit-history-card');
    cardFirstName.classList.add('card-first-name');
    cardLastName.classList.add('card-last-name');
    cardEmail.classList.add('card-email');
    cardPhone.classList.add('card-phone');
    cardCompany.classList.add('card-company');
    cardAddress.classList.add('card-address');
    deleteButton.classList.add('delete-button');

    // Structure of card
    submitHistoryCard.append(cardFirstName, cardLastName, cardEmail, cardPhone, cardCompany, cardAddress, deleteButton);

    // Add values from localStorage to card
    cardFirstName.innerHTML = localStorage.getItem(inputNames[0]);
    cardLastName.innerHTML = localStorage.getItem(inputNames[1]);
    cardEmail.innerHTML = localStorage.getItem(inputNames[2]);
    cardPhone.innerHTML = localStorage.getItem(inputNames[3]);
    cardCompany.innerHTML = localStorage.getItem(inputNames[4]);
    cardAddress.innerHTML = localStorage.getItem(inputNames[5]);

    return submitHistoryCard.outerHTML;
}