'use strict'
const MEME_STORAGE_KEY ='memeDB'

var gMemes;


function _saveMemeToStorage() {
    saveToStorage(MEME_STORAGE_KEY, gMemes)
}


// create gMemes , onsave push saved img to gmemes and save to local storage
//save the canvas using gCancas.toDataURL()
//change memes button font
