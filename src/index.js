const baseURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
const searchURL = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q="
const main = document.getElementById('main')
const showRandomPiece = document.getElementById('show-random-piece')
const showSearchDiv = document.getElementById('show-search-div')
const artCollectionLink = document.getElementById('art-collection-link')
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
let specificID;
let ramdomizedID;
let varName;
let collectedIDs = [];
let uniq;
let artCollection;
let likedImages = []


const createImageCard = (id, htmlLocation) => {
    console.log(`htmlLocation ${htmlLocation}`)
    let doesDivExist = document.getElementById(htmlLocation)
    console.log(doesDivExist)
    if (doesDivExist === null || doesDivExist === undefined) {
        let divTitle = document.createElement('h2')
        parentDiv = document.createElement("div"),
        pieceTitle = document.createElement('h3'),
        pieceArtist = document.createElement('p'),
        pieceImage = document.createElement('img') 
        specificID = document.createElement('p')
        loader = document.createElement('div')
        divTitle.innerHTML = idToHeader(htmlLocation)
        specificID.innerHTML = id
        parentDiv.appendChild(divTitle)
        parentDiv.className = 'image-card'
        parentDiv.id = htmlLocation;
        let htmlElements = [ pieceTitle, pieceArtist, pieceImage, specificID, loader ]
        let classList = [ 'piece-title', 'artist-name', 'centered-image','object-id', 'loader']
        htmlElements.forEach((element, i=0) => {
            element.className = classList[i]
            i++
            parentDiv.appendChild(element)
        });
        doesDivExist = document.getElementById(htmlLocation)
        main.appendChild(parentDiv)
    } else {
        doesDivExist.remove()
        // console.log('This is passing undefined to the recursive function')
        createImageCard(id, htmlLocation)
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

const createArtCollection = () => {
    artCollection = document.createElement("div")
    artCollection.id = "art-collection"
    // artCollection.className = "image-card"
    main.appendChild(artCollection)
    let artUL = document.createElement("ul")
    artCollection.appendChild(artUL)
    likedImages.forEach((element, i = 1) => {
        fetch(`${baseURL}/${element}`)
        .then(response => response.json())
        .then(data => {
            let artLI = document.createElement('li')
            let titleLI = document.createElement('p')
            let imageLI = document.createElement('img')
            imageLI.className = "collection-image"
            artLI.className = "collection-li"
            titleLI.innerHTML = data.title
            imageLI.setAttribute('src', data.primaryImage )
            artLI.appendChild(titleLI)
            artLI.appendChild(imageLI)
            artUL.appendChild(artLI)

        })
    });

}

const convertIDToVar = (string) => {
    let convertedString = string.split('-')
    convertedString[1] = convertedString[1].charAt(0).toUpperCase() + convertedString[1].slice(1)
    convertedString = convertedString.join('')
    return convertedString
    
}

const idToHeader = (string) => {
    let convertedString = string.split('-')
    convertedString[0] = convertedString[0].charAt(0).toUpperCase() + convertedString[0].slice(1)
    convertedString[1] = convertedString[1].charAt(0).toUpperCase() + convertedString[1].slice(1)
    convertedString = convertedString.join(' ')
    return convertedString

}

// const createVar = (name, id) => {
//    return name = document.getElementById(id)
// }

const getArtImage = (id, htmlLocation) => {
    createImageCard(id, htmlLocation) 
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
    addPieceInteraction(htmlLocation)
    
}


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

const likeImage = (id) => {
    likedImages.push(parseInt(id))
}
// let array = [1, 1, 2, 2, 3, 3, 5]
const uniqueArray = (array) => {
    // return a new array of all unique values of the array


    let unique = []
    array.forEach((element) => {
        if (!unique.includes(element)) {
            unique.push(element)
        }
    })
    return unique;
}


const addPieceInteraction = (htmlLocation) => { 
    const btn = ["like", "comment"]
    btn.forEach(element => {
        button = document.createElement('button')
        button.id = `${htmlLocation}-btn`
        button.className = `${element}-btn`
        button.innerHTML = element
        parentDiv.appendChild(button)
        
    });  
}


document.addEventListener('DOMContentLoaded', () => {
    getArtImage(435864, `featured-piece`)
});


showRandomPiece.addEventListener("click", (() => {
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
                return getArtImage(data , `search-piece`)
            })
    })
}))

main.addEventListener('click', (e) => {
    if(e.target.className === 'like-btn'){
        console.log(e.target.parentElement.children[3].innerHTML)
        console.log(e.target)
        likeImage(e.target.parentElement.children[3].innerHTML)
    } else if (e.target.className === '') {
        // creat
    }
})

artCollectionLink.addEventListener("click", () => {
    if (artCollection === undefined) {
        createArtCollection()   
    }

})

