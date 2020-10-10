import GameConstants from '../services/GameConstants.js';
import BasicIntroScene from "./BasicIntroScene.js";

class Level6 extends BasicIntroScene  {
    constructor() {
        super({key: 'Level6', 
              target:GameConstants.Levels.MENU});

        console.log(this.key);

        
    }
    
 
    create() {        
        //check if all levels , if all superpowers, if all inventory objects
        this.checkAllLevels();
        this.checkAllInventory();

        
        //this.scene.start(this.target); 

        //Create Music Background (Layer1 + Layer2)
        this.createBgSounds(GameConstants.Sound.LEVEL5.AMBIENCE);       
        
        //Create BackgroundImg 
        this.createBackgroundImg(GameConstants.Textures.BG_LEVEL5);




        
        if (this.checkContinueLevel()){
            
            this.target = GameConstants.Levels.BAMAK;

            /*this.time.addEvent({
                delay: 1000,
                callback: () => {                    
                    this.cameras.main.fade(1200, 0, 0, 0);
                    this.cameras.main.on('camerafadeoutcomplete', () => {                        
                        this.musicBg.stop();
                        if (this.musicBg2 !== undefined) this.musicBg2.stop();
                        if (this.womanVoice !== undefined) this.womanVoice.stop();              
                        
                        this.scene.start(GameConstants.Levels.BAMAK);
                    });
                },
                callbackScope: this
            });*/            

        }

        

    } 

}

export default Level6;