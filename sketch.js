var ball;
var database,position;

function setup(){
    database = firebase.database()
    var fetchpos = database.ref('ball/position')
    fetchpos.on("value",getpos,show_err)
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({
    'x':position.x+x,
    'y':position.y+y
    })
}

function getpos(xy_val){
position = xy_val.val()
ball.x = position.x
ball.y = position.y
}

function show_err() {
    console.log("error while connecting to the database")
}