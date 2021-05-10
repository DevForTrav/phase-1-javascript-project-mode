const baseURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
const searchURL = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q="
const main = document.getElementById('main')
const showRandomPiece = document.getElementById('show-random-piece')
const showSearchDiv = document.getElementById('show-search-div')
let featuredPiece;
let randomPiece;
let searchForm;
let searchPiece;
let searchInput;
let parentDiv;
let loader;
let pieceTitle;
let pieceArtist;
let pieceImage;
let ramdomizedID;
let varName;


const createImageCard = (id) => {
    let doesDivExist = document.getElementById(id)
    if (doesDivExist === null || doesDivExist === undefined) {
        parentDiv = document.createElement("div"),
        pieceTitle = document.createElement('h3'),
        pieceArtist = document.createElement('p'),
        pieceImage = document.createElement('img') 
        loader = document.createElement('div')
        parentDiv.className = 'image-card'
        parentDiv.id = id;
        let htmlElements = [ pieceTitle, pieceArtist, pieceImage, loader ]
        let classList = [ 'piece-title', 'artist-name', 'centered-image', 'loader']
        htmlElements.forEach((element, i=0) => {
            element.className = classList[i]
            i++
            parentDiv.appendChild(element)
        });
        main.appendChild(parentDiv)
    } else {
       doesDivExist.remove()
       createImageCard(id)
    }
    // varName = convertIDToVar(id)
    // // console.log(this.valueOf())s
    // if (varName === featuredPiece) {
    //     featuredPiece = document.createElement("div"),
    //     pieceTitle = document.createElement('h3'),
    //     pieceArtist = document.createElement('p'),
    //     pieceImage = document.createElement('img') 
    //     featuredPiece.className = 'image-card'
    //     featuredPiece.id = id;
    //     let htmlElements = [ pieceTitle, pieceArtist, pieceImage ]
    //     let classList = [ 'piece-title', 'artist-name', 'centered-image']
    //     htmlElements.forEach((element, i=0) => {
    //         element.className = classList[i]
    //         i++
    //         featuredPiece.appendChild(element)
            
    //     });
    //     main.appendChild(featuredPiece)
    // } else if (varName === randomPiece) {
    //     randomPiece = document.createElement("div"),
    //     pieceTitle = document.createElement('h3'),
    //     pieceArtist = document.createElement('p'),
    //     pieceImage = document.createElement('img') 
    //     randomPiece.className = 'image-card'
    //     randomPiece.id = id;
    //     let htmlElements = [ pieceTitle, pieceArtist, pieceImage ]
    //     let classList = [ 'piece-title', 'artist-name', 'centered-image']
    //     htmlElements.forEach((element, i=0) => {
    //         element.className = classList[i]
    //         i++
    //         randomPiece.appendChild(element)
    //     });
    //     main.appendChild(randomPiece)

    // } else if (varName === searchPiece){
    //     searchPiece = document.createElement("div"),
    //     pieceTitle = document.createElement('h3'),
    //     pieceArtist = document.createElement('p'),
    //     pieceImage = document.createElement('img') 
    //     searchPiece.className = 'image-card'
    //     searchPiece.id = id;
    //     let htmlElements = [ pieceTitle, pieceArtist, pieceImage ]
    //     let classList = [ 'piece-title', 'artist-name', 'centered-image']
    //     htmlElements.forEach((element, i=0) => {
    //         element.className = classList[i]
    //         i++
    //         searchPiece.appendChild(element)
    //     });
    //     main.appendChild(searchPiece)
    // }
 
}

const convertIDToVar = (string) => {
    let convertedString = string.split('-')
    convertedString[1] = convertedString[1].charAt(0).toUpperCase() + convertedString[1].slice(1)
    convertedString = convertedString.join('')
    return convertedString
    
}

const createVar = (name, id) => {
   return name = document.getElementById(id)
}

const getArtImage = (id, htmlLocation) => {
    createImageCard(htmlLocation)
    fetch(`${baseURL}/${id}`)
    .then(response => response.json())
    .then((data) => {
        if (data.objectID === id && data.primaryImage !== "")   {
            return postImageToDOM(data, htmlLocation)
        } else {
            postRandomArt()
        }
    })
}

const postImageToDOM = (artPiece, htmlLocation) => {
    let location = document.getElementById(htmlLocation)
    let img = parentDiv.getElementsByClassName('centered-image');
    let artImage = artPiece.primaryImage;
    img[0].setAttribute('src', artImage)
    parentDiv.querySelector(".piece-title").innerHTML = artPiece.title;
    postArtist(artPiece, location); 
    location.appendChild(img[0])
    loader.remove()
    
}

const hideLoader = () => { loader.style.display = "none"}

const postArtist = (artPiece, domLocation) => {
    if (artPiece.artistDisplayName) {
        domLocation.querySelector(".artist-name").innerHTML = `by ${artPiece.artistDisplayName}`;
    } else {
        domLocation.querySelector(".artist-name").innerHTML = `Unknown`
    }
}

const totalNum = () => {
    return fetch(baseURL)
    .then(response => response.json())
    .then((data) => {
        return data.total;
    })
}

const getRandomNum = (max) => {
    return  Math.floor(Math.random() * (max - 1) + 1);
}

const getRandomID = () => {
   return totalNum()
    .then(randomID => getRandomNum(randomID))
    .then(id => {
        randmizedID = id;
        return id;
    })
}

const postRandomArt = () => {
    getRandomID()
    .then(response => {
        getArtImage(response, `random-piece`)
    })
}

const createSearchForm = () => {
    searchForm = document.createElement("form")
    searchInput = document.createElement("input")
    searchInput.type = "text"
    button = document.createElement("input")
    button.type = "submit"
    button.value = "Search"
    searchForm.appendChild(searchInput)
    searchForm.appendChild(button)
    main.appendChild(searchForm)
    // searchPiece = document.getElementById('search-piece')
}

const getSearchImage = (searchCriteria) => {
    return fetch(`${searchURL}${searchCriteria}`)
        .then(response => response.json())
        .then(searchID => {
            let id = searchID.objectIDs[0];
            return id;
    })
}
const addNextButtons = () => {

}


const addPieceInteraction = () => {

}

const stageRandomDiv = () => {
   
}




document.addEventListener('DOMContentLoaded', () => {
    getArtImage(435864, `featured-piece`)
});


showRandomPiece.addEventListener("click", (function(e) {
    postRandomArt()
}))


showSearchDiv.addEventListener("click", (() => {
    if(searchForm === undefined) {
        createSearchForm()
    }
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let searchValue = JSON.stringify(searchInput.value);
        searchPiece = document.getElementById('search-piece')
        return getSearchImage(searchValue)
            .then(data => {
                console.log(searchPiece) 
                return getArtImage(data , `search-piece`)
            })
    })
}))
