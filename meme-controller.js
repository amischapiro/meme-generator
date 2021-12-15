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
    drawText(gMeme.lines[0].txt,140,30,0)
    drawText(gMeme.lines[1].txt,gCanvas.height-500,gCanvas.width-80,1)
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
    ///border only on current text
    if(gMeme.selectedLineIdx===0)drawBorder(txt,x,y)
    if(gMeme.selectedLineIdx===1)drawBorder(txt,x,y)
    gCtx.textBaseline = 'top'
    // gCtx.textBaseline = 'middle'
    // gCtx.textAlign = 'center'
    gCtx.textAlign = 'left'
    gCtx.font = ` ${gMeme.lines[idx].size}px monospace`;
    gCtx.fillStyle = gMeme.lines[idx].color;
    gCtx.fillText(txt, x, y);
}

function drawBorder(txt,x,y){
    var lineHeight = gMeme.lines[gMeme.selectedLineIdx].size *1.286
    var textWidth = gCtx.measureText(txt).width
    gCtx.setLineDash([5,15])
    gCtx.strokeRect(x,y,textWidth,lineHeight)
}
function clearBorder(x,y){
    gCtx.clearRect(x,y,gCtx.measureText(txt).width,gMeme.lines[gMeme.selectedLineIdx].size *1.286)
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