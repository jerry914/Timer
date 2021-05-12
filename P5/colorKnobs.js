
var colorKnob;
var collecterName = [];
var choiseIdx = 0;
var positionIdx = 0;

function setup() {
  pixelDensity(4.0);
  createCanvas(windowWidth, windowHeight);
  
  noStroke();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // console.log(user.uid);
    }
    else{
        window.location.href = "index.html";
    }
  });
  var db = firebase.firestore();
  var ref = db.collection('collecter');
  
  ref.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          collecterName.push(doc.id);
      });
  });
  textAlign(CENTER);
}

function draw() {
  background("#3c3c3c");
  
  
  

  for(let i=0;i<collecterName.length;i++){
    if(choiseIdx==i){
      fill("#ffa");
    }
    else{
      fill(255);
    }
    
    let dis = collecterName.length/(abs(i-positionIdx)+1);
    textSize(28+dis*6);
    text(collecterName[i],width/2,100+60*i);
  }
}
function handleOrientation(event) {
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]

  choiseIdx = floor(map(x,70,40,0,collecterName.length));
  positionIdx = map(x,70,40,0,collecterName.length);

  
}



function changePath(){
  if(collecterName[choiseIdx]){
    window.location.href = "check.html?type="+collecterName[choiseIdx];
  }
}

function mousePressed() { }

function mouseReleased() { }
