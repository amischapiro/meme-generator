'use strict'
var gCanvas;
var gCtx;
var gCurrColor = 'white'
var gCurrFontSize = 50

var gMeme = {
    selectedImgId:'1',
    selectedLineIdx:0,
    lines: [
        {txt:'Enter line',size:50,align:'left',color:'white'},
        {txt:'Enter another line',size:50,align:'left',color:'red'}
    ]

}




function init() {
    renderImgs()
    gCanvas = document.querySelector('#my-canvas')
    gCtx = gCanvas.getContext('2d')
    // resize
    // listeners
    renderMeme();
}

function onImgSelect(num){
    // setCurrMeme(num)
    gMeme.selectedImgId = num
    setEditor()
}



function renderMeme() {
    drawImage(gMeme.selectedImgId)
    drawText(gMeme.lines[0].txt,250,50,0)
    drawText(gMeme.lines[1].txt,gCanvas.height-250,gCanvas.width-50,1)
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

function drawText(txt, x, y,idx) {
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'center'
    gCtx.font = ` ${gMeme.lines[idx].size}px monospace`;
    gCtx.fillStyle = gMeme.lines[idx].color;
    gCtx.fillText(txt, x, y);
}

function onSetTxt(val){
    setLineTxt(val)
    renderMeme()
    
}

function setLineTxt(val){
    gMeme.lines[gMeme.selectedLineIdx].txt = val 
}




function setEditor(){
    var elHome = document.querySelector('.home')
    var elEditor = document.querySelector('.editor')
    elHome.style.display = 'none'
    renderMeme()
    elEditor.style.display = 'grid'
}

function onSetColor(val){
    gMeme.lines[gMeme.selectedLineIdx].color= val
    renderMeme()
}

function onSetFont(val){ 
    console.log('gMeme.lines[]:', gMeme.selectedLineIdx);
    
    if (val==='+') gMeme.lines[gMeme.selectedLineIdx].size += 2
    if (val==='-') gMeme.lines[gMeme.selectedLineIdx].size -= 2
    renderMeme()
}

function onSwitchLine(){
    if(gMeme.selectedLineIdx===1){
        gMeme.selectedLineIdx--
        return
    }
    gMeme.selectedLineIdx++
}