const dogBar = document.querySelector('div#dog-bar');
const dogsUrl = "http://localhost:3000/pups";

document.addEventListener("DOMContentLoaded", function(){
    fetchDogs();
})




function fetchDogs() {
    fetch(dogsUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(dogs){
            dogs.forEach(function(dog){
                addDog(dog)
            })
        })
}

function addDog(dog) {
    let dogName = document.createElement('span')
    dogName.innerText = dog.name;
    dogBar.appendChild(dogName);
    dogName.addEventListener('click', function(event){
        renderDogInfo(dog);
    })
}

function renderDogInfo(dog) {
    const dogInfo = document.querySelector('div#dog-info');
    let dogInfoHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>`
    dogInfo.innerHTML = dogInfoHTML;
    let button = document.createElement('button')
    button.innerText = isGoodDogStatus(dog);
    toggleIsGoodDog(button, dog)
    dogInfo.appendChild(button);
}

function isGoodDogStatus(dog) {
    if (dog.isGoodDog === false) {
        return 'Bad Dog';
    } else {
        return 'Good Dog';
    }
}


function toggleIsGoodDog(button, dog) {
    button.addEventListener('click', function(event){
        if (button.innerText === "Bad Dog") {
            event.target.innerText = "Good Dog";
            dog.isGoodDog = true;
            updateDog(dog);
        } else {
            event.target.innerText = "Bad Dog";
            dog.isGoodDog = false;
            updateDog(dog);
        }
    })
}

function updateDog(dog) {
    const dogUrl = `http://localhost:3000/pups/${dog.id}`;
    fetch(dogUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",                
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "isGoodDog": dog.isGoodDog
        })
    })
}

// function removeDogs() {
//     const DogBar = document.querySelectorall('div#dog-bar');
//     while (DogBar.hasChildNodes()) {
//         DogBar.removeChild(DogBar.lastChild);
//     }
// }

let goodButton = document.getElementById("good-dog-filter");
goodButton.addEventListener('click', function(event){
    if (event.target.innerText === "Filter good dogs: OFF") {
        goodButton.innerText = "Filter good dogs: ON";
        dogBar.innerHTML = "";
        fetch(dogsUrl)
            .then(function(response){
                return response.json();
            })
            .then(function(dogs){
                dogs.forEach(function(dog){
                    if (dog.isGoodDog === true) {
                        addDog(dog);
                    }
                })

            })

    } else {
        goodButton.innerText = "Filter good dogs: OFF";
        fetch(dogsUrl)
            .then(function(response){
                return response.json();
            })
            .then(function(dogs){
                dogs.forEach(function(dog){
                    addDog(dog);
                    })
            })
    }
})



// let goodDogButton = document.querySelector('button#good-dog-filter')
// goodDogButton.addEventListener('click', function(event){
//     if (goodDogButton.innerText = "Filter good dogs: OFF") {
//            event.preventDefault();
//         goodDogButton.innerText = "Filter good dogs: ON";
//         // dogs.filter(addDog(dog){
//         //     dogisGoodDog === true });
//             });
//         } else {
//             goodDogButton.innerText = "Filter good dogs: OFF";
//         }
// })
// }


    