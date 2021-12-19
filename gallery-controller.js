'use strict'
// var funny = [, ]
// var movies = [, , 14, 15, 16, 18]
// var pets = [, , ]
// var babies = [, , , ]
// var politics = [, , 17]
var gFilter
var gKeys;

const KEYS_STORAGE_KEY = 'keysDB'

var gImgs = [
    { id: 1, keywords: ['politics'] },
    { id: 2, keywords: ['pets'] },
    { id: 3, keywords: ['pets','babies'] },
    { id: 4, keywords: ['pets'] },
    { id: 5, keywords: ['babies'] },
    { id: 6, keywords: [] },
    { id: 7, keywords: ['babies'] },
    { id: 8, keywords: ['movies'] },
    { id: 9, keywords: ['babies','funny'] },
    { id: 10, keywords: ['funny','politics'] },
    { id: 11, keywords: [] },
    { id: 12, keywords: [] },
    { id: 13, keywords: ['movies'] },
    { id: 14, keywords: ['movies'] },
    { id: 15, keywords: ['movies'] },
    { id: 16, keywords: ['movies'] },
    { id: 17, keywords: ['politics'] },
    { id: 18, keywords: ['movies'] },
]


function renderImgs() {
    var strHTML = ''
    if (gFilter) {
        gImgs.map(img => {
            if(img.keywords.includes(gFilter)){
                strHTML += `<img class="img${img.id}" src="img/${img.id}.jpg" onclick="onImgSelect('${img.id}')">`
            }
        });
        document.querySelector('.home').innerHTML = strHTML
        return
    }
    for (var i = 1; i <= 18; i++) {
        strHTML += `<img class="img${i}" src="img/${i}.jpg" onclick="onImgSelect('${i}')">`
    }
    document.querySelector('.home').innerHTML = strHTML
}


function setFilter(filter) {
    gFilter = filter
    renderImgs()
    gKeys[filter]++
    saveKeysToStorage()
    var elBtn = document.querySelector('.'+ filter+'-btn')
    elBtn.style.fontSize = gKeys[filter] +'px'

}
////resets on refresh 
function saveKeysToStorage(){
    saveToStorage(KEYS_STORAGE_KEY,gKeys)
}

function setKeys(){
   gKeys = getKeys()
    var elFunny = document.querySelector('.funny-btn')
    var elMovies = document.querySelector('.movies-btn')
    var elPets = document.querySelector('.pets-btn')
    var elBabies = document.querySelector('.babies-btn')
    var elPolitics = document.querySelector('.politics-btn')
    elFunny.style.fontSize = gKeys.funny +'px'
    elMovies.style.fontSize = gKeys.movies +'px'
    elPets.style.fontSize = gKeys.pets +'px'
    elBabies.style.fontSize = gKeys.babies +'px'
    elPolitics.style.fontSize = gKeys.politics +'px'
}

function getKeys(){
    var keys = loadFromStorage(KEYS_STORAGE_KEY)
    if(!keys){
        console.log('keys',keys)
        keys = {funny:20,movies:20,pets:20,babies:20,politics:20}
    }
    return keys
}

function onSearch(){
    var elInput = document.querySelector('.search input')
    setFilter(elInput.value)
    elInput.value = ''
    
}