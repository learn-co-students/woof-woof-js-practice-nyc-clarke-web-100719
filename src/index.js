// ELEMENTS
const dogBar = document.getElementById('dog-bar');
const dogInfo = document.getElementById('dog-info');
const URL_API = 'http://localhost:3000/pups'
const dogFilter = document.getElementById('good-dog-filter')
const switchOnOff = dogFilter.querySelector('span')

function dogsFetch(bol = false){
    dogBar.innerHTML = ""
    fetch(URL_API)
    .then(response => response.json())
    .then(json =>{
        if(bol){
            json.filter(dog => dog.isGoodDog).forEach(dogSpanBar)}
        else{
            json.forEach(dogSpanBar)
        }
    })
}

// add dog to bar helper 
function dogSpanBar(dog){
    const dogHTML = `<span data-id=${dog.id}>${dog.name}</span>`
    dogBar.innerHTML += dogHTML
}


//add show info for single dog
const dogInfoPage = function(dog){
    let goodBadDog = "Good Dog!"
    if(dog.isGoodDog) goodBadDog = "Bad Dog!";
    const dogHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button data-id=${dog.id}>${goodBadDog}</button>`
    dogInfo.innerHTML = dogHTML   
}

dogBar.addEventListener('click',event =>{
    if (event.target.dataset.id){
        fetch(URL_API + `/${event.target.dataset.id}`)
        .then(res => res.json())
            .then(json => dogInfoPage(json))
    }
})

dogInfo.addEventListener('click',event =>{
    
    if (event.target.dataset.id){
        let GoodBad = true
        if(event.target.innerText !== "Good Dog!")GoodBad = false
        const CongObj = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json' 
        },
            body: JSON.stringify({isGoodDog: GoodBad})
        }
        //pesimist approa..
        fetch(URL_API + `/${event.target.dataset.id}`, CongObj)
        .then(res =>res.json())
        .then(json =>{ 
            event.target.innerText == "Good Dog!"? event.target.innerText = "Bad Dog!": event.target.innerText = "Good Dog!" 
            if(switchOnOff.innerText === "ON")dogsFetch(true);
        })

    }
})

dogFilter.addEventListener('click',event =>{
    if(switchOnOff.innerText === "ON"){ 
        
        switchOnOff.innerText = "OFF"
        dogsFetch(false)
    }
    else{
        switchOnOff.innerText = "ON"
        dogInfo.innerHTML =""
        dogsFetch(true)
    }
})

/* Calling functions */

dogsFetch()

// "id": 2,
// "name": "Nugget",
// "isGoodDog": false,
// "image": "https://curriculum-content.s3.amazonaws.com/js/woof-woof/dog_2.jpg"