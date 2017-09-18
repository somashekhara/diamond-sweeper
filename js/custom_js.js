var parentDiv = document.querySelector('#parentDiv');
var listItem = document.createElement('li');
var total_final_score = document.getElementById('options_left');
var total_score = 0;
for(var i = 0; i<64; i++){
     var listItem = document.createElement('li');
     listItem.id = i;
     var listItemFirstImg = document.createElement('img');
          listItemFirstImg.src = 'images/question.jpg';
          listItemFirstImg.className = 'primaryImage';
          listItemFirstImg.id = i;
          listItem.appendChild(listItemFirstImg);
     parentDiv.appendChild(listItem);
}

function placeDiamods(){
     var ul = document.querySelector('#parentDiv');
     var items = ul.getElementsByTagName('li');
     var allList = [];
     for(var j=0; j<items.length; j++){
          listImgId = items[j].querySelector('img').id;
          allList.push(listImgId);
     }
     function shuffleArray(array) {
         for (var i = array.length - 1; i > 0; i--) {
             var j = Math.floor(Math.random() * (i + 1));
             var temp = array[i];
             array[i] = array[j];
             array[j] = temp;
         }
         return array.splice(1,8);
     }
     var shuffledArray = shuffleArray(allList);
     shuffledArray.forEach(function(index){
          placeDiamond = items[index];
          placeDiamond.className = 'diamondImage';
          listItemSecondImg = document.createElement('img');
          listItemSecondImg.src = 'images/diamond.png';
          listItemSecondImg.className = 'secondaryImage hidden';
          placeDiamond.appendChild(listItemSecondImg);
     });
     //console.log(shuffledArray);
}
var diamondCount = 0;
function checkDiamond(e){
     targetList = e.target.parentNode;
     if(targetList.tagName == 'UL'){
          return false;
     }
     var currentDiamondImg;
     total_score += 1;
     targetListId = targetList.id;
     if(targetList.querySelector('img.secondaryImage') != null){
          targetList.classList = '';
          targetList.querySelector('img.secondaryImage').classList = 'secondaryImage';
          targetList.querySelector('img.primaryImage').src = '';
          diamondCount += 1;
          targetList.style.cursor = 'no-drop';
          currentDiamondImg = 'hasDiamond';
     }else{
          targetList.querySelector('img.primaryImage').src = '';
          targetList.style.cursor = 'no-drop';
     }
     var currentElementId = targetList.id;
     var prevDiamond = [];
     var nextDiamond = [];
     $(targetList).prevAll().each(function(index){
          if(this.className == 'diamondImage'){
               idAsNum = parseInt(this.id);
               prevDiamond.push(idAsNum);
          }
     });
     $(targetList).nextAll().each(function(index){
          if(this.className == 'diamondImage'){
               idAsNum = parseInt(this.id);
               nextDiamond.push(idAsNum);
          }
     });
     var prevDiamond = Math.max.apply(null, prevDiamond);
     var nextDiamond = Math.min.apply(null, nextDiamond);
     var prevElNum = currentElementId-prevDiamond;
     var nextElNum = nextDiamond-currentElementId;
     console.log(prevElNum + '-' + nextElNum);
     var arrowId;
     $('img').each(function(i) {
          imgSrc = this.src;
          imgAbsSrc = imgSrc.substr(-8);
          if(imgAbsSrc=='prev.png' || imgAbsSrc == 'next.png'){
              arrowId = this.id;
              document.querySelector('img[id="'+arrowId+'"]').src = '';
               // document.querySelector('img#'+arrowId).src = '';
          }
     });


     if(prevElNum > nextElNum && currentDiamondImg != 'hasDiamond'){
          targetList.querySelector('img.primaryImage').src = 'images/next.png';
     }else if(prevElNum < nextElNum && currentDiamondImg != 'hasDiamond'){
          targetList.querySelector('img.primaryImage').src = 'images/prev.png';
     }else if(prevElNum == nextElNum && currentDiamondImg != 'hasDiamond'){
          console.log('any side');
     }


     targetList.removeEventListener('click', function(e){});
     leftOptions = 64 - total_score;
     total_final_score.innerHTML = leftOptions;
     if(leftOptions>=21 && leftOptions<=30){
          total_final_score.parentNode.classList = 'btn btn-warning';
     }
     if(leftOptions<=20){
          total_final_score.parentNode.classList = 'btn btn-danger';
     }
     if(diamondCount==8){
          totalScore = 64 - total_score;
          document.getElementById("gameCompleated").click();
          caluclateFinalScore.call(this, totalScore, 64);
     }
}

var fetchClickLi = document.querySelector('#parentDiv');
fetchClickLi.addEventListener("click", function(e){
     if(e.target.parentNode.tagName = 'li'){
          checkDiamond(event);
     }
});
function caluclateFinalScore(leftOutOptions, totalOptions){
     score = Math.floor((leftOutOptions/totalOptions)*100);
     if(score<0){
          score = 0;
     }
     document.getElementById('finalScore').innerHTML = score;
}
window.onload = placeDiamods();
