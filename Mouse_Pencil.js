status = "";
objects = [];
img = "";
function preload()
{
    img = loadImage("Mouse_keyboard_pencil.jpg")
}

function setup()
{
    canvas = createCanvas(480, 425);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function back()
{
    window.location.href = "index.html";
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img, 0, 0, 480, 425);
    
    if (status != "")
    {
        
        for (var i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
        
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", 100, 100);
            console.log(objects[i].label);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("objectDetectionNumber").innerHTML = "1 object was detected out of 4 objects";
        }
    }
}