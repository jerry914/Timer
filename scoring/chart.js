
var db = firebase.firestore();

var class_score = [];
var class_name = ['Gryffindor','Slytherin','Ravenclaw','Hufflepuff'];

var refStatus = [];


for(var i=0;i<4;i++){
    refStatus.push(db.collection("magic_school").doc(class_name[i]));
}

get_data();

function get_data(){
    class_score = []
    for(var i=0;i<4;i++){
        refStatus[i].get().then((statusData) => {
            let sdata = statusData.data();
            class_score.push(sdata.score);
            makeChart();
        });
    }
}


function makeChart(){
    var ctx = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: class_name,
            datasets: [{
                label: 'Score Board',
                data: class_score,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}


var add_score_btn = [];

for(var i=0;i<4;i++){
    add_score_btn.push(document.getElementById(class_name[i]));
}

function update_score(idx){
    var score = document.getElementById('score').value;
    console.log(class_name[idx]+score+class_score[idx]);
    console.log(refStatus[idx]);
    if(refStatus[idx]){
        refStatus[idx].update({
            score: parseInt(score)+parseInt(class_score[idx]),
            }).then(() => {
                if(score>0){
                    document.getElementById("top_text").textContent = score+" point for "+class_name[idx]
                }
                else{
                    document.getElementById("top_text").textContent = Math.abs(score)+" point from "+class_name[idx]
                }
                get_data();
        });
    }
}