'use strict'

function renderImgs(){
    var strHTML = ''
    for(var i = 1; i<=18;i++){
        strHTML += `<img class="img${i}" src="img/${i}.jpg" onclick="onImgSelect('${i}')">`
    } 
    document.querySelector('.home').innerHTML = strHTML
}


