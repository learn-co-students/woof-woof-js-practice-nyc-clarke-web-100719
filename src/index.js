// SOME HELPFUL VARIABLES :)
const dogBar = document.getElementById("dog-bar");
const dogInfo = document.getElementById("dog-info");
// const dogSummary = document.querySelector("#dog-summary-container");
// const goodBadDogButton = document.getElementsByTagName("button")
let dogs = [];
let goodOrBadDog;
// STEP ONE
// FETCH
fetch("http://localhost:3000/pups")
    .then(response=>response.json())
    .then(function(data) {
        // this sets the empty array equal to all the dog data
        // so that we can access it later to compare
        // the targetDog with the others to find a match and show on dogInfo
        dogs = data;
        data.forEach(function(dog) {
            let dogNameHTML = `<span data-id=${dog.id}> ${dog.name}</span>`;
            // adding to the span because thats what will hold the name
            // now i can access the unique dog everytime
            dogBar.innerHTML += dogNameHTML
        })
    })

// STEP TWO and THREE
// USER CLICKS ON DOG NAME (span tag)
    dogBar.addEventListener('click', function(event) {
        //one user click, see if the data id is equal to a found dog element 
        // then output some new html
        if (event.target.dataset.id) {
            let foundDog = dogs.find(function(dog) {
                return dog.id === parseInt(event.target.dataset.id)
            })
                if (foundDog.isGoodDog) {
                    goodOrBadDog = "Good Dog!"
                }
                else {
                    goodOrBadDog = "Bad Dog!"
                }
                let viewOneDogHTML = `
                    <img src = ${foundDog.image}>
                    <h2>${foundDog.name}</h2>
                    <button data-id= ${foundDog.id}>${goodOrBadDog}</button>
                    `
            dogInfo.innerHTML = viewOneDogHTML
        }
    })

    // STEP 4 
    // add event listener to dog button
    // on user click, update the backend with PATCH so dog is now bad/good

    dogInfo.addEventListener('click', function(event) {
        if (event.target.localName === 'button') {
            let newGoodValue;
            if (event.target.innerText === "Bad Dog!") {    
                event.target.innerText = "Good Dog!"
                newGoodValue = true;
            } else if (event.target.innerText === "Good Dog!") {
                event.target.innerText = "Bad Dog!"
                newGoodValue = false;
            }

            fetch(`http://localhost:3000/pups/${event.target.dataset.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({ // this is what you need to send to your backend
                    isGoodDog: newGoodValue
                })

            })
          
        }
        
    })

    // STILL HAVING PERSISTENCE ISSUES??? 
    // It works fine if i refresh the page 
    // but not if i click from dog to dog and back again :(
