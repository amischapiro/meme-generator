'use strict'
var gCanvas;
var gCtx;
var gCurrColor = 'white'
var gCurrFontSize = 50
var gAlign = 'center'
var gShadow = false
var gFont = 'impact'

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
    changePage('editor')
}



function renderMeme() {
    drawImage(gMeme.selectedImgId)
    drawText(gMeme.lines[0].txt,gCanvas.width / 2,50,0)
    drawText(gMeme.lines[1].txt,gCanvas.width/2,gCanvas.width-50,1)
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
    // if(gMeme.selectedLineIdx===0)drawBorder(txt,x,y)
    // if(gMeme.selectedLineIdx===1)drawBorder(txt,x,y)
    // gCtx.textBaseline = 'top'
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = gAlign
    if(gShadow){
        gCtx.shadowColor = 'black'
        gCtx.shadowBlur = 10
    }else{
        gCtx.shadowBlur = 0
    }
    // gCtx.textAlign = 'left'
    var textWidth = gCtx.measureText(txt).width
    gCtx.font = ` ${gMeme.lines[idx].size}px ${gFont}`;
    gCtx.fillStyle = gMeme.lines[idx].color;
    var words = txt.split(' ')
    // console.log('words:', words.length);
    
    // if(gCanvas.width - textWidth<100){
    //     y+=30
    //     gCtx.fillText()
    // }
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

function onSave(){
    
    var meme = gCanvas.toDataURL()
    saveToMemes(meme)
    console.log('gMemes:', gMemes);
    
    
    
}


function changePage(page){
    var elHome = document.querySelector('.home')
    var elEditor = document.querySelector('.editor')
    var elSearchBar = document.querySelector('.search-bar')
    var elFooter = document.querySelector('.footer')
    var elSavedMemes = document.querySelector('.saved-memes')
    if(page === 'meme'){
        elHome.style.display = 'none'
        elEditor.style.display = 'none'
        elSearchBar.style.display = 'none'
        elFooter.style.display = 'none'
        renderGmemes()
        elSavedMemes.style.display = 'flex'

    }
    if(page === 'editor'){
        elHome.style.display = 'none'
        elSearchBar.style.display = 'none'
        renderMeme()
        elEditor.style.display = 'grid'
        elFooter.style.display = 'block'
        elSavedMemes.style.display = 'none'
    }
    if(page === 'gallery'){
        elSearchBar.style.display= 'block'
        elHome.style.display= 'grid'
        elEditor.style.display = 'none'
        elFooter.style.display = 'block'
        elSavedMemes.style.display = 'none'
    }
}

function renderGmemes(){
    const memes = loadFromStorage(MEME_STORAGE_KEY)
    console.log('memes:', memes);
    
    
    var strHTMLs = memes.map(function(meme){
       return  `<div><img src="${meme}" ></div>`
    })
    console.log('strHTMLs:', strHTMLs);
    
    document.querySelector('.saved-memes').innerHTML = strHTMLs.join('')
    

}

function setAlign(direction){
    gAlign = direction
    renderMeme()
}

function setShadow(){
    gShadow = !gShadow
    renderMeme()
    
}

function setFont(val){
    gFont = val
    renderMeme()
}