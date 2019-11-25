document.addEventListener("DOMContentLoaded", function(){
    fetchAllDogs();
    clickedDogEventListener();
})

function fetchAllDogs() {
    return fetch("http://localhost:3000/pups")
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            return renderDogBar(data);
        })       
}

function renderDogBar(data) {
    let dogBar = document.querySelector("#dog-bar");
    data.forEach(function(dog) {
        let span = `<span data-id=${dog.id}>${dog.name}</span>`;
        dogBar.innerHTML += span;
    })
}

function clickedDogEventListener() {
    const dogBar = document.querySelector("#dog-bar");    
    dogBar.addEventListener("click", function(event){
        fetchSingleDog(event.target.dataset.id);
    });
}

function fetchSingleDog(dog) {
    return fetch(`http://localhost:3000/pups/${dog}`)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            const dogInfo = document.querySelector("#dog-info");
            let clickedDog = `
                <img src="${data.image}">
                <h2>${data.name}</h2>
                <button id="btn">${isGoodDog(data.isGoodDog)}</button>
                `;
            dogInfo.innerHTML = clickedDog;
            behaviorButtonEventListener(dog);
        })        
}

function isGoodDog(data) {
    if (data === true) {
        return "Good Dog!"
    } else {
        return "Bad Dog!"
    }
}

function behaviorButtonEventListener(dog) {
    const btn = document.querySelector("#btn");
    btn.addEventListener("click", function(event){
        updateBackend(dog);
    })
}

function updateBackend(dog) {
    const btn = document.querySelector("#btn");
    let newButtonValue;
    if (btn.innerText === "Good Dog!") {
        btn.innerText = "Bad Dog!";
        newButtonValue = false;
    } else {
        btn.innerText = "Good Dog!";
        newButtonValue = true;
    }
    return fetch(`http://localhost:3000/pups/${dog}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({ isGoodDog : newButtonValue })
    })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(data) {
                fetchSingleDog(data.id);
                changeButtonText(data);
            })
}

function changeButtonText(button) {
    if (button.innerText === "Good Dog!") {
        return button.innerText = "Bad Dog!"
    } else {
        return button.innerText = "Good Dog!"
    }
}