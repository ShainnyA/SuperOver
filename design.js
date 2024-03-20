let teams = ['CSK', 'MI'];
let runs = [0,1,2,3,4,6,'W'];
const chosenTeam = teams[Math.floor(Math.random() * 2 )];
let team1Prog = [];
let team2Prog = [];
let team1Run = 0;
let team2Run = 0;
let wickCount1 = 0;
let wickCount2 = 0;
var startSecond = false;

function updateScore() {
    let cskScores = document.getElementsByClassName("csk-runs")[0].children;
    let miScores = document.getElementsByClassName("mi-runs")[0].children;

    for(let i=0; i<team1Prog.length; i++) {
        cskScores[i].textContent = team1Prog[i];
    }
    for(let j=0; j<team2Prog.length; j++) {
        miScores[j].textContent = team2Prog[j];
    }
}

function playSuperOver() {
    var buttonValue = document.getElementById("play");
    var resultText = document.getElementById("res");
    var team1Score = document.getElementById("csk-score");
    var team2Score = document.getElementById("mi-score");


    if(buttonValue.getAttribute("value") == "strike") {
        buttonValue.setAttribute("value", "play");
        buttonValue.textContent = chosenTeam + " Batting";
    } else {
        let chosenRun = runs[Math.floor(Math.random()*7)];
        console.log(startSecond);
        let run = chosenRun == "W" ? 0 : chosenRun;
        if(startSecond == false) {
            if(chosenTeam == "CSK") {
                team1Prog.push(chosenRun);
                if(chosenRun == "W") {
                    wickCount1 += 1;
                }
                console.log(team1Prog, team2Prog);
                team1Run += run;
                team1Score.textContent = team1Run;
    
                if(team1Prog.length == 6 || wickCount1 == 2 ) {
                    console.log("Stop");
                    startSecond = true;
                    buttonValue.setAttribute("value", "strike");
                    console.log(buttonValue.getAttribute("value"));
                }
            } else if(chosenTeam == "MI") {
                team2Prog.push(chosenRun);
                if(chosenRun == "W") {
                    wickCount2 += 1;
                }
                console.log(team1Prog, team2Prog);
                team2Run += run;
                team2Score.textContent = team2Run;
    
                if(team2Prog.length == 6 || wickCount2 == 2) {
                    console.log("Stop");
                    buttonValue.setAttribute("value", "strike");
                    console.log(buttonValue.getAttribute("value"));
                    startSecond = true;
                }
    
            }
            updateScore();
        }

        if(startSecond == true) {
            let nextTeam = teams.filter((team) => team != chosenTeam)[0];
            console.log(nextTeam);
            if(buttonValue.getAttribute("value") != "strike") {
                let chosenRun = runs[Math.floor(Math.random()*7)];
                let run = chosenRun == "W" ? 0 : chosenRun;
            
            }

            if(buttonValue.getAttribute("value") == "strike") {
                buttonValue.setAttribute("value", "play");
                buttonValue.textContent = nextTeam + " Batting";
            }
            
        if(nextTeam == "CSK") {

            if(chosenRun == "W") {
                wickCount1 += 1;
            }
            console.log(team1Prog, team2Prog);
            team1Run += run;
            team1Score.textContent = team1Run;
            team1Prog.push(chosenRun);

            if(team1Prog.length == 6 || wickCount1 == 2 || team1Run >= team2Run ) {
                console.log("Stop");
                resultText.textContent = "MI  Wins the Match";
                resultText.style.color = "blue";
                buttonValue.setAttribute("disabled", true);
            }
        } else if(nextTeam == "MI") {

            if(chosenRun == "W") {
                wickCount2 += 1;
            }
            
            console.log(team1Prog, team2Prog);
            team2Run += run;
            team2Score.textContent = team2Run;
            team2Prog.push(chosenRun);

            if(team2Prog.length == 6 || wickCount2 == 2 || team2Run >= team1Run) {
                console.log("Stop 2nd Innings");
                resultText.textContent = "CSK Wins the Match";
                resultText.style.color = "yellow";
                buttonValue.setAttribute("disabled", true);
                
            }

        }
        updateScore();
        }
        
    }
}