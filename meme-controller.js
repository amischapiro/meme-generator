'use strict'
var gCanvas;
var gCtx;
var gCurrColor = 'white'
var gCurrFontSize = 50
var gCurrLine = 'top'




function init() {
    gCanvas = document.querySelector('#my-canvas')
    gCtx = gCanvas.getContext('2d')
    // resize
    // listeners
    // note
    renderMeme('1');
}




function renderMeme(num) {
    var memes = getMemes()
    drawImage(num)
    var meme = memes.find((m) => {
        return m.imgId === num
    })
    if(gCurrLine==='top')drawText(meme.txt,250,50)
    if(gCurrLine==='bottom') drawText(meme.txt,gCanvas.height-250,gCanvas.width - 50)

    ///add input placeholder listener
}

function drawImage(img) {
    // var image = new Image()
    // image.src = img
    // image.onload = () => {
    //     gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height)
    // }

    var elImg = document.querySelector(`.img${img}`);
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawText(txt, x, y) {
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'center'
    gCtx.font = ` ${gCurrFontSize}px monospace`;
    gCtx.fillStyle = gCurrColor;
    gCtx.fillText(txt, x, y);
}

function onSetTxt(val){
    setLineTxt(val)
    renderMeme(gCurrMeme)
    
}




function setEditor(num){
    
    var elHome = document.querySelector('.home')
    var elEditor = document.querySelector('.editor')
    elHome.style.display = 'none'
    renderMeme(num)
    elEditor.style.display = 'grid'
}

function onSetColor(val){
    gCurrColor = val
    renderMeme(gCurrMeme)
}

function onSetFont(val){ 
    if (val==='+') gCurrFontSize += 2
    if (val==='-') gCurrFontSize -= 2
    renderMeme(gCurrMeme)
}

function onSwitchLine(){
    if(gCurrLine==='top'){
        gCurrLine = 'bottom'
    } else{
        gCurrLine = 'top'
    }
}