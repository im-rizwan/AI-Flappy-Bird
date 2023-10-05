
class Bird {
    constructor(brain) {
        this.y = height / 2;
        this.x = 400;
        this.gravity = 0.6;
        this.lift = -17;
        this.velocity = 0;

        this.score = 0;
        this.fitness = 0;
        if (brain) {
            this.brain = brain.copy();
        }
        else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }


        this.show = function () {
            stroke('#146C94');
            
            fill('#146C94');
            //nostroke();
            
            ellipse(this.x, this.y, 16, 16);
            imageMode(CENTER);

            image(birdImg,this.x, this.y, 32, 32);      
        };
        this.think = function (pipes) {
            let closest = null;
            let closestD = Infinity;
            for (var i = 0; i < pipes.length; i++) {
                let d = (pipes[i].x+pipes[i].w) - this.x;
                if (d < closestD && d > 0) {
                    closest = pipes[i];
                    closestD = d;
                }
            }
            let inputs = [];
            inputs[0] = this.y / height;
            inputs[1] = closest.top / height;
            console.log(closest.top);
            inputs[2] = closest.bottom / height;
            inputs[3] = closest.x / width;
            inputs[4] = this.velocity / 10;
            //let inputs =[1.0,0.5,0.2,0.3];
            let output = this.brain.predict(inputs);
            if (output[0] > output[1]) {
                this.up();
            }

        };
        this.update = function () {
            this.score++;
            this.velocity += this.gravity; //gravity 
            this.velocity *= 0.9; //air resistance 
            this.y += this.velocity; //velocity
           
        };
        this.up = function () {
            this.velocity += this.lift;
        };
        this.mutate = function () {
            this.brain.mutate(0.1);
        };
        this.offscreen = function () {
            return (this.y > height || this.y < 0); 
        }
    }
}