class Pipe {
    constructor() {
        let spacing = 120;
    let centery = random(spacing, height - spacing)+random(1,10);

    // Top and bottom of pipe
    this.top = centery - spacing / 2;
    this.bottom = height - (centery + spacing / 2);
        this.x = width;
        this.w = 50;
        this.speed = 5;
        this.highlight = false;
        this.show = function () {

            if (this.highlight===true) {
                stroke('#ffffff');
            fill('#ffffff');
            }else{
                stroke('#19A7CE');
            fill('#19A7CE');
            }
            
            //nostroke();
            rectMode(CORNER);
            rect(this.x, 0, this.w, this.top);
            rect(this.x, height - this.bottom, this.w, this.bottom);
    
        };
        this.update = function () {
            this.x -= this.speed;
        };
        this.offscreen = function () {
            if (this.x < -this.w) {
                return true;
            }
            else {
                return false;
            }
        };
        //write a funtion to check if the bird hits the pipe    

        this.hits = function (bird) {
            if ((bird.y-16< this.top) || bird.y+16 > height - this.bottom) {
                if (bird.x+16 > this.x && bird.x-16 < this.x + this.w) {
                    this.highlight = true;
                    return true;
                }
            }
            this.highlight = false;
            return false;
        };
    }
}