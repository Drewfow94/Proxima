export class Enemy{


    constructor(isBoss = false){
        //this.image = img;
        
        if(isBoss){
            createBoss()
        }else{
            createEnemy();
        }
        
    }

    createBoss(){
        console.log('Boss created...');
    }

    createEnemy(){
        console.log('Enemy created...');
    }

}

