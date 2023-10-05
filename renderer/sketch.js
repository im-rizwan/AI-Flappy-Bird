
function he(){
 console.log(getBird);
}
let bestmodel = false;
let trainedModel = false;
let uploadedModel = false;
let playGame = false;
const TOTAL = 250;
let birds = [];
let savedBirds = [];
var pipes = [];
let counter = 0;
let scorecounter = 0;
let highestscore = 0;
let scorecounterForBest=0;
let highestscoreForBest=0
let paused = true;
let slider;
let cloudImg;
let trainedbird;
let flappyBird;
let uploadedBird;
let bird;
let birdBrain;
let uploadedBirdbrain;
function preload() {
  cloudImg = loadImage("cloud.png");
  birdImg = loadImage("bird.png");
  brainJson = JSON.stringify(MyTrainedBird);
  uploadedBirdbrainJson = JSON.stringify(getBird);
}

let downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", download);
function download() {
  let mybird = birds[0];
  saveJSON(mybird.brain, "bird.json");
}

function setup() {
  myCoolCanvas = createCanvas(1200, 550);
  myCoolCanvas.parent("sketch-holder");
  slider = createSlider(1, 10, 1);
  slider.addClass("mySliders");
  for (var i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  birdBrain = NeuralNetwork.deserialize(brainJson);
  uploadedBirdbrain = NeuralNetwork.deserialize(uploadedBirdbrainJson);
  bird = new Bird(birdBrain);
  uploadedBird = new Bird(uploadedBirdbrain)
  trainedbird = new Bird();
   flappyBird = new Bird();
   uploadedBird = new Bird();
}

let trainedModelButton = document.getElementById("runTrainedModel");
trainedModelButton.addEventListener("click", runTrainedModel);
function runTrainedModel() {
  trainedbird = birds[0];
  trainedModel = !trainedModel;
}

let bestModelButton = document.getElementById("bestModel");
bestModelButton.addEventListener("click", bestModel);
function bestModel() {
  bestmodel = !bestmodel;
}

let btn = document.getElementById("pauseTraining");
btn.addEventListener("click", buttonPressed);
function buttonPressed() {
  paused = !paused;
  bestmodel = false;
  trainedModel = false;
  //console.log("SPACE");
  //bird.up();
}

let playGameButton = document.getElementById("playgame");
playGameButton.addEventListener("click", playGamePressed);
function playGamePressed() {
  playGame = !playGame;
}


function draw() {
  background("#AFD3E2");
  image(cloudImg, 800, 40, 150, 100);
  image(cloudImg, 1000, 350, 150, 100);
  image(cloudImg, 250, 300, 150, 100);
  image(cloudImg, 650, 480, 150, 100);
  image(cloudImg, 100, 100, 150, 100);
if(playGame===true){
      flappyBird.update();
    flappyBird.show();
for(let pipe of pipes){
  pipe.show(); 
}
for (let n = 0; n < slider.value(); n++) {
  if (counter % 80 == 0) {
    pipes.push(new Pipe());
  }
  counter++;
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    
    if (pipes[i].hits(Bird)) {
      //console.log("HIT");
    }
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    if(pipes[i].hits(flappyBird)){
      this.highlight = true;
      console.log("HIT");
    } 
  }
}
    }

  if(playGame===false){
    if (bestmodel === false) {
    
      for(let bird of birds){
  
          bird.show();
  
      }
      for(let pipe of pipes){
  
          pipe.show();
  
      }
      
      if (!paused) {
        let topscore = select("#topscore");
      let score = select("#score");
        scorecounter = scorecounter + slider.value() + 1;
        //console.log(scorecounter);
        if (scorecounter % 7 == 0) {
          //console.log(counter );
          score.html(scorecounter);
          topscore.html(highestscore);
  
          if (scorecounter > highestscore) {
            highestscore = scorecounter;
          }
        }
  
        for (let n = 0; n < slider.value(); n++) {
          if (counter % 80 == 0) {
            pipes.push(new Pipe());
          }
          counter++;
  
          for (let bird of birds) {
            bird.think(pipes);
            bird.update();
          }
          generationSpan = select("#generation");
  
          if (birds.length === 0) {
            counter = 0;
  
            if (scorecounter > highestscore) {
              highestscore = scorecounter;
            }
            scorecounter = 0;
  
            generationSpan.html(generationCount);
            generationCount = nextGeneration();
            pipes = [];
          }
  
          for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            for (let j = birds.length - 1; j >= 0; j--) {
              if (pipes[i].hits(birds[j])) {
                //console.log("HIT");
                savedBirds.push(birds.splice(j, 1)[0]);
              }
            }
            if (pipes[i].hits(Bird)) {
              //console.log("HIT");
            }
            if (pipes[i].offscreen()) {
              pipes.splice(i, 1);
            }
          }
          for (let i = birds.length - 1; i >= 0; i--) {
            if (birds[i].offscreen()) {
              savedBirds.push(birds.splice(i, 1)[0]);
            }
          }
        }
  
        //drawing
  
        for (let bird of birds) {
          bird.show();
        }
        
        for (let pipe of pipes) {
          pipe.show();
        }
        // pauseTraining=select('#pauseTraining');
      }
    }
  
    if (bestmodel === true) {
      for (let n = 0; n < slider.value(); n++) {
        if (counter % 80 == 0) {
          pipes.push(new Pipe());
        }
        counter++;
        
        //console.log(scorecounter);
        
  
        bird.think(pipes);
        bird.update();
  
        for (var i = pipes.length - 1; i >= 0; i--) {
          pipes[i].update();
  
          if (pipes[i].hits(Bird)) {
            console.log("HIT");
          }
          if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
          }
        }
  
        if (bird.offscreen()) {
          console.log("HIT");
        }
      }
  
      //drawing
      background(0);
  
      bird.show();
  
      for (let pipe of pipes) {
        pipe.show();
      }
    }
  
    //for trained so far model
    if (trainedModel === true) {
      for (let n = 0; n < slider.value(); n++) {
        if (counter % 80 == 0) {
          pipes.push(new Pipe());
        }
        counter++;
  
        trainedbird.think(pipes);
        trainedbird.update();
  
        for (var i = pipes.length - 1; i >= 0; i--) {
          pipes[i].update();
  
          if (pipes[i].hits(trainedbird)) {
            console.log("HIT");
            trainedModel = false;
            bestmodel = false;
          }
          if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
          }
        }
  
        if (trainedbird.offscreen()) {
          //console.log("HIT");
          trainedModel = false;
          bestmodel = false;
        }
      }
  
      //drawing
      background(0);
  
      trainedbird.show();
  
      for (let pipe of pipes) {
        pipe.show();
      }
    }

    if (uploadedModel === true) {
      for (let n = 0; n < slider.value(); n++) {
        if (counter % 80 == 0) {
          pipes.push(new Pipe());
        }
        counter++;
       
        
  
        uploadedBird.think(pipes);
        uploadedBird.update();
  
        for (var i = pipes.length - 1; i >= 0; i--) {
          pipes[i].update();
  
          if (pipes[i].hits(Bird)) {
            console.log("HIT");
          }
          if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
          }
        }
  
        if (uploadedBird.offscreen()) {
          console.log("HIT");
        }
      }
  
      //drawing
      background(0);
  
      uploadedBird.show();
  
      for (let pipe of pipes) {
        pipe.show();
      }
    }
  }
}


let MyTrainedBird = {
  "input_nodes": 5,
  "hidden_nodes": 8,
  "output_nodes": 2,
  "weights_ih": {
    "rows": 8,
    "cols": 5,
    "data": [
      [
        -2.3671660835689194,
        0.6322366311658095,
        0.0048391394021971915,
        0.9489717193933611,
        -0.8269277056430766
      ],
      [
        -0.8401857851828597,
        0.7024924611936808,
        0.9459654271002542,
        0.9396643698187155,
        -0.9790654388736576
      ],
      [
        0.5426975121294193,
        -1.74902979997948,
        0.7853126065933296,
        0.2044578799923199,
        -0.4598574382904074
      ],
      [
        0.9337691177189849,
        0.963198951771546,
        1.3060976039673804,
        -0.23366596720690436,
        -0.4449838565960548
      ],
      [
        1.068579906379294,
        -1.9956665894859107,
        0.03256686426053133,
        0.15352554664331608,
        -0.09102637129260985
      ],
      [
        -1.4844319546274922,
        0.5013119271827052,
        -2.4470562884225595,
        -0.020833628495686568,
        -0.5500720466811667
      ],
      [
        0.9129179680360283,
        0.3104509994873643,
        -1.0361754394610732,
        0.43720355951243806,
        0.022189630727333015
      ],
      [
        1.0531250913449914,
        0.655324716028379,
        0.4736468536250601,
        -0.3420443677049866,
        0.2866485408006916
      ]
    ]
  },
  "weights_ho": {
    "rows": 2,
    "cols": 8,
    "data": [
      [
        -2.174474756836491,
        -0.58772138801427,
        0.6414436833552191,
        0.5885912676393118,
        1.1533105192804158,
        -0.771160029374833,
        -0.03734269449519936,
        0.19155777414546887
      ],
      [
        0.5131263350977467,
        -0.36241984560584534,
        -0.5662751383945858,
        0.7193478286392538,
        -1.5343410217812803,
        0.6026924057703595,
        -1.0751309575783068,
        0.7993903835191339
      ]
    ]
  },
  "bias_h": {
    "rows": 8,
    "cols": 1,
    "data": [
      [
        0.22551850424569378
      ],
      [
        0.8378204127533163
      ],
      [
        -0.026814283377831247
      ],
      [
        1.0154132701675052
      ],
      [
        0.20855758621221046
      ],
      [
        -1.8018239103167117
      ],
      [
        -1.6350884225136797
      ],
      [
        0.22874367827032732
      ]
    ]
  },
  "bias_o": {
    "rows": 2,
    "cols": 1,
    "data": [
      [
        0.24106213538506932
      ],
      [
        0.7847067254386401
      ]
    ]
  },
  "learning_rate": 0.1,
  "activation_function": {}
}

  function keyPressed() {
    if (key == 'P') {
      flappyBird.up();
      console.log("SPACE");
    }
  }
