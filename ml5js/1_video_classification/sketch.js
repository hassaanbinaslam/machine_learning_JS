let classifier;
let video;
let label = '';
let confidence = 0;

function preload() {
  video = createCapture(VIDEO);
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function modelReady(){
  console.log('model is ready');
  classifier.predict(gotResult);
}

function setup() {
  createCanvas(650, 550);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    //console.log(results);
    label = results[0].label;
    confidence = nf(results[0].confidence, 0, 2);
    classifier.predict(gotResult);
  }
}

function draw(){
  video.hide()
  background(0);
  image(video, 0, 0);

  textSize(22);
  fill(255);
  text(label, 10, height - 30);
  text(confidence, 10, height -10);
}