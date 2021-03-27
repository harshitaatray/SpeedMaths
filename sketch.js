var train;
var smoke, smokeGroup;
var actualspeed =1;
var speed=1+(actualspeed/10);
var smoke0, smoke1, smoke2, smoke3;
var index = 0;
var smokeImg, smokeCount=0;
var backgroundImg, background1, background2, background3, background4, station;
var a;
var b,c,d;
var gameState = 0;
var startButton, StartImage;
var endButton, endImage;
var score=0;
var restartButton, restartImage;
var movingtrain1, movingtrain2;
var correct, correctImg;
var incorrect, incorrectImg;
let inp;
var wait, waitImg;



function preload() {
    smokeImg = loadImage("sprites/smoke.png");
    backgroundImg = loadImage("sprites/background.jpg");
    station = loadImage("sprites/station.jpg");
    endImage = loadImage("sprites/cross.png");
    startImage = loadImage("sprites/start.PNG");
    restartImage = loadImage("sprites/restart.PNG");
    correctImg = loadImage("sprites/correct.png");
    incorrectImg = loadImage("sprites/incorrect.png");
    waitImg = loadImage("sprites/wait.PNG");
}

function setup(){
    var canvas = createCanvas(displayWidth,displayHeight*4/5);
    background1 = createSprite(displayWidth/2, displayHeight*2/5, displayWidth, displayHeight*4/5);
    background1.addImage(station);
    background1.scale=2;
    background1.depth=1;
    background1.visible = false;
    
    background2 = createSprite(3*displayWidth/2, displayHeight*2/5, displayWidth, displayHeight*4/5);
    background2.addImage(backgroundImg);
    background2.scale=5.5;
    background2.depth=1;

    background3 = createSprite(5*displayWidth/2, displayHeight*2/5, displayWidth, displayHeight*4/5);
    background3.addImage(backgroundImg);
    background3.scale=5.5;
    background3.depth=1;

    background4 = createSprite(displayWidth/2, displayHeight*2/5, displayWidth, displayHeight*4/5);
    background4.shapeColor = "cyan";
    background4.visible = false;
    background4.depth=1;
     

    train = new Train();
    smokeGroup = new Group();

    startButton = createSprite(displayWidth/2, displayHeight/2);
    startButton.addImage(startImage);
    startButton.depth = 3;

    endButton = createSprite(displayWidth - 60, 60);
    endButton.addImage(endImage);
    endButton.scale = 0.8; 

    restartButton = createSprite(displayWidth/2, displayHeight/2 + 100);
    restartButton.addImage(restartImage);
    restartButton.depth = 4;
    restartButton.visible = false;

    correct = createSprite(displayWidth/2, 150);
    correct.addImage(correctImg);
    correct.depth = 3;
    correct.scale = 0.05;
    correct.visible = false;

    incorrect = createSprite(displayWidth/2, 150);
    incorrect.addImage(incorrectImg);
    incorrect.depth = 3;
    incorrect.scale = 0.1;
    incorrect.visible = false;

    wait = createSprite(displayWidth/2, displayHeight/3);
    wait.addImage(waitImg);
    wait.scale = 0.5;
    wait.depth = 3;
    wait.visible = false;

    inp = createInput('','text');
    inp.position(100,80);
    inp.size(50);
    //inp.input(myInputEvent);

    goToInitialState();
}

function draw(){
    
    background("white");
    drawSprites();
    smokeClouds();
    
    //console.log(getFrameRate());
    if(gameState === 0){
        if(mousePressedOver(startButton)){
           // wait.visible = true;
            goToGameState();
        }
    }
    else if(gameState === 1){
        if(background1.x<-displayWidth/2){
            background1.velocityX = 0;
        }
        else background1.velocityX=-2*speed;
        if(background2.x<-displayWidth/2){
            background2.x=3*displayWidth/2;
        }
        if(background3.x<-displayWidth/2){
            background3.x=3*displayWidth/2;
        } 
        
        train.movingWheels();
       
        text("Score: "+score, 100, 50);
        
    }
    else if(gameState === 2){
        if(mousePressedOver(restartButton)){
            goToInitialState();
            incorrect.visible = false;
            console.log("gameState=0");    
        }

        textSize(40);
        stroke("white")
        text("Your score: "+score, displayWidth/2 - 100, displayHeight/3);
    }
    
    if(mousePressedOver(endButton)){
        goToGameOverState();
    }
    
            
    
}

function goToInitialState() {
    a = Math.round(Math.random()*10)+1;
    gameState = 0;
    background4.visible = false;
       
    background1.x = displayWidth/2;
    background1.visible = true;
    background1.velocityX=0;

    background2.x = displayWidth*3/2;
    background2.visible = true;
    background2.velocityX=0;

    background3.x = displayWidth*5/2;
    background3.visible = true;
    background3.velocityX=0;

    train.display();
    restartButton.visible = false;
    startButton.visible = true;
    smokeCount=0;
    score = 0;
}

function goToGameState() {
    gameState = 1;
    //wait.visible = false;
    background2.velocityX=-2*speed;
    background3.velocityX=-2*speed;
    startButton.visible = false;
}

function goToGameOverState() {
    gameState = 2;
    background1.visible = false;
    background2.visible = false;
    background3.visible = false;
    background4.visible = true;
    train.destroy();
    
    smokeGroup.destroyEach();
    
    restartButton.visible = true;
}


function keyPressed(){
    if(keyCode === 32){
       // slingshot.attach(bird.body);
    }
}



function smokeClouds(){
    if(gameState === 1){
        textSize(25);
        stroke(4);
        
        if(frameCount%Math.round(60/speed)===0){
            
            index = smokeCount%4;

            if(index === 0){
                smoke0 = createSprite(displayWidth - 140, displayHeight - 435,10,10);
                smoke0.addImage(smokeImg);
                smoke0.scale=0;
                smoke0.depth = 3;
                        
                smoke0.lifetime = 280;
                smokeGroup.add(smoke0);

                if(smokeCount !== 0){
                    
                    const answer = inp.value();
                    inp.value('');
                    console.log(d+"      "+answer);
                    if(d == answer && answer !== ''){
                        a = d;
                        correct.visible = true;
                        score += 5;
                        //for(var j = 0.05; j < 0.2; j = j + 0.001){
                        //    correct.scale = correct.scale + 0.01;
                        //}
                        //for(j = 0.2; j > 0.04; j = j - 0.001){
                        //    correct.scale = correct.scale - 0.01;
                        //}
                        //correct.visible = false;
                    }
                    else{
                        incorrect.visible = true;
                        //for(var j = 0.1; j < 0.4; j = j + 0.002){
                        //   incorrect.scale = incorrect.scale + 0.02;
                        //}
                        //for(j = 0.4; j > 0.1; j = j - 0.002){
                        //    incorrect.scale = incorrect.scale - 0.02;
                       // }
                        //incorrect.visible = false;
                        goToGameOverState();
                        
                    }
                }
            }
            else if(index === 1){
                smoke1 = createSprite(displayWidth - 140, displayHeight - 435,10,10);
                smoke1.addImage(smokeImg);
                smoke1.scale=0;
                smoke1.depth = 3;
                        
                smoke1.lifetime = 280;
                smokeGroup.add(smoke1);
                correct.visible = false;
            
                c=operator();

            }
            else if(index === 2){
                smoke2 = createSprite(displayWidth - 140, displayHeight - 435,10,10);
                smoke2.addImage(smokeImg);
                smoke2.scale=0;
                smoke2.depth = 3;
                    
                smoke2.lifetime = 280;
                smokeGroup.add(smoke2);
                e=b;
            }
            else if(index === 3){
                smoke3 = createSprite(displayWidth - 140, displayHeight - 435,10,10);
                smoke3.addImage(smokeImg);
                smoke3.scale=0;
                smoke3.depth = 3;
                        
                smoke3.lifetime = 280;
                smokeGroup.add(smoke3);
            }
            
            
            smokeCount = smokeCount+1;

            
        }

        if(smoke0!== undefined){

                
            if(smoke0.y > 290 && smoke0.scale < 0.3){
                
                smoke0.velocityY = -2;
                smoke0.velocityX = 0;
                smoke0.scale = smoke0.scale + 0.01*speed;
                //console.log(smoke.scale+"     b     "+"increasing due to height");
            }
            else{
                if(smoke0.velocityX > -5*speed){
                    smoke0.velocityX = smoke0.velocityX-0.2*speed;
                    smoke0.scale = smoke0.scale + 0.005*speed;
                    //console.log(smoke.scale+"     b     "+"increasing due to VelocityX");
                            
                }
                if(smoke0.velocityY < 0){
                    smoke0.velocityY = smoke0.velocityY + 0.10*speed;
                        
                    //console.log(smoke.scale+"     b     "+"increasing due to VelocityY");            
                }
                        
                    
            }
            
            text(a, smoke0.x, smoke0.y);
            
        }    

        if(smoke1!== undefined){

                
            if(smoke1.y > 290 && smoke1.scale < 0.3){
                
                smoke1.velocityY = -2;
                smoke1.velocityX = 0;
                smoke1.scale = smoke1.scale + 0.01*speed;
                //console.log(smoke.scale+"     b     "+"increasing due to height");
            }
            else{
                if(smoke1.velocityX > -5*speed){
                    smoke1.velocityX = smoke1.velocityX-0.2*speed;
                    smoke1.scale = smoke1.scale + 0.005*speed;
                    //console.log(smoke.scale+"     b     "+"increasing due to VelocityX");
                            
                }
                if(smoke1.velocityY < 0){
                    smoke1.velocityY = smoke1.velocityY + 0.10*speed;
                        
                    //console.log(smoke.scale+"     b     "+"increasing due to VelocityY");            
                }
                        
                    
            }
            
            text(c, smoke1.x, smoke1.y);
            
        }  
        
        if(smoke2!== undefined){

                
            if(smoke2.y > 290 && smoke2.scale < 0.3){
                
                smoke2.velocityY = -2;
                smoke2.velocityX = 0;
                smoke2.scale = smoke2.scale + 0.01*speed;
                //console.log(smoke.scale+"     b     "+"increasing due to height");
            }
            else{
                if(smoke2.velocityX > -5*speed){
                    smoke2.velocityX = smoke2.velocityX-0.2*speed;
                    smoke2.scale = smoke2.scale + 0.005*speed;
                    //console.log(smoke.scale+"     b     "+"increasing due to VelocityX");
                            
                }
                if(smoke2.velocityY < 0){
                    smoke2.velocityY = smoke2.velocityY + 0.10*speed;
                        
                    //console.log(smoke.scale+"     b     "+"increasing due to VelocityY");            
                }
                        
                    
            }

            text(e, smoke2.x, smoke2.y);
            
        }    

        if(smoke3!== undefined){

                
            if(smoke3.y > 290 && smoke3.scale < 0.3){
                
                smoke3.velocityY = -2;
                smoke3.velocityX = 0;
                smoke3.scale = smoke3.scale + 0.01*speed;
                //console.log(smoke.scale+"     b     "+"increasing due to height");
            }
            else{
                if(smoke3.velocityX > -5*speed){
                    smoke3.velocityX = smoke3.velocityX-0.2*speed;
                    smoke3.scale = smoke3.scale + 0.005*speed;
                    //console.log(smoke.scale+"     b     "+"increasing due to VelocityX");
                            
                }
                if(smoke3.velocityY < 0){
                    smoke3.velocityY = smoke3.velocityY + 0.10*speed;
                        
                    //console.log(smoke.scale+"     b     "+"increasing due to VelocityY");            
                }
                        
                    
            }

            text("=", smoke3.x, smoke3.y);
            
        }    
    }
    else{
        smoke0 = smoke1 = smoke2 = smoke3 = undefined;
    }
    
}

function operator(){
    var r = Math.round(Math.random()*6)+1;
    b = Math.round(Math.random()*100);
    //console.log("r: "+r);
    switch(r){
        case 1: //b = Math.round(Math.random()*100);
                d = a+b;
                return("+");
                break;
        case 2: b = Math.round(Math.random()*a);
                d = a-b;
                return("-");
                break;
        case 3: //b = Math.round(Math.random()*100);
                d = a*b;
                return("x");
                break;
        case 4: if(a%2 === 0){
                    d = a/2;
                }
                else{
                    d = (a-1)/2;
                }
                d = Math.max(d, 1);
                for(var i = d; i > 0; i--){
                    if(a%i === 0){
                        b=i;
                        break;
                    }
                }
                
                d = a/b;
                return("/");
                break;
        case 5: b = Math.round(Math.random()*100);
                d = a%b;
                return("mod");
                break;
        case 6: b = 2;
                d = Math.pow(a,b);
                return("to the power");
                break;
                
        default: b = 3;
                d = Math.pow(a,b);
                return("to the power")
                break;
    }
}