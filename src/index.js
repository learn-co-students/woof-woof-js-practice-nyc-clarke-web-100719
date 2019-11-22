let pupsURL = "http://localhost:3000/pups";

const dogBar = document.querySelector('#dog-bar')
const dogFilterButton = document.querySelector('#good-dog-filter')
const dogInfo = document.querySelector('#dog-info')
const onOff = dogFilterButton.querySelector('span')
const pupInfoDiv = document.querySelector('#dog-info');


function renderPupOnPupBar(pup) {
    let pupHTML = `
        <span data-id="${pup.id}">${pup.name}</span>
    `
    dogBar.insertAdjacentHTML('beforeend', pupHTML);
};

fetch(pupsURL)
    .then(resp => {
        return resp.json();
    })
    .then(pups => {
        pups.forEach(function(pup){
            renderPupOnPupBar(pup);
        })
    });

function showPupInfo(dogId) {
    let pupURL = pupsURL + `/${dogId}`;
    fetch(pupURL)
        .then(resp => resp.json())
        .then(function(pup) {
            generatePupHTML(pup);
        })
}

function generatePupHTML(pup) {
    let pupInfoHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
    `
    if (pup.isGoodDog) {
        pupInfoHTML += "<button class=good-toggle-btn data-is-good-dog=True>Good Dog!</button>";
    } else {
        pupInfoHTML += "<button class=good-toggle-btn data-is-good-dog=False>Bad Dog!</button>";
    }
    pupInfoDiv.dataset.id = pup.id;
    pupInfoDiv.innerHTML = "";
    pupInfoDiv.insertAdjacentHTML('beforeend', pupInfoHTML)
}

dogBar.addEventListener('click', function(event) {
    if (event.target.tagName === 'SPAN') {
        showPupInfo(event.target.dataset.id);
    }
});

dogInfo.addEventListener('click', function(event) {
    if (event.target.className === 'good-toggle-btn') {
        togglePupGoodness(event.target.parentNode.dataset.id, event.target.dataset.isGoodDog);
    }
})

function togglePupGoodness(dogId, goodStatus) {
    let pupURL = pupsURL + `/${dogId}`;
    let pupInfo;
    const pupGoodDogButton = document.querySelector("div#dog-info button.good-toggle-btn")
    if (goodStatus === "True") {
        pupInfo = {
            isGoodDog: false
        };
    } else if (goodStatus === "False") {
        pupInfo = {
            isGoodDog: true
        };
    }
    let configObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(pupInfo)
    }
    fetch(pupURL, configObj)
        .then(resp => resp.json())
        .then(function(pup) {
            if (pup.isGoodDog) {
                pupGoodDogButton.dataset.isGoodDog = "True"
                pupGoodDogButton.innerText = "Good Dog!"
                clearAndReloadDogBar();
            } else if (pup.isGoodDog === false) {
                pupGoodDogButton.dataset.isGoodDog = "False"
                pupGoodDogButton.innerText = "Bad Dog!"
                clearAndReloadDogBar();
            }
        })

}


dogFilterButton.addEventListener('click', function(event) {
    toggleDogFilter();
})

function toggleDogFilter() {
    if (onOff.innerText === "OFF") {
        onOff.innerText = "ON"
    } else if (onOff.innerText === "ON") {
        onOff.innerText = "OFF"
    }
    clearAndReloadDogBar();
}

function clearAndReloadDogBar() {
    dogBar.innerHTML = "";
    fetch(pupsURL)
        .then(resp => {
            return resp.json();
        })
        .then(pups => {
            pups.forEach(function(pup){
                if (onOff.innerText === "OFF") {
                    renderPupOnPupBar(pup);
                } else if (onOff.innerText === "ON" && pup.isGoodDog === true) {
                    renderPupOnPupBar(pup);
                }
                })
        });

};