song = ";"
RWX = 0
RWY = 0
LWX = 0
LWY = 0
scoreRW = 0
scoreLW = 0

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(400, 400)
    canvas.position(400,100)
    video = createCapture(VIDEO)
    video.hide()
    PoseNet = ml5.poseNet(video, modelloaded)
    PoseNet.on("pose", gotposes)
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results)
        RWX = results[0].pose.rightWrist.x
        RWY = results[0].pose.rightWrist.y
        LWX = results[0].pose.leftWrist.x
        LWY = results[0].pose.leftWrist.y
        console.log("Right Wrist x position " + RWX)
        console.log("Right Wrist y position " + RWY)
        console.log("Left Wrist x position " + LWX)
        console.log("Left Wrist y position " + LWY)
        scoreLW = results[0].pose.keypoints[9].score
    }

}

function draw() {
    image(video, 0, 0, 400, 400)
    fill("#0057FF")
    stroke("#000000")
     if(scoreLW > 0.2)
     {
         circle(LWX,LWY,20)
        LWXinnum = Number(LWX)
         LWXfinal = floor(LWXinnum)
        volume = LWXfinal/500
        document.getElementById("div_volume").innerHTML="volume : "+volume 
        song.setVolume(volume)
        console.log("test")
    }

    if(scoreRW>0.2)
    {
        if(RWY>0 && RWY<100)
        {
            document.getElementById("div_speed").innerHTML = "Speed: 0.5x"
            song.rate(0.5) 
        }
        else if(RWY>100 && RWY<=200)
        {
          document.getElementById("div_speed").innerHTML = "Speed: 1x"
          song.rate(1)
        }
        else if(RWY>200 && RWY<300)
        {
            document.getElementById("div_speed").innerHTML = "Speed: 1.5x"
            song.rate(1.5)
        }
        else if(RWY>300 && RWY<400)
        {
            document.getElementById("div_speed").innerHTML = "Speed: 2x"
            song.rate(2)
        }
    }
    
    
}

function playS() {
    song.play()
    song.setvolume(1)
    song.rate(1)
}

function modelloaded() {
    console.log("PoseNet is Loaded")
}

