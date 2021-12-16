'use strict'
const MEME_STORAGE_KEY ='memeDB'

var gMemes


function _saveMemeToStorage() {
    saveToStorage(MEME_STORAGE_KEY, gMemes)
}

function saveToMemes(meme){
    gMemes =loadFromStorage(MEME_STORAGE_KEY)
    if(!gMemes||!gMemes.length){
        gMemes = []
        gMemes.push('img/1.jpg')
        gMemes.push('img/2.jpg')
        gMemes.push('img/3.jpg')
    }
    gMemes.push(meme)
    _saveMemeToStorage()
}

