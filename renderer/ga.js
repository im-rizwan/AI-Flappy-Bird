let generationCount = 1;
function nextGeneration(){
    //console.log("next generation");
    generationCount++;
    calculateFitness();
         
    for(var i=0;i<TOTAL;i++){
        
        birds[i]= pickOne();
        
    }
    savedBirds=[];
    return generationCount;
}

    function pickOne(){
        
        var index=0;
        var r=random(1);
        while(r>0){
            r=r-savedBirds[index].fitness;
            index++;
        }
        index--;
        let bird=savedBirds[index];
        let child = new Bird(bird.brain);
        child.mutate();
        return child;
    }
    
    function calculateFitness(){
        let sum=0;
        for(let bird of savedBirds){
            sum+=bird.score;
        }
        for(let bird of savedBirds){
            bird.fitness=bird.score/sum;
        }
    }
