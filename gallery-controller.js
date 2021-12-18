'use strict'
var funny = [9,10]
var movies = [8,13,14,15,16,18]
var pets = [2,3,4]
var babies = [3,5,7,9]
var politics = [1,10,17]
var gFilter


function renderImgs(){
    var strHTML = ''
    if(gFilter){
        gFilter.forEach(num => {
            strHTML += `<img class="img${num}" src="img/${num}.jpg" onclick="onImgSelect('${num}')">`
        });
        document.querySelector('.home').innerHTML = strHTML
        return
    }
    for(var i = 1; i<=18;i++){
        strHTML += `<img class="img${i}" src="img/${i}.jpg" onclick="onImgSelect('${i}')">`
    } 
    document.querySelector('.home').innerHTML = strHTML
}


function setFilter(filter){
    gFilter = window[filter]
    renderImgs()
    
}