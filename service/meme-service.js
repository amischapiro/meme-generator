'use strict'

var gCurrMeme;

var gMemes = [
    { imgId: '1', txt:'Im donald trump'},
    { imgId: '2', txt:'Im image 2'},
    { imgId: '3', txt:'Im image 3'},
    { imgId: '4', txt:'Im image 4'},
    { imgId: '5', txt:'Im image 5'},
    { imgId: '6', txt:'Im image 6'},
    { imgId: '7', txt:'Im image 7'},
    { imgId: '8', txt:'Im image 8'},
    { imgId: '9', txt:'Im image 9'},
    { imgId: '10', txt:'Im image 10'},
    { imgId: '11', txt:'Im image 11'},
    { imgId: '12', txt:'Im image 12'},
    { imgId: '13', txt:'Im image 13'},
    { imgId: '14', txt:'Im image 14'},
    { imgId: '15', txt:'Im image 15'},
    { imgId: '16', txt:'Im image 16'},
    { imgId: '17', txt:'Im image 17'},
    { imgId: '18', txt:'Im image 18'},
]


function getMemes(){
    return gMemes
}

function setLineTxt(val){
    var meme = gMemes.find((m)=>{
        return m.imgId === gCurrMeme
    })
    meme.txt = val
    
    
}

function setCurrMeme(num){
    gCurrMeme = num
    
}