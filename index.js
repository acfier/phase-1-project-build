// ** GLobal Variables **//
const baseUrl = 'http://localhost:3000'
let stadiums = []; 
let wishlistNum = 0; 
let newList = []; 
let wishlist = [];



// ** Node getters **//

const mainDiv = () => document.getElementById('main'); 
const homeLink = () => document.getElementById('home-link');
const stadiumWishListLink = () => document.getElementById('stadium-wish-list-link');
const stadiumsLink = () => document.getElementById('stadiums-link')
const wishlistAdd = () => document.getElementById('add-wishlist-number')

// ** Event Listeners **//

const attachHomeLinkEvent = () => {
    homeLink().addEventListener('click', loadHome); 
}

const attachStadiumWishListLinkEvent = () => {
    stadiumWishListLink().addEventListener('click', (e) => 
    {
        e.preventDefault(); 
        renderWishListOfStadiums();
        loadStadiumWishList(); 
    }); 
}

const attachStadiumsLinkEvent = () => {
    stadiumsLink().addEventListener('click', loadStadiums); 
}

    // ** Misc **//

const resetMainDiv = () => {
    mainDiv().innerHTML = '';
}

const hideWishlistNumber = () => {
    wishlistAdd().style.display = 'none'; 
}

function addStadium(stadium) { 
    newList.push(this); 
    wishlistAdd().style.display = 'inline-block';
    wishlistAdd().innerText = newList.length; 
    postStadiumToWishList(stadium); 
}

const postStadiumToWishList = (stadium) => {
    fetch(baseUrl + '/wishlist' , {
        method: "POST", 
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(stadium)
    })
    .then(resp => resp.json())
    .then(data => {
        stadiums.push(data)
    })
    console.log(stadium)
}

const visitDate = (event) => {
    event.preventDefault(); 
    var elem = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elem, instances);
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
    const caption = document.createElement('p')

    h1.className = 'center-align';
    p.className = 'center-align';
    img.className = 'center-align';
    img.style.marginLeft = '125px'; 
    img.style.width = '725px'
    caption.className = 'center-align'; 

    h1.innerText = "Are You Ready For Some Football?"
    p.innerText = "Traveling and Football.  Does it get any better than that? Each stadium is in a unique city and state that offers a wide variety of opportunities for fun and excitement.  It has always been a dream of mine to visit each NFL team city and attend a game at each stadium.  For those who have similar aspirations, use this site to select the stadiums you've visited and the stadiums you still wish to visit.  Use the navigation bar at the top of this page track the list of NFL stadiums visited and yet to be visited."
    img.src = "https://www.stadiumsofprofootball.com/wp-content/uploads/2017/04/allegiantbw.jpg"
    caption.innerText = 'Allegiant Stadium:  Home of the 2023 Superbowl'

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    mainDiv().appendChild(img); 
    mainDiv().appendChild(caption); 
}

const loadStadiumWishList = () => {
       
        resetMainDiv(); 
        const h1 = document.createElement('h1');
        h1.innerText = 'Stadium Wishlist' 

        mainDiv().appendChild(h1); 

        renderWishlistStadiums(); 
        hideWishlistNumber(); 
       
}

const renderWishlistStadiums = () => { 
    const row = document.createElement('row'); 
    row.className = 'row'; 

    wishlist.forEach(stadium => {
        const col = renderWishlistStadium(stadium)
        row.appendChild(col); 
    });
    mainDiv().appendChild(row); 
}

const renderWishlistStadium = (stadium) => {
    const col = document.createElement('div');
    col.className = 'col s3 m4 l6'; 
    col.style.marginTop = '50px'; 
    col.appendChild(createWishCard(stadium)); 
    
    return col; 
}

const loadStadiums = (event) => {
    event.preventDefault(); 
    resetMainDiv(); 
    const h1 = document.createElement('h1');
    const p = document.createElement('p'); 
    h1.innerText = 'Stadiums'; 
    p.innerText = 'Below are all of the NFL stadiums.  Browse through the stadiums and click on the stadiums you still need to visit.  If you have visited the stadium, type in the date of your visit.'; 
    
    mainDiv().appendChild(h1); 
    mainDiv().appendChild(p); 
    renderStadiums(); 
    
}

const renderStadiums = () => {
    const row = document.createElement('row'); 
    row.className = 'row'; 

    stadiums.forEach(stadium => {
        const col = renderStadium(stadium)
        row.appendChild(col); 
    });
    mainDiv().appendChild(row); 
}

const renderStadium = stadium => {
    const col = document.createElement('div');
    col.className = 'col s3 m5 l6'; 

    col.appendChild(createCard(stadium)); 
    
    return col; 
}

// ** Helpers **//

const createCard = (stadium) => {
    const divCard = document.createElement('div'); 
    const divImage = document.createElement('div'); 
    const divCardContent = document.createElement('div');
    const divCardAction = document.createElement('div');  
    const link1 = document.createElement('a'); 
    const divDatePicker = document.createElement('input'); 
    const dateLabel = document.createElement('label');   
    const img = document.createElement('img'); 
    const span = document.createElement('span'); 
    const pInfoTeamName = document.createElement('p'); 
    const pInfoTeamCity = document.createElement('p');
    const pInfoTeamState = document.createElement('p'); 
    const form = document.createElement('form');
    const rateDiv = document.createElement('div');
    const rateInput = document.createElement('input');
    const rateLabel = document.createElement('label');
    const submitButton = document.createElement('input'); 

    submitButton.className = 'waves-effect waves-light btn'; 
    divCard.className = 'card'; 
    divImage.className = 'card-image'; 
    divCardContent.className = 'card-content';
    divCardAction.className = 'card-action'
    span.className = 'card-title';
    divDatePicker.className = 'datepicker'; 
    rateDiv.className = 'input-field';

    divDatePicker.setAttribute('type', 'text'); 
    rateInput.setAttribute('id', 'rate'); 
    rateInput.setAttribute('type', 'text'); 
    img.setAttribute('src', stadium.imgUrl); 
    link1.setAttribute('href', '#');
    rateLabel.setAttribute('for', 'rate'); 
    submitButton.setAttribute('type', 'submit'); 
    submitButton.setAttribute('value', 'submit your experience'); 

    span.innerText = stadium.field; 
    pInfoTeamName.innerText = stadium.team; 
    pInfoTeamCity.innerText = stadium.city;
    pInfoTeamState.innerText = stadium.state;
    link1.innerText = 'Add'; 
    dateLabel.innerText = 'Visit Date'; 
    rateLabel.innerText = 'Comment on your experience'; 

    link1.addEventListener('click', (e) => {
        e.preventDefault();
        addStadium(stadium)
    }); 

    divDatePicker.addEventListener('click', visitDate); 

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
    }); 
 
    rateDiv.appendChild(rateInput);
    rateDiv.appendChild(rateLabel);
    form.appendChild(rateDiv); 
    form.appendChild(submitButton); 

    divImage.appendChild(img);
    divImage.appendChild(span);  
    divCardContent.appendChild(pInfoTeamName); 
    divCardContent.appendChild(pInfoTeamCity); 
    divCardContent.appendChild(pInfoTeamState); 
    divCardAction.appendChild(link1); 
    divCardAction.appendChild(divDatePicker); 
    divCardAction.appendChild(dateLabel); 
    divCardAction.appendChild(form); 

    divCard.appendChild(divImage);
    divCard.appendChild(divCardContent);
    divCard.appendChild(divCardAction); 

    return divCard;
}

const createWishCard = (stadium) => {
    const divCard = document.createElement('div'); 
    const divImage = document.createElement('div'); 
    const divCardContent = document.createElement('div');
    const img = document.createElement('img'); 
    const span = document.createElement('span'); 
    const pInfoTeamName = document.createElement('p'); 
    const pInfoTeamCity = document.createElement('p');
    const pInfoTeamState = document.createElement('p'); 

    divCard.className = 'card'; 
    divImage.className = 'card-image'; 
    divCardContent.className = 'card-content';
    span.className = 'card-title';

    img.setAttribute('src', stadium.imgUrl); 
    span.innerText = stadium.field; 
    pInfoTeamName.innerText = stadium.team; 
    pInfoTeamCity.innerText = stadium.city;
    pInfoTeamState.innerText = stadium.state;

    divImage.appendChild(img);
    divImage.appendChild(span);  
    divCardContent.appendChild(pInfoTeamName); 
    divCardContent.appendChild(pInfoTeamCity); 
    divCardContent.appendChild(pInfoTeamState); 

    divCard.appendChild(divImage);
    divCard.appendChild(divCardContent);

    return divCard;
}

// ** Request **//
const loadStadiumInfo = () => {
    fetch(baseUrl + '/stadiums')
    .then(resp => resp.json())  
    .then(data => {
        stadiums = data; 
    })
}

const renderWishListOfStadiums = () => {
    fetch(baseUrl + '/wishlist')
    .then(resp => resp.json())
    .then( data => {
        wishlist = data;
    }) 
}

// ** Start up  **//

document.addEventListener('DOMContentLoaded', () => {
    loadHome(); 
    loadStadiumInfo(); 
    renderWishListOfStadiums(); 
    attachHomeLinkEvent(); 
    attachStadiumWishListLinkEvent(); 
    attachStadiumsLinkEvent(); 
    hideWishlistNumber(); 
})