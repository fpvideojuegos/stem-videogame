import GameConstants from '../services/GameConstants.js';
import BasicIntroScene from "./BasicIntroScene.js";

class BamakLevel extends BasicIntroScene  {
    constructor() {
        super({key: 'BamakLevel', 
              target:GameConstants.Levels.MENU});              
    }
    
 
    create() {        
        //Create Music Background (Layer1 + Layer2)
        this.createBgSounds(GameConstants.Sound.LEVEL5.AMBIENCE);       
        
        //Create BackgroundImg 
        this.createBackgroundImg(GameConstants.Textures.BG_LEVEL5);


        
        console.log("OK");
        
                
        //show BAMAK
        let particles = this.add.particles(GameConstants.Sprites.RED.KEY);

        let emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        let logo = this.physics.add.image(50, 50, GameConstants.Sprites.BAMAK.KEY);

        logo.setVelocity(25, 50);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);     
        
        
        //CreateTexts
        this.createBamakVoices(5000, GameConstants.Sound.LEVEL6.ALLWOMEN);
        this.createTexts('LEVEL6.ALLWOMEN',500 , 50, 50, 50);

                //show text
            
        //Create Woman 
        //this.createAllWoman(5000);

        //CreateTexts
        //this.createTexts('LEVEL6.ALLWOMEN',500);

        //Create BAMAK show BAMAKS
        //this.createBAMAK();

    } 

}

export default BamakLevel;