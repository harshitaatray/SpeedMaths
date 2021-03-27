class Train{
    constructor(x,y,width,height){
        this.x = displayWidth/2;
        this.y = 4*displayHeight/5-120;
        this.width = displayWidth;
        this.height = displayHeight/2;
        this.trainImg = loadImage("sprites/Train.png");
        this.wheels1 = loadImage("sprites/wheels1.png");
        this.wheels2 = loadImage("sprites/wheels2.png");
                    
        movingtrain1 = createSprite(this.x+10, this.y + 78,495*this.width/600);
        movingtrain1.addImage(this.wheels1);
        movingtrain1.scale=0.71;
        movingtrain1.visible = false;
        movingtrain1.depth=3;

        movingtrain2 = createSprite(this.x+10, this.y + 78,495*this.width/600);
        movingtrain2.addImage(this.wheels2);
        movingtrain2.scale=0.71;
        movingtrain2.visible = false;
        movingtrain2.depth=3;

        this.train = createSprite(this.x, this.y, this.width, this.height);
        this.train.addImage(this.trainImg);
        this.train.scale = 0.708
        this.train.depth = 2;
        imageMode(CENTER);
    }
    display(){
        this.train.visible = true
    }
    movingWheels(){
        var f = frameCount % 10;
        if(f >= 0 && f < 5){
            movingtrain1.visible = false;
            movingtrain2.visible = true;
        }
        else{
            movingtrain2.visible = false;
            movingtrain1.visible = true;
        }
    }
    destroy(){
        this.train.visible = false;
        movingtrain1.visible = false;
        movingtrain2.visible = false;
    }
}