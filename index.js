// 3 Question rule for events:
// Overview 


// ** GLobal Variables **//
const baseUrl = 'http://localhost:3000'
let places = []; 

// ** Node getters **//

const mainDiv = () => document.getElementById('main'); 
const homeLink = () => document.getElementById('home-link');
const stadiumWishListLink = () => document.getElementById('stadium-wish-list-link');
const stadiumsLink = () => document.getElementById('stadiums-link')


// ** Event Listeners **//

const attachHomeLinkEvent = () => {
    homeLink().addEventListener('click', loadHome); 
}

const attachStadiumWishListLinkEvent = () => {
    stadiumWishListLink().addEventListener('click', loadStadiumWishList);
}

const attachStadiumsLinkEvent = () => {
    stadiumsLink().addEventListener('click', loadStadiums); 
}



// ** Event Handlers **//

const loadHome = event => {
    if(event) {
        event.preventDefault();
    }
    resetMainDiv(); 
    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    const img = document.createElement('img')

    h1.className = 'center-align';
    p.className = 'center-align';
    img.className = 'center-align';

    h1.innerText = "Are You Ready For Some Football?"
    p.innerText = "Traveling and Football.  Does it get any better than that? Each stadium is in a unique city and state that offers a wide variety of opportunities for fun and excitement. Use this site to select the stadiums you've visited and the stadiums you still wish to visit."
    img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijdM0NMEyqeVtIzJDngoRqSO2QKzRUOTZcA&usqp=CAU"

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    mainDiv().appendChild(img); 
}

const loadStadiumWishList = event => {
        event.preventDefault();
        resetMainDiv(); 
        const h1 = document.createElement('h1');
        h1.innerText = 'Stadium Wish List'

        mainDiv().appendChild(h1)
        
}

const clickStadium = () => {
    alert('click here')
}

const addStadium = () => {
    console.log ('add stadium')
}

const loadStadiums = event => {
    event.preventDefault(); 
     resetMainDiv(); 
    const h1 = document.createElement('h1');
    const div = document.createElement('div');

    places.forEach(places => {
        const a = document.createElement('a'); 
        a.className = 'collection-item';
        a.innerText = places.stadium
        a.addEventListener('click', clickStadium)
       
        const addBtn = document.createElement('button');
        addBtn.innerText = 'Add';
        addBtn.addEventListener('click', addStadium)
   
        div.appendChild(a);
        a.appendChild(addBtn); 
    })

    h1.innerText = 'Stadiums';
    div.className = 'collection'
    
    mainDiv().appendChild(h1)
    mainDiv().appendChild(div)
    addToWishList(); 
}


// ** Request **//
const loadStadiumInfo = () => {
    fetch(baseUrl + '/stadiums')
    .then(resp => resp.json())
    .then(data => {
        places = data; 
    })
}

const addToWishList = () => {
    fetch(baseUrl + '/stadiums', {
        method: 'POST', 
        headers: {
            'ACCEPT': 'application/json',
            'Content-Type': 'application/json', 
        }
    })
    .then(resp => resp.json())
    .then(data => {
        fields = data;
    }) 
}

// ** Misc **//

const resetMainDiv = () => {
    mainDiv().innerHTML = '';
}

// ** Start up  **//

document.addEventListener('DOMContentLoaded', function() {
    loadStadiumInfo(); 
    loadHome(); 
    attachHomeLinkEvent(); 
    attachStadiumWishListLinkEvent(); 
    attachStadiumsLinkEvent(); 
})
  
    
    // What do we want to do when the page loads? 
    // Load the homepage 