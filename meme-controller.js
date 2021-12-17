'use strict'
var gCanvas;
var gCtx;
var gCurrColor = 'white'
var gCurrFontSize = 50
var gAlign = 'center'
var gShadow = false
var gFont = 'impact'
var gNextHeight = 200

var gMeme = {
    selectedImgId:'1',
    selectedLineIdx:0,
    lines: [
        {txt:'Enter line',size:50,align:'center',color:'white',height:50},
        {txt:'Enter another line',size:50,align:'center',color:'red',height:450}
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
    gMeme.selectedImgId = num
    changePage('editor')
}



function renderMeme() {
    drawImage(gMeme.selectedImgId)
     gMeme.lines.forEach((line,idx)=>{
         drawText(line.txt,gCanvas.width/2,line.height,idx)
     })
}

function drawImage(img) {
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
    gCtx.font = ` ${gMeme.lines[idx].size}px ${gFont}`;
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
    if(gMeme.selectedLineIdx=== gMeme.lines.length -1){
        gMeme.selectedLineIdx = 0
        return
    }
    gMeme.selectedLineIdx++


}

function onSave(){
    var meme = gCanvas.toDataURL()
    saveToMemes(meme)   
}


function changePage(page){
    var elHome = document.querySelector('.home')
    var elEditor = document.querySelector('.editor')
    var elSearchBar = document.querySelector('.search-bar')
    var elFooter = document.querySelector('.footer')
    var elSavedMemes = document.querySelector('.saved-memes')
    var elAbout = document.querySelector('.about')
    if(page === 'meme'){
        elHome.style.display = 'none'
        elEditor.style.display = 'none'
        elSearchBar.style.display = 'none'
        elFooter.style.display = 'flex'
        elAbout.style.display= 'none'
        renderGmemes()
        elSavedMemes.style.display = 'flex'


    }
    if(page === 'editor'){
        elHome.style.display = 'none'
        elSearchBar.style.display = 'none'
        elAbout.style.display= 'none'
        renderMeme()
        elEditor.style.display = 'flex'
        elFooter.style.display = 'flex'
        elSavedMemes.style.display = 'none'
    }
    if(page === 'gallery'){
        elSearchBar.style.display= 'block'
        elHome.style.display= 'grid'
        elEditor.style.display = 'none'
        elFooter.style.display = 'flex'
        elSavedMemes.style.display = 'none'
        elAbout.style.display = 'flex'
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

function onAddLine(){
    gMeme.lines.push({txt:'Enter another line',size:50,align:'center',color:'blue',height:gNextHeight})   
    gNextHeight +=50
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}

function onDelete(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
    gMeme.selectedLineIdx -- 
    gNextHeight -= 50
    renderMeme()
}