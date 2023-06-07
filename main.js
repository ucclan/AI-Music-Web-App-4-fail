Song1 = "";
Song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

Song1_Status = "";

function preload() {
    Song1 = loadSound("music.mp3");
    Song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 640, 480);
    fill('red');
    stroke('red');
    Song1_Status = Song1.isPlaying(true);

    if (scoreLeftWrist > 0.2) { 
        circle(leftWristX, leftWristY, 20);
        Song2.stop();

        if (Song1_Status == false) {
            Song1.isPlaying(true);
            document.getElementById("subtitle").innerHTML = "Use your left hand to play " + Song1 + ", and use your right hand to play .";
        }
    }
}

function modelLoaded() {
    console.log("Model Has Successfully Loaded!")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}